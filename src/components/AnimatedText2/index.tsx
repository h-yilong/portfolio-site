"use client";
import React, { useState } from "react";
import { useTrail, animated, type UseTrailProps } from "@react-spring/web";

const Trail: React.FC<{ show: boolean; children: React.ReactNode }> = ({ show, children }) => {
  const items = React.Children.toArray(children);

  const useTrailProps: UseTrailProps = {
    config: { mass: 3, tension: 3000, friction: 1, clamp: true },
    opacity: show ? 1 : 1,
    x: show ? 0 : 3,
    y: show ? 0 : 8,
    rotate: show ? 0 : 10,
    from: { opacity: 0, x: 3, y: 8, rotate: 10 },
  };

  const trail = useTrail(items.length, useTrailProps);

  return trail.map(({ rotate, y, ...style }, index) => {
    return (
      <animated.div
        key={index}
        className="h-fit w-fit overflow-hidden text-3xl font-bold text-amber-400 will-change-[transform,opacity]"
        style={style}
      >
        <animated.div className="will-change-transform" style={{ rotate, y }}>
          {items[index]}
        </animated.div>
      </animated.div>
    );
  });
};

export default function AnimatedText2({ text }: { text: string }) {
  const [show, setShow] = useState(true);
  return (
    <div className="flex" onClick={() => setShow((prev) => !prev)}>
      <Trail show={show}>
        {text.split("").map((letter, index) => {
          if (letter === " ") {
            return <div className="w-[1em]" key={index} />;
          }
          return (
            <div className="w-fit" key={index}>
              {letter}
            </div>
          );
        })}
      </Trail>
    </div>
  );
}
