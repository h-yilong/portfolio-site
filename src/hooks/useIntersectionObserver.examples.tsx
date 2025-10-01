// @ts-nocheck
import React, { useState } from "react";
import { useIntersectionObserver, useLazyLoad, useScrollAnimation } from "./useIntersectionObserver";

/**
 * EXAMPLE 1: Basic Usage - Simple visibility tracking
 * This example shows how to track when an element enters/exits the viewport
 */
export const BasicExample: React.FC = () => {
  const { ref, isIntersecting, intersectionRatio } = useIntersectionObserver();

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Basic Visibility Tracking</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to see the tracked element</div>

      <div
        ref={ref}
        className={`rounded-lg p-6 transition-all duration-500 ${
          isIntersecting ? "scale-105 transform bg-green-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
      >
        <h3 className="mb-2 text-xl font-semibold">{isIntersecting ? "Element is visible!" : "Element is hidden"}</h3>
        <p>Intersection ratio: {(intersectionRatio * 100).toFixed(1)}%</p>
      </div>

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 2: Lazy Loading Images
 * This example demonstrates how to lazy load images when they come into view
 */
export const LazyImageExample: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, isIntersecting } = useLazyLoad({
    threshold: 0.1,
    rootMargin: "50px",
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Lazy Loading Images</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to load the image</div>

      <div ref={ref} className="flex min-h-[400px] items-center justify-center">
        {isIntersecting && !imageLoaded ? (
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p>Loading image...</p>
          </div>
        ) : imageLoaded ? (
          <img
            src="https://picsum.photos/600/400"
            alt="Lazy loaded image"
            className="rounded-lg shadow-lg"
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg bg-gray-300">
            <p className="text-gray-500">Image will load when visible</p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * EXAMPLE 3: Scroll-triggered Animations
 * This example shows how to trigger animations when elements come into view
 */
export const AnimationExample: React.FC = () => {
  const { ref, isIntersecting } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Scroll-triggered Animations</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to trigger animation</div>

      <div
        ref={ref}
        className={`transition-all duration-1000 ease-out ${
          isIntersecting ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
        }`}
      >
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white shadow-lg">
          <h3 className="mb-4 text-2xl font-bold">Animated Card</h3>
          <p className="text-lg">This card animates in when it becomes visible in the viewport!</p>
        </div>
      </div>

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 4: Analytics Tracking
 * This example shows how to track when users view specific content for analytics
 */
export const AnalyticsExample: React.FC = () => {
  const [viewCount, setViewCount] = useState(0);
  const { ref, isIntersecting, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Simulate analytics tracking
  React.useEffect(() => {
    if (isIntersecting && !hasBeenVisible) {
      setViewCount((prev) => prev + 1);
      // In a real app, you would send this to your analytics service
      console.log("Content viewed!", { timestamp: new Date().toISOString() });
    }
  }, [isIntersecting, hasBeenVisible]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Analytics Tracking</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to view tracked content</div>

      <div ref={ref} className="rounded-lg bg-blue-500 p-8 text-white">
        <h3 className="mb-4 text-2xl font-bold">Tracked Content</h3>
        <p className="mb-4 text-lg">This content is tracked for analytics. View count: {viewCount}</p>
        <p className="text-sm opacity-75">
          {hasBeenVisible ? "✅ This content has been viewed" : "⏳ Waiting to be viewed..."}
        </p>
      </div>

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 5: Multiple Elements with Different Thresholds
 * This example shows how to use the hook with multiple elements and different configurations
 */
export const MultipleElementsExample: React.FC = () => {
  const card1 = useIntersectionObserver({ threshold: 0.1 });
  const card2 = useIntersectionObserver({ threshold: 0.5 });
  const card3 = useIntersectionObserver({ threshold: 0.8 });

  const cards = [
    { ref: card1.ref, isIntersecting: card1.isIntersecting, title: "Card 1 (10% visible)", color: "bg-red-500" },
    { ref: card2.ref, isIntersecting: card2.isIntersecting, title: "Card 2 (50% visible)", color: "bg-green-500" },
    { ref: card3.ref, isIntersecting: card3.isIntersecting, title: "Card 3 (80% visible)", color: "bg-blue-500" },
  ];

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Multiple Elements with Different Thresholds</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to see different trigger points</div>

      {cards.map((card, index) => (
        <div key={index} className="mb-8">
          <div
            ref={card.ref}
            className={`${card.color} rounded-lg p-6 text-white transition-all duration-500 ${
              card.isIntersecting ? "scale-100 opacity-100" : "scale-95 opacity-50"
            }`}
          >
            <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
            <p>Status: {card.isIntersecting ? "Visible" : "Hidden"}</p>
          </div>
        </div>
      ))}

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 6: Performance Optimization with freezeOnceVisible
 * This example shows how to use freezeOnceVisible for performance optimization
 */
export const PerformanceExample: React.FC = () => {
  const { ref, isIntersecting, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true, // This will disconnect the observer after first visibility
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Performance Optimization</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to see the element</div>

      <div
        ref={ref}
        className={`rounded-lg p-6 transition-all duration-500 ${
          isIntersecting ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
      >
        <h3 className="mb-2 text-xl font-bold">{isIntersecting ? "Element is visible!" : "Element is hidden"}</h3>
        <p>Has been visible: {hasBeenVisible ? "Yes" : "No"}</p>
        <p className="mt-2 text-sm">Note: Observer disconnects after first visibility for performance</p>
      </div>

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 7: Custom Root Element
 * This example shows how to observe elements within a specific container
 */
export const CustomRootExample: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { ref, isIntersecting } = useIntersectionObserver({
    root: containerRef.current,
    threshold: 0.5,
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Custom Root Element</h2>
      <p className="mb-4">The element is observed within the scrollable container below:</p>

      <div ref={containerRef} className="h-64 overflow-y-auto rounded-lg border-2 border-gray-300 p-4">
        <div className="mb-4 h-32 bg-gray-200">Content above</div>
        <div className="mb-4 h-32 bg-gray-200">More content</div>

        <div
          ref={ref}
          className={`rounded-lg p-4 transition-all duration-500 ${
            isIntersecting ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          <h3 className="font-bold">Observed Element</h3>
          <p>Status: {isIntersecting ? "Visible in container" : "Hidden"}</p>
        </div>

        <div className="mt-4 h-32 bg-gray-200">Content below</div>
        <div className="mt-4 h-32 bg-gray-200">More content below</div>
      </div>
    </div>
  );
};

/**
 * Main component that demonstrates all examples
 */
export const IntersectionObserverExamples: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-center text-4xl font-bold">useIntersectionObserver Hook Examples</h1>

      <BasicExample />
      <hr className="my-12" />

      <LazyImageExample />
      <hr className="my-12" />

      <AnimationExample />
      <hr className="my-12" />

      <AnalyticsExample />
      <hr className="my-12" />

      <MultipleElementsExample />
      <hr className="my-12" />

      <PerformanceExample />
      <hr className="my-12" />

      <CustomRootExample />
    </div>
  );
};

export default IntersectionObserverExamples;
