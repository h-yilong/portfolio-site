"use client";

import { useHeroSectionLoaded } from "@/components/LazyLoader";
import dynamic from "next/dynamic";

const AnimatedText = dynamic(() => import("./AnimatedText"));

const Fallback = () => (
  <div className="pointer-events-none absolute -z-10 text-7xl font-bold text-[var(--background)]">
    <h1 data-test="hero-heading">Hi, I&apos;m Yilong Huang.</h1>
    <h2>A Sydney based developer.</h2>
    <p>I love building cool things.</p>
  </div>
);

export default function HiText() {
  const heroLoaded = useHeroSectionLoaded();

  // Always show fallback immediately, then enhance with animation
  return (
    <>
      <Fallback /> {/* Static text shows immediately */}
      {heroLoaded && <AnimatedText />} {/* Animate only when ready */}
    </>
  );
}
