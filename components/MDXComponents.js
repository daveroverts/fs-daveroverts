import LiteYouTubeEmbed from "react-lite-youtube-embed";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const Youtube = (props) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <LiteYouTubeEmbed id={props.id} noCookie={true} />
    </div>
  );
};

const MDXComponents = {
  // h1: H1,
  // h2: H2,
  // h3: H3,
  // h4: H4,
  // h5: H5,
  // h6: H6,
  // inlineCode: InlineCode,
  // br: Br,
  // hr: Hr,
  // a: CustomLink,
  // p: P,
  // ul: Ul,
  // ol: Ol,
  // li: Li,
  // img: CustomImage,
  // blockquote: Quote,
  Youtube: Youtube,
};

export default MDXComponents;
