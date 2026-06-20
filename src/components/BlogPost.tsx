import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

import CategoryBadge from "@/components/CategoryBadge";
import type { Post } from "@/lib/mdx";

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <article className="relative overflow-hidden flex flex-col justify-center min-h-full text-center rounded-3xl">
      {post.category && (
        <CategoryBadge
          category={post.category}
          className="absolute top-3 left-3 z-10"
        />
      )}
      <Link
        href={`/posts/${post.slug}`}
        className="group hover:underline rounded-3xl"
      >
        <div
          className={`transition duration-1000 transform group-hover:scale-105 ${
            !post.banner
              ? "border-2 rounded-3xl py-6 group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
              : ""
          }`}
        >
          {post.banner ? (
            <div className="relative h-64 w-96 xl:w-full xl:h-96">
              <Image
                src={post.banner}
                alt={post.title ?? ""}
                className="transition duration-1000 rounded-3xl"
                placeholder="blur"
                blurDataURL={post.base64}
                fill
                sizes="(min-width: 1280px) 50vw, 384px"
              />
            </div>
          ) : (
            <>
              <h4 className="text-xl">{post.title}</h4>
              <h5 className="text-lg">
                {post.date &&
                  format(parseISO(post.date), "P", { locale: enGB })}
              </h5>
            </>
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogPost;
