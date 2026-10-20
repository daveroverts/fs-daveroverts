import fs from "node:fs/promises";
import path from "node:path";

import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import type { ComponentPropsWithoutRef } from "react";

import { NO_LIGHTBOX } from "@/lib/rehype-linked-images";

import { GalleryItem } from "./ImageGallery";

// Set by rehypeLinkedImages on images inside a link.
interface NoLightboxProp {
  [NO_LIGHTBOX]?: boolean | string;
}

interface MdxImageProps extends NoLightboxProp {
  src: string;
  alt: string;
  title?: string;
  quality?: number;
}

async function loadImage(src: string) {
  const file = path.join(process.cwd(), "public", decodeURIComponent(src));
  return getPlaiceholder(await fs.readFile(file), { size: 10 });
}

type LoadedImage = Awaited<ReturnType<typeof loadImage>>;

function BlurImage({
  src,
  alt,
  title,
  quality,
  noLightbox,
  loaded: { metadata, base64 },
}: Omit<MdxImageProps, typeof NO_LIGHTBOX> & {
  noLightbox: boolean;
  loaded: LoadedImage;
}) {
  const image = {
    src,
    width: metadata.width,
    height: metadata.height,
    quality,
  };
  const img = (
    <Image
      {...image}
      alt={alt}
      title={title}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
  if (noLightbox) return img;
  return (
    <GalleryItem
      src={src}
      alt={alt}
      width={metadata.width}
      height={metadata.height}
    >
      {img}
    </GalleryItem>
  );
}

// Async server component so MDX content can render blur-placeholder
// next/image without the static imports that an MDX string can't do.
export async function MdxImage({
  [NO_LIGHTBOX]: noLightbox,
  ...props
}: MdxImageProps) {
  let loaded: LoadedImage;
  try {
    loaded = await loadImage(props.src);
  } catch (error) {
    throw new Error(`MdxImage: can't load "${props.src}" from public/`, {
      cause: error,
    });
  }
  return (
    <BlurImage
      {...props}
      noLightbox={noLightbox !== undefined}
      loaded={loaded}
    />
  );
}

// Markdown images (`![alt](/static/...)`) get the blur-placeholder treatment
// when they point at an image in public/ that loads. Anything else (external
// or protocol-relative URLs, query strings, missing, non-image or corrupt
// files) stays a plain <img>, as before.
export async function MarkdownImage(
  props: ComponentPropsWithoutRef<"img"> & NoLightboxProp,
) {
  const { src, alt = "", title, [NO_LIGHTBOX]: noLightbox } = props;
  let loaded: LoadedImage | undefined;
  if (typeof src === "string" && /^\/(?!\/)[^?#]*$/.test(src)) {
    try {
      loaded = await loadImage(src);
    } catch {
      // Not a loadable local image: fall back to a plain <img> below.
    }
  }
  if (typeof src !== "string" || !loaded) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={alt} />;
  }
  return (
    <BlurImage
      src={src}
      alt={alt}
      title={title}
      noLightbox={noLightbox !== undefined}
      loaded={loaded}
    />
  );
}
