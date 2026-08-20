"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { TiltCard } from "@/components/ui/TiltCard";
import { Stethoscope, Brain, Heart, Baby, Droplets, Wind, Microscope, Pill, TestTube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Pill, Stethoscope, Droplets, Microscope, Heart, Brain, Baby, Wind, TestTube];

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 768;
  return hasTouch || reducedMotion || narrow;
}

/**
 * A pinned horizontal scroll section — user scrolls vertically but
 * the content moves horizontally through the services.
 * On mobile, cards are shown in a vertical grid to avoid the heavy
 * pinned scrub animation.
 */
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (isMobile) return; // skip pinned horizontal scroll on mobile

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
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden flex flex-col justify-center ${isMobile ? "py-20" : "h-screen"}`}
    >
      {/* Section header */}
      <div className={`${isMobile ? "relative mb-8" : "absolute top-12"} left-0 right-0 z-10 text-center px-6`}>
        <span className="bg-white/[0.06] backdrop-blur-md text-violet-300 border border-white/[0.08] px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">
          {isMobile ? "Our Specialties" : "Scroll to Explore"}
        </span>
        {!isMobile && (
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
            Our Specialties
          </h2>
        )}
      </div>

      {isMobile ? (
        /* Mobile: vertical grid layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i] || Pill;
            return (
              <div
                key={service.id}
                className="p-6 rounded-3xl bg-white/[0.04] border border-white/[0.08] flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center border border-white/[0.08]">
                  <Icon className="w-6 h-6 text-violet-300" />
                </div>
                <h3 className="text-lg font-bold text-white">{service.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-violet-400 text-sm font-bold">
                  Learn more <span className="text-lg">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Desktop: horizontal pinned scroll */
        <>
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
                  <div className="w-[340px] flex-shrink-0 p-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] flex flex-col gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-violet-400/20 transition-colors duration-300">
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
        </>
      )}
    </section>
  );
}
