"use client";
import { useEffect, useState } from "react";
import { useScroll } from "@/hooks/scroll/useScroll";

const totalLineLength = 2280;

export default function AnimatedLine() {
  const [startY, setStartY] = useState(10_000);
  const [endY, setEndY] = useState(10_000);

  const { position } = useScroll();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const _sectionTop = window.scrollY + 200; // 200px is the rootMargin(top offset)
    setStartY(_sectionTop + window.innerHeight / 3);

    const contactSection = document.querySelector<HTMLElement>("section#contact");
    const _sectionHeight = contactSection!.offsetHeight;

    setEndY(_sectionTop + _sectionHeight);
  }, []);

  const delta = position.y - startY;
  const strokeDashoffset = totalLineLength * (1 - delta / (endY - startY));
  const translateY = delta > 0 ? -delta / 6 : 0;

  return (
    <svg
      className="absolute -top-4 right-0 -z-10 h-full max-w-[1436px] object-right-top opacity-50 sm:-top-8 sm:opacity-75"
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
