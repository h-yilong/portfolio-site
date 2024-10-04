import type { ButtonHTMLAttributes } from "react";

// todo: extend Button props
export default function Button({ children, type = "button" }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className="btn mt-16 w-fit rounded-3xl bg-gradient-to-br from-white/10 to-white/5 px-6 py-4 font-semibold hover:bg-white/5"
    >
      <span className="relative mr-3 inline-flex h-3 w-3">
        <span className="btn-ping" />
        <span className="btn-ping_dot" />
      </span>
      <span className="inline-flex hover:text-white">{children}</span>
    </button>
  );
}
