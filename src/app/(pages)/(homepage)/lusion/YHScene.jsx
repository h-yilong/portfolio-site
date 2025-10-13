"use client";

// Import Three.js core library for 3D math and utilities
import { Vector3, MathUtils } from "three";
// React hooks for state management and performance optimization
import { useRef, useReducer, useMemo, Fragment } from "react";
// React Three Fiber for React integration with Three.js
import { Canvas, useFrame } from "@react-three/fiber";
// Drei library for pre-built 3D components and utilities
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
// Rapier physics engine for realistic physics simulation
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
// Post-processing effects for enhanced visual quality
import { EffectComposer, N8AO } from "@react-three/postprocessing";
// Math utilities for smooth animations and transitions
import { easing } from "maath";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

// Array of accent colors that can be cycled through on click
const accents = ["#9333ea", "#4f39f6", "#20ffa0", "#ff4060", "#ffcc00"];

// Function that generates an array of material properties for the 3D objects
// Each object gets different colors and roughness values for visual variety
const shuffle = (accent = 0) => [
  { color: "#9333ea", roughness: 0.8 },
  { color: "#4f39f6", roughness: 0.1 },
  { color: "#ff4060", roughness: 0.85 },
  { color: "#ffcc00", roughness: 0.85 },
  { color: "#fff", roughness: 0.85 },
  { color: "#fff", roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true }, // Accent color, smooth, with lighting
  { color: accents[accent], roughness: 0.85, accent: true }, // Accent color, rough, with lighting
];

// Main component that wraps the 3D scene in a styled container
const YHScene = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: "0px -350px 0px -350px",
  });

  // State management for accent color cycling - increments on each click
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  // Memoized array of connector properties - regenerates when accent changes
  const connectors = useMemo(() => shuffle(accent), [accent]);

  return (
    <div
      // onClick={click}
      ref={ref}
      className={cn(
        "custom-cursor aspect-[1.6] w-full overflow-hidden rounded-3xl transition-opacity delay-200 duration-500 ease-out",
        isIntersecting ? "opacity-100" : "opacity-0",
      )}
    >
      {isIntersecting && (
        <Canvas
          onClick={click} // Click handler to cycle through accent colors
          // frameloop="demand"
          shadows // Enable shadow rendering
          dpr={[1, 2]} // Device pixel ratio for crisp rendering
          gl={{ antialias: false }} // Disable antialiasing for performance
          camera={{ position: [0, 0, 15], fov: 20, near: 1, far: 100 }} // Camera setup
          // eventSource={ref}
          // eventPrefix="offset"
        >
          <color attach="background" args={["#223"]} />

          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={1} />

          {/* Spotlight for dramatic lighting and shadows */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />

          {/* Physics simulation with zero gravity for floating objects */}
          <Physics /*debug*/ gravity={[0, 0, 0]}>
            {/* Mouse pointer that interacts with physics objects */}
            <Pointer />
            <Letter position={[10, 10, 5]}>
              <LetterModel letter="Y">
                <MeshTransmissionMaterial
                  clearcoat={1} // Glass-like clear coating
                  thickness={0.1} // Material thickness for refraction
                  anisotropicBlur={0.1} // Blur effect for realism
                  chromaticAberration={0.1} // Color separation effect
                  samples={8} // Quality of transmission effect
                  resolution={512} // Resolution of transmission calculations
                />
              </LetterModel>
            </Letter>
            {/* Generate multiple connector objects with different properties */}
            {connectors.map((props, i) => (
              <Fragment key={i}>
                <Letter {...props} letter="Y" />
                <Letter {...props} letter="H" />
              </Fragment>
            ))}

            {/* Special connector with glass-like transmission material */}
            <Letter position={[10, 10, 5]}>
              <LetterModel letter="H">
                <MeshTransmissionMaterial
                  clearcoat={1} // Glass-like clear coating
                  thickness={0.1} // Material thickness for refraction
                  anisotropicBlur={0.1} // Blur effect for realism
                  chromaticAberration={0.1} // Color separation effect
                  samples={8} // Quality of transmission effect
                  resolution={512} // Resolution of transmission calculations
                />
              </LetterModel>
            </Letter>
          </Physics>

          {/* Post-processing effects for enhanced visual quality */}
          <EffectComposer disableNormalPass multisampling={8}>
            {/* Ambient occlusion for realistic shadowing */}
            <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
          </EffectComposer>

          {/* Environment lighting setup with multiple light sources */}

          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={3} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
              <Lightformer
                form="ring"
                color="#4c1d95"
                intensity={15}
                onUpdate={(self) => self.lookAt(0, 0, 0)}
                position={[5, 5, 10]}
                scale={10}
              />
            </group>
          </Environment>
        </Canvas>
      )}
    </div>
  );
};

// Connector component that represents a physics-enabled 3D object
function Letter({
  position, // Optional fixed position
  children, // Custom child components (like glass material)
  vec = new Vector3(), // Reusable vector for calculations
  scale, // Optional scaling
  r = MathUtils.randFloatSpread, // Random position generator function
  accent, // Whether this object should emit light
  ...props // Material properties (color, roughness, etc.)
}) {
  const api = useRef(null); // Reference to the physics body
  // Generate random position if none provided, or use the given position
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);

  // Animation loop - runs every frame to apply physics forces
  useFrame((_state, delta) => {
    delta = Math.min(0.1, delta); // Cap delta time for stability
    // Apply impulse to keep objects centered (spring-like behavior)
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2));
  });

  return (
    <RigidBody
      linearDamping={4} // Air resistance for linear movement
      angularDamping={1} // Air resistance for rotation
      friction={0.1} // Surface friction
      position={pos} // Initial position
      ref={api} // Reference for physics control
      // colliders={false} // Disable auto-collider generation
    >
      {/* Render custom children or default Model component */}
      {children ? children : <LetterModel {...props} />}
      {/* Add point light for accent objects to make them glow */}
      {accent && <pointLight intensity={3} position={[-1, 0, 2]} distance={2.5} color={props.color} />}
    </RigidBody>
  );
}

// Pointer component that follows the mouse cursor and interacts with physics objects
function Pointer({ vec = new Vector3() }) {
  const ref = useRef(null);

  // Animation loop that updates the pointer position based on mouse movement
  useFrame(({ mouse, viewport }) => {
    // Convert mouse coordinates to 3D world coordinates
    // Mouse coordinates are normalized (-1 to 1), so we scale by viewport dimensions
    ref.current?.setNextKinematicTranslation(
      vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0),
    );
  });

  return (
    <RigidBody
      position={[0, 0, 0]} // Initial position at origin
      type="kinematicPosition" // Kinematic body that can be moved but not affected by forces
      colliders={false} // Disable auto-collider generation
      ref={ref} // Reference for position control
    >
      {/* Spherical collider that pushes other objects away */}
      <BallCollider args={[1.5]} />
    </RigidBody>
  );
}

// Model component that renders a 3D letter "H" with customizable materials
function LetterModel({ letter = "Y", children, color = "white", roughness = 0, ...props }) {
  const ref = useRef(null);
  // Load the 3D model file (GLTF format) containing the letter "H" or "Y" geometry
  const { nodes, materials: _ } = useGLTF(`/assets/models/letter-${letter}-transformed.glb`);

  // Animation loop for smooth color transitions
  useFrame((_state, delta) => {
    // Smoothly interpolate the material color to the target color
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });

  return (
    <mesh
      ref={ref} // Reference for material manipulation
      castShadow // This object casts shadows
      receiveShadow // This object receives shadows
      scale={0.38} // Scale down the model to 36% of original size
      geometry={nodes.Capsule.geometry} // Use the geometry from the loaded model
      material={nodes.Capsule.material} // Use the material from the loaded model
      position={[0, 0, 0]}
    >
      {/* Override material properties for customization */}
      <meshStandardMaterial metalness={0} roughness={roughness} />
      {/* Render any child components (like transmission materials) */}
      {children}
    </mesh>
  );
}

// useGLTF.preload("/assets/models/letter-Y-transformed.glb");
// useGLTF.preload("/assets/models/letter-H-transformed.glb");

export default YHScene;
