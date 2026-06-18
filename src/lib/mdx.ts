import fs from "node:fs/promises";
import matter from "gray-matter";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";

const root = process.cwd();

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

export async function getAllFilesFrontMatter(type: string): Promise<Post[]> {
  const files = await fs.readdir(path.join(root, "data", type));

  const sortedFiles = (
    await Promise.all(
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
    )
  ).sort(
    (a, b) => Number(new Date(b.date ?? 0)) - Number(new Date(a.date ?? 0))
  );

  return await Promise.all(
    sortedFiles.map(async (post) => {
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
