import { ThemeProvider } from 'next-themes'
import { MDXProvider } from "@mdx-js/react";
// import MDXComponents from "../components/MDXComponents";
import { DefaultSeo } from "next-seo";
import SEO from '../next-seo.config'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <ThemeProvider> */}
        <DefaultSeo {...SEO} />
        {/* <MDXProvider components={MDXComponents}> */}
        <MDXProvider>
          <Component {...pageProps} />
        </MDXProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default MyApp;
