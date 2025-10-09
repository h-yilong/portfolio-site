// @ts-nocheck
"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

/**
 * 🌟 SmartCanvas - 智能 Canvas 组件
 *
 * 结合 display:none 和条件渲染的优势：
 * - 短时间隐藏：使用 display:none（快速切换）
 * - 长时间隐藏：卸载组件（释放内存）
 *
 * @param isVisible - 控制可见性
 * @param unmountDelayMs - 隐藏后多久卸载组件（默认 5000ms）
 * @param children - Canvas 子元素
 * @param canvasProps - Canvas 组件的其他属性
 */

interface SmartCanvasProps {
  isVisible: boolean;
  unmountDelayMs?: number;
  children: ReactNode;
  canvasProps?: React.ComponentProps<typeof Canvas>;
  className?: string;
  onMount?: () => void;
  onUnmount?: () => void;
}

export function SmartCanvas({
  isVisible,
  unmountDelayMs = 5000,
  children,
  canvasProps = {},
  className = "",
  onMount,
  onUnmount,
}: SmartCanvasProps) {
  const [isMounted, setIsMounted] = useState(isVisible);
  const [shouldDisplay, setShouldDisplay] = useState(isVisible);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      // 清除任何待处理的卸载定时器
      if (unmountTimerRef.current) {
        clearTimeout(unmountTimerRef.current);
        unmountTimerRef.current = null;
      }

      // 如果之前卸载了，重新挂载
      if (!isMounted) {
        setIsMounted(true);
        onMount?.();
      }

      // 显示 Canvas
      setShouldDisplay(true);
    } else {
      // 立即隐藏（使用 display:none）
      setShouldDisplay(false);

      // 设置延迟卸载定时器
      unmountTimerRef.current = setTimeout(() => {
        setIsMounted(false);
        onUnmount?.();
        console.log(`🗑️ Canvas unmounted after ${unmountDelayMs}ms of being hidden`);
      }, unmountDelayMs);
    }

    return () => {
      if (unmountTimerRef.current) {
        clearTimeout(unmountTimerRef.current);
      }
    };
  }, [isVisible, isMounted, unmountDelayMs, onMount, onUnmount]);

  // 完全卸载：不渲染任何内容
  if (!isMounted) {
    return null;
  }

  // 已挂载但隐藏：使用 display:none
  return (
    <div
      style={{
        display: shouldDisplay ? "block" : "none",
      }}
      className={className}
    >
      <Canvas {...canvasProps}>{children}</Canvas>
    </div>
  );
}

/**
 * 🎯 使用示例 1: 标签页切换
 */
export function TabExample() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={() => setActiveTab(0)} className="rounded bg-blue-500 px-4 py-2 text-white">
          3D Scene 1
        </button>
        <button onClick={() => setActiveTab(1)} className="rounded bg-green-500 px-4 py-2 text-white">
          3D Scene 2
        </button>
        <button onClick={() => setActiveTab(2)} className="rounded bg-purple-500 px-4 py-2 text-white">
          2D Content
        </button>
      </div>

      {/*
        场景 1 和 2 使用 SmartCanvas
        - 快速切换时：display:none（无重新加载）
        - 长时间不看：自动卸载（释放内存）
      */}
      <SmartCanvas
        isVisible={activeTab === 0}
        unmountDelayMs={10000} // 10 秒后卸载
        canvasProps={{ camera: { position: [0, 0, 5] } }}
        className="h-[400px] w-full"
      >
        <ambientLight />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </SmartCanvas>

      <SmartCanvas
        isVisible={activeTab === 1}
        unmountDelayMs={10000}
        canvasProps={{ camera: { position: [0, 0, 5] } }}
        className="h-[400px] w-full"
      >
        <ambientLight />
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color="blue" />
        </mesh>
      </SmartCanvas>

      {activeTab === 2 && (
        <div className="h-[400px] w-full bg-gray-200 p-4">
          <h2>2D Content</h2>
          <p>This is regular 2D content</p>
        </div>
      )}
    </div>
  );
}

/**
 * 🎯 使用示例 2: 滚动懒加载
 */
export function ScrollLazyCanvas({
  children,
  ...canvasProps
}: { children: ReactNode } & React.ComponentProps<typeof Canvas>) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // 10% 可见时触发
        rootMargin: "100px", // 提前 100px 开始加载
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[400px] w-full">
      <SmartCanvas
        isVisible={isInView}
        unmountDelayMs={3000} // 离开视口 3 秒后卸载
        canvasProps={canvasProps}
        className="size-full"
      >
        {children}
      </SmartCanvas>

      {!isInView && (
        <div className="flex size-full items-center justify-center bg-gray-800 text-white">
          <p>Scroll to load 3D scene...</p>
        </div>
      )}
    </div>
  );
}

/**
 * 🎯 使用示例 3: 模态框
 */
export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="rounded bg-blue-500 px-4 py-2 text-white">
        Open 3D Modal
      </button>

      {/* 模态框：不需要延迟卸载，关闭后立即释放 */}
      <SmartCanvas
        isVisible={isOpen}
        unmountDelayMs={0} // 立即卸载
        canvasProps={{
          camera: { position: [0, 0, 5] },
        }}
        className="fixed inset-0 z-50"
        onMount={() => console.log("Modal 3D scene mounted")}
        onUnmount={() => console.log("Modal 3D scene unmounted")}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <mesh>
          <torusKnotGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </SmartCanvas>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)}>
          <button className="absolute top-4 right-4 rounded bg-white px-4 py-2">Close</button>
        </div>
      )}
    </>
  );
}

/**
 * 🎯 使用示例 4: 基于性能的自适应渲染
 */
export function AdaptiveCanvas({
  children,
  ...canvasProps
}: { children: ReactNode } & React.ComponentProps<typeof Canvas>) {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // 检测设备性能
    const memory = (navigator as any).deviceMemory || 8; // GB
    const cores = navigator.hardwareConcurrency || 4;

    if (memory < 4 || cores < 4) {
      setIsLowPerformance(true);
    }
  }, []);

  return (
    <SmartCanvas
      isVisible={true}
      unmountDelayMs={isLowPerformance ? 2000 : 5000}
      canvasProps={{
        ...canvasProps,
        // 低性能设备使用降级设置
        dpr: isLowPerformance ? [1, 1] : [1, 2],
        gl: {
          antialias: !isLowPerformance,
          powerPreference: "high-performance",
        },
      }}
      className="size-full"
    >
      {children}
    </SmartCanvas>
  );
}
