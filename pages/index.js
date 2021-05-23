import {
  Divider,
  Link,
  ListItem,
  Text,
  UnorderedList
} from "@chakra-ui/layout";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import fs from "fs";
import matter from "gray-matter";
import NextLink from "next/link";
import path from "path";
import { Hero } from "../components/Hero";
import Layout from "../components/Layout";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";

export default function Index({ posts }) {
  return (
    <Layout>
    <Hero />
      <Text fontSize="6xl">Latest Posts</Text>
      <Divider m={4} />
      <UnorderedList>
        {posts.map((post) => (
          <ListItem key={post.filePath}>
            <NextLink
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
            >
              <Link>
                {post.data.title}{" "}
                {post.data.date && (
                  <>
                    {" - "}{" "}
                    {format(parseISO(post.data.date), "P", { locale: enGB })}
                  </>
                )}
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Layout>
  );
}

export function getStaticProps() {
  const posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data,
        filePath,
      };
    })
    .sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });

  return { props: { posts } };
}
