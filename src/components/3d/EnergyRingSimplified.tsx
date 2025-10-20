"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ref: https://www.shadertoy.com/view/3tBGRm

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Simplified Fragment Shader (reduced quality for better performance)
const fragmentShaderSimple = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform float qualityLevel; // 0.5 = half quality, 1.0 = full quality
  varying vec2 vUv;

  // Simplified hash (faster than hash33)
  float hash(vec2 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * (p.x + p.y));
  }

  // Simplified 2D noise (much faster than 3D Simplex)
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  vec4 extractAlpha(vec3 colorIn) {
    vec4 colorOut;
    float maxValue = min(max(max(colorIn.r, colorIn.g), colorIn.b), 1.0);
    if (maxValue > 1e-5) {
      colorOut.rgb = colorIn.rgb * (1.0 / maxValue);
      colorOut.a = maxValue;
    } else {
      colorOut = vec4(0.0);
    }
    return colorOut;
  }

  #define BG_COLOR vec3(0.0)
  #define time iTime

  const vec3 color1 = vec3(0.611765, 0.262745, 0.996078);
  const vec3 color2 = vec3(0.298039, 0.760784, 0.913725);
  const vec3 color3 = vec3(0.062745, 0.078431, 0.600000);
  const float innerRadius = 0.6;

  float light1(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * attenuation);
  }

  float light2(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * dist * attenuation);
  }

  void draw(out vec4 _FragColor, in vec2 vUv) {
    vec2 uv = vUv;
    float ang = atan(uv.y, uv.x);
    float len = length(uv);
    float v0, v1, v2, v3, cl;
    float r0, d0, n0;
    float d;

    // Simplified ring with 2D noise (adaptive quality)
    float noiseScale = 0.65 * qualityLevel;
    n0 = noise(uv * noiseScale + time * 0.5) * 0.5 + 0.5;
    r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
    d0 = distance(uv, r0 / len * uv);
    v0 = light1(1.0, 10.0, d0);
    v0 *= smoothstep(r0 * 1.05, r0, len);
    cl = cos(ang + time * 2.0) * 0.5 + 0.5;

    // high light
    float a = time * -1.0;
    vec2 pos = vec2(cos(a), sin(a)) * r0;
    d = distance(uv, pos);
    v1 = light2(1.5, 5.0, d);
    v1 *= light1(1.0, 50.0, d0);

    // back decay
    v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);

    // hole
    v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

    // color
    vec3 col = mix(color1, color2, cl);
    col = mix(color3, col, v0);
    col = (col + v1) * v2 * v3;
    col.rgb = clamp(col.rgb, 0.0, 1.0);

    _FragColor = extractAlpha(col);
  }

  void main() {
    vec2 uv = (vUv * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

    vec4 col;
    draw(col, uv);

    vec3 bg = BG_COLOR;

    gl_FragColor = vec4(mix(bg, col.rgb, col.a), col.a);
  }
`;

const qualitySettings = {
  shader: fragmentShaderSimple,
  resolution: new THREE.Vector2(128, 128), // only affects aspect ratio, does not affect actual rendering pixels
  qualityLevel: 0.3,
  pixelRatio: 1,
};

const uniforms = {
  iTime: { value: 0 },
  iResolution: { value: qualitySettings.resolution },
  qualityLevel: { value: qualitySettings.qualityLevel },
};

const SPEED = 0.8;

export default function EnergyRingSimplified() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();

  // set low pixel ratio
  useEffect(() => {
    gl.setPixelRatio(qualitySettings.pixelRatio);
  }, [gl]);

  // FPS monitoring
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.iTime.value = state.clock.getElapsedTime() * SPEED;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={qualitySettings.shader}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
