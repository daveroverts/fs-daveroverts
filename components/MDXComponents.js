import Image from "next/image";
import Link from "next/link";

// const CustomLink = (props) => {
//   const { colorMode } = useColorMode();
//   const color = {
//     light: "hsl(208, 99%, 44%)",
//     dark: "hsl(208, 95%, 68%)",
//   };

//   const href = props.href;
//   const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

//   if (isInternalLink) {
//     return (
//       <NextLink href={href} passHref>
//         <Link color={color[colorMode]} {...props} />
//       </NextLink>
//     );
//   }

//   return (
//     <Link color={color[colorMode]} isExternal {...props}>
//       {props.children} <ExternalLinkIcon mx="2px" />
//     </Link>
//   );
// };

// const Quote = (props) => {
//   const { colorMode } = useColorMode();
//   const bgColor = {
//     light: "blue.50",
//     dark: "blue.900",
//   };

//   return (
//     <Alert
//       mt={4}
//       w="98%"
//       bg={bgColor[colorMode]}
//       variant="left-accent"
//       status="info"
//       css={{
//         "> *:first-of-type": {
//           marginTop: 0,
//           marginLeft: 8,
//         },
//       }}
//       {...props}
//     />
//   );
// };

// const DocsHeading = (props) => (
//   <Heading
//     css={{
//       scrollMarginTop: "100px",
//       scrollSnapMargin: "100px", // Safari
//       "&[id]": {
//         pointerEvents: "none",
//       },
//       "&[id]:before": {
//         display: "block",
//         height: " 6rem",
//         marginTop: "-6rem",
//         visibility: "hidden",
//         content: `""`,
//       },
//       "&[id]:hover a": { opacity: 1 },
//     }}
//     {...props}
//     mb="1em"
//     mt="2em"
//   >
//     <Box pointerEvents="auto">
//       {props.children}
//       {props.id && (
//         <Box
//           aria-label="anchor"
//           as="a"
//           color="blue.500"
//           fontWeight="normal"
//           outline="none"
//           _focus={{
//             opacity: 1,
//             boxShadow: "outline",
//           }}
//           opacity="0"
//           ml="0.375rem"
//           href={`#${props.id}`}
//         >
//           #
//         </Box>
//       )}
//     </Box>
//   </Heading>
// );

// const H1 = (props) => {
//   return (
//     <Heading as="h1" size="xl" my={4} {...props} />
//   )
// }

// const H2 = (props) => {
//   return (
//     <DocsHeading as="h2" size="lg" fontWeight="bold" {...props} />
//   )
// }

// const H3 = (props) => {
//   return (
//     <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />
//   )
// }

// const H4 = (props) => {
//   return (
//     <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />
//   )
// }

// const H5 = (props) => {
//   return (
//     <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />
//   )
// }

// const H6 = (props) => {
//   return (
//     <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />
//   )
// }

// const InlineCode = (props) => {
//   return (
//     <Code colorScheme="yellow" fontSize="0.84em" {...props} />
//   )
// }

// const Br = (props) => {
//   return (
//     <Box height="24px" {...props} />
//   )
// }

// const P = (props) => {
//   return (
//     <Text as="p" mt={0} lineHeight="tall" {...props} />
//   )
// }

// const Ul = (props) => {
//   return (
//     <Box as="ul" pt={2} pl={4} ml={2} {...props} />
//   )
// }

// const Ol = (props) => {
//   return (
//     <Box as="ol" pt={2} pl={4} ml={2} {...props} />
//   )
// }

// const Li = (props) => {
//   return (
//     <Box as="li" pb={1} {...props} />
//   )
// }

// const Hr = () => {
//   const { colorMode } = useColorMode();
//   const borderColor = {
//     light: "gray.200",
//     dark: "gray.600",
//   };

//   return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
// };

const Youtube = (props) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        width="560"
        height="315"
        src={props.src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// const CustomImage = (props) => {
//   return (
//     <Image
//       src={props.src}
//       alt={props.alt}
//       layout="responsive"
//       width={16}
//       height={9}
//       quality={100}
//     />
//   );
// };

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
