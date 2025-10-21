"use client";

import ContactForm from "./ContactForm";
import WorkTogether from "./WorkTogether";
import Halo from "./Halo";
import AnimatedLine4 from "../AnimatedLine4";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export default function Contact() {
  const { ref, isIntersecting } = useIntersectionObserver({
    root: ".parallax-wrapper",
    threshold: 0,
    rootMargin: "200px 0px 200px 0px",
  });

  return (
    <section id="contact" ref={ref} className="relative">
      {isIntersecting && <AnimatedLine4 />}
      <section className="max-width mx-auto my-16">
        <h3 className="w-fit bg-linear-to-r from-teal-300 to-indigo-300 bg-clip-text text-right text-[6vw] leading-[1.1] font-extrabold text-transparent *:w-fit xl:text-7xl">
          <p>Ready to build something</p>
          <p>cool and bring your</p>
          <p>ideas to life?</p>
        </h3>
      </section>
      <section className="max-width relative bg-[var(--background)]/90 backdrop-blur-xs">
        <Halo isIntersecting={isIntersecting} />
        <div className="my-24 overflow-hidden rounded-xl border border-white/10 bg-black/5">
          <div className="flex h-8 w-full items-center bg-linear-to-r from-white/5 via-white/15 to-white/5">
            <div className="ml-4 h-3 w-3 rounded-full bg-white/35" />
            <div className="ml-2 h-3 w-3 rounded-full bg-white/35" />
            <div className="ml-2 h-3 w-3 rounded-full bg-white/35" />
          </div>
          <WorkTogether />
          <ContactForm />
        </div>
      </section>
    </section>
  );
}
