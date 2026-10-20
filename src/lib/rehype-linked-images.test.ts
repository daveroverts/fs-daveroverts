import { describe, expect, it } from "vitest";

import rehypeLinkedImages from "./rehype-linked-images";

const run = (tree: object) => {
  rehypeLinkedImages()(tree as never);
  return tree;
};

describe("rehypeLinkedImages", () => {
  it("flags a markdown image inside a markdown link", () => {
    const img = { type: "element", tagName: "img", properties: { src: "/a" } };
    run({
      type: "root",
      children: [{ type: "element", tagName: "a", children: [img] }],
    });
    expect(img.properties).toEqual({ src: "/a", dataNoLightbox: true });
  });

  it("flags an <Img> inside a JSX <a>", () => {
    const jsxImg = { type: "mdxJsxTextElement", name: "Img", attributes: [] };
    run({
      type: "root",
      children: [{ type: "mdxJsxFlowElement", name: "a", children: [jsxImg] }],
    });
    expect(jsxImg.attributes).toEqual([
      { type: "mdxJsxAttribute", name: "data-no-lightbox", value: null },
    ]);
  });

  it("leaves images outside links alone", () => {
    const img = { type: "element", tagName: "img", properties: { src: "/a" } };
    run({
      type: "root",
      children: [{ type: "element", tagName: "p", children: [img] }],
    });
    expect(img.properties).toEqual({ src: "/a" });
  });
});
