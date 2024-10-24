import { type ButtonHTMLAttributes } from "react";
import { clsx } from "@/app/lib/utils";

export type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen: boolean;
  toggle: () => void;
};

const divCls = "h-[2px] w-full rounded-full bg-white";

export default function MenuButton({ isOpen, toggle, className, ...rest }: MenuButtonProps) {
  return (
    <button
      {...rest}
      onClick={toggle}
      className={clsx("relative flex h-6 w-6 flex-col justify-between py-1", className || "")}
    >
      <div className={clsx(divCls, "transition-opacity", isOpen ? "opacity-0" : "opacity-100")} />
      <div className={clsx(divCls, "absolute top-[11px] transition-transform", isOpen ? "rotate-45" : "rotate-0")} />
      <div className={clsx(divCls, "absolute top-[11px] transition-transform", isOpen ? "-rotate-45" : "rotate-0")} />
      <div className={clsx(divCls, "transition-opacity", isOpen ? "opacity-0" : "opacity-100")} />
    </button>
  );
}
