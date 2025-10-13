"use client";
import { useTrail, a, useTransition } from "@react-spring/web";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// Memoize transform functions to prevent recalculation on every render
const yTransform = (value: number) => `${value}%`;

export default function ImaginationText() {
  // Use intersection observer to track when component enters/exits viewport
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: [0, 0.36], // Track both at 0% (exit) and 36% (entry) visibility
    rootMargin: "900px 0px 900px 0px", // Keep visible until 200px past leaving the viewport (top, right, bottom, left)
  });

  const trail = useTrail(2, {
    config: { clamp: true },
    opacity: isIntersecting ? 1 : 0,
    rotate: isIntersecting ? 0 : 8,
    y: isIntersecting ? 0 : 100,
  });

  const transitions = useTransition(isIntersecting ? ["Ideas", "Collide"] : [], {
    config: { clamp: true },
    trail: 200,
    from: { opacity: 0, y: -100, x: 72 },
    enter: [{ opacity: 1, y: 0, x: 72 }, { x: 0 }],
    leave: { opacity: 0, y: -100, x: 0 },
  });

  return (
    <section ref={ref} className="max-width relative mx-auto my-16 w-full">
      <h3 className="text-[10vw] font-semibold tracking-tighter *:leading-[1] xl:text-9xl">
        <div className="flex h-[10vw] overflow-hidden xl:h-32">
          <a.div style={{ ...trail[0], y: trail[0].y.to(yTransform) }} className="overflow-hidden">
            Let
          </a.div>
          &nbsp;
          <a.div style={{ ...trail[1], y: trail[1].y.to(yTransform) }}>The</a.div>
        </div>
        <div className="flex h-[10.6vw] overflow-hidden xl:h-[136px]">
          {transitions((style, item) => (
            <a.div className="shrink-0 overflow-hidden" style={{ ...style, y: style.y.to(yTransform) }}>
              {item}&nbsp;
            </a.div>
          ))}
        </div>
      </h3>
    </section>
  );
}
