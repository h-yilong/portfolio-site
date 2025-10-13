"use client";

import { useHeroSectionLoaded } from "@/components/LazyLoader";
import dynamic from "next/dynamic";

const CollisionScene = dynamic(() => import("./lusion/YHScene"), {
  ssr: true,
});

const Article = () => (
  <article className="relative z-50 w-2/3 px-6 text-xl leading-[1.1] font-medium *:my-3">
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
        <section className="max-width -z-10 mx-auto my-6">
          <CollisionScene />
        </section>
        {/* <section className="max-width pointer-events-none relative z-50 mx-auto flex h-0 translate-z-5 scale-120 justify-center overflow-visible">
          <Article />
        </section> */}
      </>
    );
  }
  return <Fallback />;
}
