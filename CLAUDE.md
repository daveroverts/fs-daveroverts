# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start dev server with Turbopack
npm run dev:watch    # dev server + hot-reload when files in data/posts/ change
npm run build        # production build
npm run lint         # ESLint
```

No test suite is configured.

## Architecture

Personal flight simulator blog — Next.js **Pages Router** (not App Router), React 19, TypeScript, Tailwind CSS v4, MDX for all content.

### Content system

All content lives in `data/`:

- `data/posts/*.mdx` — blog posts (sorted by `date` frontmatter field, newest first)
- `data/pages/*.mdx` — standalone pages

`src/lib/mdx.ts` provides three helpers used by `getStaticProps`/`getStaticPaths`:

- `getFiles(type)` — lists files in `data/<type>/`
- `getFileBySlug(type, slug)` — reads one MDX file, serialises it via `next-mdx-remote`, and runs `rehype-external-links`
- `getAllFilesFrontMatter(type)` — reads all frontmatter and, if a `banner` field is present, generates a blur placeholder via `plaiceholder`

### Pages

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/pages/index.tsx` | lists all posts |
| `/posts/[slug]` | `src/pages/posts/[slug].tsx` | blog post detail |
| `/[slug]` | `src/pages/[slug].tsx` | generic MDX page (from `data/pages/`) |
| `/about` | `src/pages/about.tsx` | static page |
| `/api/vatsim/online/[cid]` | `src/pages/api/vatsim/online/[cid].ts` | proxies VATSIM data feed |

### Key components

- `Layout` — wraps every page; accepts `title` and optional `subtitle` as `ReactNode`
- `MDXComponents` — registered in `_app.tsx` via `MDXProvider`; exposes a `<Youtube>` shortcode (uses `react-lite-youtube-embed` with `noCookie`)
- `VatsimStatusIndicator` — polls `/api/vatsim/online/<cid>` with SWR; shows controller/pilot/offline state
- `ThemeSwitcher` — toggles light/dark via `next-themes` (stores preference under key `nightwind-mode`)

### Path aliases

`@/*` → `./src/*` and `@/public/*` → `./public/*` (configured in `tsconfig.json`).

### Analytics

Fathom (`fathom-client`) — only loaded in production. Site ID is read from `NEXT_PUBLIC_FATHOM_SITE_ID`.
