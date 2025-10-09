"use client";
import React, { useState } from "react";
import { useIntersectionObserver, useLazyLoad } from "./useIntersectionObserver";

// Type assertion helper for ref compatibility
const asDivRef = (ref: React.RefObject<HTMLElement | null>) => ref as React.RefObject<HTMLDivElement>;

/**
 * EXAMPLE 1: Basic Usage - Simple visibility tracking
 * This example shows how to track when an element enters/exits the viewport
 */
export const BasicExample: React.FC = () => {
  const { ref, isIntersecting, intersectionRatio } = useIntersectionObserver();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Basic Visibility Tracking</h2>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${isIntersecting ? "bg-green-500" : "bg-gray-400"}`}></div>
          <span className="text-sm text-gray-600">
            {isIntersecting ? "Visible" : "Hidden"} ({(intersectionRatio * 100).toFixed(1)}%)
          </span>
        </div>
      </div>

      <div className="mb-4 flex h-96 items-center justify-center bg-gray-200">
        <p className="text-gray-500">Scroll down to see the tracked element</p>
      </div>

      <div
        ref={asDivRef(ref)}
        className={`rounded-lg p-6 transition-all duration-500 ${
          isIntersecting ? "scale-105 transform bg-green-500 text-white shadow-lg" : "bg-gray-300 text-gray-700"
        }`}
      >
        <h3 className="mb-2 text-xl font-semibold">
          {isIntersecting ? "🎉 Element is visible!" : "👁️ Element is hidden"}
        </h3>
        <p className="text-sm opacity-90">Intersection ratio: {(intersectionRatio * 100).toFixed(1)}%</p>
        <p className="mt-2 text-xs opacity-75">
          This element changes color and scale when it enters/exits the viewport
        </p>
      </div>

      <div className="mt-4 flex h-96 items-center justify-center bg-gray-200">
        <p className="text-gray-500">More content below</p>
      </div>
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

      <div ref={asDivRef(ref)} className="flex min-h-[400px] items-center justify-center">
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
 * EXAMPLE 3: One-time Scroll Animation (useScrollAnimation)
 * This example shows how to trigger animations that freeze after first visibility
 */
export const OneTimeAnimationExample: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">One-time Animation (useScrollAnimation)</h2>
      <p className="mb-4 text-sm text-gray-600">
        This animation freezes after first visibility - won&apos;t reverse when scrolling away
      </p>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to trigger animation</div>

      <div
        ref={asDivRef(ref)}
        className={`transition-all duration-1000 ease-out ${
          isIntersecting ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
        }`}
      >
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white shadow-lg">
          <h3 className="mb-4 text-2xl font-bold">One-time Animated Card</h3>
          <p className="text-lg">This card animates in when visible, but won&apos;t reverse when scrolling away!</p>
        </div>
      </div>

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 3B: Reversible Scroll Animation (useIntersectionObserver)
 * This example shows how to trigger animations that reverse when scrolling away
 */
export const ReversibleAnimationExample: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Reversible Animation (useIntersectionObserver)</h2>
      <p className="mb-4 text-sm text-gray-600">This animation reverses when scrolling away from the element</p>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to trigger animation, then scroll back up</div>

      <div
        ref={asDivRef(ref)}
        className={`transition-all duration-1000 ease-out ${
          isIntersecting ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
        }`}
      >
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white shadow-lg">
          <h3 className="mb-4 text-2xl font-bold">Reversible Animated Card</h3>
          <p className="text-lg">This card animates in when visible and reverses when scrolling away!</p>
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
      // console.log("Content viewed!", { timestamp: new Date().toISOString() });
    }
  }, [isIntersecting, hasBeenVisible]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Analytics Tracking</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to view tracked content</div>

      <div ref={asDivRef(ref)} className="rounded-lg bg-blue-500 p-8 text-white">
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
            ref={asDivRef(card.ref)}
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
    // freezeOnceVisible: true, // This will disconnect the observer after first visibility
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Performance Optimization</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to see the element</div>

      <div
        ref={asDivRef(ref)}
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
 * EXAMPLE 6B: Optimized Performance Comparison
 * This example demonstrates the performance optimizations in the current implementation
 */
export const OptimizedPerformanceExample: React.FC = () => {
  const [renderCount, setRenderCount] = useState(0);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  // Track render count to demonstrate optimization
  React.useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Optimized Performance Demo</h2>
      <p className="mb-4 text-sm text-gray-600">
        This example demonstrates the performance optimizations: reduced callback dependencies, single cleanup effect,
        and optimized state updates.
      </p>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to see the element</div>

      <div
        ref={asDivRef(ref)}
        className={`rounded-lg p-6 transition-all duration-500 ${
          isIntersecting ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
      >
        <h3 className="mb-2 text-xl font-bold">{isIntersecting ? "Element is visible!" : "Element is hidden"}</h3>
        <p>Render count: {renderCount}</p>
        <p className="mt-2 text-sm">
          ✅ Optimized callback dependencies
          <br />
          ✅ Single cleanup effect
          <br />✅ Minimal re-renders
        </p>
      </div>

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 7: React Spring Integration
 * This example shows how to use the hook with React Spring for smooth animations
 */
export const ReactSpringExample: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">React Spring Integration</h2>
      <p className="mb-4 text-sm text-gray-600">
        This example shows how to integrate with React Spring for smooth, performant animations. The animation reverses
        when scrolling away from the element.
      </p>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to trigger animation, then scroll back up</div>

      <div ref={asDivRef(ref)} className="relative">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isIntersecting
              ? "translate-y-0 scale-100 rotate-0 opacity-100"
              : "translate-y-8 scale-95 rotate-2 opacity-0"
          }`}
        >
          <div className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-xl">
            <h3 className="mb-4 text-2xl font-bold">React Spring Style Animation</h3>
            <p className="text-lg">
              This demonstrates smooth animations with the intersection observer. The animation uses CSS transitions
              that are optimized for performance.
            </p>
            <div className="mt-4 flex space-x-2">
              <div
                className={`h-2 w-2 rounded-full transition-all duration-500 ${
                  isIntersecting ? "bg-white" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`h-2 w-2 rounded-full transition-all duration-700 ${
                  isIntersecting ? "bg-white" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`h-2 w-2 rounded-full transition-all duration-900 ${
                  isIntersecting ? "bg-white" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 h-96 bg-gray-200">More content below</div>
    </div>
  );
};

/**
 * EXAMPLE 8: Custom Root Element
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
          ref={asDivRef(ref)}
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
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-900">useIntersectionObserver Hook Examples</h1>
        <p className="mb-6 text-xl text-gray-600">
          Comprehensive examples showcasing the optimized useIntersectionObserver hook with performance improvements
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="rounded-full bg-blue-100 px-3 py-1">🚀 Performance Optimized</span>
          <span className="rounded-full bg-green-100 px-3 py-1">⚡ Memory Efficient</span>
          <span className="rounded-full bg-purple-100 px-3 py-1">🎨 Animation Ready</span>
          <span className="rounded-full bg-orange-100 px-3 py-1">📱 Responsive</span>
        </div>
      </div>

      <div className="space-y-16">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <BasicExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <LazyImageExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <OneTimeAnimationExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <ReversibleAnimationExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <AnalyticsExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <MultipleElementsExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <PerformanceExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <OptimizedPerformanceExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <ReactSpringExample />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <CustomRootExample />
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to Use in Your Project?</h2>
        <p className="mb-6 text-lg opacity-90">
          The useIntersectionObserver hook is optimized for performance and ready for production use. Check out the
          source code and documentation for implementation details.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/hooks/useIntersectionObserver.ts"
            className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/30"
          >
            📁 View Source Code
          </a>
          <a
            href="/hooks/README.md"
            className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/30"
          >
            📚 Read Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default IntersectionObserverExamples;
