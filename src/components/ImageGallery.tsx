"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { SlideImage } from "yet-another-react-lightbox";

import { type GalleryImage, toSlide } from "@/lib/lightbox";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), {
  ssr: false,
});

// Starts fetching the lightbox chunk before the click, so opening feels instant.
const preloadLightbox = () => void import("./GalleryLightbox");

interface GalleryContextValue {
  register: (item: HTMLElement, image: GalleryImage) => () => void;
  open: (item: HTMLElement, image: GalleryImage) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

// Wraps MDX content: every <GalleryItem> inside becomes a slide, in document
// order, so clicking one image opens a lightbox you can page through.
export function ImageGallery({ children }: { children: ReactNode }) {
  const items = useRef(new Map<HTMLElement, GalleryImage>());
  const [slides, setSlides] = useState<SlideImage[]>([]);
  const [index, setIndex] = useState(-1);
  // Stays true after the first open, so the lightbox can animate closed.
  const [loaded, setLoaded] = useState(false);

  const register = useCallback((item: HTMLElement, image: GalleryImage) => {
    items.current.set(item, image);
    return () => {
      items.current.delete(item);
    };
  }, []);

  const open = useCallback((item: HTMLElement, image: GalleryImage) => {
    // A click right after hydration can beat the register effect.
    items.current.set(item, image);
    const entries = [...items.current.entries()].sort(([a], [b]) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    setSlides(entries.map(([, image]) => toSlide(image)));
    setIndex(entries.findIndex(([el]) => el === item));
    setLoaded(true);
  }, []);

  const value = useMemo(() => ({ register, open }), [register, open]);

  return (
    <GalleryContext value={value}>
      {children}
      {loaded && (
        <GalleryLightbox
          slides={slides}
          index={index}
          onIndexChange={setIndex}
        />
      )}
    </GalleryContext>
  );
}

// Makes an image clickable to open the surrounding <ImageGallery>. Outside a
// gallery it renders the image as-is.
export function GalleryItem({
  children,
  src,
  alt,
  width,
  height,
}: GalleryImage & { children: ReactNode }) {
  const gallery = useContext(GalleryContext);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!gallery || !ref.current) return;
    return gallery.register(ref.current, { src, alt, width, height });
  }, [gallery, src, alt, width, height]);

  if (!gallery) return children;

  return (
    <button
      ref={ref}
      type="button"
      className="inline-block max-w-full cursor-zoom-in align-top"
      aria-label={alt ? `Enlarge image: ${alt}` : "Enlarge image"}
      onPointerEnter={preloadLightbox}
      onFocus={preloadLightbox}
      onClick={(e) =>
        gallery.open(e.currentTarget, { src, alt, width, height })
      }
    >
      {children}
    </button>
  );
}
