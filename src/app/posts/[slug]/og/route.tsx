import { readFile } from "node:fs/promises";
import path from "node:path";

import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getAllPostsMeta, getFileBySlug } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Only the bannerless posts reference this endpoint (see generateMetadata in
// ../page.tsx and BlogPost). Prebuild those at build time; anything else 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPostsMeta("posts");
  return posts.filter((p) => !p.banner).map((p) => ({ slug: p.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let frontMatter;
  try {
    ({ frontMatter } = await getFileBySlug("posts", slug));
  } catch {
    notFound();
  }

  const logo = await readFile(path.join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const fontDir = path.join(process.cwd(), "assets/og-fonts");
  const [groteskBold, groteskSemiBold, interRegular, interSemiBold] =
    await Promise.all([
      readFile(path.join(fontDir, "SpaceGrotesk-Bold.woff")),
      readFile(path.join(fontDir, "SpaceGrotesk-SemiBold.woff")),
      readFile(path.join(fontDir, "Inter-Regular.woff")),
      readFile(path.join(fontDir, "Inter-SemiBold.woff")),
    ]);

  const dateLabel = frontMatter.date
    ? format(parseISO(frontMatter.date), "d MMM yyyy", { locale: enGB })
    : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        color: "white",
        background:
          "linear-gradient(135deg, #0c4a6e 0%, #0369a1 55%, #0ea5e9 100%)",
      }}
    >
      <div style={{ display: "flex" }}>
        {frontMatter.category ? (
          <div
            style={{
              display: "flex",
              padding: "8px 24px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.92)",
              color: "#0c4a6e",
              fontFamily: "Space Grotesk",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {frontMatter.category}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Space Grotesk",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -1,
        }}
      >
        {frontMatter.title ?? ""}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontSize: 32,
            opacity: 0.85,
          }}
        >
          {dateLabel}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={56} height={56} alt="" />
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            FS Dave Roverts
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: groteskBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Space Grotesk",
          data: groteskSemiBold,
          weight: 600,
          style: "normal",
        },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
