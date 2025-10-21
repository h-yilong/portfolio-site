"use client";

import { useHeroSectionLoaded } from "@/components/LazyLoader";
import dynamic from "next/dynamic";

const CollisionScene = dynamic(() => import("./lusion/YHScene"));

const Article = () => (
  <article className="flex aspect-[1.6] w-full flex-col items-center justify-center opacity-0">
    <p>Hi There!</p>
    <p>I&apos;m Yilong, a Sydney based developer, with over 8 years of experience in web development.</p>
    <p>
      Coding is not just a profession, it&apos;s a passion. With a user centric mind, I strive to provide the solutions
      to complex problems, while keeping it simple and performant.
    </p>
  </article>
);

const Fallback = () => <Article />;

export default function NeverLimitImagination() {
  const heroLoaded = useHeroSectionLoaded();

  return <section className="max-width -z-10 mx-auto my-6">{heroLoaded ? <CollisionScene /> : <Fallback />}</section>;
}
