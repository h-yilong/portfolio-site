"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, useRef, useCallback, type MouseEvent, ReactNode } from "react";
// import throttle from "lodash.throttle";

const ROTATE_ANGLE = 25;

export default function FloatCard({ children, className }: { children: ReactNode; className?: string }) {
  const [componentWidth, setComponentWidth] = useState(0);
  const [componentHeight, setComponentHeight] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Get component dimensions on mount
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setComponentWidth(rect.width);
      setComponentHeight(rect.height);
      console.log("Component dimensions:", rect.width, "x", rect.height);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX; // axis Y
        const distanceY = centerY - e.clientY; // axis X
        const rotateX = (distanceY / componentWidth) * ROTATE_ANGLE;
        const rotateY = (distanceX / componentHeight) * ROTATE_ANGLE;
        setRotateX(rotateX);
        setRotateY(rotateY);
      }
    },
    [componentWidth, componentHeight],
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <div onMouseLeave={handleMouseLeave} className={cn("perspective-midrange", className)}>
      <div
        ref={cardRef}
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
    </div>
  );
}
