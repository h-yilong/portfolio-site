"use client";
import React, { useState } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div
          key={index}
          className="relative h-[80px] w-full overflow-hidden text-[6em] leading-[80px] font-bold tracking-[-0.05em] text-white will-change-[transform,opacity]"
          style={style}
        >
          <a.div className="overflow-hidden" style={{ height }}>
            {items[index]}
          </a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function AnimatedText1() {
  const [show, setShow] = useState(true);
  return (
    <div className="flex items-center justify-center" onClick={() => setShow((prev) => !prev)}>
      <Trail open={show}>
        <span>Yilong</span>
        <span>Huang</span>
        <span>Dolor</span>
        <span>Sit</span>
      </Trail>
    </div>
  );
}
