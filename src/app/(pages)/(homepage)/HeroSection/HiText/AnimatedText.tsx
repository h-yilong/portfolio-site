"use client";
import React, { useEffect, useState } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 250 },
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
          className="relative -mt-6 h-[110px] w-full overflow-hidden text-[6em] leading-[1] font-semibold tracking-[-0.05em] text-white will-change-[transform,opacity]"
          style={style}
        >
          <a.div className="overflow-hidden text-center *:text-shadow-[0_0_8px_#fff6]" style={{ height }}>
            {items[index]}
          </a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function AnimatedText() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setShow(true);
    }, 1_600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center pb-12">
      <div className="flex items-center justify-center">
        <Trail open={show}>
          {/* <span
            style={{
              WebkitTextStroke: "3px white",
              color: "#121221",
              WebkitTextFillColor: "#121221",
              paintOrder: "stroke fill",
            }}
          >
            Hi, I&apos;m
          </span> */}
          <span>Yilong</span>
          <span>Huang</span>
          <span className="text-6xl font-light">Sydney, Australia</span>
        </Trail>
      </div>
    </div>
  );
}
