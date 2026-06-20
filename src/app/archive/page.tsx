import type { Metadata } from "next";
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Archive",
  description: "All posts by Dave Roverts — flight simming, dev, and more.",
  alternates: { canonical: "/archive" },
};

export default async function ArchivePage() {
  const { posts, page, totalPages } = await getPaginatedPosts(1);

  return (
    <Layout title="Archive" subtitle="All posts, newest first.">
      {totalPages > 1 && page < totalPages && (
        <link rel="next" href="/archive/page/2" />
      )}
      <div className="py-5">
        <Pagination
          current={page}
          total={totalPages}
          basePath="/archive"
          position="top"
        />
        <PostList posts={posts} />
        <Pagination current={page} total={totalPages} basePath="/archive" />
      </div>
    </Layout>
  );
}
