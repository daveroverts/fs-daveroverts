<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

This project is on the **App Router** (`src/app/`). Do not introduce Pages Router (`getStaticProps`/`getStaticPaths`/`next-seo`) patterns.

<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev          # start dev server with Turbopack
npm run build        # production build
npm run lint         # ESLint
```

No test suite is configured.

## Architecture

Personal flight simulator blog — Next.js **App Router** (`src/app/`), React 19, TypeScript (strict), Tailwind CSS v4, MDX for all content.

### Content system

All content lives in `data/`:

- `data/posts/*.mdx` — blog posts (sorted by `date` frontmatter field, newest first)
- `data/pages/*.mdx` — standalone pages

`src/lib/mdx.ts` provides helpers used by `generateStaticParams` and the
server-component page bodies (it also exports the shared `FrontMatter`/`Post` types and the `POSTS_PER_PAGE` constant):

- `getFiles(type)` — lists files in `data/<type>/`
- `getFileBySlug(type, slug)` — reads one MDX file, returns its raw `content` and `frontMatter` (the page renders it with `<MDXRemote>` from `next-mdx-remote/rsc`, applying `rehype-external-links`)
- `getAllPostsMeta(type)` — reads and sorts all frontmatter (no blur placeholder; cheap, use for sitemap or counting)
- `getLatestPosts(count)` — sorted slice of the newest N posts, with blur placeholders applied
- `getPaginatedPosts(page)` — returns `{ posts, page, totalPages, totalPosts }` for the given 1-indexed page, with blur placeholders applied to the slice

### Pages

| Route                      | File                                       | Notes                                                       |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------- |
| `/`                        | `src/app/page.tsx`                         | hero + latest 5 posts + link to `/archive`                  |
| `/archive`                 | `src/app/archive/page.tsx`                 | paginated post list, page 1                                 |
| `/archive/page/[num]`      | `src/app/archive/page/[num]/page.tsx`      | paginated post list, pages 2..N (`POSTS_PER_PAGE` per page) |
| `/posts/[slug]`            | `src/app/posts/[slug]/page.tsx`            | blog post detail                                            |
| `/[slug]`                  | `src/app/[slug]/page.tsx`                  | generic MDX page (from `data/pages/`)                       |
| `/about`                   | `src/app/about/page.tsx`                   | static page                                                 |
| `/api/vatsim/online/[cid]` | `src/app/api/vatsim/online/[cid]/route.ts` | proxies VATSIM data feed                                    |

Root layout (`src/app/layout.tsx`) holds the `<html>`/`<body>`, global styles,
favicons, and the site-wide Metadata (replacing `next-seo`); per-page SEO uses
the Metadata API (`metadata` export or `generateMetadata`). Client-only context
(`next-themes`, analytics) lives in `src/app/providers.tsx`.

### Key components

- `Layout` — wraps every page; accepts `title` and optional `subtitle` as `ReactNode`
- `PostList` — grid of `BlogPost` cards; used on home and archive routes
- `Pagination` — prev/next + numbered links; accepts `current`, `total`, `basePath`. Renders nothing for single-page case
- `MDXComponents` — passed as the `components` prop to `<MDXRemote>` in the post/page server components; exposes a `<Youtube>` shortcode (uses `react-lite-youtube-embed`)
- `VatsimStatusIndicator` — polls `/api/vatsim/online/<cid>` with SWR; shows controller/pilot/offline state
- `ThemeSwitcher` — toggles light/dark via `next-themes` (stores preference under key `nightwind-mode`)

### Path aliases

`@/*` → `./src/*` and `@/public/*` → `./public/*` (configured in `tsconfig.json`).

### Analytics

Fathom (`fathom-client`) — only loaded in production. Site ID is read from `NEXT_PUBLIC_FATHOM_SITE_ID`. Pageviews are tracked from `src/lib/analytics.tsx` (a client component mounted in `providers.tsx`) on `usePathname()` changes.
