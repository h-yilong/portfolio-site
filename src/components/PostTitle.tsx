"use client";
import { type Ref, useEffect, useMemo, useState } from "react";
import { cn, distributeAlongRange } from "@/lib/utils";
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
    const _params = distributeAlongRange(length);
    const _timing = _params.map(timingFunction);
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
