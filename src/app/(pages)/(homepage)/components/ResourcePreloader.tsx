"use client";

import { useEffect, useState } from "react";

interface ResourcePreloaderProps {
  resources: string[];
  onLoadComplete?: () => void;
}

export function ResourcePreloader({ resources, onLoadComplete }: ResourcePreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (resources.length === 0) {
      setIsComplete(true);
      onLoadComplete?.();
      return;
    }

    const preloadPromises = resources.map((resource) => {
      return new Promise<void>((resolve) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = resource.endsWith(".css") ? "style" : "script";
        link.href = resource;

        link.onload = () => {
          setLoadedCount((prev) => prev + 1);
          resolve();
        };

        link.onerror = () => {
          // Even if preload fails, we continue
          setLoadedCount((prev) => prev + 1);
          resolve();
        };

        document.head.appendChild(link);
      });
    });

    Promise.all(preloadPromises).then(() => {
      setIsComplete(true);
      onLoadComplete?.();
    });
  }, [resources, onLoadComplete]);

  return { loadedCount, totalCount: resources.length, isComplete };
}

// Hook to preload critical resources after HeroSection loads
export function useResourcePreloader() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const handleHeroLoaded = () => setHeroLoaded(true);
    window.addEventListener("hero-section-loaded", handleHeroLoaded);

    return () => {
      window.removeEventListener("hero-section-loaded", handleHeroLoaded);
    };
  }, []);

  // Preload critical resources for next components
  const { isComplete: resourcesLoaded } = ResourcePreloader({
    resources: [
      // Preload React Spring for ImaginationText
      "/_next/static/chunks/react-spring.js",
      // Preload other critical chunks
      "/_next/static/chunks/intersection-observer.js",
    ],
    onLoadComplete: () => {
      console.log("Critical resources preloaded");
    },
  });

  return { heroLoaded, resourcesLoaded };
}
