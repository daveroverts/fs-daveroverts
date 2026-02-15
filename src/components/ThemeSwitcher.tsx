"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="flex items-center justify-between p-3 text-xl font-bold rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white cursor-pointer"
      onClick={toggle}
    >
      <MoonIcon className="w-5 h-5 dark:hidden" />
      <SunIcon className="w-5 h-5 hidden dark:block" />
    </button>
  );
};
