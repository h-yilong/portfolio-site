import { clsx } from "@/app/lib/utils";
import { memo, type ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  ping?: boolean;
  variant?: "primary" | "secondary";
};

function Button({
  children,
  ping = false,
  type = "button",
  loading = false,
  variant = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  const color: string =
    variant === "primary"
      ? "from-indigo-700 to-indigo-800 hover:from-indigo-600 hover:to-indigo-700"
      : "from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700";

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      // tips: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible#providing_a_focus_fallback
      className={clsx(
        `btn flex w-fit items-center gap-2 rounded-3xl bg-gradient-to-br px-6 py-4 font-semibold hover:text-white focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 disabled:cursor-not-allowed`,
        color,
      )}
    >
      {ping && (
        <span className="relative inline-flex h-3 w-3">
          <span className="btn-ping" />
          <span className="btn-ping_dot" />
        </span>
      )}
      <span className="inline-flex">{children}</span>
      {loading && <img src="/assets/icons/spinner.svg" alt="loading" className="h-4 w-4" />}
    </button>
  );
}

export default memo(Button);
