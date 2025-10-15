"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

export default function ImaginationText() {
  // Use intersection observer to track when component enters/exits viewport
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.36,
    rootMargin: "0px 0px 0px 0px",
  });

  return (
    <section ref={ref} className="max-width relative mx-auto my-16 w-full">
      <h3 className="text-[10vw] font-semibold tracking-tighter *:leading-[1] xl:text-9xl">
        <div className="flex h-[10vw] overflow-hidden xl:h-32">
          <div className={cn("translate-y-full", isIntersecting && "home-text-1")}>Let</div>
          &nbsp;
          <div style={{ animationDelay: "100ms" }} className={cn("translate-y-full", isIntersecting && "home-text-1")}>
            The
          </div>
        </div>
        <div className="flex h-[10.6vw] overflow-hidden xl:h-[136px]">
          <div className={cn("shrink-0 translate-x-[1em] -translate-y-full", isIntersecting && "home-text-2")}>
            Ideas
          </div>
          &nbsp;
          <div
            style={{ animationDelay: "130ms, 100ms" }}
            className={cn("shrink-0 translate-x-[1em] -translate-y-full", isIntersecting && "home-text-2")}
          >
            Collide
          </div>
        </div>
      </h3>
    </section>
  );
}
