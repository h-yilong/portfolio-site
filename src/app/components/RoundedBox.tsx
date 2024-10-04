// @ts-nocheck
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { animated } from "@react-spring/three";

// 圆角立方体函数 (可以放在 utils 文件中)
function createRoundedBox(width, height, depth, radius, smoothness) {
  const shape = new THREE.Shape();
  const eps = 0.00001;
  const radius0 = radius - eps;

  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius0,
    bevelThickness: radius,
    curveSegments: smoothness,
  });

  geometry.center();

  return geometry;
}

// 创建圆角立方体几何体
const geometry = createRoundedBox(1.4, 1.4, 1.4, 0.2, 10);

// 自定义立方体组件
const RoundedBox = ({ show = false, opacity = 1, image, position, rotation, scale, speed = 0.01 }) => {
  const boxRef = useRef();
  // 加载 logo 图片材质
  const texture = useTexture(image);

  useFrame(() => {
    if (boxRef?.current) {
      boxRef.current.rotation.x += speed;
      boxRef.current.rotation.y += speed;

      if (show && boxRef.current.position.x < position[0]) {
        boxRef.current.position.x += 0.3;
      }

      // if (show) {
      //   boxRef.current.position.x = open ? 6 : 0;
      //   boxRef.current.position.y = open ? 2 : 0;
      //   boxRef.current.position.z = open ? 6 : -4;
      // }
    }
  });

  if (!show) {
    return null;
  }

  return (
    <animated.mesh ref={boxRef} scale={scale} position={position} geometry={geometry} rotation={rotation}>
      <animated.meshStandardMaterial
        transparent
        opacity={opacity}
        map={texture}
        roughness={0.8} // 磨砂效果
        metalness={0.3} // 金属感
      />
    </animated.mesh>
  );
};

export default RoundedBox;
