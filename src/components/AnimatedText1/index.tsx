"use client";
import React, { useState } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 120 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div
          key={index}
          className="relative -mt-4 h-[110px] w-full overflow-hidden text-[6em] leading-[1] font-bold tracking-[-0.05em] text-white will-change-[transform,opacity]"
          style={style}
        >
          <a.div className="overflow-hidden text-center" style={{ height }}>
            {items[index]}
          </a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function AnimatedText() {
  const [show, setShow] = useState(true);
  return (
    <div className="flex items-center justify-center" onClick={() => setShow((prev) => !prev)}>
      <Trail open={show}>
        <span
          style={{
            "-webkit-text-stroke": "5px white",
            color: "#121221",
            "-webkit-text-fill-color": "#121221",
            paintOrder: "stroke fill",
          }}
        >
          Hi, I&apos;m
        </span>
        <span>Yilong</span>
        <span>Huang</span>
      </Trail>
    </div>
  );
}
