import { ChakraProvider } from "@chakra-ui/react"
import { MDXProvider } from '@mdx-js/react'
import dynamic from "next/dynamic";

const components = {
  Youtube: dynamic(() => import("../components/Youtube")),
  ExternalLink: dynamic(() => import("../components/ExternalLink"))
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={false}>
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
    </ChakraProvider>
  )
}

export default MyApp