import { MDXRemote } from "next-mdx-remote";
import Layout from "components/Layout";
import { getFileBySlug, getFiles } from "lib/mdx";
import { NextSeo } from "next-seo";

export default function Page({ mdxSource, frontMatter }) {
  return (
    <>
      <NextSeo title={frontMatter.title} />
      <Layout title={frontMatter.title}>
        <div>
          {frontMatter.description && (
            <p className="py-5">{frontMatter.description}</p>
          )}
          <article className="prose lg:prose-xl dark:prose-invert">
            <MDXRemote {...mdxSource} />
          </article>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles("pages");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug("pages", params.slug);

  return { props: post };
}
