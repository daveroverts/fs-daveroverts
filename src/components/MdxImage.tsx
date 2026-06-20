import fs from "node:fs/promises";
import path from "node:path";

import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

interface MdxImageProps {
  src: string;
  alt: string;
  quality?: number;
}

// Async server component so MDX content can render blur-placeholder
// next/image without the static imports that an MDX string can't do.
export async function MdxImage({ src, alt, quality }: MdxImageProps) {
  const buffer = await fs.readFile(path.join(process.cwd(), "public", src));
  const { metadata, base64 } = await getPlaiceholder(buffer, { size: 10 });

  return (
    <Image
      src={src}
      alt={alt}
      width={metadata.width}
      height={metadata.height}
      placeholder="blur"
      blurDataURL={base64}
      quality={quality}
    />
  );
}
