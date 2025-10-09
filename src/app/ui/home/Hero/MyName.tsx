"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function Yilong({ isVisible }: { isVisible: boolean }) {
  const items = ["Y", "i", "l", "o", "n", "g"];
  return items.map((item, index) => (
    <div
      key={item}
      className={cn(
        "-mx-0.5 transition-all duration-500 ease-[cubic-bezier(0,0,0.1,1)]",
        isVisible ? "translate-y-0 rotate-0 opacity-100" : "translate-y-[70%] rotate-3 opacity-0",
      )}
      style={{ transitionDelay: `${index * 35}ms` }}
    >
      {item}
    </div>
  ));
}

export default function MyName() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <h1
      data-test="hero-heading"
      className="relative flex overflow-y-hidden text-7xl leading-20 font-bold tracking-wide"
    >
      <div
        className={cn(
          "mr-1 flex transition-transform delay-500 duration-600 ease-in-out will-change-transform",
          isVisible ? "translate-x-1" : "translate-x-12",
        )}
      >
        <Yilong isVisible={isVisible} />
      </div>
      &nbsp;
      <div
        className={cn(
          "tracking-tighter transition-all delay-500 duration-600 ease-in-out",
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
        )}
      >
        HUANG
      </div>
    </h1>
  );
}
