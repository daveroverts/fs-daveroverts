import Emoji from "a11y-react-emoji";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { VatsimStatusIndicator } from "./VatsimStatusIndicator";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

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
      label: "Youtube",
      href: "https://youtube.com/daveroverts",
    }
  ];

  return (
    <div className="px-4 py-8 border-b-2">
      <div className="flex justify-between">
        <div>
          <h1 className="pb-4 text-4xl font-bold dark:text-white">
            FS Dave Roverts <Emoji className="font-medium" symbol="✈️" />
          </h1>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between space-x-5 space-y-5 md:space-y-0 md:flex-row">
        <div className="space-x-5">
          {NAV_ITEMS_LEFT.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-2 rounded-md ${router.pathname === item.href ? 'bg-gray-200 dark:bg-gray-700 dark:text-white' : 'hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}`}>
              {item.label}
            </Link>
          ))}
        </div>
        <VatsimStatusIndicator />
        <div className="space-x-5">
          {NAV_ITEMS_RIGHT.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-2 rounded-md ${router.pathname === item.href ? 'bg-gray-200 dark:bg-gray-700 dark:text-white' : 'hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}