"use client";

import { useEffect, useRef, useState } from "react";
import { isMobileDevice } from "@/lib/isMobile";

/**
 * A subtle radial gradient that follows the mouse cursor.
 * Skipped entirely on mobile to avoid per-move CSS writes.
 */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isMobileDevice()) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let animationFrameId: number | null = null;
    const handleMove = (e: MouseEvent) => {
      if (animationFrameId !== null) return;
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        if (ref.current) {
          ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.08), transparent 80%)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

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
