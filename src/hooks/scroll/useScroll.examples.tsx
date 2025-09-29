import React, { useRef, useEffect, useState } from "react";
import { useScroll, useScrollAnimation, useScrollNavigation, useScrollAnalytics } from "./useScroll";

/**
 * EXAMPLE 1: Basic Scroll Tracking
 * This example shows how to track basic scroll position and direction
 */
export const BasicScrollExample: React.FC = () => {
  const { position, direction, isScrolling } = useScroll();

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Basic Scroll Tracking</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to see the data update</div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Scroll Data</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700">Position</h4>
            <p>X: {Math.round(position.x)}px</p>
            <p>Y: {Math.round(position.y)}px</p>
            <p>Progress X: {(position.progressX * 100).toFixed(1)}%</p>
            <p>Progress Y: {(position.progressY * 100).toFixed(1)}%</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Direction</h4>
            <p>X: {direction.x === 1 ? "→" : direction.x === -1 ? "←" : "—"}</p>
            <p>Y: {direction.y === 1 ? "↓" : direction.y === -1 ? "↑" : "—"}</p>
            <p>Scrolling: {isScrolling ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 h-96 bg-gray-200">More content to scroll through</div>
      <div className="mt-8 h-96 bg-gray-200">Even more content</div>
    </div>
  );
};

/**
 * EXAMPLE 2: Scroll-triggered Animations
 * This example demonstrates smooth scroll-triggered animations
 */
export const ScrollAnimationExample: React.FC = () => {
  const { position, isScrolling } = useScrollAnimation({
    throttle: 8, // 120fps for smooth animations
  });

  // Calculate animation values based on scroll position
  const parallaxOffset = position.y * 0.5;
  const rotation = position.y * 0.1;
  const scale = 1 + Math.sin(position.y * 0.01) * 0.1;

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Scroll-triggered Animations</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll down to see animations</div>

      <div
        className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg) scale(${scale})`,
            transition: isScrolling ? "none" : "transform 0.3s ease-out",
          }}
        >
          <div className="rounded-lg bg-white/20 p-8 text-white backdrop-blur-sm">
            <h3 className="text-2xl font-bold">Parallax Element</h3>
            <p>Scroll to see the magic!</p>
          </div>
        </div>
      </div>

      <div className="mt-8 h-96 bg-gray-200">More content</div>
      <div className="mt-8 h-96 bg-gray-200">Even more content</div>
    </div>
  );
};

/**
 * EXAMPLE 3: Scroll Navigation
 * This example shows how to use scroll data for navigation logic
 */
export const ScrollNavigationExample: React.FC = () => {
  const { direction, isScrolling, isAtTop, isAtBottom } = useScrollNavigation({
    trackDirection: true,
  });

  const [showNav, setShowNav] = useState(true);
  const [navDirection, setNavDirection] = useState<"up" | "down">("down");

  // Hide/show navigation based on scroll direction
  useEffect(() => {
    if (isScrolling) {
      if (direction.y === 1) {
        // Scrolling down - hide nav
        setShowNav(false);
        setNavDirection("down");
      } else if (direction.y === -1) {
        // Scrolling up - show nav
        setShowNav(true);
        setNavDirection("up");
      }
    }
  }, [direction.y, isScrolling]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Scroll Navigation</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll to see navigation behavior</div>

      {/* Navigation Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="text-xl font-bold">Smart Navigation</h3>
          <div className="flex space-x-4">
            <button className="rounded bg-blue-500 px-4 py-2 text-white">Home</button>
            <button className="rounded bg-blue-500 px-4 py-2 text-white">About</button>
            <button className="rounded bg-blue-500 px-4 py-2 text-white">Contact</button>
          </div>
        </div>
      </div>

      {/* Status Display */}
      <div className="mt-20 rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Navigation Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Direction: {direction.y === 1 ? "↓ Down" : direction.y === -1 ? "↑ Up" : "— None"}</p>
            <p>Scrolling: {isScrolling ? "Yes" : "No"}</p>
            <p>Nav Visible: {showNav ? "Yes" : "No"}</p>
          </div>
          <div>
            <p>At Top: {isAtTop ? "Yes" : "No"}</p>
            <p>At Bottom: {isAtBottom ? "Yes" : "No"}</p>
            <p>Last Direction: {navDirection}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 h-96 bg-gray-200">More content</div>
      <div className="mt-8 h-96 bg-gray-200">Even more content</div>
    </div>
  );
};

/**
 * EXAMPLE 4: Scroll Analytics
 * This example demonstrates scroll-based analytics tracking
 */
export const ScrollAnalyticsExample: React.FC = () => {
  const { position, velocity, isScrolling } = useScrollAnalytics({
    trackVelocity: true,
    throttle: 100, // Lower frequency for analytics
  });

  const [analyticsData, setAnalyticsData] = useState({
    maxScrollDepth: 0,
    scrollSessions: 0,
    totalScrollDistance: 0,
    averageVelocity: 0,
    timeSpent: 0,
  });

  const [startTime] = useState(Date.now());

  // Track analytics data
  useEffect(() => {
    if (isScrolling) {
      setAnalyticsData((prev) => ({
        ...prev,
        maxScrollDepth: Math.max(prev.maxScrollDepth, position.y),
        totalScrollDistance: prev.totalScrollDistance + Math.abs(velocity?.y || 0),
        averageVelocity: velocity?.magnitude || 0,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
      }));
    }
  }, [position.y, velocity, isScrolling, startTime]);

  // Track scroll sessions
  useEffect(() => {
    if (isScrolling) {
      setAnalyticsData((prev) => ({
        ...prev,
        scrollSessions: prev.scrollSessions + 1,
      }));
    }
  }, [isScrolling]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Scroll Analytics</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll to see analytics data</div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Analytics Data</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700">Scroll Metrics</h4>
            <p>Max Depth: {Math.round(analyticsData.maxScrollDepth)}px</p>
            <p>Progress: {(position.progressY * 100).toFixed(1)}%</p>
            <p>Total Distance: {Math.round(analyticsData.totalScrollDistance)}px</p>
            <p>Scroll Sessions: {analyticsData.scrollSessions}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Velocity & Time</h4>
            <p>Current Velocity: {velocity?.magnitude.toFixed(2) || 0} px/frame</p>
            <p>Average Velocity: {analyticsData.averageVelocity.toFixed(2)} px/frame</p>
            <p>Time Spent: {analyticsData.timeSpent}s</p>
            <p>Currently Scrolling: {isScrolling ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 h-96 bg-gray-200">More content</div>
      <div className="mt-8 h-96 bg-gray-200">Even more content</div>
    </div>
  );
};

/**
 * EXAMPLE 5: Custom Element Scroll Tracking
 * This example shows how to track scroll on a specific element
 */
export const CustomElementScrollExample: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, direction, isScrolling } = useScroll({
    element: containerRef.current,
    trackDirection: true,
  });

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Custom Element Scroll Tracking</h2>
      <p className="mb-4">This tracks scroll within the container below, not the window.</p>

      <div
        ref={containerRef}
        className="h-64 overflow-y-auto rounded-lg border-2 border-gray-300 p-4"
      >
        <div className="h-32 bg-blue-100 p-4">Content 1</div>
        <div className="h-32 bg-green-100 p-4">Content 2</div>
        <div className="h-32 bg-yellow-100 p-4">Content 3</div>
        <div className="h-32 bg-red-100 p-4">Content 4</div>
        <div className="h-32 bg-purple-100 p-4">Content 5</div>
        <div className="h-32 bg-pink-100 p-4">Content 6</div>
      </div>

      <div className="mt-4 rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Container Scroll Data</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Position X: {Math.round(position.x)}px</p>
            <p>Position Y: {Math.round(position.y)}px</p>
            <p>Progress X: {(position.progressX * 100).toFixed(1)}%</p>
            <p>Progress Y: {(position.progressY * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p>Direction X: {direction.x === 1 ? "→" : direction.x === -1 ? "←" : "—"}</p>
            <p>Direction Y: {direction.y === 1 ? "↓" : direction.y === -1 ? "↑" : "—"}</p>
            <p>Scrolling: {isScrolling ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * EXAMPLE 6: High-Performance Scroll Tracking
 * This example demonstrates performance optimizations
 */
export const PerformanceScrollExample: React.FC = () => {
  const { position, velocity, acceleration, isScrolling } = useScroll({
    trackVelocity: true,
    trackAcceleration: true,
    throttle: 8, // 120fps
    useRAF: true,
  });

  const [frameCount, setFrameCount] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(performance.now());

  // Track frame rate
  useEffect(() => {
    if (isScrolling) {
      const now = performance.now();
      const delta = now - lastFrameTime;
      setFrameCount((prev) => prev + 1);
      setLastFrameTime(now);
    }
  }, [isScrolling, lastFrameTime]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">High-Performance Scroll Tracking</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll to see performance metrics</div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700">Scroll Data</h4>
            <p>Position: ({Math.round(position.x)}, {Math.round(position.y)})</p>
            <p>Progress: {(position.progressY * 100).toFixed(1)}%</p>
            <p>Scrolling: {isScrolling ? "Yes" : "No"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Velocity & Acceleration</h4>
            <p>Velocity: {velocity?.magnitude.toFixed(2) || 0} px/frame</p>
            <p>Acceleration: {acceleration?.magnitude.toFixed(2) || 0}</p>
            <p>Frame Count: {frameCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 h-96 bg-gray-200">More content</div>
      <div className="mt-8 h-96 bg-gray-200">Even more content</div>
    </div>
  );
};

/**
 * EXAMPLE 7: Scroll Progress Indicator
 * This example shows a scroll progress bar
 */
export const ScrollProgressExample: React.FC = () => {
  const { position, isScrolling } = useScroll();

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Scroll Progress Indicator</h2>
      <div className="mb-4 h-96 bg-gray-200">Scroll to see the progress bar</div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
          style={{ width: `${position.progressY * 100}%` }}
        />
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Scroll Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Progress</span>
            <span>{(position.progressY * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
              style={{ width: `${position.progressY * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Position: {Math.round(position.y)}px / {Math.round(position.maxY)}px
          </p>
        </div>
      </div>

      <div className="mt-8 h-96 bg-gray-200">More content</div>
      <div className="mt-8 h-96 bg-gray-200">Even more content</div>
    </div>
  );
};

/**
 * Main component that demonstrates all scroll examples
 */
export const ScrollExamples: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-8 text-center text-4xl font-bold">useScroll Hook Examples</h1>

      <BasicScrollExample />
      <hr className="my-12" />

      <ScrollAnimationExample />
      <hr className="my-12" />

      <ScrollNavigationExample />
      <hr className="my-12" />

      <ScrollAnalyticsExample />
      <hr className="my-12" />

      <CustomElementScrollExample />
      <hr className="my-12" />

      <PerformanceScrollExample />
      <hr className="my-12" />

      <ScrollProgressExample />
    </div>
  );
};

export default ScrollExamples;
