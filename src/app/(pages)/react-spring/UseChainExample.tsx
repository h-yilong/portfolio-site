"use client";
import { useTransition, useSpring, useChain, animated, useSpringRef } from "@react-spring/web";

const data = ["hi", "there!"];

export default function UseChainExample() {
  const springRef = useSpringRef();

  const springs = useSpring({
    ref: springRef,
    from: { size: "20%" },
    to: { size: "60%" },
  });

  const transRef = useSpringRef();

  const transitions = useTransition(data, {
    ref: transRef,
    trail: 150,
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0 },
  });

  useChain([springRef, transRef]);

  return (
    <animated.div
      style={{
        height: springs.size,
        width: springs.size,
        background: "#4f39f6",
      }}
    >
      {transitions((style, item) => (
        <animated.div
          style={{
            width: "120px",
            height: "120px",
            background: "#ffcc00",
            ...style,
          }}
        >
          {item}
        </animated.div>
      ))}
    </animated.div>
  );
}
