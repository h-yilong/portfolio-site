"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  // type MouseEventHandler,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// Drei library for pre-built 3D components and utilities
import { Sparkles } from "@react-three/drei";
// import TextOverlay from "./TextOverlay";
// import SintRobotModel from "@/components/3d/SintRobot-optimized";
import { Model as SintRobotModel } from "@/components/3d/robot/Model";
import { easing } from "maath";
import { cn } from "@/lib/utils";
import LoadingBar from "./LoadingBar";
import HiText from "./HiText";
// import { ModelWithWorker } from "@/components/3d/robot/ModelWithWorker";

const scale = Array.from({ length: 50 }, () => 1 + Math.random() * 15);
const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
const toPrecision = (x: number) => Math.round(x * 10) / 10;

// tips: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion

export default function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const gradientRef1 = useRef<HTMLDivElement>(null);
  const gradientRef2 = useRef<HTMLDivElement>(null);
  // const animationFrameId = useRef<number | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // 🚀 关键优化：延迟 Canvas 初始化以实现 TBT = 0
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 使用 requestIdleCallback 在浏览器空闲时初始化 Canvas
    // 这确保在 FCP → TTI 窗口内不会有长任务阻塞主线程
    if ("requestIdleCallback" in window) {
      const idleId = requestIdleCallback(
        () => {
          setCanvasReady(true);
          console.log("✅ Canvas initialization deferred to idle time");
        },
        { timeout: 300 }, // 最多延迟 300ms，确保用户体验
      );
      return () => cancelIdleCallback(idleId);
    } else {
      // 降级方案：在非支持浏览器中使用 setTimeout
      const timerId = setTimeout(() => {
        setCanvasReady(true);
        console.log("✅ Canvas initialization deferred via setTimeout");
      }, 100);
      return () => clearTimeout(timerId);
    }
  }, []);

  // const handleMouseMove = useCallback(function (e: MouseEvent) {
  //   if (typeof window === "undefined") return;

  //   // Cancel any pending animation frame
  //   if (animationFrameId.current) {
  //     cancelAnimationFrame(animationFrameId.current);
  //   }

  //   const windowCenter = {
  //     x: window.innerWidth / 2,
  //     y: window.innerHeight / 2,
  //   };

  //   const mouseX = e.clientX;
  //   const mouseY = e.clientY;

  //   const dx = (mouseX - windowCenter.x) * 0.15;
  //   const dy = (mouseY - windowCenter.y) * 0.1;

  //   // Schedule the DOM update using requestAnimationFrame for smooth animation
  //   animationFrameId.current = requestAnimationFrame(() => {
  //     if (gradientRef1.current && gradientRef2.current) {
  //       gradientRef1.current.style.transform = `translate(${dx}px, ${dy}px)`;
  //       gradientRef2.current.style.transform = `translate(${-dx}px, ${-dy}px)`;
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !modelLoaded ||
      !containerRef?.current ||
      !gradientRef1?.current ||
      !gradientRef2?.current
    )
      return;

    let mouseX = 0;
    let mouseY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let rafId: number | null = null;
    const _mouseMoveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const _ref = containerRef.current;
    _ref.addEventListener("mousemove", _mouseMoveHandler);

    function animate() {
      if (!gradientRef1.current || !gradientRef2.current) return;

      const targetX = (mouseX - window.innerWidth / 2) * 0.15;
      const targetY = (mouseY - window.innerHeight / 2) * 0.1;

      const dx = targetX - offsetX;
      const dy = targetY - offsetY;

      if (Math.abs(dx) > 0.01 && Math.abs(dy) > 0.01) {
        offsetX += toPrecision(dx * easeOutExpo(0.005));
        offsetY += toPrecision(dy * easeOutExpo(0.005));

        gradientRef1.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        gradientRef2.current.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      // Cleanup requestAnimationFrame on unmount
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      _ref.removeEventListener("mousemove", _mouseMoveHandler);
    };
  }, [modelLoaded]);

  const handleModelLoadComplete = useCallback(() => {
    setModelLoaded(true);
    // Dispatch custom event to notify other components that HeroSection is loaded
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hero-section-loaded"));
    }
  }, []);

  console.log("Render homepage hero section");

  return (
    <>
      {/* <TextOverlay /> */}
      <section
        // onMouseMove={handleMouseMove as unknown as MouseEventHandler<HTMLElement>}
        ref={containerRef}
        className="relative h-screen w-screen backdrop-blur-[2px]"
      >
        <LoadingBar modelLoaded={modelLoaded} />
        <HiText />
        <div
          className={cn(
            "hero-gradient right-[5%] bottom-0 w-2/3 transition-opacity delay-100 duration-1000 ease-out will-change-[opacity]",
            modelLoaded ? "opacity-35" : "opacity-0",
          )}
          ref={gradientRef1}
        >
          <div className="from-indigo-600/90 via-violet-700/60" />
        </div>
        <div
          className={cn(
            "hero-gradient top-[15%] left-[8%] z-2 w-1/2 transition-opacity delay-100 duration-100 ease-out will-change-[opacity]",
            modelLoaded ? "opacity-60" : "opacity-0",
          )}
          ref={gradientRef2}
        >
          <div className="from-[rgba(69,53,211,0.9)] via-[rgba(70,55,209,0.6)]" />
        </div>

        {/* 🎯 Canvas 只在空闲时初始化，避免阻塞 FCP → TTI */}
        {canvasReady && (
          <div
            className={cn(
              "h-full w-full transition-opacity duration-300 ease-out will-change-[opacity]",
              modelLoaded ? "opacity-100" : "opacity-0",
            )}
          >
            <Canvas
              // shadows
              // frameloop="always"
              dpr={[1, 2]}
              gl={{ antialias: false }} // Disable antialiasing for performance
              // camera={{ position: [1.5, -2, 8], fov: 8, near: 0.1, far: 100 }} // Camera setup
              camera={{ position: [20, 12, -20], fov: 8, near: 0.1, far: 50 }} // Camera setup
              // @ts-ignore
              eventSource={containerRef}
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
                  position={[0, 0.1, 0]} // Center position of the sparkles group in 3D space: [x, y, z]
                  scale={[2, 1, 3]} // Spread/area the sparkles cover: [width, height, depth]
                  speed={0.3} // Animation speed of the sparkles
                />
              )}
              <Suspense fallback={null}>
                <SintRobotModel onLoadComplete={handleModelLoadComplete} />
              </Suspense>
              {/* <OrbitControls /> */}
              <Rig modelLoaded={modelLoaded} />
            </Canvas>
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
  // return useFrame((state) => {
  //   // Adjust camera position to keep the model centered and in view, based on model scale and camera fov
  //   // The model is at [0, -2.8, 0], scale 0.02, camera starts at [1, -2, 8], fov: 8
  //   // We'll allow gentle pointer-based orbit, but keep the model in frame
  //   const targetX = 1.5 + state.pointer.x * 0.05; // allow some horizontal orbit
  //   const targetY = -2 + state.pointer.y * 0.02; // allow some vertical orbit, centered on model
  //   // const targetZ = 8; // keep distance fixed for this fov/model scale

  //   const {
  //     camera: { position },
  //   } = state;
  //   const { x, y } = position;

  //   position.x = MathUtils.lerp(x, targetX, 0.1);
  //   position.y = MathUtils.lerp(y, targetY, 0.1);
  //   // state.camera.lookAt(0, 0, 0);
  // });
}
