import type { Metadata } from "next";
import Link from "next/link";

import Layout from "@/components/Layout";
import { getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by tag — flight simming, dev, and more.",
  alternates: { canonical: "/tags" },
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <Layout title="Tags" subtitle="Browse posts by topic.">
      <div className="py-5">
        {tags.length === 0 ? (
          <p>No tags yet.</p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {tags.map(({ tag, slug, count }) => (
              <li key={slug}>
                <Link
                  href={`/tags/${slug}`}
                  className="inline-block px-4 py-2 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {tag} <span className="opacity-70">({count})</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
