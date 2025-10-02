"use client";
// import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { useGLTF, useAnimations } from "@react-three/drei";

// todo: load transformed(compressed) glb first(if low speed), and then load the original glb?

// const maskMaterial = new THREE.MeshStandardMaterial({
//   color: "#fff",
//   roughness: 0.3,
//   metalness: 0.2,
//   transparent: true,
//   opacity: 0.03,
// });

export default function SintRobotModel() {
  const group = useRef(null);
  // const { scene, animations } = useGLTF("/assets/models/robot_2-transformed.glb");
  const { scene, animations } = useGLTF("/assets/models/robot_2.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // actions["idle"].reset().fadeIn(1.5).play();
    actions["idle"].play();
  }, [actions]);

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
