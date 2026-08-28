"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY, opacity: 1 });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.15,
        borderColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 0 60px rgba(255, 255, 255, 0.3)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 0.45,
        opacity: 1,
        duration: 0.3,
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.6)",
        boxShadow: "0 0 24px rgba(255, 255, 255, 0.15)",
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
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

    const interactiveSelector =
      "a, button, input, select, textarea, [role='button'], label";

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

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
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: 128,
          height: 128,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1.5px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.05)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      />
    </>
  );
}
