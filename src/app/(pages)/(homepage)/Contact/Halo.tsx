"use client";

import { Canvas } from "@react-three/fiber";
// import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Suspense } from "react";
import EnergyRingSimplified from "@/components/3d/EnergyRingSimplified";
import { cn } from "@/lib/utils";

export default function Halo({ isIntersecting }: { isIntersecting: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 left-0 -z-10 h-full w-full transition-opacity delay-300 duration-750 ease-out will-change-[opacity]",
        isIntersecting ? "opacity-75" : "opacity-0",
      )}
    >
      {/* <Canvas camera={{ position: [5, 5, 5], fov: 30, near: 1, far: 100 }}>
          <Sphere args={[1, 100, 200]} scale={1.8}>
            <ambientLight intensity={1} />
            <directionalLight intensity={3} position={[3, 2, 1]} />
            <MeshDistortMaterial color="#1e7fcf" attach="material" distort={0.5} speed={2} />
          </Sphere>
        </Canvas> */}
      {isIntersecting && (
        <Canvas
          camera={{
            position: [0, 0, 6],
            fov: 8.6,
          }}
          gl={{
            alpha: true, // Enable transparency in the WebGL context so the background shows through
            antialias: false, // Enable anti-aliasing for smoother edges in the 3D rendering
          }}
          dpr={1}
          // onCreated={({ gl }) => {
          //   gl.setSize(256, 256, false); // force set render resolution
          // }}
        >
          <Suspense fallback={null}>
            <EnergyRingSimplified />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
