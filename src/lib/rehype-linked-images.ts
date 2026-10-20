// Minimal shape of the hast + MDX JSX nodes this plugin touches.
interface Node {
  type: string;
  tagName?: string;
  name?: string | null;
  properties?: Record<string, unknown>;
  attributes?: { type: string; name?: string; value?: unknown }[];
  children?: Node[];
}

export const NO_LIGHTBOX = "data-no-lightbox";

const isJsx = (node: Node) =>
  node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";

const isLink = (node: Node) =>
  (node.type === "element" && node.tagName === "a") ||
  (isJsx(node) && node.name === "a");

function mark(node: Node, insideLink: boolean) {
  if (insideLink) {
    if (node.type === "element" && node.tagName === "img") {
      node.properties = { ...node.properties, dataNoLightbox: true };
    } else if (isJsx(node) && (node.name === "Img" || node.name === "img")) {
      node.attributes = [
        ...(node.attributes ?? []),
        { type: "mdxJsxAttribute", name: NO_LIGHTBOX, value: null },
      ];
    }
  }
  const childInsideLink = insideLink || isLink(node);
  for (const child of node.children ?? []) mark(child, childInsideLink);
}

// Flags images inside a link (`[![alt](src)](url)` or `<a><Img /></a>`) with
// `data-no-lightbox`, so they stay plain links instead of becoming a lightbox
// button nested in an <a>.
export default function rehypeLinkedImages() {
  return (tree: Node) => mark(tree, false);
}
