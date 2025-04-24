/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps } from "next";
import Emoji from "a11y-react-emoji";
import { NextSeo } from "next-seo";
import BlogPost from "../components/BlogPost";
import Layout from "../components/Layout";
import { getAllFilesFrontMatter } from "../lib/mdx";

interface Post {
  slug: string;
  [key: string]: any;
}

interface IndexProps {
  posts: Post[];
}

export default function Index({ posts }: IndexProps) {
  const title = "Home";
  const layoutTitle = (
    <>
      Hello there! <Emoji className="font-medium" symbol="👋" />
    </>
  );
  const subTitle = (
    <>
      I&apos;m Dave Roverts, 28 years old and from the Netherlands{" "}
      <Emoji className="font-medium" symbol="🇳🇱" />. Web developer{" "}
      <Emoji className="font-medium" symbol="🖥" /> by day, and flight simmer{" "}
      <Emoji className="font-medium" symbol="✈️" /> in the evening.
    </>
  );
  return (
    <>
      <NextSeo title={title} />
      <Layout title={layoutTitle} subtitle={subTitle}>
        <div className="py-5">
          <h3 className="text-2xl font-bold">Latest posts</h3>
          <div className="grid space-x-2 lg:grid-cols-2">
            {posts.map((item) => (
              <div className="py-5" key={item.slug}>
                <BlogPost post={item} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter("posts");
  return { props: { posts } };
};
