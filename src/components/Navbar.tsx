"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { VatsimStatusIndicator } from "./VatsimStatusIndicator";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS_LEFT: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Specs", href: "/specs" },
];

const NAV_ITEMS_RIGHT: NavItem[] = [
  { label: "Youtube", href: "https://youtube.com/daveroverts" },
];

function navLinkClass(active: boolean): string {
  return `px-3 py-2 rounded-md ${
    active
      ? "bg-gray-200 dark:bg-gray-700 dark:text-white"
      : "hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
  }`;
}

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function isActive(pathname: string, href: string): boolean {
  if (isExternal(href)) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="px-4 py-8 border-b-2">
      <div className="flex justify-between">
        <div>
          <h1 className="flex flex-row items-center justify-center pb-4 space-x-2 text-4xl font-bold dark:text-white">
            <div className="bg-transparent">
              <Image
                src={logo}
                alt="FS Dave Roverts Logo"
                width={75}
                height={75}
                className="w-auto h-10 transition-all duration-300 dark:invert"
                priority
              />
            </div>
            <div>FS Dave Roverts</div>
            <div>
              <span className="font-medium" aria-hidden>
                ✈️
              </span>
            </div>
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between space-x-5 space-y-5 md:space-y-0 md:flex-row">
        <div className="flex flex-row space-x-5">
          {NAV_ITEMS_LEFT.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={navLinkClass(isActive(pathname, item.href))}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <VatsimStatusIndicator />
        <div className="flex flex-row space-x-5">
          {NAV_ITEMS_RIGHT.map((item) => {
            const external = isExternal(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={navLinkClass(isActive(pathname, item.href))}
                {...(external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {item.label}
              </Link>
            );
          })}

          <div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};
