import { getAllPostsMeta } from "@/lib/mdx";

export const dynamic = "force-static";

const baseUrl = "https://fs.daveroverts.nl";
const title = "FS Dave Roverts ✈️";
const description = "Flight simming, dev, and more by Dave Roverts.";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET(): Promise<Response> {
  const posts = await getAllPostsMeta("posts");

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/posts/${post.slug}`;
      const summary = post.description ?? post.title ?? "";
      const pubDate = post.date
        ? new Date(post.date).toUTCString()
        : undefined;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title ?? "")}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : "",
        post.category
          ? `      <category>${escapeXml(post.category)}</category>`
          : "",
        `      <description>${escapeXml(summary)}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(description)}</description>
    <language>en-gb</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
