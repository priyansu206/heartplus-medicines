"use client";

import { useState } from "react";
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
import { DotPattern } from "@/components/ui/DotPattern";
import { Particles } from "@/components/ui/Particles";
import { useParallax } from "@/hooks/useParallax";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { SERVICES } from "@/lib/constants";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { MorphBlobs } from "@/components/ui/MorphBlobs";
import { MultiLayerDivider } from "@/components/ui/SectionDivider";
import { FloatingNav } from "@/components/ui/FloatingNav";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax for decorative layers — runs on every device
  const particlesRef = useParallax<HTMLDivElement>({ y: -50 });
  const dotPatternRef = useParallax<HTMLDivElement>({ y: -30 });

  return (
    <div className="min-h-screen site-bg text-white font-sans relative overflow-hidden selection:bg-blue-500/30">
      <DevToolsProtection />

      {/* Floating Nav — appears after scrolling past hero */}
      <FloatingNav onBookClick={() => setIsModalOpen(true)} />

      {/* Fullscreen Hero */}
      <HeroSection onBookClick={() => setIsModalOpen(true)} />

      {/* Decorative layers for the content sections */}
      <div className="relative">
        <div ref={particlesRef} className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0 opacity-40"
            quantity={50}
            ease={70}
            color="#3b82f6"
            refresh
          />
        </div>
        <div ref={dotPatternRef} className="absolute inset-0 z-0">
          <DotPattern className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-20 fill-blue-400/20" />
        </div>
        <MouseGlow />
        <FloatingShapes />
        <MorphBlobs />

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
          <MultiLayerDivider />
          <HorizontalScroll />
          <MultiLayerDivider />
          <FeatureShowcase />
          <MultiLayerDivider />
          <PinnedParallax />
          <MultiLayerDivider />
          <ServicesSection onBookClick={() => setIsModalOpen(true)} />
          <Footer />
        </div>
      </div>
    </div>
  );
}
