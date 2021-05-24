import { useColorMode } from "@chakra-ui/color-mode";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";

export default function Index({ posts }) {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  return (
    <Layout>
      <Text fontSize="6xl">Latest Posts</Text>
      <Divider m={4} />
      <UnorderedList>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <NextLink href={`posts/${post.slug}`} passHref>
              <Link w="100%" _hover={{ textDecoration: "none" }}>
                <Box mb={10} display="block" width="100%">
                  <Flex
                    width="100%"
                    align="flex-start"
                    justifyContent="space-between"
                    flexDirection={["column", "row"]}
                  >
                    <Flex
                      flexDirection="column"
                      align="flex-start"
                      justifyContent="start"
                      width="100%"
                    >
                      <Heading size="md" as="h3" mb={1} fontWeight="medium">
                        {post.title}
                      </Heading>
                    </Flex>
                    {post.date && (
                      <Text
                        color="gray.500"
                        minWidth="105px"
                        textAlign={["left", "right"]}
                        mb={[4, 0]}
                      >
                        {format(parseISO(post.date), "P", { locale: enGB })}
                      </Text>
                    )}
                  </Flex>
                  {/* <Text color={secondaryTextColor[colorMode]}>Hoi</Text> */}
                </Box>
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("posts");

  return { props: { posts } };
}
