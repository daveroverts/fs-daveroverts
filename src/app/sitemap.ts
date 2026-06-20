import { MetadataRoute } from "next";
import { getAllFilesFrontMatter, getFiles } from "@/lib/mdx";

const baseUrl = "https://fs.daveroverts.nl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllFilesFrontMatter("posts");
  const pages = await getFiles("pages");

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const pageEntries: MetadataRoute.Sitemap = pages.map((filename) => ({
    url: `${baseUrl}/${filename.replace(".mdx", "")}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    ...postEntries,
    ...pageEntries,
  ];
}
