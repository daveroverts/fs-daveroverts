import { getImageProps } from "next/image";
import type { SlideImage } from "yet-another-react-lightbox";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// The enlarged view is for reading details (e.g. radar labels), so it always
// loads at full quality, whatever the inline image uses. Must be listed in
// `images.qualities` in next.config.ts.
export const LIGHTBOX_QUALITY = 100;

type SrcSetEntry = NonNullable<SlideImage["srcSet"]>[number];

// Turns a next/image `srcSet` string ("url 640w, url 750w, ...") into the
// lightbox's srcSet objects. Next won't upscale, so the first candidate at or
// above the original width serves the full-resolution image: keep that one,
// labelled with the original size, and drop the larger duplicates.
export function parseSrcSet(
  srcSet: string | undefined,
  width: number,
  height: number,
): SrcSetEntry[] {
  if (!srcSet) return [];
  const candidates = srcSet
    .split(/,\s+/)
    .map((entry) => {
      const [url, descriptor] = entry.trim().split(/\s+/);
      return { src: url, width: Number.parseInt(descriptor ?? "", 10) };
    })
    .filter((c) => Number.isFinite(c.width))
    .sort((a, b) => a.width - b.width);

  const result = candidates
    .filter((c) => c.width < width)
    .map((c) => ({ ...c, height: Math.round((height / width) * c.width) }));
  const full = candidates.find((c) => c.width >= width);
  if (full) result.push({ src: full.src, width, height });
  return result;
}

// Builds a lightbox slide that loads through the Next.js image optimizer,
// so the enlarged view gets the same AVIF/WebP variants as the inline image.
export function toSlide(image: GalleryImage): SlideImage {
  const { src, alt, width, height } = image;
  // Only src/srcSet are used from the result, so alt doesn't matter here.
  const { props } = getImageProps({
    src,
    alt: "",
    width,
    height,
    quality: LIGHTBOX_QUALITY,
    sizes: "100vw",
  });
  const srcSet = parseSrcSet(props.srcSet, width, height);
  return {
    src: props.src,
    alt,
    width,
    height,
    description: alt || undefined,
    srcSet: srcSet.length > 0 ? srcSet : undefined,
  };
}
