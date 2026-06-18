"use client";

import LiteYouTubeEmbed, {
  type LiteYouTubeProps,
} from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

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
