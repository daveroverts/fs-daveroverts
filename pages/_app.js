import { ChakraProvider } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import theme from "../theme";
import MDXComponents from "../components/MDXComponents";
import { DefaultSeo } from "next-seo";
import SEO from '../next-seo.config'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
    <DefaultSeo {...SEO}/>
      <MDXProvider components={MDXComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  );
}

export default MyApp;
