"use client";

// React Three Fiber for React integration with Three.js
import { Canvas } from "@react-three/fiber";
// Drei library for pre-built 3D components and utilities
import { useGLTF, Environment, Lightformer } from "@react-three/drei";
// Post-processing effects for enhanced visual quality
import { EffectComposer, N8AO } from "@react-three/postprocessing";
// Math utilities for smooth animations and transitions

// Main component that wraps the 3D scene in a styled container
export const LetterYApp = () => (
  <section className="mx-auto aspect-[1.8] max-w-3xl overflow-hidden rounded-3xl">
    <Scene />
  </section>
);

// Main 3D scene component that sets up the Canvas and all 3D elements
function Scene(props) {
  return (
    <Canvas
      shadows // Enable shadow rendering
      dpr={[1, 1.5]} // Device pixel ratio for crisp rendering
      gl={{ antialias: false }} // Disable antialiasing for performance
      camera={{ position: [0, 0, 15], fov: 20, near: 1, far: 20 }} // Camera setup
      {...props}
    >
      {/* Background color - dark blue-gray */}
      <color attach="background" args={["#121221"]} />

      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={1} />

      {/* Spotlight for dramatic lighting and shadows */}
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={8} castShadow />

      <LetterModel position={[-1.3, -0.5, 0]} letter="Y" />
      <LetterModel position={[1.3, 0, 0]} letter="H" />

      {/* Post-processing effects for enhanced visual quality */}
      <EffectComposer disableNormalPass multisampling={8}>
        {/* Ambient occlusion for realistic shadowing */}
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>

      {/* Environment lighting setup with multiple light sources */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          {/* Various lightformers positioned around the scene for realistic lighting */}
          <Lightformer form="circle" intensity={8} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={8} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={8} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={8} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </Canvas>
  );
}

// Model component that renders a 3D letter "H" with customizable materials
function LetterModel({ letter = "H", children, color = "white", roughness = 0, ...props }) {
  // Load the 3D model file (GLTF format) containing the letter "H" or "Y" geometry
  const { nodes, materials: _ } = useGLTF(`/assets/models/letter-${letter}-transformed.glb`);

  return (
    <mesh
      castShadow // This object casts shadows
      receiveShadow // This object receives shadows
      scale={0.38} // Scale down the model to 36% of original size
      geometry={nodes.Capsule.geometry} // Use the geometry from the loaded model
      material={nodes.Capsule.material} // Use the material from the loaded model
      position={props.position} // Offset position to the left
    >
      {/* Override material properties for customization */}
      <meshStandardMaterial color="#ffcc00" metalness={0} roughness={0.3} />
      {/* Render any child components (like transmission materials) */}
      {children}
    </mesh>
  );
}

// useGLTF.preload("/assets/models/letter-Y-transformed.glb");
// useGLTF.preload("/assets/models/letter-H-transformed.glb");
