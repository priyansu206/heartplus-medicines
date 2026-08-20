"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import HeroSection from "@/components/sections/HeroSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { PinnedParallax } from "@/components/sections/PinnedParallax";
import Footer from "@/components/layout/Footer";
import { BookingForm } from "@/components/forms/BookingForm";
import { DevToolsProtection } from "@/components/providers/DevToolsProtection";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";
import { useParallax } from "@/hooks/useParallax";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { SERVICES } from "@/lib/constants";

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 768;
  return hasTouch || reducedMotion || narrow;
}

/** MouseGlow — skipped entirely on mobile to avoid per-touch CSS writes */
function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only run on desktop with fine pointer
    if (!isMobileDevice()) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let animationFrameId: number | null = null;
    const handleMove = (e: MouseEvent) => {
      if (animationFrameId !== null) return;
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        if (ref.current) {
          ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.08), transparent 80%)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-75"
      style={{
        background:
          "radial-gradient(600px circle at -1000px -1000px, rgba(59, 130, 246, 0.08), transparent 80%)",
      }}
    />
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Parallax for decorative layers — reduced on mobile
  const particlesRef = useParallax<HTMLDivElement>({ y: isMobile ? -20 : -50 });
  const dotPatternRef = useParallax<HTMLDivElement>({ y: isMobile ? -10 : -30 });

  return (
    <div className="min-h-screen site-bg text-white font-sans relative overflow-hidden selection:bg-blue-500/30">
      <DevToolsProtection />

      {/* Fullscreen Hero */}
      <HeroSection onBookClick={() => setIsModalOpen(true)} />

      {/* Decorative layers for the content sections */}
      <div className="relative">
        <div ref={particlesRef} className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0 opacity-40"
            quantity={isMobile ? 20 : 50}
            ease={isMobile ? 80 : 70}
            color="#3b82f6"
            refresh
          />
        </div>
        <div ref={dotPatternRef} className="absolute inset-0 z-0">
          <DotPattern className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-20 fill-blue-400/20" />
        </div>
        <MouseGlow />
        <FloatingShapes />

        {/* Booking Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/10 relative transform-gpu"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 font-bold transition-colors"
                >
                  &#10005;
                </button>

                <h3 className="text-2xl font-black text-white mb-2">
                  Request an Appointment
                </h3>
                <p className="text-white/50 font-medium mb-6 text-sm">
                  Fill out your details below and our team will get back to you
                  shortly.
                </p>

                <BookingForm
                  services={SERVICES}
                  onSuccess={() => setIsModalOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <ReviewsSection />
          <HorizontalScroll />
          <FeatureShowcase />
          <PinnedParallax />
          <ServicesSection onBookClick={() => setIsModalOpen(true)} />
          <Footer />
        </div>
      </div>
    </div>
  );
}
