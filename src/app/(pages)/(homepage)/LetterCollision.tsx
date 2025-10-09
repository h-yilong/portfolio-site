"use client";

import { useHeroSectionLoaded } from "@/components/LazyLoader";
import dynamic from "next/dynamic";

const CollisionScene = dynamic(() => import("./lusion/YHScene"), {
  ssr: true,
});

const Article = () => (
  <article className="w-1/3 px-6 pt-16 text-xl leading-[1.1] font-medium *:my-3">
    <p>Hi There!</p>
    <p>I&apos;m Yilong, a Sydney based developer, with over 8 years of experience in web development.</p>
    <p>
      Coding is not just a profession, it&apos;s a passion. With a user centric mind, I strive to provide the solutions
      to complex problems, while keeping it simple and performant.
    </p>
  </article>
);

const Fallback = () => (
  <section className="custom-cursor max-width relative mx-auto overflow-hidden">
    <Article />
  </section>
);

export default function NeverLimitImagination() {
  const heroLoaded = useHeroSectionLoaded();

  if (heroLoaded) {
    return (
      <>
        <section className="max-width relative z-20 mx-auto flex h-0 -translate-z-5 scale-130 justify-end overflow-visible">
          <Article />
        </section>
        <section className="max-width mx-auto my-6">
          <CollisionScene />
        </section>
      </>
    );
  }
  return <Fallback />;
}
