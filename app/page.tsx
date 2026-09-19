"use client";

import { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { PinnedParallax } from "@/components/sections/PinnedParallax";
import Footer from "@/components/layout/Footer";
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
import { BookingModal } from "@/components/ui/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            quantity={28}
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
        <BookingModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          services={SERVICES}
        />

        <div className="relative z-10">
          <ReviewsSection />
          <MultiLayerDivider />
          <HorizontalScroll />
          <MultiLayerDivider />
          <FeatureShowcase onBookClick={() => setIsModalOpen(true)} />
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
