"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import LiteYouTubeEmbed, {
  type LiteYouTubeProps,
} from "react-lite-youtube-embed";

type YoutubeProps = Omit<LiteYouTubeProps, "title"> & { title?: string };

export const Youtube = ({
  title = "YouTube video",
  ...props
}: YoutubeProps) => {
  return (
    <div className="aspect-video">
      <LiteYouTubeEmbed title={title} cookie={false} {...props} />
    </div>
  );
};
