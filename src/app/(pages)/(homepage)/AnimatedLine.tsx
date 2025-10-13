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

  const totalLineLength = 2600; // Total length of the path
  const currentLineLength = (position.y / 2000) * totalLineLength;
  const strokeDashoffset = totalLineLength - currentLineLength;

  return (
    <section className="relative h-0 w-full -translate-z-10 scale-140 overflow-visible">
      <svg className="absolute -top-[35vh] left-0 -z-10 w-full" viewBox="0 0 1440 2464">
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="758.31"
            y1="2460.44"
            x2="758.31"
            y2="17.71"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a2c9ff" />
            <stop offset=".24" stopColor="#ff55a5" />
            <stop offset=".41" stopColor="#4548ff" />
            <stop offset=".63" stopColor="#256af4" />
            <stop offset=".85" stopColor="#94f4ff" />
          </linearGradient>
        </defs>
        <path
          className="stroke-[36px] xl:stroke-[30px]"
          fill="none"
          stroke="url(#linear-gradient)"
          strokeMiterlimit="10"
          strokeDashoffset={`${strokeDashoffset}px`}
          strokeDasharray="2500px, 5000px"
          strokeLinecap="round"
          d="M-28.22,25.71c232.81,57.5,322.25,174.12,276.75,383-45.5,208.88-179,126-199,79-19.85-46.65-8.59-101.06,48-126,59-26,134.69,22.22,149,151.55,14.31,129.33,66.66,185.58,194.78,244.95,224.68,96.1,298.32,19.99,621.88,142.19,309.38,139.07,376.86,287.94,397.34,392.19s8.21,251.54-222.55,300.64-400.15-176.75-657.91-36.82c-225.85,164.48-235.67,365.78-176.75,503.25s262.67,243.03,412.42,85.92c166.93-189.03,223.4-294.59,351.05-282.31,125.2,24.55,58.92,257.76,110.47,390.33s152.2,162.02,267.58,198.85"
        />
      </svg>
    </section>
  );
}
