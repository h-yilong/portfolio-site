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
  // {
  //   name: "About",
  //   href: "/#about",
  // },
  // {
  //   name: "Contact",
  //   href: "/#contact",
  // },
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
  <ul className="flex flex-col gap-1">
    {navLinks.map((item) => (
      <li key={item.href} className="w-full">
        <Link
          href={item.href}
          className="block w-full p-2 text-lg font-semibold transition-colors hover:text-indigo-500 md:text-base"
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
          <MenuButton
            aria-label="Toggle menu"
            data-test="menu-button"
            // className="sm:hidden"
            isOpen={isOpen}
            toggle={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      <div
        className={cn(
          `fixed top-16 right-6 rounded-lg border border-white/50 bg-[#223a] backdrop-blur-sm transition-all duration-200 ease-out`,
          isOpen
            ? "z-50 translate-y-0 rotate-0 opacity-100"
            : "pointer-events-none -z-50 translate-y-8 rotate-2 opacity-0",
        )}
      >
        <nav className="p-4">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
