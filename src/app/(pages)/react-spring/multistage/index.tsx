"use client";
import React, { useState, useCallback, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import { TimerId } from "@/types/general-types";
import styles from "./styles.module.css";

export default function Multistage() {
  const ref = useRef<TimerId[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#ffcc00",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#20ffa0" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [{ color: "#ff4060" }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: "#4f39f6" },
  });

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout);
    ref.current = [];
    setItems([]);
    ref.current.push(setTimeout(() => setItems(["Apples", "Oranges", "Kiwis"]), 2000));
    // ref.current.push(setTimeout(() => setItems(["Apples", "Kiwis"]), 5000));
    // ref.current.push(setTimeout(() => setItems(["Apples", "Bananas", "Kiwis"]), 8000));
  }, []);

  // useEffect(() => {
  //   reset();
  //   return () => ref.current.forEach(clearTimeout);
  // }, []);

  return (
    <div onClick={reset} className={styles.container}>
      <div className={styles.main}>
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div className={styles.transitionsItem} style={rest}>
            <animated.div style={{ overflow: "hidden", height: innerHeight }}>{item}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
