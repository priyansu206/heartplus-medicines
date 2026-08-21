"use client";

import { useRef } from "react";
import { gsap } from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Glare opacity (0-1) */
  glareOpacity?: number;
}

/**
 * A card that tilts in 3D toward the cursor with a glare effect.
 * Like Apple's product page cards.
 * Uses Pointer Events, so the tilt also responds to touch drags on mobile.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    // Ignore multi-touch / scroll gestures
    if (e.pointerType !== "mouse" && e.isPrimary === false) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    gsap.to(glare, {
      opacity: glareOpacity,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`,
      duration: 0.3,
    });
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(glare, {
      opacity: 0,
      duration: 0.4,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(1px)" }}
      />
    </div>
  );
}
