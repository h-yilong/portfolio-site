"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function AnimatedCharacters({
  children,
  className,
  element = "div",
}: {
  children: string;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
}) {
  const items = children.split("");
  const Element = element;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setIsVisible((prev) => !prev)}>toggle</Button>
      </div>
      <Element className={cn("flex gap-[1px] overflow-hidden", className)}>
        {items.map((item, index) => {
          return (
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isVisible ? "translate-y-0 rotate-0 opacity-100" : "translate-y-[60%] rotate-12 opacity-0",
                item === " " && "w-[0.5em]",
              )}
              key={index}
              style={{ transitionDelay: `${index * 20}ms` }}
            >
              {item}
            </div>
          );
        })}
      </Element>
    </>
  );
}
