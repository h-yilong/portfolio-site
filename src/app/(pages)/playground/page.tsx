"use client";
import AnimatedText1 from "@/components/AnimatedText1";
import AnimatedText2 from "@/components/AnimatedText2";
import { App as CardsApp } from "@/app/(pages)/(homepage)/3d/cards/App";
import { App as ShoesApp } from "@/app/(pages)/(homepage)/3d/shoes/App";
import { LetterYApp } from "@/app/(pages)/(homepage)/lusion/LetterY";

import AnimatedCharacters from "@/components/AnimatedCharacters";
import { useScroll } from "@/hooks/scroll/useScroll";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";



export default function PlaygroundPage() {
  const scrollContainerRef = useRef(null);
  // Use the scroll hook to track scroll progress
  const { position } = useScroll({
    throttle: 50,
    useRAF: false,
    element: scrollContainerRef.current,
  });

  // Calculate the line length based on scroll progress
  // The line should grow from 0 to full length as you scroll
  const totalLineLength = 2600; // Total length of the path
  // const lineProgress = Math.min(position.progressY, 1); // Clamp between 0 and 1
  // const currentLineLength = lineProgress * 2.5 * totalLineLength;
  const currentLineLength = (position.y / 1800) * totalLineLength; // ends at 1800px

  // Calculate strokeDashoffset to animate the line
  // When progress is 0, offset should be totalLineLength (line hidden)
  // When progress is 1, offset should be 0 (line fully visible)
  const strokeDashoffset = totalLineLength - currentLineLength;

  return (
    <>
      <div className="fixed top-8 right-4 z-[9999] rounded-lg bg-black/80 p-4 text-white backdrop-blur-xs">
        <div className="text-sm">
          <p>Scroll Progress: {(position.progressY * 100).toFixed(1)}%</p>
          <p>Line Length: {currentLineLength.toFixed(0)}px</p>
          <p>Position: {Math.round(position.y)}px</p>
        </div>
      </div>
      <div ref={scrollContainerRef} id="playground-page" className="parallax-wrapper mt-20 pt-16">
        <div>
          <h1 className="text-center text-[5vw] font-bold">Playground</h1>
          <svg className="absolute top-[500px] left-0 -z-10 w-full -translate-z-16 scale-165" viewBox="0 0 1440 1440">
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="-30.14"
                y1="161.59"
                x2="1464.65"
                y2="161.59"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#a2c9ff" />
                <stop offset=".37" stopColor="#0a87ea" />
                <stop offset=".66" stopColor="#256af4" />
                <stop offset="1" stopColor="#4548ff" />
              </linearGradient>
            </defs>
            <path
              className="transition-all duration-500 ease-in-out"
              fill="none"
              stroke="url(#linear-gradient)"
              strokeMiterlimit="10"
              strokeWidth="16px"
              strokeDashoffset={`${strokeDashoffset}px`}
              strokeLinecap="round"
              strokeDasharray="2500px, 5000px"
              d="M-28.22,68.15c232.81,57.5,322.25,174.12,276.75,383s-179,126-199,79c-19.85-46.65-8.59-101.06,48-126,59-26,134.69,22.22,149,151.55,14.31,129.33,66.66,185.58,194.78,244.95,128.12,59.37,312.5,3.12,621.88,142.19s343.12,298.44,397.34,392.19"
            />
          </svg>

          <div className="mx-auto h-52 w-fit snap-y snap-mandatory gap-2 overflow-y-auto scroll-smooth">
            <div className="snap-start">
              <div className="h-40 w-60 bg-indigo-500" />
            </div>
            <div className="snap-start">
              <div className="h-40 w-60 bg-rose-500" />
            </div>
            <div className="snap-start">
              <div className="h-40 w-60 bg-blue-500" />
            </div>
            <div className="snap-start">
              <div className="h-40 w-60 bg-amber-500" />
            </div>
            <div className="snap-start">
              <div className="h-40 w-60 bg-green-500" />
            </div>
            <div className="snap-start">
              <div className="h-40 w-60 bg-purple-500" />
            </div>
          </div>
          <section className="max-width mx-auto h-[500px]">
            <Canvas camera={{ position: [5, 5, 5], fov: 30, near: 1, far: 100 }}>
              <Sphere args={[1, 100, 200]} scale={1.8}>
                <ambientLight intensity={1} />
                <directionalLight intensity={3} position={[3, 2, 1]} />
                <MeshDistortMaterial color="#18f" attach="material" distort={0.5} speed={2} />
              </Sphere>
            </Canvas>
          </section>
          <div className="max-width mx-auto pt-6">
            <div>
              <AnimatedText1 />
            </div>

            <div>
              <AnimatedText2 text="Featured Work" />
            </div>

            <AnimatedCharacters element="h1" className="my-6 cursor-pointer text-4xl font-bold">
              Yilong HUANG
            </AnimatedCharacters>

            <LetterYApp />
            <ShoesApp />
            <CardsApp />
          </div>
        </div>
      </div>
    </>
  );
}
