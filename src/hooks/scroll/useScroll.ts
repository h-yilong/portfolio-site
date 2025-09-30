import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Configuration options for the useScroll hook
 */
interface ScrollOptions {
  /** Whether to track scroll events. Defaults to true. */
  enabled?: boolean;
  /** Throttle scroll events to improve performance. Defaults to 16ms (60fps). */
  throttle?: number;
  /** Whether to use requestAnimationFrame for better performance. Defaults to true. */
  useRAF?: boolean;
  /** Whether to track scroll direction. Defaults to true. */
  trackDirection?: boolean;
  /** Whether to track scroll velocity. Defaults to false. */
  trackVelocity?: boolean;
  /** Whether to track scroll acceleration. Defaults to false. */
  trackAcceleration?: boolean;
  /** Custom element to track scroll on. Defaults to window. */
  element?: HTMLElement | Window | null;
  /** Whether to track horizontal scroll. Defaults to true. */
  trackX?: boolean;
  /** Whether to track vertical scroll. Defaults to true. */
  trackY?: boolean;
}

/**
 * Scroll position and metadata
 */
interface ScrollPosition {
  /** Current scroll position on X axis */
  x: number;
  /** Current scroll position on Y axis */
  y: number;
  /** Previous scroll position on X axis */
  prevX: number;
  /** Previous scroll position on Y axis */
  prevY: number;
  /** Maximum scroll position on X axis */
  maxX: number;
  /** Maximum scroll position on Y axis */
  maxY: number;
  /** Scroll progress as percentage (0-1) */
  progressX: number;
  /** Scroll progress as percentage (0-1) */
  progressY: number;
}

/**
 * Scroll direction information
 */
interface ScrollDirection {
  /** Current scroll direction on X axis (-1, 0, 1) */
  x: -1 | 0 | 1;
  /** Current scroll direction on Y axis (-1, 0, 1) */
  y: -1 | 0 | 1;
  /** Whether scrolling horizontally */
  isScrollingX: boolean;
  /** Whether scrolling vertically */
  isScrollingY: boolean;
  /** Whether scrolling in any direction */
  isScrolling: boolean;
}

/**
 * Scroll velocity information
 */
interface ScrollVelocity {
  /** Current velocity on X axis (pixels per frame) */
  x: number;
  /** Current velocity on Y axis (pixels per frame) */
  y: number;
  /** Current velocity magnitude */
  magnitude: number;
  /** Whether velocity is significant (above threshold) */
  isSignificant: boolean;
}

/**
 * Scroll acceleration information
 */
interface ScrollAcceleration {
  /** Current acceleration on X axis */
  x: number;
  /** Current acceleration on Y axis */
  y: number;
  /** Current acceleration magnitude */
  magnitude: number;
}

/**
 * Return type for the useScroll hook
 */
interface UseScrollReturn {
  /** Current scroll position and metadata */
  position: ScrollPosition;
  /** Current scroll direction */
  direction: ScrollDirection;
  /** Current scroll velocity (if enabled) */
  velocity: ScrollVelocity | null;
  /** Current scroll acceleration (if enabled) */
  acceleration: ScrollAcceleration | null;
  /** Whether the user is currently scrolling */
  isScrolling: boolean;
  /** Whether the user has scrolled to the bottom */
  isAtBottom: boolean;
  /** Whether the user has scrolled to the top */
  isAtTop: boolean;
  /** Whether the user has scrolled to the left */
  isAtLeft: boolean;
  /** Whether the user has scrolled to the right */
  isAtRight: boolean;
}

/**
 * A high-performance scroll detection hook that uses requestAnimationFrame
 * and throttling to provide smooth scroll tracking with minimal performance impact.
 *
 * Performance optimizations:
 * - Uses requestAnimationFrame to sync with browser's refresh rate
 * - Throttles scroll events to prevent excessive calculations
 * - Debounces scroll end detection
 * - Tracks velocity and acceleration only when needed
 * - Uses passive event listeners for better performance
 *
 * @param options - Configuration options for scroll tracking
 * @returns Scroll position, direction, velocity, and other scroll metadata
 *
 * @example
 * // Basic usage - track scroll position
 * const { position, direction, isScrolling } = useScroll();
 *
 * @example
 * // Advanced usage with velocity tracking
 * const { position, velocity, isScrolling } = useScroll({
 *   trackVelocity: true,
 *   trackAcceleration: true,
 *   throttle: 8 // 120fps
 * });
 *
 * @example
 * // Track scroll on specific element
 * const containerRef = useRef<HTMLDivElement>(null);
 * const { position } = useScroll({
 *   element: containerRef.current
 * });
 */
export const useScroll = (options: ScrollOptions = {}): UseScrollReturn => {
  const {
    enabled = true,
    throttle = 16, // 60fps by default
    useRAF = true,
    trackDirection = true,
    trackVelocity = false,
    trackAcceleration = false,
    element = null,
    // trackX = true,
    // trackY = true,
  } = options;

  // console.log("element", element);

  // State for scroll position
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    maxX: 0,
    maxY: 0,
    progressX: 0,
    progressY: 0,
  });

  // State for scroll direction
  const [direction, setDirection] = useState<ScrollDirection>({
    x: 0,
    y: 0,
    isScrollingX: false,
    isScrollingY: false,
    isScrolling: false,
  });

  // State for scroll velocity
  const [velocity, setVelocity] = useState<ScrollVelocity | null>(null);

  // State for scroll acceleration
  const [acceleration, setAcceleration] = useState<ScrollAcceleration | null>(null);

  // State for scroll status
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtLeft, setIsAtLeft] = useState(false);
  const [isAtRight, setIsAtRight] = useState(false);

  // Refs for performance optimization
  const rafIdRef = useRef<number | null>(null);
  const throttleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const lastVelocityRef = useRef<ScrollVelocity | null>(null);
  const lastAccelerationRef = useRef<ScrollAcceleration | null>(null);

  /**
   * Get the current scroll position from the target element
   */
  const getScrollPosition = useCallback((): { x: number; y: number } => {
    if (!element || element === window) {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
      };
    }

    const htmlElement = element as HTMLElement;
    return {
      x: htmlElement.scrollLeft,
      y: htmlElement.scrollTop,
    };
  }, [element]);

  /**
   * Get the maximum scroll position from the target element
   */
  const getMaxScrollPosition = useCallback((): { x: number; y: number } => {
    if (!element || element === window) {
      return {
        x: document.documentElement.scrollWidth - window.innerWidth,
        y: document.documentElement.scrollHeight - window.innerHeight,
      };
    }

    const htmlElement = element as HTMLElement;
    return {
      x: htmlElement.scrollWidth - htmlElement.clientWidth,
      y: htmlElement.scrollHeight - htmlElement.clientHeight,
    };
  }, [element]);

  /**
   * Calculate scroll velocity between two positions
   */
  const calculateVelocity = useCallback(
    (current: { x: number; y: number }, previous: { x: number; y: number }, deltaTime: number) => {
      if (deltaTime === 0) return { x: 0, y: 0, magnitude: 0, isSignificant: false };

      const velX = (current.x - previous.x) / deltaTime;
      const velY = (current.y - previous.y) / deltaTime;
      const magnitude = Math.sqrt(velX * velX + velY * velY);

      return {
        x: velX,
        y: velY,
        magnitude,
        isSignificant: magnitude > 0.1, // Threshold for significant movement
      };
    },
    [],
  );

  /**
   * Calculate scroll acceleration between two velocities
   */
  const calculateAcceleration = useCallback(
    (currentVel: ScrollVelocity, previousVel: ScrollVelocity | null, deltaTime: number) => {
      if (!previousVel || deltaTime === 0) return { x: 0, y: 0, magnitude: 0 };

      const accX = (currentVel.x - previousVel.x) / deltaTime;
      const accY = (currentVel.y - previousVel.y) / deltaTime;
      const magnitude = Math.sqrt(accX * accX + accY * accY);

      return { x: accX, y: accY, magnitude };
    },
    [],
  );

  /**
   * Update scroll position and related state
   * This is the core function that gets called on scroll events
   */
  const updateScrollPosition = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = currentTime;

    const currentPos = getScrollPosition();
    const maxPos = getMaxScrollPosition();

    setPosition((prev) => {
      const newPosition: ScrollPosition = {
        x: currentPos.x,
        y: currentPos.y,
        prevX: prev.x,
        prevY: prev.y,
        maxX: maxPos.x,
        maxY: maxPos.y,
        progressX: maxPos.x > 0 ? currentPos.x / maxPos.x : 0,
        progressY: maxPos.y > 0 ? currentPos.y / maxPos.y : 0,
      };

      // Update direction if tracking is enabled
      if (trackDirection) {
        const dirX = currentPos.x > prev.x ? 1 : currentPos.x < prev.x ? -1 : 0;
        const dirY = currentPos.y > prev.y ? 1 : currentPos.y < prev.y ? -1 : 0;

        setDirection({
          x: dirX as -1 | 0 | 1,
          y: dirY as -1 | 0 | 1,
          isScrollingX: dirX !== 0,
          isScrollingY: dirY !== 0,
          isScrolling: dirX !== 0 || dirY !== 0,
        });
      }

      // Update velocity if tracking is enabled
      if (trackVelocity && deltaTime > 0) {
        const currentVelocity = calculateVelocity(currentPos, { x: prev.x, y: prev.y }, deltaTime);
        setVelocity(currentVelocity);
        lastVelocityRef.current = currentVelocity;

        // Update acceleration if tracking is enabled
        if (trackAcceleration) {
          const currentAcceleration = calculateAcceleration(currentVelocity, lastVelocityRef.current, deltaTime);
          setAcceleration(currentAcceleration);
          lastAccelerationRef.current = currentAcceleration;
        }
      }

      return newPosition;
    });

    // Update scroll status
    setIsAtTop(currentPos.y <= 0);
    setIsAtBottom(currentPos.y >= maxPos.y);
    setIsAtLeft(currentPos.x <= 0);
    setIsAtRight(currentPos.x >= maxPos.x);
    setIsScrolling(true);

    // Clear existing scroll end timeout
    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
    }

    // Set new scroll end timeout
    scrollEndTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150); // Consider scrolling ended after 150ms of inactivity
  }, [
    getScrollPosition,
    getMaxScrollPosition,
    trackDirection,
    trackVelocity,
    trackAcceleration,
    calculateVelocity,
    calculateAcceleration,
  ]);

  /**
   * Throttled scroll handler that uses requestAnimationFrame for optimal performance
   */
  const handleScroll = useCallback(() => {
    if (!enabled) return;

    // Clear existing throttle timeout
    if (throttleTimeoutRef.current) {
      clearTimeout(throttleTimeoutRef.current);
    }

    // Use requestAnimationFrame for smooth updates
    if (useRAF) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(updateScrollPosition);
    } else {
      // Use throttling without RAF
      throttleTimeoutRef.current = setTimeout(updateScrollPosition, throttle);
    }
  }, [enabled, useRAF, throttle, updateScrollPosition]);

  /**
   * Set up scroll event listener with performance optimizations
   */
  useEffect(() => {
    if (!enabled) return;

    const targetElement = element || window;
    const scrollElement = targetElement === window ? window : (targetElement as HTMLElement);

    // Use passive event listeners for better performance
    const options: AddEventListenerOptions = {
      passive: true,
      capture: false,
    };

    // Add scroll event listener
    scrollElement.addEventListener("scroll", handleScroll, options);

    // Initial position update
    updateScrollPosition();

    // Cleanup function
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll, options);

      // Clear all timeouts and animation frames
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [enabled, element, handleScroll, updateScrollPosition]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    position,
    direction,
    velocity,
    acceleration,
    isScrolling,
    isAtBottom,
    isAtTop,
    isAtLeft,
    isAtRight,
  };
};

/**
 * A specialized hook for scroll-triggered animations
 * Optimized for performance with minimal overhead
 *
 * @param options - Configuration options
 * @returns Scroll data optimized for animations
 *
 * @example
 * const { position, isScrolling } = useScrollAnimation({
 *   throttle: 8, // 120fps for smooth animations
 *   trackVelocity: true
 * });
 */
export const useScrollAnimation = (options: Omit<ScrollOptions, "trackDirection" | "trackAcceleration"> = {}) => {
  return useScroll({
    ...options,
    trackDirection: false,
    trackAcceleration: false,
    throttle: options.throttle || 8, // Higher frame rate for animations
  });
};

/**
 * A specialized hook for scroll-based navigation
 * Tracks scroll direction and position for navigation logic
 *
 * @param options - Configuration options
 * @returns Scroll data optimized for navigation
 *
 * @example
 * const { direction, isScrolling } = useScrollNavigation({
 *   trackDirection: true,
 *   throttle: 16
 * });
 */
export const useScrollNavigation = (options: Omit<ScrollOptions, "trackVelocity" | "trackAcceleration"> = {}) => {
  return useScroll({
    ...options,
    trackVelocity: false,
    trackAcceleration: false,
    trackDirection: true,
  });
};

/**
 * A specialized hook for scroll-based analytics
 * Tracks scroll progress and user engagement
 *
 * @param options - Configuration options
 * @returns Scroll data optimized for analytics
 *
 * @example
 * const { position, isScrolling } = useScrollAnalytics({
 *   trackVelocity: true,
 *   throttle: 100 // Lower frequency for analytics
 * });
 */
export const useScrollAnalytics = (options: Omit<ScrollOptions, "trackAcceleration"> = {}) => {
  return useScroll({
    ...options,
    trackAcceleration: false,
    trackVelocity: options.trackVelocity || true,
    throttle: options.throttle || 100, // Lower frequency for analytics
  });
};

export default useScroll;
