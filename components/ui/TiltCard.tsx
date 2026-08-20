"use client";

import { useRef, useState, useEffect } from "react";
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
 * On touch/mobile devices the 3D tilt is skipped for performance.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const narrow = window.innerWidth < 768;
    setIsTouch(hasTouch || narrow);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

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

  const handleMouseLeave = () => {
    if (isTouch) return;
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
      style={isTouch ? undefined : { transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Glare overlay — skipped on touch */}
      {!isTouch && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(1px)" }}
        />
      )}
    </div>
  );
}
