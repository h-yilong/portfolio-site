"use client";
import { useEffect, useRef } from "react";
import { useScroll } from "@/hooks/scroll/useScroll";

export default function AnimatedLine2() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { position } = useScroll({
    throttle: 50,
    useRAF: false,
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
      <svg className="absolute -top-[35vh] left-0 -z-10 w-full" viewBox="0 0 1440 1440">
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="-30.14"
            y1="161.59"
            x2="1464.65"
            y2="161.59"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a2c9ff" />
            <stop offset=".37" stopColor="#0a87ea" />
            <stop offset=".66" stopColor="#256af4" />
            <stop offset="1" stopColor="#4548ff" />
          </linearGradient>
        </defs>
        <path
          className="stroke-[36px] transition-all duration-500 ease-in-out xl:stroke-[30px]"
          fill="none"
          stroke="url(#linear-gradient)"
          strokeMiterlimit="10"
          strokeDashoffset={`${strokeDashoffset}px`}
          strokeDasharray="2500px, 5000px"
          strokeLinecap="round"
          d="M-28.22,68.15c232.81,57.5,322.25,174.12,276.75,383s-179,126-199,79c-19.85-46.65-8.59-101.06,48-126,59-26,134.69,22.22,149,151.55,14.31,129.33,66.66,185.58,194.78,244.95,128.12,59.37,312.5,3.12,621.88,142.19s343.12,298.44,397.34,392.19"
        />
      </svg>
    </section>
  );
}
