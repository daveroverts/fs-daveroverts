import type { TocItem } from "@/lib/mdx";

// Inline "Contents" box rendered above a post body. Anchors point at the
// heading ids that rehype-slug generates. Nested headings are indented
// relative to the shallowest level present so posts that use only h3
// (rather than h2) still render as a flat list.
const TableOfContents = ({ items }: { items: TocItem[] }) => {
  if (items.length < 2) return null;

  const minLevel = Math.min(...items.map((item) => item.level));

  return (
    <nav
      aria-label="Table of contents"
      className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
    >
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Contents
      </h2>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li
            key={item.slug}
            style={{ marginInlineStart: `${(item.level - minLevel) * 1}rem` }}
          >
            <a
              href={`#${item.slug}`}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
