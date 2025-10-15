"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { memo, type RefObject, useEffect, useRef } from "react";

const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
const toPrecision = (x: number) => Math.round(x * 10) / 10;

function RadialGradients({
  modelLoaded,
  containerRef,
}: {
  modelLoaded: boolean;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const gradientRef1 = useRef<HTMLDivElement>(null);
  const gradientRef2 = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // handle mouse move with smooth animation
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      isMobile ||
      !modelLoaded ||
      !containerRef?.current ||
      !gradientRef1?.current ||
      !gradientRef2?.current
    )
      return;

    let mouseX = 0;
    let mouseY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let rafId: number | null = null;
    const _mouseMoveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const _ref = containerRef.current;
    _ref.addEventListener("mousemove", _mouseMoveHandler);

    function animate() {
      if (!gradientRef1.current || !gradientRef2.current) return;

      const targetX = (mouseX - window.innerWidth / 2) * 0.15;
      const targetY = (mouseY - window.innerHeight / 2) * 0.1;

      const dx = targetX - offsetX;
      const dy = targetY - offsetY;

      if (Math.abs(dx) > 0.01 && Math.abs(dy) > 0.01) {
        offsetX += toPrecision(dx * easeOutExpo(0.005));
        offsetY += toPrecision(dy * easeOutExpo(0.005));

        gradientRef1.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        gradientRef2.current.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      // Cleanup requestAnimationFrame on unmount
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      _ref.removeEventListener("mousemove", _mouseMoveHandler);
    };
  }, [modelLoaded, containerRef, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "hero-gradient right-[5%] bottom-0 w-2/3 transition-opacity delay-100 duration-1000 ease-out will-change-[opacity]",
          modelLoaded ? "opacity-60" : "opacity-0",
        )}
        ref={gradientRef1}
      >
        <div className="from-indigo-600/90 via-violet-700/60" />
      </div>
      <div
        className={cn(
          "hero-gradient top-[15%] left-[8%] z-2 w-1/2 transition-opacity delay-100 duration-100 ease-out will-change-[opacity]",
          modelLoaded ? "opacity-70" : "opacity-0",
        )}
        ref={gradientRef2}
      >
        <div className="from-[rgba(69,53,211)] via-[rgba(70,55,209,0.7)]" />
      </div>
    </>
  );
}

export default memo(RadialGradients);
