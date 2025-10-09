"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  heroLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalLoadTime: number;
  componentsLoaded: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    heroLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    totalLoadTime: 0,
    componentsLoaded: 0,
  });

  const [isVisible, setIsVisible] = useState(() => {
    if (process.env.NODE_ENV !== "development") return false;
    return true;
  });

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    const startTime = performance.now();
    let heroLoadTime = 0;
    let componentsLoaded = 0;

    // Track HeroSection load time
    const handleHeroLoaded = () => {
      heroLoadTime = performance.now() - startTime;
      setMetrics((prev) => ({ ...prev, heroLoadTime }));
    };

    // Track component loads
    const handleComponentLoad = () => {
      componentsLoaded++;
      setMetrics((prev) => ({ ...prev, componentsLoaded }));
    };

    // Listen for performance events
    window.addEventListener("hero-section-loaded", handleHeroLoaded);
    window.addEventListener("component-loaded", handleComponentLoad);

    // Get Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          setMetrics((prev) => ({ ...prev, firstContentfulPaint: entry.startTime }));
        }
        if (entry.entryType === "largest-contentful-paint") {
          setMetrics((prev) => ({ ...prev, largestContentfulPaint: entry.startTime }));
        }
      }
    });

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint"] });

    // Calculate total load time
    const calculateTotalTime = () => {
      const totalTime = performance.now() - startTime;
      setMetrics((prev) => ({ ...prev, totalLoadTime: totalTime }));
    };

    // Show metrics after 3 seconds
    setTimeout(() => {
      setIsVisible(true);
      calculateTotalTime();
    }, 3000);

    return () => {
      window.removeEventListener("hero-section-loaded", handleHeroLoaded);
      window.removeEventListener("component-loaded", handleComponentLoad);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 max-w-sm rounded-lg bg-black/30 p-4 font-mono text-sm text-white">
      <div className="mb-2 font-bold">Performance Metrics</div>
      <div className="space-y-1">
        <div>Hero Load: {metrics.heroLoadTime.toFixed(2)}ms</div>
        <div>FCP: {metrics.firstContentfulPaint.toFixed(2)}ms</div>
        <div>LCP: {metrics.largestContentfulPaint.toFixed(2)}ms</div>
        <div>Total: {metrics.totalLoadTime.toFixed(2)}ms</div>
        <div>Components: {metrics.componentsLoaded}</div>
      </div>
      <button onClick={() => setIsVisible(false)} className="mt-2 text-xs text-gray-400 hover:text-white">
        Hide
      </button>
    </div>
  );
}
