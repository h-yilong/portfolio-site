"use client";
import { TextureLoader } from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function SintRobotModelOptimized({ onLoadComplete }) {
  const group = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 方案 A: 使用 useGLTF 的 onProgress 回调来配置加载器
  const { scene, animations } = useGLTF(
    "/assets/t-2048/robot.gltf",
    true, // useDraco
    true, // useMeshopt
    (loader) => {
      // 配置 loader 的 crossOrigin 设置
      // 这确保了与 preload 使用相同的 CORS 策略
      if (loader.manager) {
        const textureLoader =
          loader.manager.getHandler(".webp") || loader.manager.getHandler(".jpg") || new TextureLoader(loader.manager);
        textureLoader.setCrossOrigin("anonymous");
      }
    },
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (scene && !isLoaded) {
      setIsLoaded(true);
      onLoadComplete?.();

      // 记录加载完成
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("model-loaded", {
            detail: { model: "SintRobot", timestamp: performance.now() },
          }),
        );
      }
    }
  }, [scene, isLoaded, onLoadComplete]);

  useEffect(() => {
    if (isLoaded && actions["idle"]) {
      actions["idle"].play();
    }
  }, [actions, isLoaded]);

  console.log("render sint robot (optimized)");

  return (
    <group ref={group} scale={0.02} position={[0, -2.8, 0]} dispose={null}>
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
          opacity={0.5}
          material={materials["Transparency_shader.001"]}
          skeleton={nodes.mask.skeleton}
        />
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

// ⚠️ 关键：使用 useGLTF.preload 而不是 React 的 preload
// 这会使用与实际加载相同的 Three.js 加载器和配置
useGLTF.preload("/assets/t-2048/robot.gltf");

// 导出预加载函数，供其他组件使用
export const preloadRobotModel = () => {
  useGLTF.preload("/assets/t-2048/robot.gltf");
};

// 监控加载性能
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.addEventListener("model-loaded", (e) => {
    console.log("Model loaded:", e.detail);
  });
}
