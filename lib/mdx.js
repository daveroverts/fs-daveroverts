import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import rehypeExternalLinks from "rehype-external-links";

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf8");

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

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, "data", type));
  const sortedFiles = files
    .reduce((allPosts, postSlug) => {
      const source = fs.readFileSync(
        path.join(root, "data", type, postSlug),
        "utf8"
      );
      const { data } = matter(source);

      return [
        {
          ...data,
          slug: postSlug.replace(".mdx", ""),
        },
        ...allPosts,
      ];
    }, [])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return await Promise.all(
    sortedFiles.map(async (post) => {
      if (!post.banner) {
        return post;
      }

      const { base64, img } = await getPlaiceholder(post.banner);
      post.base64 = base64;
      post.img = img;
      return post;
    })
  );
}
