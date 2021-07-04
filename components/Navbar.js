import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { VatsimStatusIndicator } from "./VatsimStatusIndicator";

export const Navbar = () => {
  const NAV_ITEMS_LEFT = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Specs",
      href: "/specs",
    },
  ];


  const NAV_ITEMS_RIGHT = [
    {
      label: "Twitter",
      href: "https://twitter.com/daveroverts",
    },
    {
      label: "Youtube",
      href: "https://youtube.com/daveroverts",
    }
  ];

  return (
    <div className="px-4 py-8 border-b-2">
      <div className="flex justify-between">
        <div>
          <h1 className="pb-4 text-4xl font-bold">
            FS Dave Roverts ✈️
          </h1>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-5">
        <div className="space-x-5">
          {NAV_ITEMS_LEFT.map((item) => (
            <Link
              key={item.label}
              href={item.href}
            >
              <a className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200">{item.label}</a>
            </Link>
          ))}
        </div>
        <div className="space-x-5">
          <VatsimStatusIndicator/>
        </div>
        <div className="space-x-5">
          {NAV_ITEMS_RIGHT.map((item) => (
            <Link
              key={item.label}
              href={item.href}
            >
              <a className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200">{item.label}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}