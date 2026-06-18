import Emoji from "a11y-react-emoji";
import type { Metadata } from "next";
import BlogPost from "@/components/BlogPost";
import Layout from "@/components/Layout";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export const metadata: Metadata = {
  // `title.template` from the root layout only applies to child segments, and
  // this page shares the root segment — so set the full title explicitly.
  title: { absolute: "Home | FS Dave Roverts ✈️" },
};

export default async function Home() {
  const posts = await getAllFilesFrontMatter("posts");

  const layoutTitle = (
    <>
      Hello there! <Emoji className="font-medium" symbol="👋" />
    </>
  );
  const subTitle = (
    <>
      I&apos;m Dave Roverts, 29 years old and from the Netherlands{" "}
      <Emoji className="font-medium" symbol="🇳🇱" />. Web developer{" "}
      <Emoji className="font-medium" symbol="🖥" /> by day, and flight simmer{" "}
      <Emoji className="font-medium" symbol="✈️" /> in the evening.
    </>
  );

  return (
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
  );
}
