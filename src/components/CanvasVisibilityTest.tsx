"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

/**
 * 性能监控组件 - 在 Canvas 内部使用
 */
function PerformanceTracker({ onUpdate }: { onUpdate: (fps: number, frames: number) => void }) {
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsRef = useRef(60);
  const { gl } = useThree();

  useFrame(() => {
    frameCountRef.current++;
    const currentTime = performance.now();

    // 每秒计算一次 FPS
    if (currentTime - lastTimeRef.current >= 1000) {
      fpsRef.current = frameCountRef.current;
      lastTimeRef.current = currentTime;
      frameCountRef.current = 0;
    }

    onUpdate(fpsRef.current, frameCountRef.current);
  });

  return null;
}

/**
 * 旋转的球体 - 用于可视化渲染状态
 */
function RotatingSphere() {
  const meshRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial color="#4f46e5" attach="material" distort={0.4} speed={2} />
    </Sphere>
  );
}

/**
 * Canvas 可见性测试组件
 */
export default function CanvasVisibilityTest() {
  const [method, setMethod] = useState<"visible" | "display-none" | "parent-display-none" | "conditional">("visible");

  // 性能统计
  const [stats, setStats] = useState({
    fps: 0,
    totalFrames: 0,
    renderCalls: 0,
  });

  // 用于重置统计
  const statsResetTime = useRef(performance.now());

  const handleUpdate = (fps: number, frames: number) => {
    setStats((prev) => ({
      fps,
      totalFrames: prev.totalFrames + 1,
      renderCalls: prev.renderCalls + 1,
    }));
  };

  // 切换方法时重置统计
  useEffect(() => {
    setStats({ fps: 0, totalFrames: 0, renderCalls: 0 });
    statsResetTime.current = performance.now();
  }, [method]);

  const elapsedTime = ((performance.now() - statsResetTime.current) / 1000).toFixed(1);

  return (
    <div className="mx-auto max-w-6xl space-y-6 rounded-lg border border-gray-700 bg-gray-900 p-6">
      <h2 className="text-2xl font-bold text-white">🧪 Canvas 可见性渲染测试</h2>

      {/* 控制按钮 */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setMethod("visible")}
          className={`rounded-lg px-4 py-2 font-semibold transition-all ${
            method === "visible" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          ✅ Visible (完全可见)
        </button>

        <button
          onClick={() => setMethod("display-none")}
          className={`rounded-lg px-4 py-2 font-semibold transition-all ${
            method === "display-none" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          🚫 Canvas display:none
        </button>

        <button
          onClick={() => setMethod("parent-display-none")}
          className={`rounded-lg px-4 py-2 font-semibold transition-all ${
            method === "parent-display-none" ? "bg-orange-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          📦 Parent display:none
        </button>

        <button
          onClick={() => setMethod("conditional")}
          className={`rounded-lg px-4 py-2 font-semibold transition-all ${
            method === "conditional" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          ⚡ Conditional Render
        </button>
      </div>

      {/* 性能统计面板 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="text-sm text-gray-400">FPS</div>
          <div className={`text-3xl font-bold ${stats.fps < 30 ? "text-red-500" : stats.fps < 50 ? "text-yellow-500" : "text-green-500"}`}>
            {stats.fps}
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <div className="text-sm text-gray-400">Total Frames</div>
          <div className="text-3xl font-bold text-blue-400">{stats.totalFrames}</div>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <div className="text-sm text-gray-400">Render Calls</div>
          <div className="text-3xl font-bold text-purple-400">{stats.renderCalls}</div>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <div className="text-sm text-gray-400">Elapsed Time</div>
          <div className="text-3xl font-bold text-cyan-400">{elapsedTime}s</div>
        </div>
      </div>

      {/* 实时状态指示器 */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-300">当前状态:</div>
            <div className="mt-1 text-lg text-white">{getStatusText(method)}</div>
          </div>
          <div className={`size-4 rounded-full ${stats.renderCalls > 0 ? "animate-pulse bg-green-500" : "bg-red-500"}`} />
        </div>
      </div>

      {/* Canvas 渲染区域 */}
      <div className="relative">
        {/* 方法 1: 直接在 Canvas 上设置 display:none */}
        {method !== "conditional" && method !== "parent-display-none" && (
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg border-2 border-gray-700">
            <Canvas
              style={{
                display: method === "display-none" ? "none" : "block",
              }}
              camera={{ position: [3, 3, 3], fov: 50 }}
              gl={{
                antialias: true,
                powerPreference: "high-performance",
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <RotatingSphere />
              <PerformanceTracker onUpdate={handleUpdate} />
            </Canvas>
            {method === "display-none" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <p className="text-xl font-bold text-red-400">Canvas display:none</p>
              </div>
            )}
          </div>
        )}

        {/* 方法 2: 父元素设置 display:none */}
        {method === "parent-display-none" && (
          <div
            className="relative h-[400px] w-full overflow-hidden rounded-lg border-2 border-orange-500"
            style={{ display: "none" }}
          >
            <Canvas
              camera={{ position: [3, 3, 3], fov: 50 }}
              gl={{
                antialias: true,
                powerPreference: "high-performance",
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <RotatingSphere />
              <PerformanceTracker onUpdate={handleUpdate} />
            </Canvas>
          </div>
        )}

        {method === "parent-display-none" && (
          <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-orange-500 bg-black/80">
            <p className="text-xl font-bold text-orange-400">Parent display:none</p>
          </div>
        )}

        {/* 方法 3: 条件渲染 */}
        {method === "conditional" && (
          <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-green-500 bg-black/80">
            <p className="text-xl font-bold text-green-400">Canvas 已完全卸载 (Unmounted)</p>
          </div>
        )}

        {method === "visible" && (
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg border-2 border-blue-500">
            <Canvas
              camera={{ position: [3, 3, 3], fov: 50 }}
              gl={{
                antialias: true,
                powerPreference: "high-performance",
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <RotatingSphere />
              <PerformanceTracker onUpdate={handleUpdate} />
            </Canvas>
          </div>
        )}
      </div>

      {/* 结论说明 */}
      <div className="rounded-lg border border-blue-500 bg-blue-950/30 p-4">
        <h3 className="mb-3 text-lg font-bold text-blue-300">📊 测试结论</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <ResultItem method={method} type="display-none" stats={stats} />
          <ResultItem method={method} type="parent-display-none" stats={stats} />
          <ResultItem method={method} type="conditional" stats={stats} />
        </div>
      </div>
    </div>
  );
}

function getStatusText(method: string): string {
  switch (method) {
    case "visible":
      return "Canvas 正常渲染中";
    case "display-none":
      return "Canvas 设置了 display:none";
    case "parent-display-none":
      return "父元素设置了 display:none";
    case "conditional":
      return "Canvas 未渲染（条件渲染）";
    default:
      return "";
  }
}

function ResultItem({ method, type, stats }: { method: string; type: string; stats: any }) {
  const isActive = method === type;
  if (!isActive && stats.renderCalls === 0) return null;

  let icon = "";
  let text = "";
  let conclusion = "";

  switch (type) {
    case "display-none":
      icon = "🚫";
      text = "Canvas display:none";
      conclusion = stats.renderCalls === 0 ? "✅ 停止渲染（DOM 存在）" : "⚠️ 仍在渲染";
      break;
    case "parent-display-none":
      icon = "📦";
      text = "Parent display:none";
      conclusion = stats.renderCalls === 0 ? "✅ 停止渲染（DOM 存在）" : "⚠️ 仍在渲染";
      break;
    case "conditional":
      icon = "⚡";
      text = "Conditional Render";
      conclusion = "✅ 完全卸载（DOM 不存在，内存释放）";
      break;
  }

  return (
    <div className={`flex items-center justify-between rounded p-2 ${isActive ? "bg-white/10" : ""}`}>
      <span>
        {icon} <strong>{text}:</strong> {conclusion}
      </span>
      {isActive && stats.renderCalls > 0 && <span className="text-xs text-red-400">({stats.renderCalls} calls)</span>}
    </div>
  );
}

