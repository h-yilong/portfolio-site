# Welcome to Yilong's Personal Site

## About Me

I'm a web developer with a passion for building user-friendly and efficient web applications. I'm currently working as a Software Engineer at [Your Company Name](https://yourcompany.com).

## My Skills

- HTML
- CSS
- JavaScript
- React
- Next.js
- TailwindCSS
- Shadcn(Radix)
- Three.js
- TypeScript
- Vitest
- Cypress
- Eslint
- Prettier
- Husky(Git Hooks)

```tsx
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return <div>Count: {count}</div>;
}
```

```ts
import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Configuration options for the IntersectionObserver
 */
interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  intersectionRatio: number;
  entry: IntersectionObserverEntry | null;
  hasBeenVisible: boolean;
}

export const useIntersectionObserver = (options: IntersectionObserverOptions = {}): UseIntersectionObserverReturn => {
  const { root = null, rootMargin = "0px", threshold = 0, triggerOnce = false } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const ref = useRef<HTMLElement>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

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

    // Create new observer with provided options
    const observer = new IntersectionObserver(handleIntersection, {
      root,
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

export default useIntersectionObserver;
```
