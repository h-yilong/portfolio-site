"use client";
import { type Ref, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const FACTOR = 1.2;
const timingFunction = (t: number): number => Math.round(FACTOR * (t ** 2 / 8 + 0.2) * 1_200);

export default function PostTitle({ children, className }: { children: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: [1],
    rootMargin: "0px 0px 0px 0px",
  });

  const [items, timing] = useMemo(() => {
    const _items = children.split("");
    const { length } = _items;
    const _paramLength = Math.ceil(length / 2);
    const _params = Array.from({ length: _paramLength }, (_, i) => 0.1 + i * ((1 - 0.1) / (_paramLength - 1)));

    if (length % 2) {
      const _timing = _items.map((_, i) => timingFunction(_params[Math.abs(i + 1 - _paramLength)]));
      return [_items, _timing];
    }

    const _timing = _items.map((_, i) => {
      let index = i - _paramLength;
      if (index < 0) {
        index = -index - 1;
      }
      return timingFunction(_params[index]);
    });

    return [_items, _timing];
  }, [children]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // show original text for SSR
  if (!mounted) return <h4>{children}</h4>;

  return (
    <h4
      ref={ref as Ref<HTMLHeadingElement>}
      className={cn("flex h-[1.2em] items-center overflow-hidden select-none", className)}
    >
      <ArrowRightIcon className="mr-[0.2em] size-[1em] -translate-x-3 stroke-3 opacity-0 duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
      <div className="flex w-fit -translate-x-[1.2em] transition-transform duration-300 ease-out group-hover:translate-x-0">
        {items.map((letter, i) => (
          <div
            key={i}
            className={cn(
              "flex h-[1.2em] -translate-y-[400%] flex-col leading-[1.2] font-bold",
              letter === " " && "w-[0.5em]",
              isIntersecting ? "slide-down-title" : "",
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
