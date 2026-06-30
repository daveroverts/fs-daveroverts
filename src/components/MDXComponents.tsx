import type { ComponentPropsWithoutRef } from "react";

import { Age } from "./Age";
import { MdxImage } from "./MdxImage";
import { Youtube } from "./Youtube";

const Kbd = ({ className = "", ...props }: ComponentPropsWithoutRef<"kbd">) => (
  <kbd
    className={`inline-block rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-gray-800 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 ${className}`}
    {...props}
  />
);

const MDXComponents = {
  Age,
  Img: MdxImage,
  Youtube,
  kbd: Kbd,
};

export default MDXComponents;
