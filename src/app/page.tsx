import Emoji from "a11y-react-emoji";
import BlogPost from "../components/BlogPost";
import { getAllFilesFrontMatter } from "../lib/mdx";
import AppLayout from "@/components/AppLayout";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Index() {
  const posts = await getAllFilesFrontMatter("posts");

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
      <AppLayout title={layoutTitle} subtitle={subTitle}>
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
      </AppLayout>
    </>
  );
}
