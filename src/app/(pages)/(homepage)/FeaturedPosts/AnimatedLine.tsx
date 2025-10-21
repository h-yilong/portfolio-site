"use client";
import { useEffect, useState } from "react";
import { useScroll } from "@/hooks/scroll/useScroll";

const totalLineLength = 2350;

export default function AnimatedLine() {
  // start animation of drawing line when scrollY is greater than startY
  const [startY, setStartY] = useState(10_000);
  // finish animation of drawing the entire line(full totalLineLength) when scrollY reaches endY
  const [endY, setEndY] = useState(10_000);

  const { position } = useScroll();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { scrollY, innerHeight: _screenHeight } = window;
    const featuredPostsSection = document.querySelector<HTMLElement>("section#featured-posts")!;
    const { top, height: _sectionHeight } = featuredPostsSection.getBoundingClientRect();

    // if (top < 0) {
    //   // scrolling up into the section
    // }

    const _sectionTop = scrollY + top - _screenHeight;
    setStartY(_sectionTop + _screenHeight / 3);
    setEndY(_sectionTop + _sectionHeight);
  }, []);

  const delta = position.y - startY;
  const strokeDashoffset = totalLineLength * (1 - delta / (endY - startY));
  // const strokeDashoffset = totalLineLength - delta * 1.5;
  const translateY = delta > 0 ? -delta / 6 : 0;

  return (
    <svg
      className="absolute top-0 left-0 -z-10 h-full object-left-top opacity-75"
      viewBox="0 0 1433 1118"
      style={{
        transform: `translateY(${translateY}px)`,
      }}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="1692.88"
          y1="36.31"
          x2="1692.88"
          y2="1109.97"
          gradientTransform="translate(1915.59) rotate(-180) scale(1.06 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="#a2ffd0" />
          <stop offset="0.5" stopColor="#94b3ff" />
          <stop offset="0.9" stopColor="#e694ff" />
        </linearGradient>
      </defs>
      <path
        className="stroke-[20px] lg:stroke-[40px]"
        strokeDasharray={`${totalLineLength}px, 10000px`}
        opacity="0.75"
        strokeDashoffset={`${strokeDashoffset}px`}
        fill="none"
        stroke="url(#linear-gradient)"
        strokeMiterlimit="10"
        strokeLinecap="round"
        d="M-28.81,81.29c57.44-26.75,237.08-39.28,345.19,0,108.12,39.28,214.64,148.52,214.93,254.08s-57.32,163.25-151.1,149.75c-93.79-13.5-113.33-87.15-144.59-133.79-31.26-46.64-91.18-62.08-148.5-33.5-57.32,28.59-90.2,153.39-29.14,256.08,61.06,102.69,259.71,181.25,208.91,333.45s-297,177.42-560.13,182.61"
      />
    </svg>
  );
}
