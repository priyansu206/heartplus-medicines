"use client";

import { useRef, type MouseEventHandler, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotColor = "rgba(255, 255, 255, 0.15)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;
    const rect = card.getBoundingClientRect();
    spot.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${spotColor}, transparent 80%)`;
  };

  const handleMouseEnter = () => {
    const spot = spotRef.current;
    if (spot) spot.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    const spot = spotRef.current;
    if (spot) spot.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}