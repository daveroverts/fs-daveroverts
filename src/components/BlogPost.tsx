import Image from "next/image";
import Link from "next/link";

import CategoryBadge from "@/components/CategoryBadge";
import type { Post } from "@/lib/mdx";

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <article className="relative overflow-hidden flex flex-col justify-center min-h-full text-center rounded-3xl">
      {/* Bannerless cards use the generated OG image, which already bakes in
          the category pill — only overlay the badge on real-banner cards. */}
      {post.category && post.banner && (
        <CategoryBadge
          category={post.category}
          className="absolute top-3 left-3 z-10"
        />
      )}
      <Link
        href={`/posts/${post.slug}`}
        className="group hover:underline rounded-3xl"
      >
        <div className="transition duration-1000 transform group-hover:scale-105">
          <div className="relative h-64 w-96 xl:w-full xl:h-96">
            <Image
              src={post.banner ?? `/posts/${post.slug}/og`}
              alt={post.title ?? ""}
              className="object-cover transition duration-1000 rounded-3xl"
              {...(post.banner
                ? { placeholder: "blur" as const, blurDataURL: post.base64 }
                : {})}
              fill
              sizes="(min-width: 1280px) 50vw, 384px"
            />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogPost;
