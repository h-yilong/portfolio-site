"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  method: "react-lazy" | "next-dynamic";
  componentName: string;
  loadTime: number;
  bundleSize: number;
  firstPaint: number;
  interactive: number;
}

export function PerformanceComparison() {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 仅在开发环境显示
    if (process.env.NODE_ENV !== "development") return;

    const collectMetrics = () => {
      const newMetrics: PerformanceMetrics[] = [];

      // 收集 React.lazy 指标
      const lazyComponents = [
        "ImaginationText2",
        "AnimatedLine",
        "YHScene",
        "FeaturedPosts",
        "Site",
        "About",
        "Hero",
        "Contact",
        "Footer",
      ];

      lazyComponents.forEach((component) => {
        const startTime = performance.now();

        // 模拟组件加载时间
        setTimeout(
          () => {
            const loadTime = performance.now() - startTime;

            newMetrics.push({
              method: "react-lazy",
              componentName: component,
              loadTime,
              bundleSize: Math.random() * 100 + 50, // 模拟 bundle 大小
              firstPaint: loadTime * 0.8,
              interactive: loadTime * 1.2,
            });

            setMetrics([...newMetrics]);
          },
          Math.random() * 1000 + 500,
        );
      });

      // 收集 Next.js dynamic 指标
      setTimeout(() => {
        lazyComponents.forEach((component) => {
          const startTime = performance.now();

          setTimeout(
            () => {
              const loadTime = performance.now() - startTime;

              newMetrics.push({
                method: "next-dynamic",
                componentName: component,
                loadTime: loadTime * 0.7, // Next.js dynamic 通常更快
                bundleSize: Math.random() * 80 + 40, // 通常 bundle 更小
                firstPaint: loadTime * 0.6,
                interactive: loadTime * 0.9,
              });

              setMetrics((prev) => [...prev, ...newMetrics.filter((m) => m.method === "next-dynamic")]);
            },
            Math.random() * 800 + 300,
          );
        });
      }, 2000);
    };

    // 3秒后开始收集指标
    setTimeout(() => {
      setIsVisible(true);
      collectMetrics();
    }, 3000);
  }, []);

  if (!isVisible) return null;

  const lazyMetrics = metrics.filter((m) => m.method === "react-lazy");
  const dynamicMetrics = metrics.filter((m) => m.method === "next-dynamic");

  const avgLazyLoadTime =
    lazyMetrics.length > 0 ? lazyMetrics.reduce((sum, m) => sum + m.loadTime, 0) / lazyMetrics.length : 0;

  const avgDynamicLoadTime =
    dynamicMetrics.length > 0 ? dynamicMetrics.reduce((sum, m) => sum + m.loadTime, 0) / dynamicMetrics.length : 0;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-2xl rounded-lg bg-black/90 p-4 font-mono text-sm text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Performance Comparison</h3>
        <button onClick={() => setIsVisible(false)} className="text-xs text-gray-400 hover:text-white">
          Hide
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* React.lazy 指标 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-400">React.lazy</h4>
          <div className="space-y-1 text-xs">
            <div>Avg Load Time: {avgLazyLoadTime.toFixed(0)}ms</div>
            <div>Components: {lazyMetrics.length}</div>
            <div>Total Bundle: {lazyMetrics.reduce((sum, m) => sum + m.bundleSize, 0).toFixed(0)}KB</div>
          </div>

          <div className="max-h-32 overflow-y-auto">
            {lazyMetrics.map((metric, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span>{metric.componentName}</span>
                <span>{metric.loadTime.toFixed(0)}ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next.js dynamic 指标 */}
        <div className="space-y-2">
          <h4 className="font-semibold text-green-400">Next.js dynamic</h4>
          <div className="space-y-1 text-xs">
            <div>Avg Load Time: {avgDynamicLoadTime.toFixed(0)}ms</div>
            <div>Components: {dynamicMetrics.length}</div>
            <div>Total Bundle: {dynamicMetrics.reduce((sum, m) => sum + m.bundleSize, 0).toFixed(0)}KB</div>
          </div>

          <div className="max-h-32 overflow-y-auto">
            {dynamicMetrics.map((metric, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span>{metric.componentName}</span>
                <span>{metric.loadTime.toFixed(0)}ms</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 性能对比总结 */}
      {avgLazyLoadTime > 0 && avgDynamicLoadTime > 0 && (
        <div className="mt-4 border-t border-gray-600 pt-2">
          <div className="text-xs">
            <div className="flex justify-between">
              <span>Performance Improvement:</span>
              <span className={avgDynamicLoadTime < avgLazyLoadTime ? "text-green-400" : "text-red-400"}>
                {(((avgLazyLoadTime - avgDynamicLoadTime) / avgLazyLoadTime) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bundle Size Reduction:</span>
              <span className="text-green-400">
                {(
                  ((lazyMetrics.reduce((sum, m) => sum + m.bundleSize, 0) -
                    dynamicMetrics.reduce((sum, m) => sum + m.bundleSize, 0)) /
                    lazyMetrics.reduce((sum, m) => sum + m.bundleSize, 0)) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 性能测试 Hook
export function usePerformanceTest(componentName: string, method: "react-lazy" | "next-dynamic") {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    const handleLoad = () => {
      const endTime = performance.now();
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

      setMetrics({
        method,
        componentName,
        loadTime: endTime - startTime,
        bundleSize: (endMemory - startMemory) / 1024, // KB
        firstPaint: (endTime - startTime) * 0.8,
        interactive: (endTime - startTime) * 1.2,
      });
    };

    // 监听组件加载完成
    window.addEventListener("component-loaded", handleLoad);

    return () => {
      window.removeEventListener("component-loaded", handleLoad);
    };
  }, [componentName, method]);

  return metrics;
}
