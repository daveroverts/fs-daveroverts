import { describe, expect, it } from "vitest";

import { parseSrcSet, toSlide } from "./lightbox";

describe("parseSrcSet", () => {
  it("parses width descriptors and scales the height", () => {
    expect(parseSrcSet("/a?w=640 640w, /a?w=1080 1080w", 1080, 540)).toEqual([
      { src: "/a?w=640", width: 640, height: 320 },
      { src: "/a?w=1080", width: 1080, height: 540 },
    ]);
  });

  it("keeps the first larger candidate as the full-resolution source", () => {
    expect(
      parseSrcSet(
        "/a?w=750 750w, /a?w=1920 1920w, /a?w=2048 2048w",
        1409,
        1094,
      ),
    ).toEqual([
      { src: "/a?w=750", width: 750, height: 582 },
      { src: "/a?w=1920", width: 1409, height: 1094 },
    ]);
  });

  it("returns an empty list for a missing srcSet", () => {
    expect(parseSrcSet(undefined, 100, 100)).toEqual([]);
  });
});

describe("toSlide", () => {
  it("builds an optimized slide with the alt text as caption", () => {
    const slide = toSlide({
      src: "/static/images/example.png",
      alt: "Example",
      width: 1409,
      height: 1094,
    });
    expect(slide).toMatchObject({
      alt: "Example",
      description: "Example",
      width: 1409,
      height: 1094,
    });
    expect(slide.src).toContain(
      "/_next/image?url=%2Fstatic%2Fimages%2Fexample.png",
    );
    expect(slide.srcSet?.every((s) => s.width <= 1409)).toBe(true);
    expect(slide.srcSet?.at(-1)?.width).toBe(1409);
    // q=100 is checked in e2e/lightbox.spec.ts: without next.config.ts,
    // Next's default `qualities` ([75]) rounds it down here.
  });
});
