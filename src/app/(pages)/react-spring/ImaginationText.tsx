"use client";
import { useTrail, a, useTransition } from "@react-spring/web";
import { useState } from "react";

export default function ImaginationText() {
  const [show, setShow] = useState(false);
  const trail = useTrail(2, {
    config: { clamp: true },
    opacity: show ? 1 : 0,
    rotate: show ? 0 : 8,
    y: show ? 0 : 100,
  });

  const transitions = useTransition(show ? ["Your", "Imagination"] : [], {
    config: { clamp: true },
    trail: 200,
    from: { opacity: 0, y: -100, x: 72 },
    enter: [{ opacity: 1, y: 0, x: 72 }, { x: 0 }],
    leave: { opacity: 0, y: -100, x: 0 },
  });

  console.log("ImaginationText render");

  return (
    <section
      className="max-width relative mx-auto my-16 w-full cursor-pointer"
      onClick={() => setShow((prev) => !prev)}
    >
      <h3 className="text-[10vw] font-semibold tracking-tighter *:leading-[1] xl:text-9xl">
        <div className="flex h-[10vw] overflow-hidden xl:h-32">
          <a.div style={{ ...trail[0], y: trail[0].y.to((value) => `${value}%`) }} className="overflow-hidden">
            Never
          </a.div>
          &nbsp;
          <a.div style={{ ...trail[1], y: trail[1].y.to((value) => `${value}%`) }}>Limit</a.div>
        </div>
        <div className="flex h-[10.6vw] overflow-hidden xl:h-[136px]">
          {transitions((style, item) => (
            <a.div className="shrink-0 overflow-hidden" style={{ ...style, y: style.y.to((value) => `${value}%`) }}>
              {item}&nbsp;
            </a.div>
          ))}
        </div>
      </h3>
    </section>
  );
}
