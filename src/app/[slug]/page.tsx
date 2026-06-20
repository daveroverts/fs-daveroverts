import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeExternalLinks from "rehype-external-links";

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
  const pages = await getFiles("pages");
  return pages.map((p) => ({ slug: p.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let frontMatter;
  try {
    ({ frontMatter } = await getFileBySlug("pages", slug));
  } catch {
    notFound();
  }
  return {
    title: frontMatter.title,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let content, frontMatter;
  try {
    ({ content, frontMatter } = await getFileBySlug("pages", slug));
  } catch {
    notFound();
  }

  return (
    <Layout title={frontMatter.title}>
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
