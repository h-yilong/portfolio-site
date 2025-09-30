"use client";
import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
// React Three Fiber for React integration with Three.js
import { Canvas } from "@react-three/fiber";
// Drei library for pre-built 3D components and utilities
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";
// Math utilities for smooth animations and transitions
import CanvasLoader from "@/app/components/Loading";
import PixelHeart from "../PixelHeart";
import Link from "next/link";

// todo: load transformed(compressed) glb first(if low speed), and then load the original glb?

// tips: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/animateMotion
// Main component that wraps the 3D scene in a styled container
export default function SintRobot() {
  const ref = useRef();

  return (
    <>
      <div className="relative h-0 w-full translate-z-6 scale-75">
        <div className="absolute top-[85vh] z-10 flex h-full w-full flex-col items-center justify-center">
          <h1
            className="pointer-events-none rounded-3xl bg-black/35 px-[3vw] py-[2vw] text-center leading-[1.1] font-light tracking-tight text-white opacity-90"
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
      <section ref={ref} className="relative h-[calc(100vh-64px)] w-full backdrop-blur-[2px]">
        <div
          className="spark absolute top-6 left-6 z-50 size-1 rounded-full bg-white"
          style={{ boxShadow: "0 0 5px 1px #fff" }}
        />
        <svg className="absolute top-6 left-0 z-20 w-full" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="#fff0" strokeWidth="0.1" d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />

          <circle r="0.3" className="spark" fill="white">
            <animateMotion
              dur="13s"
              repeatCount="indefinite"
              path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
            />
          </circle>
        </svg>
        <div className="absolute top-6 left-0 aspect-[1.3] h-full rounded-full bg-radial from-indigo-500/60 from-5% via-indigo-700/5 via-50% to-transparent to-80% opacity-50" />
        <Canvas
          shadows // Enable shadow rendering
          dpr={[1, 1.5]} // Device pixel ratio for crisp rendering
          gl={{ antialias: false }} // Disable antialiasing for performance
          camera={{ position: [1.5, -2, 8], fov: 8, near: 0.1, far: 100 }} // Camera setup
          eventSource={ref}
        >
          {/* <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={8} near={0.1} far={100} /> */}
          <ambientLight intensity={5} color="#fdd" />
          <directionalLight position={[2, 5, 2]} intensity={3} color="#1af" />
          <directionalLight position={[-2, 0, -0.3]} intensity={6} color="#fff" />

          <Suspense fallback={null}>
            <Model scale={0.02} position={[0, -2.8, 0]} />
          </Suspense>
          <Rig />
        </Canvas>
        <div className="h-[1px] w-full bg-linear-to-r from-transparent from-10% via-white/30 to-transparent to-90%" />
      </section>
    </>
  );
}

function Rig() {
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
