import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const toggle = () => {
    setTheme(resolvedTheme !== "dark" ? "dark" : "light");
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Toggle theme"
        className="flex items-center justify-between p-3 text-xl font-bold rounded-md hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white cursor-pointer"
        onClick={toggle}
        title={`Switch to ${resolvedTheme !== "dark" ? "dark" : "light"} theme`}
      >
        {resolvedTheme !== "dark" ? (
          <MoonIcon className="w-5 h-5" />
        ) : (
          <SunIcon className="w-5 h-5" />
        )}
      </button>
    </>
  );
};
