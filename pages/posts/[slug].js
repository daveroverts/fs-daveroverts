import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { MDXRemote } from "next-mdx-remote";
import Layout from "components/Layout";
import { getFileBySlug, getFiles } from "lib/mdx";
import { NextSeo } from "next-seo";


export default function PostPage({ mdxSource, frontMatter }) {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
      />
      <Layout title={frontMatter.title} subtitle={frontMatter.date ? format(parseISO(frontMatter.date), "P", { locale: enGB }) : undefined}>
          <div>
            {frontMatter.description && (
              <p className="py-5">{frontMatter.description}</p>
            )}
          <article className="prose lg:prose-xl">
            <MDXRemote {...mdxSource} />
          </article>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles("posts");

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
  const post = await getFileBySlug("posts", params.slug);

  return { props: post };
}
