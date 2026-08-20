"use client";

import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { SERVICES } from "@/lib/constants";
import { TiltCard } from "@/components/ui/TiltCard";

interface ServicesSectionProps {
  onBookClick: () => void;
}

function ServiceCard({
  service,
  onBookClick,
}: {
  service: { id: number; name: string; desc: string };
  onBookClick: () => void;
}) {
  const isGeneral = service.id === 1;

  return (
    <TiltCard className="service-card" maxTilt={8}>
    <div className="group flex flex-col p-6 rounded-3xl relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.12)] hover:bg-white/[0.07] hover:border-blue-400/20 transition-all duration-300 transform-gpu">
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
        <p className="text-white/50 font-medium leading-relaxed text-sm flex-1 mb-5">
          {service.desc}
        </p>

        {/* Book button */}
        {!isGeneral ? (
          <button
            onClick={onBookClick}
            className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-500 backdrop-blur-md text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 transform-gpu flex items-center justify-center gap-2 group/btn text-sm"
          >
            Book Now
            <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
              &rarr;
            </span>
          </button>
        ) : (
          <div className="w-full px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl text-center text-sm">
            Included in General Checkup
          </div>
        )}
      </div>
    </div>
    </TiltCard>
  );
}

export default function ServicesSection({ onBookClick }: ServicesSectionProps) {
  const headerRef = useScrollTextReveal({ duration: 0.6, stagger: 0.06 });
  const gridRef = useStaggerReveal<HTMLDivElement>(".service-card", {
    y: 50,
    stagger: 0.06,
    duration: 0.7,
  });

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 relative">
          <span ref={headerRef} className="inline-block bg-white/[0.06] backdrop-blur-md text-blue-300 border border-white/[0.08] px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">
            Our Services
          </span>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookClick={onBookClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
