import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";

export default function Index({ posts }) {
  return (
    <Layout>
      <div>
        <h3 className="text-2xl font-bold">Hello there! 👋</h3>
        <p className="font-semibold">I&apos;m Dave Roverts, 24 years old and from the Netherlands 🇳🇱. Web developer 🖥 by day, and flight simmer ✈️ in the evening.</p>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("posts");

  return { props: { posts } };
}
