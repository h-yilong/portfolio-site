"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { SmartCanvas } from "./SmartCanvas";

/**
 * 📊 Canvas 性能对比演示
 *
 * 比较三种隐藏方法：
 * 1. display: none
 * 2. 条件渲染
 * 3. SmartCanvas (混合策略)
 */
export default function CanvasPerformanceComparison() {
  const [method1Visible, setMethod1Visible] = useState(true); // display:none
  const [method2Visible, setMethod2Visible] = useState(true); // 条件渲染
  const [method3Visible, setMethod3Visible] = useState(true); // SmartCanvas

  const [stats, setStats] = useState({
    method1Mounted: true,
    method2Mounted: true,
    method3Mounted: true,
  });

  return (
    <div className="space-y-6 rounded-lg border border-gray-700 bg-gray-900 p-6">
      <h2 className="text-2xl font-bold text-white">📊 性能对比：三种隐藏方法</h2>

      {/* 对比表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="bg-gray-800 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-4 py-3">方法</th>
              <th className="px-4 py-3">DOM 存在</th>
              <th className="px-4 py-3">React 挂载</th>
              <th className="px-4 py-3">内存占用</th>
              <th className="px-4 py-3">切换速度</th>
              <th className="px-4 py-3">适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700 bg-gray-800/50">
              <td className="px-4 py-3 font-medium text-white">display:none</td>
              <td className="px-4 py-3">✅</td>
              <td className="px-4 py-3">
                <span className={stats.method1Mounted ? "text-green-400" : "text-red-400"}>
                  {stats.method1Mounted ? "✅ 挂载" : "❌ 卸载"}
                </span>
              </td>
              <td className="px-4 py-3">🟡 中</td>
              <td className="px-4 py-3">⚡ 快</td>
              <td className="px-4 py-3">频繁切换</td>
            </tr>
            <tr className="border-b border-gray-700 bg-gray-800/50">
              <td className="px-4 py-3 font-medium text-white">条件渲染</td>
              <td className="px-4 py-3">
                <span className={stats.method2Mounted ? "text-green-400" : "text-red-400"}>
                  {stats.method2Mounted ? "✅" : "❌"}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={stats.method2Mounted ? "text-green-400" : "text-red-400"}>
                  {stats.method2Mounted ? "✅ 挂载" : "❌ 卸载"}
                </span>
              </td>
              <td className="px-4 py-3">🟢 低</td>
              <td className="px-4 py-3">🐌 慢</td>
              <td className="px-4 py-3">长期隐藏</td>
            </tr>
            <tr className="bg-gray-800/50">
              <td className="px-4 py-3 font-medium text-white">SmartCanvas ⭐</td>
              <td className="px-4 py-3">
                <span className={stats.method3Mounted ? "text-green-400" : "text-red-400"}>
                  {stats.method3Mounted ? "✅" : "❌ (5s后)"}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={stats.method3Mounted ? "text-green-400" : "text-red-400"}>
                  {stats.method3Mounted ? "✅ 挂载" : "❌ 卸载"}
                </span>
              </td>
              <td className="px-4 py-3">🟢 动态</td>
              <td className="px-4 py-3">⚡ 两全其美</td>
              <td className="px-4 py-3">通用最佳</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 交互式演示 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 方法 1: display:none */}
        <div className="rounded-lg border border-red-500/50 bg-gray-800 p-4">
          <h3 className="mb-3 text-lg font-semibold text-white">方法 1: display:none</h3>
          <button
            onClick={() => setMethod1Visible(!method1Visible)}
            className={`mb-3 w-full rounded px-4 py-2 font-semibold ${
              method1Visible ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
          >
            {method1Visible ? "隐藏" : "显示"}
          </button>

          <div
            style={{ display: method1Visible ? "block" : "none" }}
            className="h-[200px] w-full rounded border border-gray-600"
          >
            <Canvas camera={{ position: [2, 2, 2] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 3, 3]} />
              <Sphere args={[0.8, 32, 32]}>
                <MeshDistortMaterial color="#ef4444" distort={0.3} speed={2} />
              </Sphere>
            </Canvas>
          </div>

          <div className="mt-3 space-y-1 text-xs text-gray-400">
            <div>状态: {method1Visible ? "可见" : "隐藏"}</div>
            <div>DOM: ✅ 存在</div>
            <div>挂载: ✅ 是</div>
            <div>内存: 🟡 占用</div>
          </div>
        </div>

        {/* 方法 2: 条件渲染 */}
        <div className="rounded-lg border border-green-500/50 bg-gray-800 p-4">
          <h3 className="mb-3 text-lg font-semibold text-white">方法 2: 条件渲染</h3>
          <button
            onClick={() => {
              setMethod2Visible(!method2Visible);
              setStats((s) => ({ ...s, method2Mounted: !method2Visible }));
            }}
            className={`mb-3 w-full rounded px-4 py-2 font-semibold ${
              method2Visible ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
          >
            {method2Visible ? "隐藏" : "显示"}
          </button>

          {method2Visible ? (
            <div className="h-[200px] w-full rounded border border-gray-600">
              <Canvas camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 3, 3]} />
                <Sphere args={[0.8, 32, 32]}>
                  <MeshDistortMaterial color="#22c55e" distort={0.3} speed={2} />
                </Sphere>
              </Canvas>
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded border border-gray-600 bg-black/50 text-gray-500">
              已卸载
            </div>
          )}

          <div className="mt-3 space-y-1 text-xs text-gray-400">
            <div>状态: {method2Visible ? "可见" : "隐藏"}</div>
            <div>DOM: {method2Visible ? "✅ 存在" : "❌ 不存在"}</div>
            <div>挂载: {method2Visible ? "✅ 是" : "❌ 否"}</div>
            <div>内存: {method2Visible ? "🟡 占用" : "🟢 释放"}</div>
          </div>
        </div>

        {/* 方法 3: SmartCanvas */}
        <div className="rounded-lg border border-blue-500/50 bg-gray-800 p-4">
          <h3 className="mb-3 text-lg font-semibold text-white">方法 3: SmartCanvas ⭐</h3>
          <button
            onClick={() => setMethod3Visible(!method3Visible)}
            className={`mb-3 w-full rounded px-4 py-2 font-semibold ${
              method3Visible ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
          >
            {method3Visible ? "隐藏" : "显示"}
          </button>

          <SmartCanvas
            isVisible={method3Visible}
            unmountDelayMs={5000}
            canvasProps={{ camera: { position: [2, 2, 2] } }}
            className="h-[200px] w-full rounded border border-gray-600"
            onMount={() => setStats((s) => ({ ...s, method3Mounted: true }))}
            onUnmount={() => setStats((s) => ({ ...s, method3Mounted: false }))}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 3, 3]} />
            <Sphere args={[0.8, 32, 32]}>
              <MeshDistortMaterial color="#3b82f6" distort={0.3} speed={2} />
            </Sphere>
          </SmartCanvas>

          {!method3Visible && !stats.method3Mounted && (
            <div className="flex h-[200px] items-center justify-center rounded border border-gray-600 bg-black/50 text-gray-500">
              5s 后已卸载
            </div>
          )}

          <div className="mt-3 space-y-1 text-xs text-gray-400">
            <div>状态: {method3Visible ? "可见" : "隐藏"}</div>
            <div>DOM: {stats.method3Mounted ? "✅ 存在" : "❌ 不存在"}</div>
            <div>挂载: {stats.method3Mounted ? "✅ 是" : "❌ 否 (5s后)"}</div>
            <div>内存: {stats.method3Mounted ? "🟡 占用" : "🟢 释放"}</div>
          </div>
        </div>
      </div>

      {/* 说明 */}
      <div className="rounded-lg border border-blue-500 bg-blue-950/30 p-4">
        <h4 className="mb-2 font-semibold text-blue-300">💡 观察要点</h4>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>
            • <strong>方法 1</strong>: 点击隐藏后，DOM 仍存在，React 组件仍挂载，快速切换无延迟
          </li>
          <li>
            • <strong>方法 2</strong>: 点击隐藏后，立即卸载，DOM 移除，内存释放，重新显示需要重新加载
          </li>
          <li>
            • <strong>方法 3</strong>: 点击隐藏后，先用 display:none（快速切换），5 秒后自动卸载（节省内存）
          </li>
        </ul>
      </div>
    </div>
  );
}

