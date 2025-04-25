import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@/styles/global.css";
import { AppNavbar } from "@/components/AppNavbar";

export const metadata: Metadata = {
  title: "FS Dave Roverts ✈️",
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
            <AppNavbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
