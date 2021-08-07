import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import BlogPost from "../components/BlogPost";
import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";

export default function Index({ posts }) {
  const title = "Home";
  return (
    <>
      <NextSeo title={title} />
      <Layout
        title="Hello there! 👋"
        subtitle="I'm Dave Roverts, 24 years old and from the Netherlands 🇳🇱. Web developer 🖥 by day, and flight simmer ✈️ in the evening."
      >
        <div className="py-5">
          <h3 className="text-2xl font-bold">Latest posts</h3>
          <div className="grid space-x-2 lg:grid-cols-2">
            {posts.map((item, index) => (
              <div className="py-5" key={item.title}>
                <BlogPost post={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const posts = await getAllFilesFrontMatter("posts");
  return { props: { posts } };
};
