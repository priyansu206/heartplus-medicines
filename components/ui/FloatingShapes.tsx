"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Shape {
  x: string;
  y: string;
  size: number;
  type: "circle" | "ring" | "square";
  color: string;
  duration: number;
  delay: number;
}

const SHAPES: Shape[] = [
  { x: "8%", y: "15%", size: 60, type: "circle", color: "rgba(99,102,241,0.12)", duration: 6, delay: 0 },
  { x: "85%", y: "25%", size: 40, type: "ring", color: "rgba(59,130,246,0.15)", duration: 7, delay: 1 },
  { x: "15%", y: "55%", size: 30, type: "square", color: "rgba(168,85,247,0.1)", duration: 5, delay: 0.5 },
  { x: "75%", y: "65%", size: 50, type: "circle", color: "rgba(236,72,153,0.08)", duration: 8, delay: 2 },
  { x: "50%", y: "80%", size: 35, type: "ring", color: "rgba(99,102,241,0.1)", duration: 6.5, delay: 1.5 },
  { x: "92%", y: "45%", size: 25, type: "square", color: "rgba(59,130,246,0.12)", duration: 5.5, delay: 0.8 },
  { x: "30%", y: "10%", size: 45, type: "ring", color: "rgba(168,85,247,0.08)", duration: 7.5, delay: 1.2 },
  { x: "60%", y: "40%", size: 20, type: "circle", color: "rgba(236,72,153,0.1)", duration: 4.5, delay: 0.3 },
];

/**
 * Floating decorative shapes scattered across the page.
 * Each shape bobs up and down at a unique speed using GSAP.
 * Full set of shapes and animations runs on every device —
 * GSAP transform tweens stay on the compositor even on phones.
 */
export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = container.querySelectorAll<HTMLElement>(".floating-shape");
    const tweens: gsap.core.Tween[] = [];

    shapes.forEach((shape, i) => {
      const config = SHAPES[i];
      if (!config) return;

      const bob = gsap.to(shape, {
        y: `random(-20, 20)`,
        x: `random(-10, 10)`,
        rotation: `random(-8, 8)`,
        duration: config.duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: config.delay,
      });

      tweens.push(bob);

      const pulse = gsap.to(shape, {
        scale: `random(0.9, 1.15)`,
        duration: config.duration * 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: config.delay + 0.5,
      });
      tweens.push(pulse);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {SHAPES.map((shape, i) => {
        const baseClasses =
          "floating-shape absolute will-change-transform";

        if (shape.type === "ring") {
          return (
            <div
              key={i}
              className={baseClasses}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                borderRadius: "50%",
                border: `1.5px solid ${shape.color}`,
              }}
            />
          );
        }

        if (shape.type === "square") {
          return (
            <div
              key={i}
              className={baseClasses}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                borderRadius: "20%",
                background: shape.color,
                transform: "rotate(45deg)",
              }}
            />
          );
        }

        // circle
        return (
          <div
            key={i}
            className={baseClasses}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${shape.color}, transparent)`,
            }}
          />
        );
      })}
    </div>
  );
}
