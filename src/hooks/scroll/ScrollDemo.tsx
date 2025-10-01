import React, { useRef } from "react";
import { useScroll, useScrollAnimation, useScrollNavigation } from "./useScroll";

/**
 * A comprehensive demo component showcasing the useScroll hook capabilities
 * This component demonstrates various scroll detection features in a single view
 */
export const ScrollDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Basic scroll tracking
  const { position, direction, isScrolling } = useScroll();

  // Animation scroll tracking
  const { position: animPosition, isScrolling: isAnimScrolling } = useScrollAnimation({
    throttle: 8, // 120fps for smooth animations
  });

  // Navigation scroll tracking
  const { direction: navDirection, isScrolling: isNavScrolling } = useScrollNavigation();

  // Custom element scroll tracking
  const { position: containerPosition } = useScroll({
    element: containerRef.current,
  });

  // Calculate animation values
  const parallaxOffset = animPosition.y * 0.3;
  const rotation = animPosition.y * 0.05;
  const scale = 1 + Math.sin(animPosition.y * 0.005) * 0.05;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Fixed Progress Bar */}
      <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
          style={{ width: `${position.progressY * 100}%` }}
        />
      </div>

      {/* Smart Navigation */}
      <nav
        className={`fixed top-0 right-0 left-0 z-40 bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 ${
          navDirection.y === 1 && isNavScrolling ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Scroll Demo</h1>
          <div className="flex space-x-4">
            <button className="rounded bg-blue-500 px-4 py-2 text-white">Home</button>
            <button className="rounded bg-blue-500 px-4 py-2 text-white">About</button>
            <button className="rounded bg-blue-500 px-4 py-2 text-white">Contact</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section with Parallax */}
        <section className="relative h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
            }}
          />
          <div
            className="relative z-10 flex h-full items-center justify-center"
            style={{
              transform: `rotate(${rotation}deg) scale(${scale})`,
              transition: isAnimScrolling ? "none" : "transform 0.3s ease-out",
            }}
          >
            <div className="text-center text-white">
              <h1 className="mb-4 text-6xl font-bold">Scroll Demo</h1>
              <p className="text-xl">Scroll to see the magic happen!</p>
            </div>
          </div>
        </section>

        {/* Scroll Data Display */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">Scroll Data</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Basic Scroll Data */}
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Basic Scroll Data</h3>
                <div className="space-y-2">
                  <p>
                    Position: ({Math.round(position.x)}, {Math.round(position.y)})
                  </p>
                  <p>Progress: {(position.progressY * 100).toFixed(1)}%</p>
                  <p>Direction: {direction.y === 1 ? "↓ Down" : direction.y === -1 ? "↑ Up" : "— None"}</p>
                  <p>Scrolling: {isScrolling ? "Yes" : "No"}</p>
                </div>
              </div>

              {/* Navigation Data */}
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Navigation Data</h3>
                <div className="space-y-2">
                  <p>Nav Direction: {navDirection.y === 1 ? "↓ Down" : navDirection.y === -1 ? "↑ Up" : "— None"}</p>
                  <p>Nav Scrolling: {isNavScrolling ? "Yes" : "No"}</p>
                  <p>Nav Visible: {navDirection.y !== 1 || !isNavScrolling ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Element Scroll Tracking */}
        <section className="bg-gray-100 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">Custom Element Scroll</h2>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-semibold">Container Scroll Data</h3>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p>
                    Position: ({Math.round(containerPosition.x)}, {Math.round(containerPosition.y)})
                  </p>
                  <p>Progress: {(containerPosition.progressY * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p>
                    Max: ({Math.round(containerPosition.maxX)}, {Math.round(containerPosition.maxY)})
                  </p>
                </div>
              </div>

              {/* Scrollable Container */}
              <div ref={containerRef} className="h-64 overflow-y-auto rounded-lg border-2 border-gray-300 p-4">
                <div className="h-32 bg-blue-100 p-4">Content 1</div>
                <div className="h-32 bg-green-100 p-4">Content 2</div>
                <div className="h-32 bg-yellow-100 p-4">Content 3</div>
                <div className="h-32 bg-red-100 p-4">Content 4</div>
                <div className="h-32 bg-purple-100 p-4">Content 5</div>
                <div className="h-32 bg-pink-100 p-4">Content 6</div>
              </div>
            </div>
          </div>
        </section>

        {/* More Content for Scrolling */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">More Content</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Feature 1</h3>
                <p>This is some content to demonstrate scrolling behavior.</p>
              </div>
              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Feature 2</h3>
                <p>This is some content to demonstrate scrolling behavior.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 py-16 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold">Scroll Demo Complete!</h2>
            <p className="text-lg">You&apos;ve seen all the scroll detection features in action.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ScrollDemo;
