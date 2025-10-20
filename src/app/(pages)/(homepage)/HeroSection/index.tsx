"use client";

import { type RefObject, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei"; // Drei library for pre-built 3D components and utilities
// import SintRobotModel from "@/components/3d/SintRobot-optimized";
import { Model as SintRobotModel } from "@/components/3d/robot/Model";
import { easing } from "maath";
import { cn } from "@/lib/utils";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useIsMobile } from "@/hooks/useIsMobile";
import RadialGradients from "./RadialGradients";
import LoadingBar from "./LoadingBar";
import HiText from "./HiText";
// import { ModelWithWorker } from "@/components/3d/robot/ModelWithWorker";

// tips: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion

export default function HeroSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      rootRef.current = document.querySelector(".parallax-wrapper");
    }
  }, []);

  const { ref: containerRef, isIntersecting } = useIntersectionObserver({
    root: rootRef.current,
    threshold: 0,
    rootMargin: "300px 0px 300px 0px",
  });

  // 🚀 Key optimization: defer Canvas initialization to decrease TBT
  useEffect(() => {
    if (typeof window === "undefined") return;

    // use requestIdleCallback to initialize Canvas in browser idle time
    // this ensures that there will be no long tasks blocking the main thread in the FCP → TTI window
    if ("requestIdleCallback" in window) {
      const idleId = requestIdleCallback(
        () => {
          setCanvasReady(true);
          console.log("✅ Canvas initialization deferred to idle time");
        },
        { timeout: 300 }, // delay at most 300ms to ensure user experience
      );
      return () => cancelIdleCallback(idleId);
    }

    // fallback: use setTimeout in non-supporting browsers
    const timerId = setTimeout(() => {
      setCanvasReady(true);
      console.log("✅ Canvas initialization deferred via setTimeout");
    }, 100);
    return () => clearTimeout(timerId);
  }, []);

  const handleModelLoadComplete = useCallback(() => {
    setModelLoaded(true);
    // Dispatch custom event to notify other components that HeroSection is loaded
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hero-section-loaded"));
    }
  }, []);

  const scale = useMemo(() => Array.from({ length: isMobile ? 20 : 50 }, () => 1 + Math.random() * 15), [isMobile]);

  console.log("Render homepage hero section");

  return (
    <>
      <section
        // onMouseMove={handleMouseMove as unknown as MouseEventHandler<HTMLElement>}
        ref={containerRef}
        className="relative h-screen w-screen backdrop-blur-[2px]"
      >
        <LoadingBar modelLoaded={modelLoaded} />
        <HiText />
        <RadialGradients modelLoaded={modelLoaded} containerRef={containerRef} />

        {/* 🎯 Canvas is initialized only when idle, to avoid blocking FCP → TTI */}
        {canvasReady && (
          <div
            className={cn(
              "h-full w-full transition-opacity duration-300 ease-out will-change-[opacity]",
              modelLoaded && isIntersecting ? "opacity-100" : "opacity-0",
            )}
          >
            {isIntersecting && (
              <Canvas
                // shadows
                // frameloop="always"
                dpr={isMobile ? [1, 1.5] : [1, 2]}
                gl={{ antialias: false }} // Disable antialiasing for performance
                // camera={{ position: [1.5, -2, 8], fov: 8, near: 0.1, far: 100 }} // Camera setup
                camera={{ position: [20, 12, -20], fov: isMobile ? 10 : 8, near: 0.1, far: 50 }} // Camera setup
                eventSource={containerRef as RefObject<HTMLElement>}
              >
                {/* <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={8} near={0.1} far={100} /> */}
                <ambientLight intensity={6} color="#fee" />
                <directionalLight position={[2, 5, 2]} intensity={3.6} color="#1af" />
                <directionalLight position={[-2, 0, -0.3]} intensity={6.8} color="#fff" />
                {modelLoaded && (
                  <Sparkles
                    count={scale.length} // Number of sparkles to render
                    size={scale as unknown as number} // Size of each sparkle (can be a number or an array for per-sparkle sizes)
                    color="#fff"
                    position={[0, 0, 0]} // Center position of the sparkles group in 3D space: [x, y, z]
                    scale={isMobile ? [0.5, 1, 2] : [2, 1, 3]} // Spread/area the sparkles cover: [width, height, depth]
                    speed={0.3} // Animation speed of the sparkles
                  />
                )}
                <Suspense fallback={null}>
                  <SintRobotModel onLoadComplete={handleModelLoadComplete} />
                </Suspense>
                {/* <OrbitControls /> */}
                <Rig modelLoaded={modelLoaded} />
              </Canvas>
            )}
          </div>
        )}
        <div className="h-[1px] w-full bg-linear-to-r from-transparent from-10% via-white/30 to-transparent to-90%" />
      </section>
    </>
  );
}

function Rig({ modelLoaded = false }: { modelLoaded: boolean }) {
  const radius = 8;
  const _factor = 0.2;
  return useFrame((state, dt) => {
    if (modelLoaded) {
      const [x, y, z] = [
        1.5 + Math.sin(_factor * state.pointer.x) * radius,
        -1.5 + (Math.atan(_factor * state.pointer.y) * radius) / 2,
        // Math.cos(2 * state.pointer.y) * radius,
        8,
      ];

      easing.damp3(
        state.camera.position,
        [x, y, z],
        0.35, // smooth time
        dt,
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
}
