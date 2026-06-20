import Link from "next/link";
import type { AdjacentPosts } from "@/lib/mdx";

const PostNav = ({ newer, older }: AdjacentPosts) => {
  if (!newer && !older) return null;

  const linkClass =
    "flex flex-col gap-1 px-4 py-3 rounded border-2 hover:bg-gray-50 dark:hover:bg-gray-800 max-w-[48%]";

  return (
    <nav
      aria-label="Post navigation"
      className="flex justify-between gap-4 py-8"
    >
      {newer ? (
        <Link href={`/posts/${newer.slug}`} rel="prev" className={linkClass}>
          <span className="text-sm opacity-70">← Newer post</span>
          <span>{newer.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {older ? (
        <Link
          href={`/posts/${older.slug}`}
          rel="next"
          className={`${linkClass} text-right items-end`}
        >
          <span className="text-sm opacity-70">Older post →</span>
          <span>{older.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
};

export default PostNav;
