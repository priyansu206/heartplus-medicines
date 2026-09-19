"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

interface ScrollExpandProps {
  children?: React.ReactNode;
  overlayContent?: React.ReactNode;
  className?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  endScale?: number;
  overlayOpacity?: number;
}

export function ScrollExpand({
  children,
  overlayContent,
  className = "",
  startWidth = 44,
  startHeight = 60,
  startRadius = 28,
  endRadius = 0,
  endScale = 1.25,
  overlayOpacity = 0.6,
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    const overlay = overlayRef.current;
    if (!root || !frame || !overlay || isMobile) return;

    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const startInset = `${(100 - startHeight) / 2}% ${(100 - startWidth) / 2}%`;
    const endInset = "0% 0%";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        end: "center 55%",
        scrub: 0.6,
      },
    });

    tl.fromTo(
      frame,
      {
        clipPath: `inset(${startInset} round ${startRadius}px)`,
        filter: "blur(6px)",
      },
      {
        clipPath: `inset(${endInset} round ${endRadius}px)`,
        filter: "blur(0px)",
        ease: "none",
        duration: 1,
      },
      0
    );

    tl.fromTo(
      frame,
      { scale: 1 },
      { scale: endScale, ease: "none", duration: 1 },
      0.5
    );

    tl.fromTo(
      overlay,
      { opacity: 0, y: 40 },
      { opacity: overlayOpacity, y: 0, ease: "none", duration: 1 },
      0.55
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [startWidth, startHeight, startRadius, endRadius, endScale, overlayOpacity, isMobile]);

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-[28px] will-change-[clip-path,transform]"
      >
        {children}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          {overlayContent}
        </div>
      </div>
    </div>
  );
}