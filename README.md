# FS Dave Roverts

## Project overview

FS Dave Roverts is a small personal website about flight simulation. Posts and static pages are written in MDX and served using Next.js and TypeScript. The site includes a handful of React components and is styled with Tailwind CSS.

The live version is available at [https://fs.daveroverts.nl](https://fs.daveroverts.nl) and is deployed automatically via Vercel.

## How to run locally

```bash
npm install
npm run dev
```

Use `npm run build` followed by `npm start` to create and serve a production build.

## Folder structure

- **data/** – MDX files for pages and blog posts
- **src/pages/** – Next.js route files
- **src/components/** – shared React components used across the site
- **public/** – static assets such as icons and images

## Deployment

This project is configured for Vercel. Pushing to the main branch triggers an automatic deployment to the domain mentioned above. You can also run `npm run build` locally to generate an optimized build.
