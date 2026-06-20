import Link from "next/link";

interface PaginationProps {
  current: number;
  total: number;
  basePath: string;
  position?: "top" | "bottom";
}

const buildHref = (basePath: string, page: number): string => {
  if (page === 1) return basePath;
  return `${basePath}/page/${page}`;
};

const Pagination = ({
  current,
  total,
  basePath,
  position = "bottom",
}: PaginationProps) => {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const hasPrev = current > 1;
  const hasNext = current < total;

  const linkClass =
    "px-3 py-2 rounded border-2 hover:bg-gray-50 dark:hover:bg-gray-800";
  const activeClass = "px-3 py-2 rounded border-2 bg-gray-100 dark:bg-gray-800";
  const disabledClass = "px-3 py-2 rounded border-2 opacity-40 cursor-default";

  return (
    <nav
      aria-label={position === "top" ? "Pagination (top)" : "Pagination"}
      className="flex justify-center py-8"
    >
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          {hasPrev ? (
            <Link
              href={buildHref(basePath, current - 1)}
              rel="prev"
              className={linkClass}
            >
              ← Previous
            </Link>
          ) : (
            <span className={disabledClass} aria-disabled>
              ← Previous
            </span>
          )}
        </li>
        {pages.map((p) => (
          <li key={p}>
            {p === current ? (
              <span className={activeClass} aria-current="page">
                {p}
              </span>
            ) : (
              <Link href={buildHref(basePath, p)} className={linkClass}>
                {p}
              </Link>
            )}
          </li>
        ))}
        <li>
          {hasNext ? (
            <Link
              href={buildHref(basePath, current + 1)}
              rel="next"
              className={linkClass}
            >
              Next →
            </Link>
          ) : (
            <span className={disabledClass} aria-disabled>
              Next →
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
