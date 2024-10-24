"use client";
import { useState } from "react";
import MenuButton from "./MenuButton";
import Link from "next/link";
import { clsx } from "../lib/utils";

const navLinks = [
  {
    name: "Home",
    href: "/#home",
  },
  {
    name: "About",
    href: "/#about",
  },
  {
    name: "Contact",
    href: "/#contact",
  },
  {
    name: "Posts",
    href: "/posts",
  },
];

const NavItems = ({ onClick = () => {} }) => (
  <ul className="relative z-20 flex flex-col items-center gap-4 sm:flex-row md:gap-6">
    {navLinks.map((item) => (
      <li key={item.href} className="max-sm:hover:bg-black-500 max-sm:w-full max-sm:rounded-md max-sm:px-5">
        <Link
          href={item.href}
          className="p-2 text-lg font-semibold transition-colors hover:text-indigo-500 md:text-base"
          onClick={onClick}
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-b-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-0">
          <Link href="/">
            <svg width={36} height={36} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300">
              <path
                stroke="#5355da"
                fill="none"
                strokeLinecap="round"
                strokeWidth="18px"
                strokeDasharray="1633px"
                className="draw-logo"
                d="M86.4,82.1c9.62-13.54,15.18-19.44,20.16-13.38,4.99,6.06-7.33,44.39-9.47,62.92-2.14,18.52,3.39,39.2,25.66,29.23,22.27-9.98,67.35-79.11,68.78-90.87,1.43-11.75-27.09,128.29-47.22,157.51-20.13,29.23-37.96,29.23-49,20.31-11.05-8.91,0-28.86,6.77-36.7s41.69-44.55,66.28-52.03c24.58-7.48,54.87,9.26,54.87,38.49s-24.24,60.7-40.98,73.41c-18.53,14.06-50.61,26.01-91.94,14.26-35.64-13.89-75.9-51.67-75.9-120.8S62.69,16.89,141.27,10.12c78.22-2.85,140.93,45.61,144.32,133.28,0,87.31-49.53,125.08-83.03,139.69"
              />
            </svg>
          </Link>
          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
          <MenuButton
            aria-label="Toggle menu"
            className="sm:hidden"
            isOpen={isOpen}
            toggle={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      <div
        className={clsx(
          `overflow-hidden transition-all duration-300 ease-in-out sm:hidden`,
          isOpen ? "h-screen" : "h-0",
        )}
      >
        <nav className="py-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
