"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ref: https://www.shadertoy.com/view/3tBGRm
// Optimized version for mobile devices

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

// Original high-quality shader
const fragmentShaderFull = `
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  // noise from https://www.shadertoy.com/view/4sc3z2
  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(.1031,.11369,.13787));
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3(p3.x+p3.y, p3.x+p3.z, p3.y+p3.z)*p3.zyx);
  }

  float snoise3(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;

    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);

    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);

    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K1);
    vec3 d3 = d0 - 0.5;

    vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
    vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));

    return dot(vec4(31.316), n);
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

  #define BG_COLOR (vec3(sin(iTime)*0.5+0.5) * 0.0 + vec3(0.0))
  #define time iTime

  const vec3 color1 = vec3(0.611765, 0.262745, 0.996078);
  const vec3 color2 = vec3(0.298039, 0.760784, 0.913725);
  const vec3 color3 = vec3(0.062745, 0.078431, 0.600000);
  const float innerRadius = 0.6;
  const float noiseScale = 0.65;

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
    float r, d;

    // ring
    n0 = snoise3( vec3(uv * noiseScale, time * 0.5) ) * 0.5 + 0.5;
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
    v1 *= light1(1.0, 50.0 , d0);

    // back decay
    v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);

    // hole
    v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

    // color
    vec3 c = mix(color1, color2, cl);
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

// Detect device capability
function getDeviceQuality() {
  if (typeof window === "undefined") return "high";

  // Check for mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Check WebGL capabilities
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) return "low";

  // @ts-expect-error - WebGL debug info
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  // @ts-expect-error - WebGL debug info
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";

  // Check for high-end GPU
  const isHighEndGPU = /nvidia|amd|radeon|geforce/i.test(renderer);

  // Check screen resolution
  const pixelRatio = window.devicePixelRatio || 1;
  const screenPixels = window.innerWidth * window.innerHeight * pixelRatio * pixelRatio;
  const isHighRes = screenPixels > 2073600; // > 1080p

  // Decision logic
  if (isMobile) {
    return isHighEndGPU ? "medium" : "low";
  }

  if (isHighRes && !isHighEndGPU) {
    return "medium";
  }

  return "high";
}

interface EnergyRingOptimizedProps {
  /** Size of the plane (default: 5) */
  size?: number;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
  /** Quality level: "auto" | "low" | "medium" | "high" (default: "auto") */
  quality?: "auto" | "low" | "medium" | "high";
  /** Callback for FPS updates */
  onFPSUpdate?: (_fps: number) => void;
}

export default function EnergyRingOptimized({
  size = 5,
  speed = 1,
  quality = "auto",
  onFPSUpdate,
}: EnergyRingOptimizedProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl, size: _canvasSize } = useThree();

  const [actualQuality, setActualQuality] = useState<"low" | "medium" | "high">("high");
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());

  // Determine quality on mount
  useEffect(() => {
    if (quality === "auto") {
      const detectedQuality = getDeviceQuality();
      setActualQuality(detectedQuality as "low" | "medium" | "high");
      console.log(`🎨 EnergyRing: Auto-detected quality: ${detectedQuality}`);
    } else {
      setActualQuality(quality);
    }
  }, [quality]);

  // Quality settings
  const qualitySettings = useMemo(() => {
    switch (actualQuality) {
      case "low":
        return {
          shader: fragmentShaderSimple,
          resolution: new THREE.Vector2(512, 512),
          qualityLevel: 0.5,
          pixelRatio: Math.min(window.devicePixelRatio, 1),
        };
      case "medium":
        return {
          shader: fragmentShaderSimple,
          resolution: new THREE.Vector2(1024, 1024),
          qualityLevel: 0.75,
          pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        };
      case "high":
        return {
          shader: fragmentShaderFull,
          resolution: new THREE.Vector2(2048, 2048),
          qualityLevel: 1.0,
          pixelRatio: window.devicePixelRatio,
        };
    }
  }, [actualQuality]);

  // Set pixel ratio based on quality
  useEffect(() => {
    gl.setPixelRatio(qualitySettings.pixelRatio);
  }, [gl, qualitySettings.pixelRatio]);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: qualitySettings.resolution },
      qualityLevel: { value: qualitySettings.qualityLevel },
    }),
    [qualitySettings],
  );

  // FPS monitoring
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.iTime.value = state.clock.getElapsedTime() * speed;
    }

    // Calculate FPS
    frameCount.current++;
    const now = Date.now();
    const elapsed = now - lastTime.current;

    if (elapsed >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / elapsed);
      setFps(currentFps);
      onFPSUpdate?.(currentFps);
      frameCount.current = 0;
      lastTime.current = now;

      // Adaptive quality: downgrade if FPS is too low
      if (currentFps < 30 && actualQuality !== "low") {
        const newQuality = actualQuality === "high" ? "medium" : "low";
        console.warn(`⚠️ EnergyRing: Low FPS detected (${currentFps}), downgrading to ${newQuality}`);
        setActualQuality(newQuality);
      }
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[size, size]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={qualitySettings.shader}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* FPS indicator (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <mesh position={[size / 2 - 1, size / 2 - 0.5, 0.1]}>
          <planeGeometry args={[1.5, 0.5]} />
          <meshBasicMaterial
            color={fps >= 50 ? "#00ff00" : fps >= 30 ? "#ffaa00" : "#ff0000"}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </>
  );
}
