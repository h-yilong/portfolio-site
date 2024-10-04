// @ts-nocheck
import { type ReactNode, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const HeroCamera = ({ isMobile = false, children }: { isMobile: boolean; children: ReactNode }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, -20], 0.25, delta);

    if (groupRef?.current && !isMobile) {
      easing.dampE(groupRef.current.rotation, [-state.pointer.y / 3, state.pointer.x / 5, 0], 0.25, delta);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default HeroCamera;
