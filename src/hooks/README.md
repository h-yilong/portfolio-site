# useIntersectionObserver Hook

A versatile React hook that utilizes the IntersectionObserver API to track when elements enter and exit the viewport. This hook is perfect for lazy loading, scroll-triggered animations, analytics tracking, and more.

## Features

- 🎯 **Simple API** - Easy to use with comprehensive TypeScript support
- 🚀 **Performance Optimized** - Built-in options for performance optimization
- 🔧 **Highly Configurable** - Supports all IntersectionObserver options
- 📱 **Responsive** - Works with custom root elements and margins
- 🎨 **Animation Ready** - Perfect for scroll-triggered animations
- 📊 **Analytics Friendly** - Built-in tracking capabilities

## Installation

The hook is already available in your project at `src/hooks/useIntersectionObserver.ts`.

## Basic Usage

```tsx
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";

function MyComponent() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return <div ref={ref}>{isIntersecting ? "Element is visible!" : "Element is hidden"}</div>;
}
```

## API Reference

### useIntersectionObserver(options?)

#### Options

| Option              | Type                 | Default | Description                                              |
| ------------------- | -------------------- | ------- | -------------------------------------------------------- |
| `root`              | `Element \| null`    | `null`  | The element used as the viewport for checking visibility |
| `rootMargin`        | `string`             | `'0px'` | Margin around the root element                           |
| `threshold`         | `number \| number[]` | `0`     | Percentage of visibility to trigger callback             |
| `triggerOnce`       | `boolean`            | `false` | Disconnect observer after first intersection             |
| `freezeOnceVisible` | `boolean`            | `false` | Disconnect observer after element has been visible       |

#### Returns

| Property            | Type                                   | Description                                      |
| ------------------- | -------------------------------------- | ------------------------------------------------ |
| `ref`               | `React.RefObject<HTMLElement \| null>` | Ref to attach to the element you want to observe |
| `isIntersecting`    | `boolean`                              | Whether the element is currently intersecting    |
| `intersectionRatio` | `number`                               | Current intersection ratio (0 to 1)              |
| `entry`             | `IntersectionObserverEntry \| null`    | Current intersection entry data                  |
| `hasBeenVisible`    | `boolean`                              | Whether the element has ever been visible        |

## Specialized Hooks

### useLazyLoad(options?)

Optimized for lazy loading images and content.

```tsx
import { useLazyLoad } from "./hooks/useIntersectionObserver";

function LazyImage({ src, alt }) {
  const { ref, isIntersecting } = useLazyLoad({
    threshold: 0.1,
    rootMargin: "50px",
  });

  return <div ref={ref}>{isIntersecting ? <img src={src} alt={alt} /> : <div>Loading...</div>}</div>;
}
```

### useScrollAnimation(options?)

Optimized for scroll-triggered animations.

```tsx
import { useScrollAnimation } from "./hooks/useIntersectionObserver";

function AnimatedCard() {
  const { ref, isIntersecting } = useScrollAnimation({
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isIntersecting ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      Animated content
    </div>
  );
}
```

## Common Use Cases

### 1. Lazy Loading Images

```tsx
const { ref, isIntersecting } = useLazyLoad({
  threshold: 0.1,
  rootMargin: "50px",
});
```

### 2. Scroll-triggered Animations

```tsx
const { ref, isIntersecting } = useScrollAnimation({
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
});
```

### 3. Analytics Tracking

```tsx
const { ref, isIntersecting, hasBeenVisible } = useIntersectionObserver({
  threshold: 0.5,
  triggerOnce: true,
});

useEffect(() => {
  if (isIntersecting && !hasBeenVisible) {
    // Track view event
    analytics.track("content_viewed", { element: "hero_section" });
  }
}, [isIntersecting, hasBeenVisible]);
```

### 4. Performance Optimization

```tsx
const { ref, isIntersecting } = useIntersectionObserver({
  threshold: 0.1,
  freezeOnceVisible: true, // Disconnects observer after first visibility
});
```

### 5. Custom Root Element

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const { ref, isIntersecting } = useIntersectionObserver({
  root: containerRef.current,
  threshold: 0.5,
});
```

## Examples

Check out `useIntersectionObserver.examples.tsx` for comprehensive examples including:

- Basic visibility tracking
- Lazy loading images
- Scroll-triggered animations
- Analytics tracking
- Multiple elements with different thresholds
- Performance optimization
- Custom root elements

## Browser Support

This hook uses the IntersectionObserver API, which is supported in all modern browsers. For older browsers, consider using a polyfill:

```bash
yarn add intersection-observer
```

## Performance Tips

1. **Use `triggerOnce`** for elements that only need to be tracked once
2. **Use `freezeOnceVisible`** for performance optimization
3. **Set appropriate thresholds** to avoid unnecessary callbacks
4. **Use `rootMargin`** to trigger before elements are fully visible
5. **Disconnect observers** when components unmount (handled automatically)

## TypeScript Support

The hook is fully typed with comprehensive TypeScript interfaces for all options and return values. IntelliSense support is available for all parameters and return values.
