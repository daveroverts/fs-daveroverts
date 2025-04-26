import type { Metadata } from "next";
import "@/styles/global.css";
import ThemeProvider from "./theme-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | FS Dave Roverts ✈️",
    default: "FS Dave Roverts ✈️",
  },
  description: "Just some random flight simulator website by Dave Roverts",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="FS DR" />
      </head>
      <body className="dark:bg-gray-900">
        <ThemeProvider attribute="class">
          <div className="container px-16 py-3 mx-auto text-black dark:text-white">
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
