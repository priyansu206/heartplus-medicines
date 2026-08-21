"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * A dramatic pinned section where background and foreground text
 * layers move at different speeds creating a deep parallax effect.
 * The pinned/scrub animation runs on every device — transform-only
 * tweens stay GPU-composited on mobile.
 */
export function PinnedParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const midTextRef = useRef<HTMLDivElement>(null);
  const fgTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useScrollTextReveal({ duration: 0.8, stagger: 0.08, delay: 0.15 });

  useEffect(() => {
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
        anticipatePin: 1,
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center h-screen"
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
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2 ref={headingRef} className="text-3xl sm:text-6xl md:text-7xl font-black text-white leading-tight">
          Trust Built Over{" "}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            3,000+
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
