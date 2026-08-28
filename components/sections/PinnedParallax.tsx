"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { useScrollMorph } from "@/hooks/useScrollMorph";

gsap.registerPlugin(ScrollTrigger);

export function PinnedParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const midTextRef = useRef<HTMLDivElement>(null);
  const fgTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useScrollTextReveal({ duration: 0.8, stagger: 0.08, delay: 0.15 });

  const carePlusRef = useScrollMorph<HTMLDivElement>({
    scale: [1.15, 1],
    opacity: [0, 1],
    y: [40, 0],
    blur: [6, 0],
    start: "center center",
    end: "center 45%",
    ease: "power2.out",
  });

  useEffect(() => {
    const section = sectionRef.current;
    const bgText = bgTextRef.current;
    const midText = midTextRef.current;
    const fgText = fgTextRef.current;
    if (!section || !bgText || !midText || !fgText) return;

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

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

    const careLetters = bgText.querySelectorAll<HTMLElement>(".care-letter");
    if (careLetters.length) {
      gsap.set(careLetters, { xPercent: 100, opacity: 0 });

      tl.to(
        careLetters,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.15,
          stagger: 0.04,
          ease: "power3.out",
        },
        0.05
      );

      tl.to(
        bgText,
        {
          y: -200,
          opacity: 0.08,
          scale: 1.1,
          rotation: 5,
          ...(isTouch ? {} : { filter: "blur(2px)" }),
          ease: "none",
        },
        0.5
      );
    }

    const plusLetters = midText.querySelectorAll<HTMLElement>(".plus-letter");
    if (plusLetters.length) {
      gsap.set(plusLetters, { xPercent: -100, opacity: 0 });

      tl.to(
        plusLetters,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.15,
          stagger: 0.04,
          ease: "power3.out",
        },
        0.15
      );

      tl.to(
        midText,
        {
          y: -100,
          opacity: 0.2,
          scale: 0.95,
          rotation: -3,
          ...(isTouch ? {} : { filter: "blur(1px)" }),
          ease: "none",
        },
        0.55
      );
    }

    tl.fromTo(
      fgText,
      { y: 300, opacity: 0, scale: 0.9, ...(isTouch ? {} : { filter: "blur(8px)" }) },
      { y: 0, opacity: 1, scale: 1, ...(isTouch ? {} : { filter: "blur(0px)" }), ease: "power2.out" },
      0.2
    );

    tl.to(fgText, { opacity: 0, y: -50, scale: 1.05, ...(isTouch ? {} : { filter: "blur(4px)" }), ease: "power2.in" }, 0.7);

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
      {/* Deep background layer — CARE */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[10rem] sm:text-[20rem] font-black text-white/[0.04] leading-none tracking-tighter">
          {"CARE".split("").map((char, i) => (
            <span key={i} className="care-letter inline-block overflow-hidden">
              <span className="inline-block">{char}</span>
            </span>
          ))}
        </span>
      </div>

      {/* Mid layer — PLUS */}
      <div
        ref={midTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[6rem] sm:text-[14rem] font-black text-white/[0.06] leading-none tracking-tighter">
          {"PLUS".split("").map((char, i) => (
            <span key={i} className="plus-letter inline-block overflow-hidden">
              <span className="inline-block">{char}</span>
            </span>
          ))}
        </span>
      </div>

      {/* Foreground */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2 ref={headingRef} className="text-3xl sm:text-6xl md:text-7xl font-black text-white leading-tight">
          Trust Built Over{" "}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            3,000+
          </span>{" "}
          Patient Lives
        </h2>
        <div
          ref={carePlusRef}
          className="mt-6 inline-block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent text-xl sm:text-3xl font-black uppercase tracking-[0.3em]"
        >
          Care Plus
        </div>
        <p className="mt-4 text-base sm:text-lg text-white/40 font-medium max-w-xl mx-auto">
          Every heartbeat matters. Every patient matters. That&apos;s the Heart
          Plus promise.
        </p>
      </div>
    </section>
  );
}
