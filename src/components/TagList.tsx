import Link from "next/link";
import { slugifyTag } from "@/lib/mdx";

const TagList = ({ tags }: { tags?: string[] }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${slugifyTag(tag)}`}
            className="inline-block px-3 py-1 text-sm rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
