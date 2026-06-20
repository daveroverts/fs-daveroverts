import Link from "next/link";
import { slugifyTag } from "@/lib/mdx";

const CategoryBadge = ({
  category,
  className = "",
}: {
  category?: string;
  className?: string;
}) => {
  if (!category) return null;

  return (
    <Link
      href={`/category/${slugifyTag(category)}`}
      className={`inline-block px-3 py-1 text-xs font-semibold tracking-wide rounded-full border-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-800 ${className}`}
    >
      {category}
    </Link>
  );
};

export default CategoryBadge;
