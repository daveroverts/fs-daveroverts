import { Text } from "@chakra-ui/layout";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import Layout from "../../components/Layout";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";

export default function PostPage({ source, frontMatter }) {
  return (
    <Layout>
      <div className="post-header">
        <Text fontSize="6xl">{frontMatter.title}</Text>
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
        <MDXRemote {...source} />
      </main>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
