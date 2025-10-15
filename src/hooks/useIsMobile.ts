import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

// ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
// ref: https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/change_event
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const mql = window.matchMedia(`(width < ${MOBILE_BREAKPOINT}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
