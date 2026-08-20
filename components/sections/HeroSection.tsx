"use client";

import { useState, useEffect } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useTextReveal, useLineReveal } from "@/hooks/useTextReveal";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useCountUp } from "@/hooks/useCountUp";
import Navbar from "@/components/layout/Navbar";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Phone } from "lucide-react"

function StatCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useCountUp({ target, suffix, duration: 2 });
  return (
    <div className="flex flex-col">
      <span ref={ref} className="text-2xl sm:text-3xl font-bold text-white">
        0{suffix}
      </span>
      <span className="text-xs sm:text-sm text-white/40 font-medium">
        {label}
      </span>
    </div>
  );
}

function StatsRow() {
  return (
    <div className="flex flex-wrap gap-6 sm:gap-10 mt-6 sm:mt-8">
      <StatCounter target={9} suffix="+" label="Specialties" />
      <StatCounter target={5} suffix="k+" label="Patients Treated" />
      <StatCounter target={10} suffix="+" label="Years Experience" />
    </div>
  );
}

interface HeroSectionProps {
  onBookClick: () => void;
}

export default function HeroSection({ onBookClick }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const narrow = window.innerWidth < 768;
    setIsMobile(hasTouch || narrow);
  }, []);

  // Text animation refs
  const subtitleRef = useTextScramble({ delay: 200, speed: 50 });
  const headingRef = useLineReveal({ delay: 0.3, stagger: 0.12 });
  const descRef = useTextReveal({ delay: 0.7, stagger: 0.02, duration: 0.6 });

  // Parallax refs — reduced offsets on mobile to avoid heavy compositing
  const videoRef = useParallax<HTMLDivElement>({
    y: isMobile ? 40 : 120,
    start: "top top",
    end: "bottom top",
  });
  const contentRef = useParallax<HTMLDivElement>({
    y: isMobile ? -20 : -60,
    start: "top top",
    end: "bottom top",
  });
  const glowRef = useParallax<HTMLDivElement>({
    y: isMobile ? 15 : 40,
    start: "top top",
    end: "bottom top",
  });

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background — parallax: scrolls slower than page */}
      <div ref={videoRef} className="absolute inset-0 h-[120%] -top-[10%]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "70% center" }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Dark gradient overlay — parallax: slight offset */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
      />

      {/* Navbar */}
      <Navbar onBookClick={onBookClick} />

      {/* Hero Content — parallax: scrolls slightly faster for depth */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16"
      >
        {/* Top */}
        <div className="max-w-3xl">
          <div className="mb-3 sm:mb-4">
            <span ref={subtitleRef} className="text-xs sm:text-sm text-white/90 font-medium tracking-wide">
              Durgapur&apos;s Trusted Polyclinic
            </span>
          </div>
          <h1 ref={headingRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-white">
            Your Health,
            Our Priority.
          </h1>

          {/* Stats row — animated counters */}
          <StatsRow />

          {/* Description */}
          <p ref={descRef} className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mt-5 sm:mt-6">
            Expert doctors, advanced diagnostics, and compassionate care — all under one roof at Durgapur Chowk, Jobra.
          </p>
        </div>

        {/* Bottom */}
        <div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            <MagneticButton
              onClick={onBookClick}
              className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform transform-gpu inline-flex items-center gap-2"
            >
              Book Appointment
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              strength={0.2}
              className="rounded-lg border border-white/30 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <a href="tel:8400661188" className="flex items-center gap-2">
                <Phone size={14} />
                8400661188
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
