/**
 * Shared animation-gate detection.
 *
 * All GSAP/ScrollTrigger/canvas animations now run on phones and tablets
 * with the same fidelity as on laptop. The only users who get a static
 * experience are those who explicitly asked for it via
 * `prefers-reduced-motion: reduce` (accessibility requirement).
 *
 * Pointer-driven effects (custom cursor, tilt, magnetic buttons, glow)
 * use unified Pointer Events, so they respond to both mouse and touch.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
