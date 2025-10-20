"use client";
import { useEffect, useRef } from "react";
import { useScroll } from "@/hooks/scroll/useScroll";

export default function AnimatedLine() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { position } = useScroll({
    // throttle: 50,
    // useRAF: false,
    element: targetRef.current,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      targetRef.current = document.querySelector(".parallax-wrapper");
    }
  }, []);

  const totalLineLength = 3400;
  const startY = 3350;
  const endY = 4300;

  const strokeDashoffset = totalLineLength * (1 - (position.y - startY) / (endY - startY));

  return (
    <div className="absolute top-0 right-0 -z-10 h-full w-full object-right-top opacity-75">
      <svg className="" viewBox="0 0 1440 1014">
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="923.79"
            y1="-3474.45"
            x2="923.79"
            y2="-2479.5"
            gradientTransform="translate(0 -2464) scale(1 -1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".2" stopColor="#ff55a5" />
            <stop offset=".8" stopColor="#fdba74" />
          </linearGradient>
        </defs>
        <path
          className="stroke-[2vw]"
          fill="none"
          stroke="url(#linear-gradient)"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeDasharray={`${totalLineLength}px, ${totalLineLength}px`}
          strokeDashoffset={`${strokeDashoffset}px`}
          d="M1444.22,112c-172-76-693.56-151.18-900.93-5.59-207.37,145.59-235.67,365.78-176.75,503.25s251.68,240.34,423.68-11.66c133.57-198,240-340,356-328s4,296,94.26,533.6c51.55,132.57,152.2,162.02,267.58,198.85"
        />
      </svg>
    </div>
  );
}
