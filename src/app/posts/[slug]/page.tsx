import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeExternalLinks from "rehype-external-links";
import type { Metadata } from "next";
import Layout from "@/components/Layout";
import MDXComponents from "@/components/MDXComponents";
import { getFileBySlug, getFiles } from "@/lib/mdx";

export const dynamicParams = false;

const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
    ],
  },
};

export async function generateStaticParams() {
  const posts = await getFiles("posts");
  return posts.map((p) => ({ slug: p.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontMatter } = await getFileBySlug("posts", slug);
  return {
    title: frontMatter.title,
    alternates: { canonical: `/posts/${slug}` },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { content, frontMatter } = await getFileBySlug("posts", slug);

  return (
    <Layout
      title={frontMatter.title}
      subtitle={
        frontMatter.date
          ? format(parseISO(frontMatter.date), "P", { locale: enGB })
          : undefined
      }
    >
      <div>
        {frontMatter.description && (
          <p className="py-5">{frontMatter.description}</p>
        )}
        <article className="prose lg:prose-xl dark:prose-invert">
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={mdxOptions}
          />
        </article>
      </div>
    </Layout>
  );
}
