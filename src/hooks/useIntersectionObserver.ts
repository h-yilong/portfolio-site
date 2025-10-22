import { useEffect, useRef, useState, useCallback, type RefObject } from "react";

/**
 * Configuration options for the IntersectionObserver
 */
interface IntersectionObserverOptions {
  /** The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. */
  root?: Element | string | null;
  /** Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros. */
  rootMargin?: string;
  /** Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would use the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible. */
  threshold?: number | number[];
  /** for elements that only need to be tracked/triggered once */
  triggerOnce?: boolean;
}

/**
 * Return type for the useIntersectionObserver hook
 */
interface UseIntersectionObserverReturn {
  /** The ref to attach to the element you want to observe */
  ref: RefObject<HTMLElement | HTMLDivElement | null>;
  /** Whether the element is currently intersecting with the viewport */
  isIntersecting: boolean;
  /** The current intersection ratio (0 to 1) */
  intersectionRatio: number;
  /** The current intersection entry data */
  entry: IntersectionObserverEntry | null;
  /** Whether the element has ever been visible (useful for triggerOnce scenarios) */
  hasBeenVisible: boolean;
}

/**
 * A versatile hook that uses IntersectionObserver to track when elements enter and exit the viewport.
 *
 * @param options - Configuration options for the IntersectionObserver
 * @returns An object containing the ref to attach to your element and intersection state
 *
 * @example
 * // Basic usage - track when element enters viewport
 * const { ref, isIntersecting } = useIntersectionObserver();
 *
 * @example
 * // Advanced usage with custom options
 * const { ref, isIntersecting, intersectionRatio } = useIntersectionObserver({
 *   threshold: [0, 0.25, 0.5, 0.75, 1],
 *   rootMargin: '50px',
 *   triggerOnce: true
 * });
 *
 * @exampleF
 * // For lazy loading images
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.1,
 *   triggerOnce: true
 * });
 *
 * @example
 * // For animations that should trigger when 50% visible
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.5,
 *   rootMargin: '0px 0px -100px 0px' // Trigger when element is 100px from bottom
 * });
 */
export const useIntersectionObserver = (options: IntersectionObserverOptions = {}): UseIntersectionObserverReturn => {
  const { root = null, rootMargin = "0px", threshold = 0, triggerOnce = false } = options;

  // State to track intersection status
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Ref for the element to observe
  const ref = useRef<HTMLElement | HTMLDivElement | null>(null);

  // Ref for the observer instance
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Callback function that gets called when intersection changes
   * Optimized to prevent unnecessary recreations
   */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [intersectionEntry] = entries;

      // Update state with current intersection data
      setIsIntersecting(intersectionEntry.isIntersecting);
      setIntersectionRatio(intersectionEntry.intersectionRatio);
      setEntry(intersectionEntry);

      // Track if element has ever been visible
      if (intersectionEntry.isIntersecting) {
        setHasBeenVisible(true);
      }

      // If triggerOnce is enabled and element is visible, disconnect observer
      if (triggerOnce && intersectionEntry.isIntersecting) {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      }
    },
    [triggerOnce],
  );

  /**
   * Set up the IntersectionObserver
   * Optimized with single cleanup effect
   */
  useEffect(() => {
    const element = ref.current;

    // Don't create observer if no element or if already created
    if (!element || observerRef.current) {
      return;
    }

    const _root = typeof root === "string" ? document.querySelector(root) : root;

    // Create new observer with provided options
    const observer = new IntersectionObserver(handleIntersection, {
      root: _root,
      rootMargin,
      threshold,
    });

    // Store observer reference and start observing
    observerRef.current = observer;
    observer.observe(element);

    // Single cleanup function - no duplicate cleanup needed
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [root, rootMargin, threshold, handleIntersection]);

  return {
    ref,
    isIntersecting,
    intersectionRatio,
    entry,
    hasBeenVisible,
  };
};

/**
 * A specialized hook for lazy loading images
 *
 * @param options - Configuration options for the IntersectionObserver
 * @returns An object containing the ref and loading state
 *
 * @example
 * const { ref, isIntersecting } = useLazyLoad({
 *   threshold: 0.1,
 *   rootMargin: '50px'
 * });
 */
export const useLazyLoad = (options: Omit<IntersectionObserverOptions, "triggerOnce"> = {}) => {
  return useIntersectionObserver({
    ...options,
    triggerOnce: true,
    threshold: options.threshold || 0.1,
  });
};

export default useIntersectionObserver;
