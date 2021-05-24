import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { MDXRemote } from "next-mdx-remote";
import Layout from "../../components/Layout";
import { getFileBySlug, getFiles } from "../../lib/mdx";

export default function PostPage({ mdxSource, frontMatter }) {
  return (
    <Layout>
      <Container>
        <Box>
          <Heading>{frontMatter.title}</Heading>
          {frontMatter.date && (
            <Text
            color="gray.500"
            minWidth="105px"
            // textAlign={["left", "right"]}
            // mb={[4, 0]}
          >
            {format(parseISO(frontMatter.date), "P", { locale: enGB })}
          </Text>
          )}
          {frontMatter.description && (
            <Text className="description">{frontMatter.description}</Text>
          )}
        </Box>
        <main>
          <MDXRemote {...mdxSource} />
        </main>
      </Container>
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
