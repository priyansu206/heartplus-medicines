"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

interface Shape {
  x: string;
  y: string;
  size: number;
  type: "circle" | "ring" | "square";
  color: string;
  duration: number;
  delay: number;
  fx2: number;
  fy2: number;
  fr1: number;
  fr2: number;
  fs2: number;
}

const SHAPES: Shape[] = [
  { x: "8%", y: "15%", size: 60, type: "circle", color: "rgba(99,102,241,0.12)", duration: 6, delay: 0, fx2: 12, fy2: -18, fr1: 0, fr2: -6, fs2: 1.12 },
  { x: "85%", y: "25%", size: 40, type: "ring", color: "rgba(59,130,246,0.15)", duration: 7, delay: 1, fx2: -10, fy2: 14, fr1: 0, fr2: 5, fs2: 1.08 },
  { x: "15%", y: "55%", size: 30, type: "square", color: "rgba(168,85,247,0.1)", duration: 5, delay: 0.5, fx2: -8, fy2: -12, fr1: 45, fr2: 49, fs2: 1.15 },
  { x: "75%", y: "65%", size: 50, type: "circle", color: "rgba(236,72,153,0.08)", duration: 8, delay: 2, fx2: 10, fy2: 16, fr1: 0, fr2: 4, fs2: 1.1 },
  { x: "50%", y: "80%", size: 35, type: "ring", color: "rgba(99,102,241,0.1)", duration: 6.5, delay: 1.5, fx2: 8, fy2: -14, fr1: 0, fr2: -5, fs2: 1.12 },
  { x: "92%", y: "45%", size: 25, type: "square", color: "rgba(59,130,246,0.12)", duration: 5.5, delay: 0.8, fx2: -12, fy2: 12, fr1: 45, fr2: 40, fs2: 1.08 },
  { x: "30%", y: "10%", size: 45, type: "ring", color: "rgba(168,85,247,0.08)", duration: 7.5, delay: 1.2, fx2: -6, fy2: -12, fr1: 0, fr2: 6, fs2: 1.1 },
  { x: "60%", y: "40%", size: 20, type: "circle", color: "rgba(236,72,153,0.1)", duration: 4.5, delay: 0.3, fx2: 6, fy2: 10, fr1: 0, fr2: -4, fs2: 1.15 },
];

const BASE_CLASSES = "floating-shape absolute will-change-transform";

const MOBILE_SHAPES = [0, 3, 5];

export function FloatingShapes() {
  const isMobile = useIsMobile();

  const visible = isMobile
    ? MOBILE_SHAPES.map((i) => SHAPES[i])
    : SHAPES;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {visible.map((shape, i) => {
        const style: React.CSSProperties & {
        [key: `--${string}`]: string | number;
      } = {
          left: shape.x,
          top: shape.y,
          width: shape.size,
          height: shape.size,
          "--fx2": `${shape.fx2}px`,
          "--fy2": `${shape.fy2}px`,
          "--fr1": `${shape.fr1}deg`,
          "--fr2": `${shape.fr2}deg`,
          "--fs2": shape.fs2,
          animation: `float-shape ${shape.duration}s ease-in-out ${shape.delay}s infinite alternate`,
        };

        if (shape.type === "ring") {
          return (
            <div
              key={i}
              className={BASE_CLASSES}
              style={{
                ...style,
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
              className={BASE_CLASSES}
              style={{
                ...style,
                borderRadius: "20%",
                background: shape.color,
              }}
            />
          );
        }

        return (
          <div
            key={i}
            className={BASE_CLASSES}
            style={{
              ...style,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${shape.color}, transparent)`,
            }}
          />
        );
      })}
    </div>
  );
}