// @ts-nocheck
"use client";

// Add this at the top of the file to declare the JSX namespace for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      ambientLight: any;
      directionalLight: any;
      meshMatcapMaterial: any;
    }
  }
}

import { type ReactNode, Suspense, useEffect, useState } from "react";
import { Canvas, type ThreeEvent } from "@react-three/fiber";

import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/three";
import RoundedBox from "../RoundedBox";
import HeroCamera from "../HeroCamera";
// import CanvasLoader from '@/app/components/Loading';
import styles from "./index.module.css";
import { clsx } from "@/app/lib/utils";
import MacBookModel from "./MacbookModel";

export default function FloatingLaptop({ rsc }: { rsc: ReactNode }) {
  // This flag controls open state, alternates between true & false
  const [open, setOpen] = useState(false);
  // We turn this into a spring animation that interpolates between 0 and 1
  const props = useSpring({ open: Number(open) });

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1200);
  }, []);

  return (
    <div className={clsx("absolute right-0 z-10", styles.container)}>
      <Suspense fallback="calling API...">{rsc}</Suspense>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -30], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 10, -10]} intensity={1} />
        <animated.directionalLight
          position={[3, 10, 10]}
          intensity={3}
          color={props.open.to([0, 1], ["#adf", "#1af"])}
        />
        <animated.directionalLight
          position={[-5, 10, 10]}
          intensity={3}
          color={props.open.to([0, 1], ["#faa", "#d25578"])}
        />

        {/* <Suspense fallback={<CanvasLoader />}> */}
        <group
          rotation={[0, Math.PI, 0]}
          onClick={(e: ThreeEvent<MouseEvent>) => (e.stopPropagation(), setOpen(!open))}
        >
          <HeroCamera isMobile={!open}>
            <MacBookModel open={open} hinge={props.open.to([0, 1], [1.575, -0.425])} />
            <RoundedBox
              show={open}
              opacity={props.open.to([0, 1], [0, 1]) as number}
              image="/assets/images/react.svg"
              speed={0.02}
              scale={props.open.to([0, 1], [0, 0.7])}
              position={[6, 2, 6]}
              rotation={[0.6, 0, 0]}
            />
            <RoundedBox
              show={open}
              opacity={props.open.to([0, 1], [0, 1]) as number}
              image="/assets/images/tailwind.svg"
              speed={0.012}
              scale={props.open.to([0, 1], [0, 0.6])}
              position={[5.5, -1, 2]}
              rotation={[0.9, 0.6, 0]}
            />
            <RoundedBox
              show={open}
              opacity={props.open.to([0, 1], [0, 1]) as number}
              image="/assets/images/js.svg"
              speed={0.015}
              scale={props.open.to([0, 1], [0, 0.5])}
              position={[-5, 4.5, 2]}
              rotation={[0.9, 0.3, 0]}
            />
            <RoundedBox
              show={open}
              opacity={props.open.to([0, 1], [0, 1]) as number}
              image="/assets/images/nodejs.svg"
              speed={0.018}
              scale={props.open.to([0, 1], [0, 0.6])}
              position={[-6, -1, 6]}
              rotation={[0.3, 0.6, 0]}
            />
          </HeroCamera>
        </group>
      </Canvas>
    </div>
  );
}
