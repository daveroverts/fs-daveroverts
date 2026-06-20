"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { Analytics } from "@/lib/analytics";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="nightwind-mode"
      defaultTheme="system"
    >
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
