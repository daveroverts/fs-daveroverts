import { MetadataRoute } from "next";

import {
  getAllCategories,
  getAllPostsMeta,
  getAllTags,
  getFiles,
  POSTS_PER_PAGE,
} from "@/lib/mdx";

const baseUrl = "https://fs.daveroverts.nl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsMeta("posts");
  const pages = await getFiles("pages");
  const tags = await getAllTags();
  const categories = await getAllCategories();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const pageEntries: MetadataRoute.Sitemap = pages.map((filename) => ({
    url: `${baseUrl}/${filename.replace(".mdx", "")}`,
    lastModified: new Date(),
  }));

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const archiveEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/archive`, lastModified: new Date() },
    ...Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      url: `${baseUrl}/archive/page/${i + 2}`,
      lastModified: new Date(),
    })),
  ];

  const tagEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/tags`, lastModified: new Date() },
    ...tags.map((t) => ({
      url: `${baseUrl}/tags/${t.slug}`,
      lastModified: new Date(),
    })),
  ];

  const categoryEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/category`, lastModified: new Date() },
    ...categories.map((c) => ({
      url: `${baseUrl}/category/${c.slug}`,
      lastModified: new Date(),
    })),
  ];

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    ...archiveEntries,
    ...categoryEntries,
    ...tagEntries,
    ...postEntries,
    ...pageEntries,
  ];
}
