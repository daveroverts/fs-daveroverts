import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";

export default function Index({ posts }) {
  return (
    <Layout>
      
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("posts");

  return { props: { posts } };
}
