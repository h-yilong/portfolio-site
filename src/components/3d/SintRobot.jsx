"use client";
// import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { useGLTF, useAnimations } from "@react-three/drei";

// todo: load transformed(compressed) glb first(if low speed), and then load the original glb?

// todo: 1. try removing all texture images in the model file(use .gltf instead?)
// todo: 2. try loading model and apply compressed material/images
// todo: 3. load the HD webp images and then replaced the compressed images?

// const maskMaterial = new THREE.MeshStandardMaterial({
//   color: "#fff",
//   roughness: 0.3,
//   metalness: 0.2,
//   transparent: true,
//   opacity: 0.03,
// });

export default function SintRobotModel({ onLoadComplete }) {
  const group = useRef(null);
  // const { scene, animations } = useGLTF("/assets/models/robot_2-transformed.glb");
  // const { scene, animations } = useGLTF("/assets/models/robot_2.glb");
  const [isLoaded, setIsLoaded] = useState(false);
  const { scene, animations } = useGLTF("/assets/t-2048/robot.gltf");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (scene && !isLoaded) {
      setIsLoaded(true);
      onLoadComplete?.();
    }
  }, [scene, isLoaded, onLoadComplete]);

  useEffect(() => {
    if (isLoaded && actions["idle"]) {
      // actions["idle"].reset().fadeIn(1.5).play();
      actions["idle"].play();
    }
  }, [actions, isLoaded]);

  console.log("render sint robot");

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
          // material={maskMaterial}
          skeleton={nodes.mask.skeleton}
        >
          {/* <meshStandardMaterial color="#fff" roughness={0.8} metalness={0.8} transparent opacity={0.5} /> */}
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

useGLTF.preload("/assets/t-2048/robot.gltf");
