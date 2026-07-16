"use client";

import HeroSection from "@/components/HeroSection";
import ReviewsSection from "@/components/ReviewsSection";
import { BookingForm } from "@/components/BookingForm";
import { DevToolsProtection } from "@/components/DevToolsProtection";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let animationFrameId: number;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      animationFrameId = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, rgba(59, 130, 246, 0.08), transparent 80%)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      cancelAnimationFrame(animationFrameId);
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

function ServiceListItem({ service, index, onBookClick }: { service: { id: number; name: string; desc: string }; index: number; onBookClick: () => void }) {
  const isGeneral = service.id === 1;
  const delay = index * 0.07;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group flex flex-col p-6 rounded-3xl relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.12)] hover:bg-white/[0.07] hover:border-blue-400/20 transition-all duration-300"
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
            className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-500 backdrop-blur-md text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 group/btn text-sm"
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

  return (
    <div className="min-h-screen site-bg text-white font-sans relative overflow-hidden selection:bg-blue-500/30">
      <DevToolsProtection />

      {/* Fullscreen Hero */}
      <HeroSection onBookClick={() => setIsModalOpen(true)} />

      {/* Reviews — right below the hero */}
      <ReviewsSection />

      {/* Decorative layers for the content sections */}
      <div className="relative">
        <Particles className="absolute inset-0 z-0 opacity-40" quantity={50} ease={70} color="#3b82f6" refresh />
        <DotPattern className={"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] z-0 opacity-20 fill-blue-400/20"} />
        <MouseGlow />

        {/* Booking Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/10 relative"
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
          {/* Services Section */}
          <section id="services" className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center mb-16 relative"
              >
                <span className="bg-white/[0.06] backdrop-blur-md text-blue-300 border border-white/[0.08] px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">Our Services</span>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                  <ServiceListItem key={service.id} service={service} index={idx} onBookClick={() => setIsModalOpen(true)} />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer id="reach-us" className="bg-black/40 text-white/40 py-16 text-center md:text-left rounded-t-[3rem] mt-12 relative z-10 border-t border-white/[0.06]">
            <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center md:items-start"><p className="text-2xl text-white font-extrabold mb-2">Heart Plus</p><p className="text-sm font-medium">Care you can believe in.</p></div>
              <div className="flex flex-col items-center md:items-start gap-4 text-sm font-medium"><p className="flex items-center gap-2 hover:text-white transition cursor-default"><span className="text-lg">&#128205;</span> Durgapur Chowk, Jobra</p><a href="mailto:HPmedicines@gmail.com" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">&#9993;&#65039;</span> HPmedicines@gmail.com</a></div>
              <div className="flex flex-col items-center md:items-end gap-4 text-sm font-medium"><a href="tel:8400661188" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">&#128222;</span> Clinic: 8400661188</a><a href="tel:7008512435" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">&#128241;</span> Personal: 7008512435</a></div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/[0.06] text-sm text-center font-medium">&copy; {new Date().getFullYear()} Heart Plus Medicines & Poly Clinic. All rights reserved.</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
