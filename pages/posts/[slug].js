import { Heading, Text } from "@chakra-ui/layout";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { MDXRemote } from "next-mdx-remote";
import Layout from "../../components/Layout";
import MDXComponents from "../../components/MDXComponents";
import { getFileBySlug, getFiles } from "../../lib/mdx";

export default function PostPage({ mdxSource, frontMatter }) {
  return (
    <Layout>
      <div className="post-header">
        <Heading>{frontMatter.title}</Heading>
        {frontMatter.date && (
          <Text fontSize="3xl">
            {format(parseISO(frontMatter.date), "P", { locale: enGB })}
          </Text>
        )}
        {frontMatter.description && (
          <Text className="description">{frontMatter.description}</Text>
        )}
      </div>
      <main>
        <MDXRemote {...mdxSource} />
      </main>
    </Layout>
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
