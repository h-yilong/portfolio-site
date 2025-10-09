"use client";
import React, { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

export default function UseTransition() {
  const [data, setData] = useState(["Never", "Limit", "Your", "Imagination"]);
  const transitions = useTransition(data, {
    trail: 150,
    from: { opacity: 0.8, color: "#ffcc00", height: 20 },
    enter: { opacity: 1, color: "#20ffa0", height: 40 },
    leave: { opacity: 0, color: "#ff4060", height: 0 },
    update: { color: "#4f39f6" },
  });

  return (
    <div onClick={() => setData(["Yilong", "Huang"])} className="flex h-10 gap-6 overflow-hidden text-4xl font-bold">
      {transitions((style, item) => (
        <animated.div className="overflow-hidden" style={style}>
          {item}
        </animated.div>
      ))}
    </div>
  );
}
