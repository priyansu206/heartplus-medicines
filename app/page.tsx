"use client";

import { BookingForm } from "@/components/BookingForm";
import { DevToolsProtection } from "@/components/DevToolsProtection";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from 'react';
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
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      animationFrameId = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, rgba(30, 58, 138, 0.12), transparent 80%)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <div 
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-75"
      style={{ background: 'radial-gradient(600px circle at -1000px -1000px, rgba(30, 58, 138, 0.12), transparent 80%)' }}
    />
  );
}

function ServiceListItem({ service, index, onBookClick }: { service: { id: number, name: string, desc: string }, index: number, onBookClick: () => void }) {
  const isGeneral = service.id === 1;
  const swayDirection = index % 2 === 0 ? -40 : 40;
  const rotation = index % 2 === 0 ? -2 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: swayDirection, y: 30, rotate: rotation }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 rounded-3xl w-full relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:bg-white/60 transition-all duration-300"
    >
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
        <div className="w-14 h-14 rounded-full bg-blue-100/60 backdrop-blur-md flex items-center justify-center text-blue-800 font-black text-xl shrink-0 border border-blue-200/60 group-hover:scale-110 transition-transform duration-300">
          {index + 1}
        </div>
        <div>
          <div className="flex items-center flex-wrap gap-3 mb-1">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
              {service.name}
            </h3>
            {isGeneral && (
              <span className="bg-emerald-100/80 backdrop-blur-sm text-emerald-800 text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200 shadow-sm animate-pulse">
                Save Up To 20%
              </span>
            )}
          </div>
          <p className="text-slate-600 font-medium leading-relaxed max-w-xl">{service.desc}</p>
        </div>
      </div>
      {!isGeneral && (
        <div className="mt-6 md:mt-0 md:ml-6 shrink-0 relative z-10 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-200/50 pt-6 md:pt-0 md:pl-6">
          <button 
            onClick={onBookClick}
            className="w-full md:w-auto px-6 py-3 bg-blue-700/90 hover:bg-blue-800 backdrop-blur-md text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgb(29,78,216,0.39)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.23)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Book Now <span className="text-lg">→</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans relative overflow-hidden selection:bg-blue-300">
      <DevToolsProtection />
      <Particles className="absolute inset-0 z-0 opacity-60" quantity={60} ease={70} color="#1e3a8a" refresh />
      <DotPattern className={cn("[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] z-0 opacity-40 fill-blue-900/30")} />
      <MouseGlow />

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/60 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-colors"
              >✕</button>
              
              <h3 className="text-2xl font-black text-slate-900 mb-2">Request an Appointment</h3>
              <p className="text-slate-500 font-medium mb-6 text-sm">Fill out your details below and our team will get back to you shortly.</p>

              <BookingForm services={services} onSuccess={() => setIsModalOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <header className="bg-[#F7F9FC]/70 backdrop-blur-xl text-slate-900 p-4 md:px-8 md:py-4 shadow-sm sticky top-0 z-50 border-b border-white/60">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm shrink-0">
                <img src="/logo.jpg" alt="Heart Plus Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Heart Plus</h1>
                <p className="text-blue-800 text-xs md:text-sm font-bold uppercase tracking-widest">Medicines & Poly Clinic</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm font-bold bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-sm">
              <a href="tel:8400661188" className="flex items-center gap-2 hover:text-blue-800 transition-colors"><span className="text-xl">🏥</span> 8400661188</a>
              <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
              <a href="tel:7008512435" className="flex items-center gap-2 hover:text-blue-800 transition-colors"><span className="text-xl">📱</span> 7008512435</a>
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">Your Health, <br className="hidden lg:block" /><span className="text-blue-800">Our Priority</span></h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-lg mb-10 leading-relaxed font-medium">At Medical Clinic Borcelle, we strive to provide exceptional healthcare service to our valued patients. Our dedicated team of experienced doctors is here to ensure your well-being.</p>
              <div className="relative group" onClick={() => setIsModalOpen(true)}>
                <ShimmerButton className="shadow-[0_0_40px_-10px_rgba(30,58,138,0.4)] bg-blue-900">
                  <span className="text-center text-sm leading-none font-bold tracking-tight whitespace-pre-wrap text-white lg:text-lg px-6 cursor-pointer">Contact Us Today</span>
                </ShimmerButton>
              </div>
            </div>
            <div className="relative w-full max-w-md mx-auto lg:max-w-none mt-10 lg:mt-0 h-[400px] lg:h-[500px] flex items-center justify-center">
              <img src="/doctor.jpg" alt="Doctor" className="absolute right-8 top-4 w-3/4 md:w-2/3 h-auto rounded-3xl shadow-2xl border-8 border-white object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10" />
              <img src="/stethoscope.jpg" alt="Stethoscope" className="absolute left-0 bottom-4 w-3/5 md:w-1/2 h-auto rounded-3xl shadow-2xl border-8 border-white object-cover transform rotate-6 hover:rotate-0 transition-transform duration-500 z-20" />
            </div>
          </div>
        </section>

        <section className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16 relative">
              <span className="bg-white/60 backdrop-blur-md text-blue-900 border border-white px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">Our Services</span>
            </div>
            <div className="flex flex-col gap-6">
              {services.map((service, idx) => (
                <ServiceListItem key={service.id} service={service} index={idx} onBookClick={() => setIsModalOpen(true)} />
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-slate-900 text-slate-400 py-16 text-center md:text-left rounded-t-[3rem] mt-12 shadow-2xl relative z-10 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center md:items-start"><p className="text-2xl text-white font-extrabold mb-2">Heart Plus</p><p className="text-sm font-medium">Care you can believe in.</p></div>
            <div className="flex flex-col items-center md:items-start gap-4 text-sm font-medium"><p className="flex items-center gap-2 hover:text-white transition cursor-default"><span className="text-lg">📍</span> Durgapur Chowk, Jobra</p><a href="mailto:HPmedicines@gmail.com" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">✉️</span> HPmedicines@gmail.com</a></div>
            <div className="flex flex-col items-center md:items-end gap-4 text-sm font-medium"><a href="tel:8400661188" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">📞</span> Clinic: 8400661188</a><a href="tel:7008512435" className="flex items-center gap-2 hover:text-white transition"><span className="text-lg">📱</span> Personal: 7008512435</a></div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-center font-medium">© {new Date().getFullYear()} Heart Plus Medicines & Poly Clinic. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
}