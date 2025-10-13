"use client";

import { useHeroSectionLoaded } from "@/components/LazyLoader";
import dynamic from "next/dynamic";

const ImaginationText = dynamic(() => import("@/app/(pages)/react-spring/ImaginationText"));

const Fallback = () => (
  <section className="max-width relative mx-auto my-16 w-full">
    <h3 className="h-[20.6vw] text-[10vw] font-semibold tracking-tighter *:leading-[1] xl:h-[264px] xl:text-9xl">
      Let The Ideas Collide
    </h3>
  </section>
);

export default function NeverLimitImagination() {
  const heroLoaded = useHeroSectionLoaded();

  if (heroLoaded) {
    return <ImaginationText />;
  }
  return <Fallback />;
}
