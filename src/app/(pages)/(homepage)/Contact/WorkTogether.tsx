"use client";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { type RefObject, useEffect, useMemo, useState } from "react";

const words = ["Let's", "work", "together!"];

const Word = ({ children, animateIndex, delay = 0 }: { children: string; animateIndex: number; delay: number }) => {
  return children.split("").map((letter, index) => (
    <div
      key={index}
      className={cn("flex h-[1.2em] flex-col", animateIndex === index && "slide-up")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>{letter}</div>
      <div>{letter}</div>
    </div>
  ));
};

export default function WorkTogether() {
  const { ref, isIntersecting } = useIntersectionObserver({
    root: ".parallax-wrapper",
    threshold: 0,
    rootMargin: "200px 0px 200px 0px",
  });

  const [indexes, setIndexes] = useState([1, 2, 3]);

  useEffect(() => {
    if (!isIntersecting) return;

    const id = setInterval(() => {
      const randomIndexes = words.map((word) => Math.floor(Math.random() * word.length));
      setIndexes(() => randomIndexes);
    }, 2_000);

    return () => clearInterval(id);
  }, [isIntersecting]);

  const content = useMemo(() => {
    if (isIntersecting) {
      return (
        <>
          <div className="flex justify-center overflow-hidden">
            <Word animateIndex={indexes[0]} delay={0}>
              {words[0]}
            </Word>
            &nbsp;
            <Word animateIndex={indexes[1]} delay={80}>
              {words[1]}
            </Word>
          </div>
          <div className="flex justify-center overflow-hidden">
            <Word animateIndex={indexes[2]} delay={135}>
              {words[2]}
            </Word>
          </div>
        </>
      );
    }

    return <h3 className="h-[2.4em]">{words.join(" ")}</h3>;
  }, [isIntersecting, indexes]);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className="mx-auto my-12 w-fit text-6xl leading-[1.2] font-bold select-none"
    >
      {content}
    </div>
  );
}
