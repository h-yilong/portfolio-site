"use client";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Word = ({ children, show, className }: { children: ReactNode; className?: string; show: boolean }) => (
  <div
    className={cn(
      "-mt-[0.3em] h-[1.2em] overflow-hidden leading-[1.2] transition-all duration-300 ease-out",
      show ? "translate-x-0" : "translate-x-[1em]",
      className,
    )}
  >
    <div
      className={cn(
        "overflow-hidden opacity-100 transition-all duration-500 ease-out",
        show ? "h-full opacity-100" : "h-0 opacity-0",
      )}
    >
      {children}
    </div>
  </div>
);

export default function AnimatedText() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setShow(true);
    }, 900);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-12">
      <div className="flex flex-col items-center justify-center text-8xl font-semibold tracking-[-0.05em] text-shadow-[0_0_8px_#fff6]">
        <Word show={show}>Yilong</Word>
        <Word className="delay-50 *:delay-50" show={show}>
          Huang
        </Word>
        <Word className="delay-100 *:delay-100" show={show}>
          <span className="text-6xl font-light">Sydney, Australia</span>
        </Word>
      </div>
    </div>
  );
}
