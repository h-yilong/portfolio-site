"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/hooks/scroll/useScroll";

const totalLineLength = 2350;

export default function AnimatedLine5() {
  const [startY, setStartY] = useState(10_000);
  const [_endY, setEndY] = useState(10_000);
  const targetRef = useRef<HTMLDivElement>(null);
  const { position } = useScroll({
    element: targetRef.current,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      targetRef.current = document.querySelector(".parallax-wrapper");
    }
  }, []);

  useEffect(() => {
    // Determine scroll position (top) and height of "section#contact" in ".parallax-wrapper"
    const parallaxWrapper = document.querySelector<HTMLElement>(".parallax-wrapper");
    const featuredPostsSection = document.querySelector<HTMLElement>("section#featured-posts");
    if (parallaxWrapper && featuredPostsSection) {
      // Get bounding rects relative to viewport

      const featuredPostsRect = featuredPostsSection.getBoundingClientRect();

      // Calculate scroll position (top of contact section relative to wrapper)
      const scrollTop = featuredPostsRect.top - 0 + parallaxWrapper.scrollTop;
      console.log("parallaxWrapper.scrollTop", parallaxWrapper.scrollTop);

      // Height of "section#contact"
      const featuredPostsHeight = featuredPostsSection.offsetHeight;

      setStartY(scrollTop - featuredPostsHeight + window.innerHeight);
      setEndY(scrollTop);
    }
  }, []);

  const delta = position.y - startY;
  // const strokeDashoffset = totalLineLength * (1 - delta / (endY - startY));
  const strokeDashoffset = totalLineLength - delta * 1.5; // big screen
  // const strokeDashoffset = totalLineLength - delta * 0.5; // small screen
  const translateY = delta > 0 ? -delta / 4 : 0;

  return (
    <svg
      className="absolute -top-24 left-0 -z-10 h-full object-left-top opacity-75 lg:-top-12"
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
        strokeDasharray={`${totalLineLength}px, 10000px`}
        opacity="0.75"
        strokeDashoffset={`${strokeDashoffset}px`}
        fill="none"
        stroke="url(#linear-gradient)"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeWidth="36px"
        d="M-28.81,81.29c57.44-26.75,237.08-39.28,345.19,0,108.12,39.28,214.64,148.52,214.93,254.08s-57.32,163.25-151.1,149.75c-93.79-13.5-113.33-87.15-144.59-133.79-31.26-46.64-91.18-62.08-148.5-33.5-57.32,28.59-90.2,153.39-29.14,256.08,61.06,102.69,259.71,181.25,208.91,333.45s-297,177.42-560.13,182.61"
      />
    </svg>
  );
}
