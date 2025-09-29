/**
 * Scroll detection hooks for React applications
 *
 * This module provides high-performance scroll detection hooks that use
 * requestAnimationFrame and throttling for optimal performance.
 */

export { useScroll, useScrollAnimation, useScrollNavigation, useScrollAnalytics } from "./useScroll";
export type {
  ScrollOptions,
  ScrollPosition,
  ScrollDirection,
  ScrollVelocity,
  ScrollAcceleration,
  UseScrollReturn,
} from "./useScroll";

// Re-export examples for development
export { default as ScrollExamples } from "./useScroll.examples";
