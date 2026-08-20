"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when running on a mobile/touch device or when the user
 * prefers reduced motion. Used to skip heavy animations that cause
 * sluggishness on phones and tablets.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const narrowViewport = window.innerWidth < 768;

      setIsMobile(hasTouch || reducedMotion || narrowViewport);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
