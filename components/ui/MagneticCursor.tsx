"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom magnetic cursor with dot + trailing ring.
 * Ring morphs when hovering interactive elements.
 * Uses Pointer Events so it also follows touch drags on mobile.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Respect reduced-motion preference — no cursor layer at all
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY, opacity: 1 });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        background: "rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.4)",
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.12), inset 0 0 16px rgba(59, 130, 246, 0.06)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 0.4,
        background: "rgba(59, 130, 246, 0.9)",
        boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
        duration: 0.3,
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        background: "rgba(255, 255, 255, 0.06)",
        borderColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.05), inset 0 0 12px rgba(255, 255, 255, 0.03)",
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(dot, {
        scale: 1,
        background: "rgba(255, 255, 255, 0.7)",
        boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
        duration: 0.3,
      });
    };

    const onMouseLeaveWindow = () => {
      gsap.to(dot, { opacity: 0, duration: 0.2 });
      gsap.to(ring, { opacity: 0, duration: 0.2 });
    };

    const onMouseEnterWindow = () => {
      gsap.to(dot, { opacity: 1, duration: 0.2 });
      gsap.to(ring, { opacity: 1, duration: 0.2 });
    };

    // Ring follows with smooth lag
    const ringTicker = () => {
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    gsap.ticker.add(ringTicker);

    // Track interactive elements
    const interactiveSelector =
      "a, button, input, select, textarea, [role='button'], label";

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    // Delegate hover events for interactive elements
    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest(interactiveSelector);
      if (target) onMouseEnterInteractive();
    };
    const onOut = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest(interactiveSelector);
      if (target) onMouseLeaveInteractive();
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      gsap.ticker.remove(ringTicker);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      {/* Dot — tiny translucent center */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      />
      {/* Ring — frosted glass following with lag */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.05), inset 0 0 12px rgba(255, 255, 255, 0.03)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      />
    </>
  );
}
