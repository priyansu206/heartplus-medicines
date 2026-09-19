"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

interface OrbProps {
  className?: string;
  hue?: number;
  hue2?: number;
}

export function Orb({ className = "", hue = 200, hue2 = 350 }: OrbProps) {
  const root = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = root.current;
    if (!el || isMobile) return;

    const centerX = el.offsetWidth / 2;
    const centerY = el.offsetHeight / 2;

    const h1 = hue;
    const h2 = hue2;

    const gradients = el.querySelectorAll("[data-orb]");
    const ctx = gsap.context(() => {
      gradients.forEach((g, i) => {
        gsap.fromTo(
          g,
          {
            scale: 0.9,
            translateX: centerX,
            translateY: centerY,
          },
          {
            scale: 1.05,
            translateX: (i + 1) * 80,
            translateY: (i + 1) * 40,
            repeat: -1,
            yoyo: true,
            duration: 4 + i * 0.6,
            ease: "sine.inOut",
          }
        );
      });
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        el.style.filter = `hue-rotate(${(h1 - h2) * self.progress}deg)`;
      },
    });

    return () => {
      ctx.revert();
      st.kill();
    };
  }, [hue, hue2, isMobile]);

  return (
    <div
      ref={root}
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      <div
        data-orb
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "9999px",
          background: `radial-gradient(circle at center, hsla(${hue}, 72%, 60%, 0.45), transparent 60%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        data-orb
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: "9999px",
          background: `radial-gradient(circle at center, hsla(${hue2}, 72%, 50%, 0.3), transparent 60%)`,
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}