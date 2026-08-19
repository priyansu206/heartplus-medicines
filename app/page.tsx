"use client";

import { BookingForm } from "@/components/BookingForm";
import { DevToolsProtection } from "@/components/DevToolsProtection";
import HeroSection from "@/components/HeroSection";
import ReviewsSection from "@/components/ReviewsSection";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

const services = [
  { id: 1, name: "General Medicines", desc: "Comprehensive primary care and treatment for everyday illnesses and health concerns." },
  { id: 2, name: "Gastroenterology", desc: "Expert care for digestive system disorders, including stomach, intestines, and liver." },
  { id: 3, name: "Nephrology", desc: "Specialized diagnosis and treatment for kidney-related conditions and diseases." },
  { id: 4, name: "Urology", desc: "Advanced care for urinary tract conditions and male reproductive system disorders." },
  { id: 5, name: "Cardiology", desc: "Comprehensive heart care, from routine checkups to managing cardiovascular diseases." },
  { id: 6, name: "Neurology", desc: "Diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system." },
  { id: 7, name: "Pediatrics", desc: "Compassionate healthcare for infants, children, and adolescents." },
  { id: 8, name: "Pulmonary Medicine", desc: "Expert treatment for lung and respiratory system conditions, including asthma and COPD." },
  { id: 9, name: "Blood Sample Collection", desc: "Quick, hygienic, and accurate blood sample collection for diagnostic testing." },
];

// Services grid reveal — a staggered cascade where each card rises into
// place and un-blurs from a soft haze into sharp focus.
const servicesGridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let animationFrameId: number | null = null;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (animationFrameId !== null) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        if (ref.current) {
          ref.current.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, rgba(59, 130, 246, 0.08), transparent 80%)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-75"
      style={{ background: "radial-gradient(600px circle at -1000px -1000px, rgba(59, 130, 246, 0.08), transparent 80%)" }}
    />
  );
}

function ServiceListItem({ service, onBookClick }: { service: { id: number; name: string; desc: string }; onBookClick: () => void }) {
  const isGeneral = service.id === 1;

  return (
    <motion.div
      variants={serviceCardVariants}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className="group flex flex-col p-6 rounded-3xl relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.12)] hover:bg-white/[0.07] hover:border-blue-400/20 transition-all duration-300 transform-gpu"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/[0.06] group-hover:to-purple-500/[0.04] transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Name + badge */}
        <div className="mb-3">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
              {service.name}
            </h3>
            {isGeneral && (
              <span className="bg-emerald-500/15 backdrop-blur-sm text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 font-medium leading-relaxed text-sm flex-1 mb-5">{service.desc}</p>

        {/* Book button */}
        {!isGeneral ? (
          <button
            onClick={onBookClick}
            className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-500 backdrop-blur-md text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 transform-gpu flex items-center justify-center gap-2 group/btn text-sm"
          >
            Book Now
            <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">&rarr;</span>
          </button>
        ) : (
          <div className="w-full px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl text-center text-sm">
            Included in General Checkup
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GSAP ScrollTrigger refs
  const servicesHeaderRef = useScrollReveal({ y: 30, duration: 0.7 });
  const servicesGridRef = useStaggerReveal<HTMLDivElement>(".service-card", { y: 50, stagger: 0.06, duration: 0.7 });
  const footerRef = useScrollReveal({ y: 30, duration: 0.7, start: "top 90%" });
  const particlesRef = useParallax<HTMLDivElement>({ y: -50 });
  const dotPatternRef = useParallax<HTMLDivElement>({ y: -30 });

  return (
    <div className="min-h-screen site-bg text-white font-sans relative overflow-hidden selection:bg-blue-500/30">
      <DevToolsProtection />

      {/* Fullscreen Hero */}
      <HeroSection onBookClick={() => setIsModalOpen(true)} />

      {/* Decorative layers for the content sections */}
      <div className="relative">
        <div ref={particlesRef} className="absolute inset-0 z-0">
          <Particles className="absolute inset-0 opacity-40" quantity={50} ease={70} color="#3b82f6" refresh />
        </div>
        <div ref={dotPatternRef} className="absolute inset-0 z-0">
          <DotPattern className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-20 fill-blue-400/20" />
        </div>
        <MouseGlow />

        {/* Booking Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.94, opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/10 relative transform-gpu"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 font-bold transition-colors"
                >&#10005;</button>

                <h3 className="text-2xl font-black text-white mb-2">Request an Appointment</h3>
                <p className="text-white/50 font-medium mb-6 text-sm">Fill out your details below and our team will get back to you shortly.</p>

                <BookingForm services={services} onSuccess={() => setIsModalOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {/* Reviews */}
          <ReviewsSection />

          {/* Services Section */}
          <section id="services" className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
              <div ref={servicesHeaderRef} className="text-center mb-16 relative">
                <span className="bg-white/[0.06] backdrop-blur-md text-blue-300 border border-white/[0.08] px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">Our Services</span>
              </div>
              <div ref={servicesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="service-card">
                    <ServiceListItem service={service} onBookClick={() => setIsModalOpen(true)} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer ref={footerRef} id="reach-us" className="bg-black/40 text-white/40 py-16 text-center md:text-left rounded-t-[3rem] mt-12 relative z-10 border-t border-white/[0.06]">
            <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center md:items-start">
                <Link href="/" className="text-2xl text-white font-extrabold mb-2 hover:text-blue-300 transition-colors">Heart Plus</Link>
                <p className="text-sm font-medium">Care you can believe in.</p>
              </div>
              <div className="flex flex-col items-center md:items-start gap-4 text-sm font-medium"><p className="flex items-center gap-2 hover:text-white transition cursor-default"><span className="text-lg">&#128205;</span> Durgapur Chowk,near by durgamandap, Jobra</p><a href="mailto:HPmedicines@gmail.com" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">&#9993;&#65039;</span> heartplusmedicines@gmail.com</a></div>
              <div className="flex flex-col items-center md:items-end gap-4 text-sm font-medium"><a href="tel:8400661188" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">&#128222;</span> Clinic: 8400661188</a><a href="tel:7008512435" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">&#128241;</span> Personal: 7008512435</a></div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/[0.06] text-sm text-center font-medium">&copy; {new Date().getFullYear()} Heart Plus Medicines & Poly Clinic. All rights reserved.</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
