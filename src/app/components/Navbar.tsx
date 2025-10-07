"use client";
import { useState } from "react";
import MenuButton from "./MenuButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    name: "Home",
    href: "/",
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
    href: "/posts/design/3d",
  },
  {
    name: "Playground",
    href: "/playground",
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
    <header className="fixed top-0 right-0 left-0 z-100 print:hidden">
      <div className="px-6">
        <div className="flex w-full items-center justify-between py-3">
          <Link aria-label="homepage" href="/" onClick={closeMenu}>
            <img src="/assets/images/yh-logo.svg" loading="eager" alt="logo" className="h-12 w-12" />
          </Link>
          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
          <MenuButton
            aria-label="Toggle menu"
            data-test="menu-button"
            className="sm:hidden"
            isOpen={isOpen}
            toggle={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      <div
        className={cn(`overflow-hidden transition-all duration-300 ease-in-out sm:hidden`, isOpen ? "h-screen" : "h-0")}
      >
        <nav className="py-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
