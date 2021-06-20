import { Box, Heading } from "@chakra-ui/layout";
import { MDXRemote } from "next-mdx-remote";
import Layout from "../components/Layout";
import { getFileBySlug, getFiles } from "../lib/mdx";
import { NextSeo } from "next-seo";

export default function Page({ mdxSource, frontMatter }) {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
      />
      <Layout>
        <Box>
          <Heading>{frontMatter.title}</Heading>
        </Box>
        <main>
          <MDXRemote {...mdxSource} />
        </main>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const pages = await getFiles("pages");

  return {
    paths: pages.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = await getFileBySlug("pages", params.slug);

  return { props: page };
}
