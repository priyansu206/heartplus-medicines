"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export function GradientText({
  children,
  className = "",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  animationSpeed = 8,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const animationDuration = animationSpeed * 1000;

  useEffect(() => {
    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick);

      if (isPaused) {
        lastTimeRef.current = null;
        return;
      }

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        return;
      }

      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;
      elapsedRef.current += deltaTime;

      if (yoyo) {
        const fullCycle = animationDuration * 2;
        const cycleTime = elapsedRef.current % fullCycle;
        setProgress(
          cycleTime < animationDuration
            ? (cycleTime / animationDuration) * 100
            : 100 -
                ((cycleTime - animationDuration) / animationDuration) * 100
        );
      } else {
        setProgress((elapsedRef.current / animationDuration) * 100);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, animationDuration, yoyo]);

  const gradientAngle =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical"
      ? "to bottom"
      : "to bottom right";

  const gradientColors = [...colors, colors[0]].join(", ");

  const backgroundPosition =
    direction === "vertical" ? `50% ${progress}%` : `${progress}% 50%`;

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize:
      direction === "horizontal"
        ? "300% 100%"
        : direction === "vertical"
        ? "100% 300%"
        : "300% 300%",
    backgroundRepeat: "repeat",
    backgroundPosition,
  };

  return (
    <div
      className={`relative flex max-w-fit flex-row items-center justify-center rounded-2xl font-medium ${className}`}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
    >
      {showBorder && (
        <div
          className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
          style={{ ...gradientStyle, opacity: 1 }}
        >
          <div
            className="absolute bg-[#0a0a1a] rounded-2xl"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <div
        className={`inline-block relative z-1 text-transparent bg-clip-text ${showBorder ? "py-1 px-2" : ""}`}
        style={{ ...gradientStyle, WebkitBackgroundClip: "text" }}
      >
        {children}
      </div>
    </div>
  );
}