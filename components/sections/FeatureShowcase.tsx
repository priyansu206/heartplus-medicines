"use client";

import { useClipReveal } from "@/hooks/useClipReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { useScrollMorph } from "@/hooks/useScrollMorph";
import { useIsMobile } from "@/hooks/useIsMobile";
import { GradientText } from "@/components/ui/GradientText";
import { CONTACT } from "@/lib/constants";
import { CalendarCheck, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

const features = [
  {
    emoji: "\u{1F3E5}",
    label: "Advanced Diagnostics",
    desc: "Modern lab with fast, accurate reports.",
  },
  {
    emoji: "\u{1FA7A}",
    label: "Expert Specialists",
    desc: "9+ departments, one trusted team.",
  },
  {
    emoji: "\u{1F48E}",
    label: "Premium Pharmacy",
    desc: "Every prescription under one roof.",
  },
];

export function FeatureShowcase({
  onBookClick,
}: {
  onBookClick?: () => void;
}) {
  const isMobile = useIsMobile();
  const orbRef = useClipReveal({ shape: "circle", duration: 1.5, ease: "power3.out" });
  const titleRef = useScrollTextReveal({ duration: 0.7, stagger: 0.05, delay: 0.1 });
  const subtitleRef = useScrollTextReveal({ duration: 0.5, stagger: 0.03, delay: 0.3 });
  const textRef = useScrollReveal({ y: 30, duration: 0.8, delay: 0.2 });

  const morphOrbRef = useScrollMorph<HTMLDivElement>({
    scale: [0.85, 1.05],
    rotate: [0, 15],
    blur: [4, 0],
    start: "top 90%",
    end: "center center",
  });
  const morphTextRef = useScrollMorph<HTMLDivElement>({
    y: [40, 0],
    scale: [0.96, 1],
    start: "top 85%",
    end: "center center",
  });

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={morphOrbRef} className="relative flex items-center justify-center">
          <div
            ref={orbRef}
            className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.4), rgba(59,130,246,0.2) 40%, rgba(168,85,247,0.15) 70%, transparent)",
              filter: "blur(1px)",
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.5), rgba(59,130,246,0.2) 60%, transparent)",
              }}
            />
            {/* Orbiting ring */}
            <div
              className="absolute inset-4 rounded-full border border-white/[0.08]"
              style={{
                animation: "spin-around 20s infinite linear",
              }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl" role="img" aria-label="Heart">
                &#x2764;&#xFE0F;
              </span>
            </div>
          </div>

          {/* Floating dots around the orb */}
          {!isMobile &&
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-violet-400/40"
                style={{
                  top: `${20 + Math.sin(i * 1.05) * 35}%`,
                  left: `${50 + Math.cos(i * 1.05) * 40}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
        </div>

        <div ref={morphTextRef} className="flex flex-col gap-6">
          <div>
            <span ref={subtitleRef} className="block text-violet-400 text-sm font-bold uppercase tracking-widest mb-3">
              Why Heart Plus
            </span>
            <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
              Healthcare That{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Actually Cares
              </span>
            </h2>
          </div>
          <p ref={textRef} className="text-white/50 leading-relaxed">
            With 9+ specialties, 5000+ patients treated, and over a decade of
            trusted service in Durgapur, Heart Plus combines advanced diagnostics
            with genuine compassion — because your health deserves both.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            {features.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-white/70 group hover:border-blue-400/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  {item.label}
                </span>
                <span className="text-xs text-white/40 leading-relaxed">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visit us / get in touch */}
      <div className="mt-32 max-w-6xl mx-auto px-6">
        <div className="mb-10 text-center">
          <GradientText
            colors={["#60a5fa", "#a78bfa", "#f472b6"]}
            animationSpeed={7}
            className="mx-auto"
          >
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Your Wellness Centre Awaits
            </h3>
          </GradientText>
          <p className="mt-3 text-sm text-white/40 font-medium">
            Visit us, call us, or book a consultation — we&apos;re here every
            day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visit Us */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-8 flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-400/20 text-blue-300">
                <MapPin className="w-6 h-6" />
              </span>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Visit Us
                </h4>
                <p className="text-sm text-white/50">{CONTACT.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 text-emerald-300">
                <Clock className="w-6 h-6" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Walk-Ins Welcome</h4>
                <p className="text-sm text-white/50">
                  Specialists available every day.
                </p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${CONTACT.address}, Cuttack`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-bold rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>

          {/* Get in touch */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-8 flex flex-col gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-violet-400/20 hover:bg-white/[0.06]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
            <h4 className="text-lg font-bold text-white tracking-tight">
              Get in Touch
            </h4>

            <a
              href={`tel:${CONTACT.phone.clinic}`}
              className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 group"
            >
              <Phone className="w-5 h-5 text-blue-300" />
              <div>
                <p className="text-xs text-white/40 font-bold uppercase tracking-wider">
                  Clinic
                </p>
                <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {CONTACT.phone.clinic}
                </p>
              </div>
            </a>

            <a
              href={`tel:${CONTACT.phone.personal}`}
              className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 group"
            >
              <Phone className="w-5 h-5 text-violet-300" />
              <div>
                <p className="text-xs text-white/40 font-bold uppercase tracking-wider">
                  Personal
                </p>
                <p className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                  {CONTACT.phone.personal}
                </p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 group"
            >
              <Mail className="w-5 h-5 text-pink-300" />
              <div>
                <p className="text-xs text-white/40 font-bold uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors break-all">
                  {CONTACT.email}
                </p>
              </div>
            </a>

            {onBookClick && (
              <button
                onClick={onBookClick}
                className="mt-auto w-full px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 transform-gpu inline-flex items-center justify-center gap-2 text-sm tracking-wide"
              >
                <CalendarCheck className="w-4 h-4" />
                Book an Appointment
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          from {
            transform: translateY(0px) scale(1);
          }
          to {
            transform: translateY(-12px) scale(1.2);
          }
        }
      `}</style>
    </section>
  );
}