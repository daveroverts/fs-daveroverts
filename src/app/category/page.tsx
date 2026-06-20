import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllCategories } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse posts by type — timelapses, tutorials, and more.",
  alternates: { canonical: "/category" },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <Layout title="Categories" subtitle="Browse posts by type.">
      <div className="py-5">
        {categories.length === 0 ? (
          <p>No categories yet.</p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {categories.map(({ category, slug, count }) => (
              <li key={slug}>
                <Link
                  href={`/category/${slug}`}
                  className="inline-block px-4 py-2 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {category} <span className="opacity-70">({count})</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
