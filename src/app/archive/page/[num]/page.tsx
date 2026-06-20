import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import Pagination from "@/components/Pagination";
import {
  getAllPostsMeta,
  getPaginatedPosts,
  POSTS_PER_PAGE,
} from "@/lib/mdx";

export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await getAllPostsMeta("posts");
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    num: String(i + 2),
  }));
}

const parsePage = (raw: string): number | null => {
  if (!/^\d+$/.test(raw)) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ num: string }>;
}): Promise<Metadata> {
  const { num } = await params;
  const page = parsePage(num);
  if (page === null) return {};
  return {
    title: `Archive — page ${page}`,
    description: `All posts by Dave Roverts, page ${page}.`,
    alternates: { canonical: `/archive/page/${page}` },
  };
}

export default async function ArchivePagedPage({
  params,
}: {
  params: Promise<{ num: string }>;
}) {
  const { num } = await params;
  const requested = parsePage(num);
  if (requested === null) notFound();
  if (requested === 1) redirect("/archive");

  const all = await getAllPostsMeta("posts");
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  if (requested < 1 || requested > totalPages) notFound();

  const { posts, page } = await getPaginatedPosts(requested);

  const prevHref = page === 2 ? "/archive" : `/archive/page/${page - 1}`;
  const nextHref = `/archive/page/${page + 1}`;

  return (
    <Layout title="Archive" subtitle={`Page ${page} of ${totalPages}`}>
      <link rel="prev" href={prevHref} />
      {page < totalPages && <link rel="next" href={nextHref} />}
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
