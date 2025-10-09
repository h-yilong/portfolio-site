# useScroll Hook

A high-performance React hook for detecting scroll events and position with advanced performance optimizations using `requestAnimationFrame` and throttling.

## Features

- 🚀 **High Performance** - Uses `requestAnimationFrame` and throttling for smooth tracking
- 📊 **Comprehensive Data** - Tracks position, direction, velocity, and acceleration
- 🎯 **Flexible Configuration** - Customizable throttling, tracking options, and target elements
- 📱 **Cross-Platform** - Works with window scroll and custom elements
- 🎨 **Animation Ready** - Optimized for scroll-triggered animations
- 📈 **Analytics Friendly** - Built-in analytics tracking capabilities

## Performance Optimizations

### 1. RequestAnimationFrame Integration

```tsx
// Uses RAF for smooth 60fps updates
const { position } = useScroll({ useRAF: true });
```

### 2. Throttling

```tsx
// Throttle to 120fps for high-performance animations
const { position } = useScroll({ throttle: 8 });
```

### 3. Passive Event Listeners

```tsx
// Automatically uses passive listeners for better performance
const { position } = useScroll();
```

### 4. Selective Tracking

```tsx
// Only track what you need to minimize overhead
const { position } = useScroll({
  trackVelocity: false,
  trackAcceleration: false,
});
```

## Installation

The hooks are available in your project at `src/hooks/scroll/`.

## Basic Usage

```tsx
import { useScroll } from "./hooks/scroll";

function MyComponent() {
  const { position, direction, isScrolling } = useScroll();

  return (
    <div>
      <p>Scroll Position: {position.y}px</p>
      <p>Direction: {direction.y === 1 ? "Down" : "Up"}</p>
      <p>Scrolling: {isScrolling ? "Yes" : "No"}</p>
    </div>
  );
}
```

## API Reference

### useScroll(options?)

#### Options

| Option              | Type                            | Default | Description                                      |
| ------------------- | ------------------------------- | ------- | ------------------------------------------------ |
| `enabled`           | `boolean`                       | `true`  | Whether to track scroll events                   |
| `throttle`          | `number`                        | `16`    | Throttle interval in milliseconds (16ms = 60fps) |
| `useRAF`            | `boolean`                       | `true`  | Use requestAnimationFrame for better performance |
| `trackDirection`    | `boolean`                       | `true`  | Track scroll direction                           |
| `trackVelocity`     | `boolean`                       | `false` | Track scroll velocity                            |
| `trackAcceleration` | `boolean`                       | `false` | Track scroll acceleration                        |
| `element`           | `HTMLElement \| Window \| null` | `null`  | Custom element to track (defaults to window)     |
| `trackX`            | `boolean`                       | `true`  | Track horizontal scroll                          |
| `trackY`            | `boolean`                       | `true`  | Track vertical scroll                            |

#### Returns

| Property       | Type                         | Description                              |
| -------------- | ---------------------------- | ---------------------------------------- |
| `position`     | `ScrollPosition`             | Current scroll position and metadata     |
| `direction`    | `ScrollDirection`            | Current scroll direction                 |
| `velocity`     | `ScrollVelocity \| null`     | Current scroll velocity (if enabled)     |
| `acceleration` | `ScrollAcceleration \| null` | Current scroll acceleration (if enabled) |
| `isScrolling`  | `boolean`                    | Whether the user is currently scrolling  |
| `isAtBottom`   | `boolean`                    | Whether scrolled to the bottom           |
| `isAtTop`      | `boolean`                    | Whether scrolled to the top              |
| `isAtLeft`     | `boolean`                    | Whether scrolled to the left             |
| `isAtRight`    | `boolean`                    | Whether scrolled to the right            |

## Specialized Hooks

### useScrollAnimation(options?)

Optimized for scroll-triggered animations with high frame rates.

```tsx
import { useScrollAnimation } from "./hooks/scroll";

function AnimatedComponent() {
  const { position, isScrolling } = useScrollAnimation({
    throttle: 8, // 120fps for smooth animations
  });

  return (
    <div
      style={{
        transform: `translateY(${position.y * 0.5}px)`,
        transition: isScrolling ? "none" : "transform 0.3s ease-out",
      }}
    >
      Parallax content
    </div>
  );
}
```

### useScrollNavigation(options?)

Optimized for scroll-based navigation logic.

```tsx
import { useScrollNavigation } from "./hooks/scroll";

function NavigationComponent() {
  const { direction, isScrolling } = useScrollNavigation({
    trackDirection: true,
  });

  // Hide navigation when scrolling down
  const showNav = direction.y !== 1;

  return <nav className={showNav ? "visible" : "hidden"}>Navigation content</nav>;
}
```

### useScrollAnalytics(options?)

Optimized for scroll-based analytics tracking.

```tsx
import { useScrollAnalytics } from "./hooks/scroll";

function AnalyticsComponent() {
  const { position, velocity, isScrolling } = useScrollAnalytics({
    trackVelocity: true,
    throttle: 100, // Lower frequency for analytics
  });

  useEffect(() => {
    if (isScrolling) {
      // Track scroll events
      analytics.track("scroll", {
        position: position.y,
        velocity: velocity?.magnitude,
      });
    }
  }, [isScrolling, position.y, velocity]);

  return <div>Content</div>;
}
```

## Common Use Cases

### 1. Scroll Progress Indicator

```tsx
const { position } = useScroll();

return (
  <div className="fixed top-0 right-0 left-0 h-1 bg-gray-200">
    <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${position.progressY * 100}%` }} />
  </div>
);
```

### 2. Parallax Effects

```tsx
const { position, isScrolling } = useScrollAnimation({
  throttle: 8,
});

return (
  <div
    style={{
      transform: `translateY(${position.y * 0.5}px)`,
      transition: isScrolling ? "none" : "transform 0.3s ease-out",
    }}
  >
    Parallax content
  </div>
);
```

### 3. Smart Navigation

```tsx
const { direction, isScrolling } = useScrollNavigation();

const [showNav, setShowNav] = useState(true);

useEffect(() => {
  if (isScrolling) {
    setShowNav(direction.y === -1); // Show when scrolling up
  }
}, [direction.y, isScrolling]);
```

### 4. Custom Element Tracking

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const { position } = useScroll({
  element: containerRef.current,
});

return (
  <div ref={containerRef} className="h-64 overflow-y-auto">
    <div>Content</div>
  </div>
);
```

### 5. Performance Monitoring

```tsx
const { position, velocity, acceleration } = useScroll({
  trackVelocity: true,
  trackAcceleration: true,
  throttle: 8,
});

// Monitor performance
console.log("Velocity:", velocity?.magnitude);
console.log("Acceleration:", acceleration?.magnitude);
```

## Performance Best Practices

### 1. Use Appropriate Throttling

```tsx
// For animations (high frequency)
const { position } = useScroll({ throttle: 8 }); // 120fps

// For analytics (low frequency)
const { position } = useScroll({ throttle: 100 }); // 10fps
```

### 2. Disable Unnecessary Tracking

```tsx
// Only track what you need
const { position } = useScroll({
  trackVelocity: false,
  trackAcceleration: false,
  trackX: false, // Only track vertical scroll
});
```

### 3. Use Specialized Hooks

```tsx
// For animations
const { position } = useScrollAnimation();

// For navigation
const { direction } = useScrollNavigation();

// For analytics
const { position } = useScrollAnalytics();
```

### 4. Custom Element Tracking

```tsx
// Track specific elements instead of window
const { position } = useScroll({
  element: containerRef.current,
});
```

## Browser Support

This hook uses modern browser APIs and is supported in all modern browsers. For older browsers, consider using polyfills for:

- `requestAnimationFrame`
- `performance.now()`
- `IntersectionObserver` (if using with intersection hooks)

## Examples

Check out `useScroll.examples.tsx` for comprehensive examples including:

- Basic scroll tracking
- Scroll-triggered animations
- Smart navigation
- Analytics tracking
- Custom element tracking
- Performance monitoring
- Scroll progress indicators

## TypeScript Support

The hook is fully typed with comprehensive TypeScript interfaces for all options and return values. IntelliSense support is available for all parameters and return values.

## Performance Tips

1. **Use appropriate throttling** based on your use case
2. **Disable unnecessary tracking** to reduce overhead
3. **Use specialized hooks** for specific use cases
4. **Track custom elements** when possible instead of window scroll
5. **Monitor performance** with velocity and acceleration tracking
6. **Use passive event listeners** (handled automatically)
7. **Clean up properly** (handled automatically)
