"use client";
import * as THREE from "three";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
// React Three Fiber for React integration with Three.js
import { Canvas } from "@react-three/fiber";
// Drei library for pre-built 3D components and utilities
import { OrbitControls, Sparkles } from "@react-three/drei";
// Math utilities for smooth animations and transitions
import TextOverlay from "./TextOverlay";
import SintRobotModel from "@/components/3d/SintRobot";

const scale = Array.from({ length: 50 }, () => 1 + Math.random() * 15);

// tips: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion

export default function HeroSection() {
  const containerRef = useRef(null);
  const gradientRef1 = useRef(null);
  const gradientRef2 = useRef(null);
  const animationFrameId = useRef(null);
  const currentPositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Cancel any pending animation frame
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const targetX = (mouseX - window.innerWidth / 2) * 0.15;
    const targetY = (mouseY - window.innerHeight / 2) * 0.1;

    // Schedule the DOM update using requestAnimationFrame
    animationFrameId.current = requestAnimationFrame(() => {
      if (gradientRef1.current && gradientRef2.current) {
        const dx = targetX - currentPositionRef.current.x;
        const dy = targetY - currentPositionRef.current.y;

        gradientRef1.current.style.transform = `translate(${dx}px, ${dy}px)`;
        gradientRef2.current.style.transform = `translate(${-dx}px, ${-dy}px)`;
      }
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <>
      <TextOverlay />
      <section
        onMouseMove={handleMouseMove}
        ref={containerRef}
        className="relative h-[calc(100vh-64px)] w-full backdrop-blur-[2px]"
      >
        <div className="hero-gradient right-[5%] bottom-0 w-2/3 opacity-35" ref={gradientRef1}>
          <div className="from-indigo-600/90 via-violet-700/60" />
        </div>
        <div className="hero-gradient top-[15%] left-[8%] z-2 w-1/2 opacity-60" ref={gradientRef2}>
          <div className="from-[rgba(69,53,211,0.9)] via-[rgba(70,55,209,0.6)]" />
        </div>

        <div className="pointer-events-none absolute top-36 left-12 z-50">
          <p className="text-4xl leading-[1.6] font-bold tracking-tight text-white">Yilong HUANG</p>
          <p className="text-3xl leading-[1] font-light tracking-tight text-white">Sydney, Australia</p>
        </div>

        <Canvas
          shadows // Enable shadow rendering
          dpr={[1, 1.5]} // Device pixel ratio for crisp rendering
          gl={{ antialias: false }} // Disable antialiasing for performance
          camera={{ position: [1.5, -2, 8], fov: 8, near: 0.1, far: 100 }} // Camera setup
          eventSource={containerRef}
        >
          {/* <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={8} near={0.1} far={100} /> */}
          <ambientLight intensity={6} color="#fee" />
          <directionalLight position={[2, 5, 2]} intensity={3.6} color="#1af" />
          <directionalLight position={[-2, 0, -0.3]} intensity={6.8} color="#fff" />
          <Sparkles
            count={scale.length} // Number of sparkles to render
            size={scale} // Size of each sparkle (can be a number or an array for per-sparkle sizes)
            color="#fff"
            position={[0, 0.1, 0]} // Center position of the sparkles group in 3D space: [x, y, z]
            scale={[2, 1, 3]} // Spread/area the sparkles cover: [width, height, depth]
            speed={0.3} // Animation speed of the sparkles
          />
          <Suspense fallback={null}>
            <SintRobotModel />
          </Suspense>
          <OrbitControls />
          {/* <Rig /> */}
        </Canvas>
        <div className="h-[1px] w-full bg-linear-to-r from-transparent from-10% via-white/30 to-transparent to-90%" />
      </section>
    </>
  );
}

function Rig() {
  // const radius = 10;
  // return useFrame((state, dt) => {
  //   easing.damp3(
  //     state.camera.position,
  //     [Math.sin(state.pointer.x) * radius, Math.atan(state.pointer.y) * radius, Math.cos(state.pointer.x) * radius],
  //     0.25,
  //     dt,
  //   );
  //   state.camera.lookAt(0, 0, 0);
  // });
  return useFrame((state) => {
    // Adjust camera position to keep the model centered and in view, based on model scale and camera fov
    // The model is at [0, -2.8, 0], scale 0.02, camera starts at [1, -2, 8], fov: 8
    // We'll allow gentle pointer-based orbit, but keep the model in frame
    const targetX = 1.5 + state.pointer.x * 0.05; // allow some horizontal orbit
    const targetY = -2 + state.pointer.y * 0.02; // allow some vertical orbit, centered on model
    // const targetZ = 8; // keep distance fixed for this fov/model scale

    const {
      camera: { position },
    } = state;
    const { x, y } = position;

    position.x = THREE.MathUtils.lerp(x, targetX, 0.1);
    position.y = THREE.MathUtils.lerp(y, targetY, 0.1);
    // state.camera.lookAt(0, 0, 0);
  });
}
