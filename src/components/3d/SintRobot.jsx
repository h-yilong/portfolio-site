"use client";
import * as THREE from "three";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
// React Three Fiber for React integration with Three.js
import { Canvas } from "@react-three/fiber";
// Drei library for pre-built 3D components and utilities
import { useGLTF, useAnimations, Sparkles, OrbitControls } from "@react-three/drei";
// Math utilities for smooth animations and transitions
import CanvasLoader from "@/app/components/Loading";
import PixelHeart from "../PixelHeart";
// import Link from "next/link";
// import { easing } from "maath";

// todo: load transformed(compressed) glb first(if low speed), and then load the original glb?

const scale = Array.from({ length: 50 }, () => 1 + Math.random() * 12);

// tips: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion
// Main component that wraps the 3D scene in a styled container
export default function SintRobot() {
  const containerRef = useRef();
  const gradientRef1 = useRef();
  const gradientRef2 = useRef();
  const animationFrameId = useRef(null);
  const currentPositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
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

  console.log("render sint robot");

  return (
    <>
      <div className="pointer-events-none relative z-50 h-0 w-full translate-z-6 scale-75">
        <div className="absolute top-[85vh] z-10 flex h-full w-full flex-col items-center justify-center">
          <h1
            className="rounded-3xl bg-black/35 px-[3vw] py-[2vw] text-center leading-[1.1] font-light tracking-tight text-white opacity-90"
            style={{ textShadow: "0 0 8px #fff" }}
          >
            <div className="mb-[2vw] text-[10vw] tracking-tighter xl:text-9xl">
              Hi, I'm <span className="font-medium">Yilong</span>
            </div>
            <div className="flex items-center justify-center gap-[1vw] text-[7.5vw] xl:text-8xl">
              <span>I</span>
              <PixelHeart />
              <span>Building</span>
            </div>
            <div className="text-[7.5vw] xl:text-8xl">Cool Things</div>
          </h1>
        </div>
      </div>
      <section
        onMouseMove={handleMouseMove}
        ref={containerRef}
        className="relative h-[calc(100vh-64px)] w-full backdrop-blur-[2px]"
      >
        <div className="pointer-events-none absolute top-36 left-12 z-50">
          <p className="text-4xl leading-[1.6] font-bold tracking-tight text-white">Yilong HUANG</p>
          <p className="text-3xl leading-[1] font-light tracking-tight text-white">Sydney, Australia</p>
        </div>

        <div
          className="pointer-events-none absolute right-[5%] bottom-1/12 aspect-[1.5] w-2/3 opacity-25 duration-200 ease-out"
          ref={gradientRef1}
        >
          <div className="h-full w-full bg-radial-[50%_50%_at_50%_50%] from-indigo-600/90 from-10% via-violet-700/60 via-30% to-transparent" />
        </div>
        <div
          className="pointer-events-none absolute top-[15%] left-[8%] z-2 aspect-[1.5] w-1/2 opacity-60 duration-200 ease-out"
          ref={gradientRef2}
        >
          <div className="h-full w-full bg-radial-[50%_50%_at_50%_50%] from-[rgba(69,53,211,0.9)] from-10% via-[rgba(70,55,209,0.6)] via-30% to-transparent" />
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
            <Model scale={0.02} position={[0, -2.8, 0]} />
          </Suspense>
          {/* <OrbitControls /> */}
          <Rig />
        </Canvas>
        <div className="h-[1px] w-full bg-linear-to-r from-transparent from-10% via-white/30 to-transparent to-90%" />
      </section>
    </>
  );
}

function Rig({ radius = 10 }) {
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

// const maskMaterial = new THREE.MeshStandardMaterial({
//   color: "#fff",
//   roughness: 0.3,
//   metalness: 0.2,
//   transparent: true,
//   opacity: 0.03,
// });

export function Model(props) {
  const group = React.useRef();
  // const { scene, animations } = useGLTF("/assets/models/robot_2-transformed.glb");
  const { scene, animations } = useGLTF("/assets/models/robot_2.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // actions["idle"].reset().fadeIn(1.5).play();
    actions["idle"].play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.mixamorigHips} />
          <primitive object={nodes.Ctrl_Master} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Left} />
          <primitive object={nodes.Ctrl_Hand_IK_Left} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
          <primitive object={nodes.Ctrl_Hand_IK_Right} />
          <primitive object={nodes.Ctrl_Foot_IK_Left} />
          <primitive object={nodes.Ctrl_LegPole_IK_Left} />
          <primitive object={nodes.Ctrl_Foot_IK_Right} />
          <primitive object={nodes.Ctrl_LegPole_IK_Right} />
        </group>
        <skinnedMesh
          name="mask"
          geometry={nodes.mask.geometry}
          // material={materials["Transparency_shader.001"]}
          // material={maskMaterial}
          skeleton={nodes.mask.skeleton}
        >
          <meshStandardMaterial color="#fff" roughness={0.8} metalness={0.8} transparent opacity={0.5} />
        </skinnedMesh>
        <group name="shoulder001">
          <skinnedMesh
            name="Mesh_13001"
            geometry={nodes.Mesh_13001.geometry}
            material={materials["Main_shader.001"]}
            skeleton={nodes.Mesh_13001.skeleton}
          />
          <skinnedMesh
            name="Mesh_13001_1"
            geometry={nodes.Mesh_13001_1.geometry}
            material={materials["Transparency_shader.001"]}
            skeleton={nodes.Mesh_13001_1.skeleton}
          />
          <skinnedMesh
            name="Mesh_13001_2"
            geometry={nodes.Mesh_13001_2.geometry}
            material={materials["Hand_proxy_shader.001"]}
            skeleton={nodes.Mesh_13001_2.skeleton}
          />
          <skinnedMesh
            name="Mesh_13001_3"
            geometry={nodes.Mesh_13001_3.geometry}
            material={materials["Insides_shader.001"]}
            skeleton={nodes.Mesh_13001_3.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/assets/models/robot_2-transformed.glb");
useGLTF.preload("/assets/models/robot_2.glb");
