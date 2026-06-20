import fs from "node:fs/promises";
import matter from "gray-matter";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";

const root = process.cwd();

export const POSTS_PER_PAGE = 12;

export interface FrontMatter {
  slug?: string | null;
  title?: string;
  date?: string;
  description?: string;
  banner?: string;
  category?: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface Post extends FrontMatter {
  slug: string;
  base64?: string;
  img?: {
    src: string;
    height: number;
    width: number;
  };
}

export async function getFiles(type: string): Promise<string[]> {
  return await fs.readdir(path.join(root, "data", type));
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<{ content: string; frontMatter: FrontMatter }> {
  const source = slug
    ? await fs.readFile(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : await fs.readFile(path.join(root, "data", `${type}.mdx`), "utf8");

  const { data, content } = matter(source);

  return {
    content,
    frontMatter: {
      slug: slug || null,
      ...data,
    },
  };
}

export async function getAllPostsMeta(type: string): Promise<Post[]> {
  const files = await fs.readdir(path.join(root, "data", type));

  const posts = await Promise.all(
    files.map(async (postSlug): Promise<Post> => {
      const source = await fs.readFile(
        path.join(root, "data", type, postSlug),
        "utf8"
      );
      const { data } = matter(source);

      return {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      };
    })
  );

  return posts.sort(
    (a, b) => Number(new Date(b.date ?? 0)) - Number(new Date(a.date ?? 0))
  );
}

async function enrichWithPlaceholders(posts: Post[]): Promise<Post[]> {
  return Promise.all(
    posts.map(async (post) => {
      if (!post.banner) {
        return post;
      }

      const buffer = await fs.readFile(path.join("./public", post.banner));
      const { metadata, base64 } = await getPlaiceholder(buffer, { size: 10 });
      post.base64 = base64;
      post.img = {
        src: post.banner,
        height: metadata.height,
        width: metadata.width,
      };
      return post;
    })
  );
}

export async function getLatestPosts(count: number): Promise<Post[]> {
  const all = await getAllPostsMeta("posts");
  return enrichWithPlaceholders(all.slice(0, count));
}

const WORDS_PER_MINUTE = 200;

// Rough word-count estimate; strips MDX/markdown noise so JSX tags,
// image/link URLs, and code fences don't inflate the count.
export function readingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/<[^>]+>/g, " ") // JSX / HTML tags
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, " ") // images and links
    .replace(/[#>*_`~-]/g, " "); // markdown punctuation
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface CategoryInfo {
  category: string;
  slug: string;
  count: number;
}

export async function getAllCategories(): Promise<CategoryInfo[]> {
  const all = await getAllPostsMeta("posts");
  const map = new Map<string, CategoryInfo>();

  for (const post of all) {
    if (!post.category) continue;
    const slug = slugifyTag(post.category);
    if (!slug) continue;
    const existing = map.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(slug, { category: post.category, slug, count: 1 });
    }
  }

  return [...map.values()].sort((a, b) => a.category.localeCompare(b.category));
}

export interface CategorizedPosts {
  category: string;
  posts: Post[];
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<CategorizedPosts | null> {
  const all = await getAllPostsMeta("posts");
  const matches = all.filter(
    (post) => post.category && slugifyTag(post.category) === categorySlug
  );
  if (matches.length === 0) return null;

  const category = matches[0].category ?? categorySlug;
  const posts = await enrichWithPlaceholders(matches);
  return { category, posts };
}

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

export async function getAllTags(): Promise<TagInfo[]> {
  const all = await getAllPostsMeta("posts");
  const map = new Map<string, TagInfo>();

  for (const post of all) {
    for (const tag of post.tags ?? []) {
      const slug = slugifyTag(tag);
      if (!slug) continue;
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { tag, slug, count: 1 });
      }
    }
  }

  return [...map.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}

export interface TaggedPosts {
  tag: string;
  posts: Post[];
}

export async function getPostsByTagSlug(
  tagSlug: string
): Promise<TaggedPosts | null> {
  const all = await getAllPostsMeta("posts");
  const matches = all.filter((post) =>
    (post.tags ?? []).some((tag) => slugifyTag(tag) === tagSlug)
  );
  if (matches.length === 0) return null;

  // Display the tag using its first-seen original casing.
  const displayTag =
    matches[0].tags?.find((tag) => slugifyTag(tag) === tagSlug) ?? tagSlug;
  const posts = await enrichWithPlaceholders(matches);
  return { tag: displayTag, posts };
}

export interface AdjacentPost {
  slug: string;
  title?: string;
}

export interface AdjacentPosts {
  newer?: AdjacentPost;
  older?: AdjacentPost;
}

export async function getAdjacentPosts(slug: string): Promise<AdjacentPosts> {
  const all = await getAllPostsMeta("posts");
  const index = all.findIndex((post) => post.slug === slug);
  if (index === -1) return {};

  const toAdjacent = (post?: Post): AdjacentPost | undefined =>
    post ? { slug: post.slug, title: post.title } : undefined;

  // Sorted newest-first: lower index = newer, higher index = older.
  return {
    newer: toAdjacent(all[index - 1]),
    older: toAdjacent(all[index + 1]),
  };
}

export interface PaginatedPosts {
  posts: Post[];
  page: number;
  totalPages: number;
  totalPosts: number;
}

export async function getPaginatedPosts(page: number): Promise<PaginatedPosts> {
  const all = await getAllPostsMeta("posts");
  const totalPosts = all.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  const slice = all.slice(start, start + POSTS_PER_PAGE);
  const posts = await enrichWithPlaceholders(slice);
  return { posts, page, totalPages, totalPosts };
}
