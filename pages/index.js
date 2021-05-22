import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import Layout from "../components/Layout";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";

export default function Index({ posts }) {
  return (
    <Layout>
      <h1>Home Page</h1>
      <p>
      <h2>Latest Posts</h2>
      <hr></hr>
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.filePath}>
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
              href={`/posts/[slug]`}
            >
              <a>
                {post.data.title}{" "}
                {post.data.date && (
                  <>
                    {" - "}{" "}
                    {format(parseISO(post.data.date), "P", { locale: enGB })}
                  </>
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export function getStaticProps() {
  const posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data,
        filePath,
      };
    })
    .sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });

  return { props: { posts } };
}
