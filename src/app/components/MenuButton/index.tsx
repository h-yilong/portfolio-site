import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

export type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen: boolean;
  toggle: () => void;
};

const rectProps = {
  height: 3,
  rx: 3,
  ry: 3,
};

export default function MenuButton({ isOpen, toggle, className, ...rest }: MenuButtonProps) {
  return (
    <button
      {...rest}
      onClick={toggle}
      aria-label="Toggle menu"
      className={cn("focus-ring h-8 w-8 cursor-pointer", className || "")}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <svg fill="#fff" viewBox="0 0 48 48">
        <rect
          x="1"
          y="22.5"
          width="46"
          {...rectProps}
          className={cn(
            "origin-center transition-all duration-300",
            isOpen ? "-rotate-45 opacity-100" : "rotate-0 opacity-0",
          )}
        />
        <rect
          x="1"
          y="22.5"
          width="46"
          {...rectProps}
          className={cn(
            "origin-center transition-all duration-300",
            isOpen ? "rotate-45 opacity-100" : "rotate-0 opacity-0",
          )}
        />

        <rect
          x="5"
          y="22.5"
          width="38"
          {...rectProps}
          className={cn("transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100")}
        />
        <rect
          x="5"
          y="9.5"
          width="38"
          {...rectProps}
          className={cn("transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100")}
        />
        <rect
          x="5"
          y="35.5"
          width="38"
          {...rectProps}
          className={cn("transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100")}
        />
      </svg>
    </button>
  );
}
