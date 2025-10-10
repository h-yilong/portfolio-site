/**
 * Performance Monitor - 实时监控页面性能指标
 *
 * 监控指标：
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TBT (Total Blocking Time)
 * - CLS (Cumulative Layout Shift)
 * - TTI (Time to Interactive)
 *
 * 使用方法：
 * <PerformanceMonitor />
 */

"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  tbt: number;
  cls: number;
  tti: number | null;
  canvasInitTime: number | null;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    tbt: 0,
    cls: 0,
    tti: null,
    canvasInitTime: null,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 🎯 监控 FCP
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
          console.log(`📊 FCP: ${entry.startTime.toFixed(2)}ms`);
        }
      }
    });
    fcpObserver.observe({ type: "paint", buffered: true });

    // 🎯 监控 LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        renderTime: number;
        loadTime: number;
      };
      const lcp = lastEntry.renderTime || lastEntry.loadTime;
      setMetrics((prev) => ({ ...prev, lcp }));
      console.log(`📊 LCP: ${lcp.toFixed(2)}ms`);
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    // 🎯 监控 TBT (Total Blocking Time)
    let totalBlockingTime = 0;
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // 只计算 FCP → TTI 之间的长任务
        const duration = entry.duration;
        if (duration > 50) {
          const blockingTime = duration - 50;
          totalBlockingTime += blockingTime;
          setMetrics((prev) => ({ ...prev, tbt: totalBlockingTime }));
          console.log(`⚠️ Long Task detected: ${duration.toFixed(2)}ms (blocking: ${blockingTime.toFixed(2)}ms)`);
        }
      }
    });

    // 检查浏览器是否支持 PerformanceObserver for longtask
    if (PerformanceObserver.supportedEntryTypes.includes("longtask")) {
      longTaskObserver.observe({ type: "longtask", buffered: true });
    } else {
      console.warn("⚠️ Long Task API not supported in this browser");
    }

    // 🎯 监控 CLS
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsScore += (entry as any).value;
          setMetrics((prev) => ({ ...prev, cls: clsScore }));
          console.log(`📊 CLS: ${clsScore.toFixed(4)}`);
        }
      }
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    // 🎯 监控 Canvas 初始化时间
    const canvasInitStart = performance.now();
    const checkCanvas = setInterval(() => {
      if (document.querySelector("canvas")) {
        const canvasInitTime = performance.now() - canvasInitStart;
        setMetrics((prev) => ({ ...prev, canvasInitTime }));
        console.log(`🎨 Canvas initialized at: ${canvasInitTime.toFixed(2)}ms`);
        clearInterval(checkCanvas);
      }
    }, 50);

    // 🎯 计算 TTI (简化版本)
    // 实际 TTI 计算更复杂，这里使用启发式方法
    setTimeout(() => {
      const entries = performance.getEntriesByType("navigation");
      if (entries.length > 0) {
        const nav = entries[0] as PerformanceNavigationTiming;
        const tti = nav.domInteractive;
        setMetrics((prev) => ({ ...prev, tti }));
        console.log(`📊 TTI (estimated): ${tti.toFixed(2)}ms`);
      }
    }, 1000);

    // 快捷键：按 'P' 显示/隐藏性能面板
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        setShow((prev) => !prev);
      }
    };
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      longTaskObserver.disconnect();
      clsObserver.disconnect();
      clearInterval(checkCanvas);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  if (!show) {
    return (
      <div className="fixed right-4 bottom-4 z-[9999]">
        <button
          onClick={() => setShow(true)}
          className="rounded-lg bg-black/80 px-3 py-2 text-xs text-white backdrop-blur hover:bg-black/90"
        >
          📊 Performance
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-4 bottom-4 z-[9999] min-w-[300px] rounded-lg border border-white/20 bg-black/90 p-4 font-mono text-xs text-white backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold">Performance Metrics</h3>
        <button onClick={() => setShow(false)} className="text-white/50 hover:text-white">
          ✕
        </button>
      </div>

      <div className="space-y-2">
        <MetricRow label="FCP" value={metrics.fcp} unit="ms" threshold={1800} description="First Contentful Paint" />
        <MetricRow label="LCP" value={metrics.lcp} unit="ms" threshold={2500} description="Largest Contentful Paint" />
        <MetricRow
          label="TBT"
          value={metrics.tbt}
          unit="ms"
          threshold={200}
          description="Total Blocking Time"
          highlight={metrics.tbt === 0}
        />
        <MetricRow label="CLS" value={metrics.cls} unit="" threshold={0.1} description="Cumulative Layout Shift" />
        <MetricRow label="TTI" value={metrics.tti} unit="ms" threshold={3800} description="Time to Interactive" />
        <MetricRow
          label="Canvas Init"
          value={metrics.canvasInitTime}
          unit="ms"
          threshold={500}
          description="Canvas初始化时间"
        />
      </div>

      <div className="mt-3 border-t border-white/20 pt-3 text-[10px] text-white/50">按 &apos;P&apos; 键切换显示</div>
    </div>
  );
}

interface MetricRowProps {
  label: string;
  value: number | null;
  unit: string;
  threshold: number;
  description: string;
  highlight?: boolean;
}

function MetricRow({ label, value, unit, threshold, description, highlight }: MetricRowProps) {
  const isGood = value !== null && value <= threshold;
  const color = value === null ? "text-gray-400" : isGood ? "text-green-400" : "text-red-400";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-white/70">{label}:</span>
        <span className={`font-bold ${color} ${highlight ? "animate-pulse" : ""}`}>
          {value === null ? "..." : value.toFixed(2)}
          {value !== null && unit}
        </span>
      </div>
      <span className="text-[10px] text-white/40">{description}</span>
    </div>
  );
}
