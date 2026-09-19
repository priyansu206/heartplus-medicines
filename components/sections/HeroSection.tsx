"use client";

import { useParallax } from "@/hooks/useParallax";
import { useCountUp } from "@/hooks/useCountUp";
import { useIsMobile } from "@/hooks/useIsMobile";
import Navbar from "@/components/layout/Navbar";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlurText } from "@/components/ui/BlurText";
import { GradientText } from "@/components/ui/GradientText";
import { Orb } from "@/components/ui/Orb";
import { ArrowRight, Phone } from "lucide-react";

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
    <div className="flex flex-col gap-1.5">
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
  const isMobile = useIsMobile();

  const videoRef = useParallax<HTMLDivElement>({
    y: 120,
    start: "top top",
    end: "bottom top",
    disabled: isMobile,
  });
  const contentRef = useParallax<HTMLDivElement>({
    y: -60,
    start: "top top",
    end: "bottom top",
    disabled: isMobile,
  });
  const descRef = useParallax<HTMLParagraphElement>({
    y: 20,
    start: "top bottom",
    end: "bottom 60%",
    disabled: isMobile,
  });

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden bg-black">
      <div
        ref={videoRef}
        className="absolute inset-0 h-full md:h-[120%] md:-top-[10%] md:will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "70% center" }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* Ambient orb glow above the video */}
      <div className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen">
        <div className="absolute -right-1/4 top-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]">
          <Orb hue={210} hue2={340} className="opacity-70" />
        </div>
        <div className="absolute -left-1/4 bottom-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]">
          <Orb hue={195} hue2={260} className="opacity-60" />
        </div>
        <div className="absolute right-1/3 -top-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]">
          <Orb hue={285} hue2={190} className="opacity-50" />
        </div>
      </div>

      {/* Navbar */}
      <Navbar onBookClick={onBookClick} />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16"
      >
        {/* Top */}
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <GradientText
              colors={["#60a5fa", "#a78bfa", "#f472b6"]}
              animationSpeed={6}
              showBorder
            >
              <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-white/95">
                Durgapur&apos;s Trusted Polyclinic
              </span>
            </GradientText>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight text-white">
            <BlurText
              text="Your Health,"
              animateBy="words"
              delay={0.08}
              className="block"
            />
            <BlurText
              text="Our Priority."
              animateBy="words"
              delay={0.06}
              className="block"
            />
          </h1>

          <StatsRow />

          {/* Description */}
          <p
            ref={descRef}
            className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mt-6 sm:mt-8"
          >
            Expert doctors, advanced diagnostics, and compassionate care — all
            under one roof at Durgapur Chowk, Jobra.
          </p>
        </div>

        {/* Bottom */}
        <div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-[fadeSlideUp_0.7s_ease_0.7s_both]">
            <MagneticButton
              onClick={onBookClick}
              className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform transform-gpu inline-flex items-center gap-2 tracking-wide"
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