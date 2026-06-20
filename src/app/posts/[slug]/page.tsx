import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeExternalLinks from "rehype-external-links";
import type { Metadata } from "next";
import Layout from "@/components/Layout";
import MDXComponents from "@/components/MDXComponents";
import PostNav from "@/components/PostNav";
import TagList from "@/components/TagList";
import { notFound } from "next/navigation";
import { getAdjacentPosts, getFileBySlug, getFiles } from "@/lib/mdx";

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
  let frontMatter;
  try {
    ({ frontMatter } = await getFileBySlug("posts", slug));
  } catch {
    notFound();
  }
  const images = frontMatter.banner
    ? [{ url: frontMatter.banner, alt: frontMatter.title }]
    : [];
  return {
    title: frontMatter.title,
    description: frontMatter.description,
    alternates: { canonical: `/posts/${slug}` },
    openGraph: {
      type: "article",
      title: frontMatter.title,
      description: frontMatter.description,
      publishedTime: frontMatter.date,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.description,
      images,
    },
  };
}

const baseUrl = "https://fs.daveroverts.nl";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let content, frontMatter;
  try {
    ({ content, frontMatter } = await getFileBySlug("posts", slug));
  } catch {
    notFound();
  }

  const adjacent = await getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontMatter.title,
    description: frontMatter.description,
    datePublished: frontMatter.date,
    url: `${baseUrl}/posts/${slug}`,
    ...(frontMatter.banner && {
      image: `${baseUrl}${frontMatter.banner}`,
    }),
    author: {
      "@type": "Person",
      name: "Dave Roverts",
    },
  };

  return (
    <Layout
      title={frontMatter.title}
      subtitle={
        frontMatter.date
          ? format(parseISO(frontMatter.date), "P", { locale: enGB })
          : undefined
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        {frontMatter.tags && frontMatter.tags.length > 0 && (
          <div className="py-5">
            <TagList tags={frontMatter.tags} />
          </div>
        )}
        <PostNav newer={adjacent.newer} older={adjacent.older} />
      </div>
    </Layout>
  );
}
