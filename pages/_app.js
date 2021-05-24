import { ChakraProvider } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";
import theme from "../theme";
import MDXComponents from "../components/MDXComponents";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <MDXProvider components={MDXComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  );
}

export default MyApp;
