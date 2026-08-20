"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 768;
  return hasTouch || reducedMotion || narrow;
}

/**
 * A dramatic pinned section where background and foreground text
 * layers move at different speeds creating a deep parallax effect.
 * On mobile the pinned/scrub animation is skipped — content is shown statically
 * to avoid the heavy GPU compositing that causes jank.
 */
export function PinnedParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const midTextRef = useRef<HTMLDivElement>(null);
  const fgTextRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (isMobile) return; // skip pinned animation on mobile

    const section = sectionRef.current;
    const bgText = bgTextRef.current;
    const midText = midTextRef.current;
    const fgText = fgTextRef.current;
    if (!section || !bgText || !midText || !fgText) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: "+=200%",
      },
    });

    tl.fromTo(
      bgText,
      { y: 100, opacity: 0.15, scale: 0.8 },
      { y: -200, opacity: 0.08, scale: 1.1, ease: "none" },
      0
    );

    tl.fromTo(
      midText,
      { y: 200, opacity: 0.4 },
      { y: -100, opacity: 0.2, ease: "none" },
      0
    );

    tl.fromTo(
      fgText,
      { y: 300, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out" },
      0.2
    );

    tl.to(fgText, { opacity: 0, y: -50, ease: "power2.in" }, 0.7);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden flex items-center justify-center ${isMobile ? "py-24" : "h-screen"}`}
    >
      {/* Deep background layer */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[10rem] sm:text-[20rem] font-black text-white/[0.04] leading-none tracking-tighter">
          CARE
        </span>
      </div>

      {/* Mid layer */}
      <div
        ref={midTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[6rem] sm:text-[14rem] font-black text-white/[0.06] leading-none tracking-tighter">
          PLUS
        </span>
      </div>

      {/* Foreground — main message */}
      <div
        ref={fgTextRef}
        className="relative z-10 text-center px-6 max-w-3xl"
        style={isMobile ? { opacity: 1, transform: "none" } : undefined}
      >
        <h2 className="text-3xl sm:text-6xl md:text-7xl font-black text-white leading-tight">
          Trust Built Over{" "}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            10,000+
          </span>{" "}
          Patient Lives
        </h2>
        <p className="mt-6 text-base sm:text-lg text-white/40 font-medium max-w-xl mx-auto">
          Every heartbeat matters. Every patient matters. That&apos;s the Heart
          Plus promise.
        </p>
      </div>
    </section>
  );
}
