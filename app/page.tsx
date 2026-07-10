"use client";

import { useEffect, useState } from 'react';

// --- MAGIC UI IMPORTS ---
import { DotPattern } from "@/components/ui/dot-pattern";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

// --- DATA MODEL ---
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

// --- 1. PERFORMANCE FIX: ISOLATED MOUSE GLOW COMPONENT ---
function MouseGlow() {
  const [pointerPos, setPointerPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      animationFrameId = requestAnimationFrame(() => {
        setPointerPos({ x: clientX, y: clientY });
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
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-75"
      style={{
        // Changed to a deep Dark Blue glow
        background: `radial-gradient(600px circle at ${pointerPos.x}px ${pointerPos.y}px, rgba(30, 58, 138, 0.12), transparent 80%)`
      }}
    />
  );
}

// --- 2. FLIP CARD COMPONENT (Ice Blue / Light Theme) ---
function ServiceCard({ service }: { service: { id: number, name: string, desc: string } }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-56 [perspective:1000px] group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div 
        className={`w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of Card (Clean White) */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center hover:border-blue-400 hover:shadow-md transition-all">
          <button 
            className="absolute top-4 left-4 bg-blue-50 text-blue-800 w-8 h-8 rounded-full font-extrabold flex items-center justify-center shadow-sm"
            aria-label="More Info"
          >
            i
          </button>
          <h4 className="text-xl font-bold text-slate-800 px-4">{service.name}</h4>
          <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-widest">Tap to flip</p>
        </div>

        {/* Back of Card (Dark Blue) */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-blue-900 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-center items-center text-center border-2 border-blue-800">
          <button 
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/30 transition-colors text-white w-8 h-8 rounded-full font-bold flex items-center justify-center"
            aria-label="Close Info"
          >
            ×
          </button>
          <h4 className="text-lg font-bold mb-3 border-b border-blue-700 pb-2 w-full">{service.name}</h4>
          <p className="text-sm font-medium text-blue-100 leading-relaxed">{service.desc}</p>
        </div>
      </div>
    </div>
  );
}

// --- 3. MAIN PAGE COMPONENT ---
export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans relative overflow-hidden selection:bg-blue-300">
      
      {/* --- BACKGROUND ENGINES --- */}
      {/* MagicUI Particles: Switched to Dark Blue (#1e3a8a) */}
      <Particles
        className="absolute inset-0 z-0 opacity-60"
        quantity={60} 
        ease={70}
        color="#1e3a8a" 
        refresh
      />
      
      {/* MagicUI Dot Pattern: Switched to Dark Blue fill */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] z-0 opacity-40 fill-blue-900/30"
        )}
      />

      <MouseGlow />

      <div className="relative z-10">
        
        {/* --- HEADER --- */}
        <header className="bg-[#F7F9FC]/80 backdrop-blur-md text-slate-900 p-4 md:px-8 md:py-4 shadow-sm sticky top-0 z-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm shrink-0">
                <img src="/logo.jpg" alt="Heart Plus Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                  Heart Plus
                </h1>
                <p className="text-blue-800 text-xs md:text-sm font-bold uppercase tracking-widest">
                  Medicines & Poly Clinic
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm font-bold bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
              <a href="tel:8400661188" className="flex items-center gap-2 hover:text-blue-800 transition-colors">
                <span className="text-xl">🏥</span> 8400661188
              </a>
              <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
              <a href="tel:7008512435" className="flex items-center gap-2 hover:text-blue-800 transition-colors">
                <span className="text-xl">📱</span> 7008512435
              </a>
            </div>

          </div>
        </header>

        {/* --- HERO SECTION (Upgraded with Images) --- */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Your Health, <br className="hidden lg:block" />
                <span className="text-blue-800">Our Priority</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-lg mb-10 leading-relaxed font-medium">
                At Medical Clinic Borcelle, we strive to provide exceptional healthcare service to our valued patients. Our dedicated team of experienced doctors is here to ensure your well-being.
              </p>
              
              <div className="relative group">
                <ShimmerButton className="shadow-[0_0_40px_-10px_rgba(30,58,138,0.4)] bg-blue-900">
                  <span className="text-center text-sm leading-none font-bold tracking-tight whitespace-pre-wrap text-white lg:text-lg px-6">
                    Contact Us Today
                  </span>
                </ShimmerButton>
              </div>
            </div>

            {/* Right Column: Overlapping Image Composition */}
            <div className="relative w-full max-w-md mx-auto lg:max-w-none mt-10 lg:mt-0 h-[400px] lg:h-[500px] flex items-center justify-center">
              {/* Main Doctor Image */}
              <img 
                src="/doctor.jpg" 
                alt="Doctor" 
                className="absolute right-8 top-4 w-3/4 md:w-2/3 h-auto rounded-3xl shadow-2xl border-8 border-white object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10"
              />
              {/* Secondary Stethoscope Image (Overlapping) */}
              <img 
                src="/stethoscope.jpg" 
                alt="Stethoscope" 
                className="absolute left-0 bottom-4 w-3/5 md:w-1/2 h-auto rounded-3xl shadow-2xl border-8 border-white object-cover transform rotate-6 hover:rotate-0 transition-transform duration-500 z-20"
              />
            </div>
            
          </div>
        </section>

        {/* --- SERVICES GRID SECTION --- */}
        <section className="py-24 border-t border-slate-200 bg-white/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-blue-100 text-blue-900 border border-blue-200 px-5 py-2 rounded-full text-sm font-extrabold uppercase tracking-widest shadow-sm">
                Our Services
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-slate-900 text-slate-400 py-16 text-center md:text-left rounded-t-[3rem] mt-12 shadow-2xl border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="flex flex-col items-center md:items-start">
              <p className="text-2xl text-white font-extrabold mb-2">Heart Plus</p>
              <p className="text-sm font-medium">Care you can believe in.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4 text-sm font-medium">
              <p className="flex items-center gap-2 hover:text-white transition cursor-default">
                <span className="text-lg">📍</span> Durgapur Chowk, Jobra
              </p>
              <a href="mailto:HPmedicines@gmail.com" className="flex items-center gap-2 hover:text-white transition">
                <span className="text-lg">✉️</span> HPmedicines@gmail.com
              </a>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-4 text-sm font-medium">
              <a href="tel:8400661188" className="flex items-center gap-2 hover:text-white transition">
                <span className="text-lg">📞</span> Clinic: 8400661188
              </a>
              <a href="tel:7008512435" className="flex items-center gap-2 hover:text-white transition">
                <span className="text-lg">📱</span> Personal: 7008512435
              </a>
            </div>

          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-center font-medium">
            © {new Date().getFullYear()} Heart Plus Medicines & Poly Clinic. All rights reserved.
          </div>
        </footer>

      </div>
    </div>
  );
}