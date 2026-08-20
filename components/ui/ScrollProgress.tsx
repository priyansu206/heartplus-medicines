"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileDevice } from "@/lib/isMobile";

gsap.registerPlugin(ScrollTrigger);

/**
 * A thin gradient bar at the top of the viewport that fills as you scroll.
 * Skipped on mobile to avoid a ScrollTrigger + GSAP ticker overhead.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileDevice()) return; // skip on mobile

    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === document.documentElement) st.kill();
      });
    };
  }, []);

  // Don't render anything on mobile
  if (typeof window !== "undefined" && isMobileDevice()) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
        }}
      />
    </div>
  );
}
