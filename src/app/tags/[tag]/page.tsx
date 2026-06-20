import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { getAllTags, getPostsByTagSlug } from "@/lib/mdx";

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const result = await getPostsByTagSlug(tag);
  if (!result) return {};
  return {
    title: `Posts tagged “${result.tag}”`,
    description: `All posts tagged ${result.tag} by Dave Roverts.`,
    alternates: { canonical: `/tags/${tag}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const result = await getPostsByTagSlug(tag);
  if (!result) notFound();

  return (
    <Layout
      title={`Tagged: ${result.tag}`}
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
