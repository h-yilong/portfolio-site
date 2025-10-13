"use client";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

const FACTOR = 1.3;
const timingFunction = (t: number): number => Math.round(FACTOR * (t ** 1.5 / 5 + 0.1) * 1000);

export default function PostTitle({
  children,
  className,
  animate = false,
}: {
  children: string;
  className?: string;
  animate?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  const [items, timing] = useMemo(() => {
    const _items = children.split("");
    const { length } = _items;
    const _paramLength = Math.ceil(length / 2);
    const _params = Array.from({ length: _paramLength }, (_, i) => 0.1 + i * ((1 - 0.1) / (_paramLength - 1)));
    let _timing: number[] = [];

    if (length % 2) {
      _timing = _items.map((_, i) => timingFunction(_params[Math.abs(i - _paramLength + 1)]));
    } else {
      const _timing1 = _params.map((_, i) => timingFunction(_params[Math.abs(_paramLength - i)]));
      const _timing2 = [..._timing1].reverse();
      _timing = _timing1.concat(_timing2);
    }

    return [_items, _timing];
  }, [children]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // show original text for SSR
  if (!mounted) return <h4>{children}</h4>;

  return (
    <h4 className={cn("flex h-[1.2em] items-center overflow-hidden", className)}>
      <ArrowRightIcon className="mr-[0.2em] size-[1em] -translate-x-3 stroke-3 opacity-0 duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
      <div className="flex w-fit -translate-x-[1.2em] transition-transform duration-300 ease-out group-hover:translate-x-0">
        {items.map((letter, i) => (
          <div
            key={i}
            className={cn(
              "flex h-[1.2em] -translate-y-[400%] flex-col leading-[1.2] font-bold",
              letter === " " && "w-[0.5em]",
              animate ? "slide-down-title" : "",
            )}
            style={{
              animationDuration: `${timing[i]}ms`,
              // animationDelay: `${Math.abs(i - 9) * 10}ms`,
            }}
          >
            <div>{letter}</div>
            <div>{letter}</div>
            <div>{letter}</div>
            <div>{letter}</div>
          </div>
        ))}
      </div>
    </h4>
  );
}
