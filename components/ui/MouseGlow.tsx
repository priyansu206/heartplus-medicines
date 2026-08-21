"use client";

import { useEffect, useRef } from "react";

/**
 * A subtle radial gradient that follows the pointer.
 * Uses Pointer Events so it works with both mouse and touch drags.
 * Writes are rAF-throttled to one style update per frame.
 */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastEvent: PointerEvent | null = null;

    const applyGlow = () => {
      animationFrameId = null;
      if (ref.current && lastEvent) {
        ref.current.style.background = `radial-gradient(600px circle at ${lastEvent.clientX}px ${lastEvent.clientY}px, rgba(59, 130, 246, 0.08), transparent 80%)`;
      }
    };

    const handleMove = (e: PointerEvent) => {
      lastEvent = e;
      if (animationFrameId !== null) return;
      animationFrameId = requestAnimationFrame(applyGlow);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-75"
      style={{
        background:
          "radial-gradient(600px circle at -1000px -1000px, rgba(59, 130, 246, 0.08), transparent 80%)",
      }}
    />
  );
}
