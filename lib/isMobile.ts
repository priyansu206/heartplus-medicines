/**
 * Shared mobile/touch detection.
 * Returns true on touch devices, reduced-motion, or viewports < 768px.
 * Used to skip heavy GSAP ScrollTrigger animations on mobile.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const hasTouch =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const narrow = window.innerWidth < 768;
  return hasTouch || reducedMotion || narrow;
}
