"use client";
import PixelHeart from "@/components/PixelHeart";
import { useTrail, a } from "@react-spring/web";
import { useEffect, useState } from "react";

export default function TextOverlay() {
  const [open, set] = useState(false);
  const trail = useTrail(3, {
    config: { mass: 5, tension: 2000, friction: 180, clamp: true },
    opacity: open ? 1 : 0,
    y: open ? 0 : 5,
    rotate: open ? 0 : 3,
    // from: { opacity: 0, y: 5, rotate: 3 },
  });

  useEffect(() => {
    set(true);
  }, []);

  return (
    <div
      className="pointer-events-none relative z-50 h-0 w-full translate-z-6 scale-75"
      // onClick={() => set((prev) => !prev)}
    >
      <div className="flex-col-center absolute top-[85vh] z-10 h-full w-full">
        <h1
          className="rounded-3xl bg-black/35 px-[3vw] py-[2vw] text-center leading-[1.1] font-light tracking-tight text-white opacity-90"
          style={{ textShadow: "0 0 8px #fff" }}
        >
          <div className="flex h-[10.5vw] gap-[1vw] overflow-hidden text-[10vw] tracking-tighter xl:text-9xl">
            <a.div
              style={{
                ...trail[0],
                y: trail[0].y.to((value) => `${value}vw`),
              }}
            >
              Hi,
            </a.div>
            <a.div style={{ ...trail[1], y: trail[1].y.to((value) => `${value}vw`) }}>I&apos;m</a.div>
            <a.div style={{ ...trail[2], y: trail[2].y.to((value) => `${value}vw`) }} className="font-medium">
              Yilong
            </a.div>
          </div>
          <div className="flex items-center justify-center gap-[1vw] text-[7.5vw] xl:text-8xl">
            <span>I</span>
            <PixelHeart />
            <span>Building</span>
          </div>
          <div className="text-[7.5vw] xl:text-8xl">Cool Things</div>
        </h1>
      </div>
    </div>
  );
}
