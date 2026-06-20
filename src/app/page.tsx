import type { Metadata } from "next";
import Link from "next/link";

import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { getAge } from "@/lib/age";
import { getLatestPosts } from "@/lib/mdx";

const LATEST_COUNT = 6;

export const metadata: Metadata = {
  // `title.template` from the root layout only applies to child segments, and
  // this page shares the root segment — so set the full title explicitly.
  title: { absolute: "Home | FS Dave Roverts ✈️" },
};

export default async function Home() {
  const posts = await getLatestPosts(LATEST_COUNT);

  const layoutTitle = (
    <>
      Hello there!{" "}
      <span className="font-medium" aria-hidden>
        👋
      </span>
    </>
  );
  const subTitle = (
    <>
      I&apos;m Dave Roverts, {getAge()} years old and from the Netherlands{" "}
      <span className="font-medium" aria-hidden>
        🇳🇱
      </span>
      . Web developer{" "}
      <span className="font-medium" aria-hidden>
        🖥
      </span>{" "}
      by day, and flight simmer{" "}
      <span className="font-medium" aria-hidden>
        ✈️
      </span>{" "}
      in the evening.
    </>
  );

  return (
    <Layout title={layoutTitle} subtitle={subTitle}>
      <div className="py-5">
        <h3 className="text-2xl font-bold">Latest posts</h3>
        <PostList posts={posts} />
        <div className="flex justify-center py-5">
          <Link
            href="/archive"
            className="px-5 py-3 text-lg font-medium border-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            See all posts →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
