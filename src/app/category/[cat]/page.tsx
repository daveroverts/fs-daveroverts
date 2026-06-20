import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { getAllCategories, getPostsByCategorySlug } from "@/lib/mdx";

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ cat: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const result = await getPostsByCategorySlug(cat);
  if (!result) return {};
  return {
    title: `${result.category} posts`,
    description: `All ${result.category} posts by Dave Roverts.`,
    alternates: { canonical: `/category/${cat}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const result = await getPostsByCategorySlug(cat);
  if (!result) notFound();

  return (
    <Layout
      title={`Category: ${result.category}`}
      subtitle={`${result.posts.length} ${
        result.posts.length === 1 ? "post" : "posts"
      }`}
    >
      <div className="py-5">
        <PostList posts={result.posts} />
      </div>
    </Layout>
  );
}
