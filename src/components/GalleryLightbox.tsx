"use client";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface GalleryLightboxProps {
  slides: SlideImage[];
  index: number;
  onIndexChange: (index: number) => void;
}

// Split out from ImageGallery so the lightbox JS and CSS only load once an
// image is clicked.
export default function GalleryLightbox({
  slides,
  index,
  onIndexChange,
}: GalleryLightboxProps) {
  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={() => onIndexChange(-1)}
      on={{ view: ({ index: current }) => onIndexChange(current) }}
      slides={slides}
      plugins={slides.length > 1 ? [Captions, Counter, Zoom] : [Captions, Zoom]}
      carousel={{ finite: true }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
