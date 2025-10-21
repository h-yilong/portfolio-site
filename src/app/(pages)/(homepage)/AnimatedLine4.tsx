"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/hooks/scroll/useScroll";

const totalLineLength = 2280;

export default function AnimatedLine4() {
  const [startY, setStartY] = useState(10_000);
  const [endY, setEndY] = useState(10_000);
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
    const contactSection = document.querySelector<HTMLElement>("section#contact");
    if (parallaxWrapper && contactSection) {
      // Get bounding rects relative to viewport

      const contactRect = contactSection.getBoundingClientRect();

      // Calculate scroll position (top of contact section relative to wrapper)
      const scrollTop = contactRect.top - 0 + parallaxWrapper.scrollTop;
      console.log("parallaxWrapper.scrollTop", parallaxWrapper.scrollTop);

      // Height of "section#contact"
      const contactHeight = contactSection.offsetHeight;

      setStartY(scrollTop - contactHeight + (1 / 3) * window.innerHeight);
      setEndY(scrollTop);
    }
  }, []);

  console.log("position.y", position.y);
  const delta = position.y - startY;
  const strokeDashoffset = totalLineLength * (1 - delta / (endY - startY));
  const translateY = delta > 0 ? -delta / 8 : 0;

  return (
    <svg
      className="absolute -top-6 right-0 -z-10 h-full max-w-[1436px] object-right-top opacity-50 sm:-top-24 sm:opacity-75"
      viewBox="0 0 1433 1118"
      style={{
        transform: `translateY(${translateY}px)`,
      }}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="1317.83"
          y1="36.31"
          x2="1317.83"
          y2="1109.97"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="#a2ffe2" />
          <stop offset="0.5" stopColor="#8ca8f0" />
          <stop offset="0.9" stopColor="#cf8cf5" />
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
        strokeWidth="40px"
        d="M1457.14,81.29c-54.12-26.75-223.4-39.28-325.27,0s-202.25,148.52-202.53,254.08,54.01,163.25,142.38,149.75,106.79-87.15,136.25-133.79,85.92-62.08,139.93-33.5,85,153.39,27.46,256.08-244.72,181.25-196.85,333.45,279.86,177.42,527.8,182.61"
      />
    </svg>
  );
}
