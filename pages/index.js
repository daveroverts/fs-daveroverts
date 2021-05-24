import {
  Divider,
  Link,
  ListItem,
  Text,
  UnorderedList
} from "@chakra-ui/layout";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from '../lib/mdx'

export default function Index({ posts }) {
  return (
    <Layout>
      <Text fontSize="6xl">Latest Posts</Text>
      <Divider m={4} />
      <UnorderedList>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <NextLink
              href={`posts/${post.slug}`}
              passHref
            >
              <Link>
                {post.title}{" "}
                {post.date && (
                  <>
                    {" - "}{" "}
                    {format(parseISO(post.date), "P", { locale: enGB })}
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

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('posts')

  return { props: { posts } };
}
