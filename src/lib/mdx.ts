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
