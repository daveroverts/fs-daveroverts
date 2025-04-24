/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs/promises";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";
import rehypeExternalLinks from "rehype-external-links";

const root = process.cwd();

export async function getFiles(type: string): Promise<string[]> {
  return await fs.readdir(path.join(root, "data", type));
}

export async function getFileBySlug(type: string, slug: string) {
  const source = slug
    ? await fs.readFile(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : await fs.readFile(path.join(root, "data", `${type}.mdx`), "utf8");

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        ],
      ],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      slug: slug || null,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter(type: string) {
  const files = await fs.readdir(path.join(root, "data", type));
  type Post = {
    slug: string;
    banner?: string;
    base64?: string;
    img?: {
      src: string;
      height: number;
      width: number;
    };
    // Frontmatter properties
    [key: string]: any; // To allow other frontMatter properties
  };

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
  ).sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

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
