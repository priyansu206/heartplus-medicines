"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { SERVICES } from "@/lib/constants";
import { TiltCard } from "@/components/ui/TiltCard";
import { Stethoscope, Brain, Heart, Baby, Droplets, Wind, Microscope, Pill, TestTube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Pill, Stethoscope, Droplets, Microscope, Heart, Brain, Baby, Wind, TestTube];

/**
 * A pinned horizontal scroll section — user scrolls vertically but
 * the content moves horizontally through the services.
 * The pinned scrub animation runs on every device — transform-only
 * tweens stay GPU-composited on mobile.
 */
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useScrollTextReveal({ duration: 0.6, stagger: 0.05 });

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth + 100;

    const scrollTween = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Morph cards as they scroll into the horizontal view
    const cards = track.querySelectorAll<HTMLElement>(".scroll-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.85, filter: "blur(4px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      cards.forEach((card) => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === card) st.kill();
        });
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden flex flex-col justify-center h-screen"
    >
      {/* Section header */}
      <div className="absolute top-12 left-0 right-0 z-10 text-center px-6">
        <span ref={headerRef} className="inline-block bg-white/[0.06] backdrop-blur-md text-violet-300 border border-white/[0.08] px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">
          Scroll to Explore
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
          Our Specialties
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-8 items-center px-16 will-change-transform"
        style={{ width: "max-content" }}
      >
        {SERVICES.map((service, i) => {
          const Icon = ICONS[i] || Pill;
          return (
            <TiltCard key={service.id} maxTilt={10} glareOpacity={0.12}>
              <div className="scroll-card w-[340px] flex-shrink-0 p-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] flex flex-col gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-violet-400/20 transition-colors duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center border border-white/[0.08]">
                  <Icon className="w-7 h-7 text-violet-300" />
                </div>
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-violet-400 text-sm font-bold">
                  Learn more <span className="text-lg">&rarr;</span>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Gradient fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#06060f] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#06060f] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
