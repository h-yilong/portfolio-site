"use client";

import { useHeroSectionLoaded } from "@/components/LazyLoader";
import dynamic from "next/dynamic";

const AnimatedText = dynamic(() => import("./AnimatedText"));

const Fallback = () => (
  <div>
    <h1 data-test="hero-heading">Hi, I&apos;m Yilong Huang.</h1>
    <h2>A Sydney based developer.</h2>
    <p>I love building cool things.</p>
  </div>
);

export default function HiText() {
  const heroLoaded = useHeroSectionLoaded();

  if (heroLoaded) {
    return <AnimatedText />;
  }
  return <Fallback />;
}
