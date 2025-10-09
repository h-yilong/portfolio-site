// @ts-nocheck
"use client";

import React, { Suspense, useEffect, useState, ReactNode } from "react";
import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { TextPlaceholder, CardGridPlaceholder, ThreeDScenePlaceholder } from "./LayoutPlaceholder";

interface OptimizedLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  priority?: "high" | "medium" | "low";
  preloadDistance?: number;
  placeholderType?: "text" | "cards" | "3d" | "custom";
  useSSR?: boolean;
  preload?: boolean;
}

// 混合使用 React.lazy 和 Next.js dynamic 的智能加载器
export function OptimizedLoader({
  children,
  fallback,
  priority = "medium",
  preloadDistance = 200,
  placeholderType = "text",
  // useSSR = false,
  // preload = false,
}: OptimizedLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(priority === "high");
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: `${preloadDistance}px 0px ${preloadDistance}px 0px`,
  });

  useEffect(() => {
    if (priority === "high" || (priority === "medium" && isIntersecting)) {
      setShouldLoad(true);
    }
  }, [priority, isIntersecting]);

  // 选择适当的占位符
  const getPlaceholder = () => {
    if (fallback) return fallback;

    switch (placeholderType) {
      case "cards":
        return <CardGridPlaceholder />;
      case "3d":
        return <ThreeDScenePlaceholder />;
      case "text":
      default:
        return <TextPlaceholder />;
    }
  };

  if (!shouldLoad) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className="w-full">
        {getPlaceholder()}
      </div>
    );
  }

  return <Suspense fallback={getPlaceholder()}>{children}</Suspense>;
}

// 使用 Next.js dynamic 的组件包装器
export function createDynamicComponent<T = any>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options: {
    loading?: React.ComponentType;
    ssr?: boolean;
    preload?: boolean;
    placeholderType?: "text" | "cards" | "3d";
  } = {},
) {
  const {
    loading,
    ssr = false,
    // preload = false,
    placeholderType = "text",
  } = options;

  // 选择适当的 loading 组件
  const getLoadingComponent = () => {
    if (loading) return loading;

    switch (placeholderType) {
      case "cards":
        return CardGridPlaceholder;
      case "3d":
        return ThreeDScenePlaceholder;
      case "text":
      default:
        return TextPlaceholder;
    }
  };

  return dynamic(importFn, {
    loading: getLoadingComponent(),
    ssr,
    // 注意：Next.js 13+ 中 preload 选项可能不可用
    // 可以通过其他方式实现预加载
  });
}

// 预定义的动态组件创建器
export const createTextComponent = (importFn: () => Promise<any>) =>
  createDynamicComponent(importFn, { placeholderType: "text", ssr: true });

export const createCardComponent = (importFn: () => Promise<any>) =>
  createDynamicComponent(importFn, { placeholderType: "cards", ssr: true });

export const create3DComponent = (importFn: () => Promise<any>) =>
  createDynamicComponent(importFn, { placeholderType: "3d", ssr: false });

// 性能监控 Hook
export function useComponentLoadTime(componentName: string) {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const handleLoad = () => {
      const endTime = performance.now();
      setLoadTime(endTime - startTime);

      // 发送性能数据到监控服务
      if (process.env.NODE_ENV === "development") {
        console.log(`${componentName} loaded in ${endTime - startTime}ms`);
      }
    };

    // 监听组件加载完成事件
    window.addEventListener("component-loaded", handleLoad);

    return () => {
      window.removeEventListener("component-loaded", handleLoad);
    };
  }, [componentName]);

  return loadTime;
}

// 智能预加载 Hook
export function useSmartPreload(components: string[], trigger: boolean = false) {
  useEffect(() => {
    if (!trigger) return;

    const preloadComponents = async () => {
      for (const component of components) {
        try {
          // 预加载组件
          await import(component);

          // 触发加载完成事件
          window.dispatchEvent(
            new CustomEvent("component-loaded", {
              detail: { component, timestamp: performance.now() },
            }),
          );
        } catch (error) {
          console.warn(`Failed to preload component: ${component}`, error);
        }
      }
    };

    preloadComponents();
  }, [components, trigger]);
}
