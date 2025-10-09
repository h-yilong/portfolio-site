// @ts-nocheck
"use client";

import { Suspense, useEffect, useState, ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { TextPlaceholder, CardGridPlaceholder, ThreeDScenePlaceholder } from "./LayoutPlaceholder";

interface SmartLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  priority?: "high" | "medium" | "low";
  preloadDistance?: number;
  placeholderType?: "text" | "cards" | "3d" | "custom";
}

// High priority components load immediately after HeroSection
// Medium priority components load when they're close to viewport
// Low priority components load when they enter viewport
export function SmartLoader({
  children,
  fallback,
  priority = "medium",
  preloadDistance = 200,
  placeholderType = "text",
}: SmartLoaderProps) {
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

  // Choose appropriate placeholder based on type
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
      <div ref={ref} className="w-full">
        {getPlaceholder()}
      </div>
    );
  }

  return <Suspense fallback={getPlaceholder()}>{children}</Suspense>;
}

// Hook to trigger loading of next components after HeroSection loads
export function useHeroSectionLoaded() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Listen for custom event from HeroSection
    const handleHeroLoaded = () => setHeroLoaded(true);
    window.addEventListener("hero-section-loaded", handleHeroLoaded);

    return () => {
      window.removeEventListener("hero-section-loaded", handleHeroLoaded);
    };
  }, []);

  return heroLoaded;
}
