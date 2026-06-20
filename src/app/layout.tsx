import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "@/styles/global.css";

const url = "https://fs.daveroverts.nl";
const title = "FS Dave Roverts ✈️";
const description = "Just some random flight simulator website by Dave Roverts";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url,
    title,
    description,
    images: [
      {
        url: "/images/android-chrome-512x512.png",
        alt: title,
      },
    ],
  },
  manifest: "/site.webmanifest?v=2",
  appleWebApp: {
    title: "FS DR",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png?v=2", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
