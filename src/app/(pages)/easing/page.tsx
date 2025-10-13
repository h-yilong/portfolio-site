"use client";
import { useState } from "react";
import PostTitle from "@/components/PostTitle2";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CssAnimatedText from "@/app/(pages)/(homepage)/HeroSection/HiText/CssAnimatedText";

const easeOutCubic = (t: number): number => +(1 - Math.pow(1 - t, 3)).toFixed(2);
// const easeOutQuint = (t: number): number => +(1 - Math.pow(1 - t, 5)).toFixed(2);
// const easeOutQuart = (t: number): number => +(1 - Math.pow(1 - t, 4)).toFixed(2);
// const easeOutExpo = (t: number): number => +(1 - Math.pow(2, -10 * t)).toFixed(2);
// const easeOutCirc = (t: number): number => +Math.sqrt(1 - Math.pow(t - 1, 2)).toFixed(2);
// const easeOutBack = (t: number): number => +(1 + Math.pow(t - 1, 3) + 0.3 * Math.pow(t - 1, 2)).toFixed(2);
// const easeOutElastic = (t: number): number => +(Math.sin((t * Math.PI * 2 - 0.5) * 5) * 0.5 + 1).toFixed(2);
const square = (t: number): number => t ** 1.5 / 5 + 0.1;

const params = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "Y", "i", "h", "g", "f", "e", "d", "c", "b", "a"];

export default function EasingPage() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="max-width mx-auto mt-20">
      <h1>EasingPage</h1>

      <div className="">
        <div>
          <CssAnimatedText />
        </div>
      </div>

      <h2>Easing Functions</h2>
      <div>
        <h3>easeOutCubic</h3>
        {params.map(easeOutCubic).join(", ")}
      </div>

      <Button onClick={() => setIsVisible((prev) => !prev)}>{isVisible ? "Hide" : "Show"}</Button>

      <div className="mt-8 border-t border-indigo-500 pt-6 text-6xl">
        <h2 className="my-3 text-5xl font-bold">Letters</h2>
        <div className="flex h-[1.2em] overflow-hidden">
          {letters.map((letter, i) => (
            <div
              key={i}
              className={cn(
                "flex h-[1.2em] flex-col leading-[1.2] font-bold",
                isVisible ? "slide-down-title" : "translate-y-full",
              )}
              style={{
                animationDuration: `${1 * params.map(square)[Math.abs(i - 9)]}s`,
                // animationDelay: `${Math.abs(i - 9) * 10}ms`,
              }}
            >
              <div>{letter}</div>
              <div>{letter}</div>
              <div>{letter}</div>
              <div>{letter}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <PostTitle className="group text-3xl" animate={isVisible}>
          Hello World
        </PostTitle>
      </div>
    </div>
  );
}
