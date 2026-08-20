"use client";

import { useClipReveal } from "@/hooks/useClipReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";

/**
 * A visual showcase section with dramatic clip-path reveals
 * and scroll-triggered animations.
 */
export function FeatureShowcase() {
  const orbRef = useClipReveal({ shape: "circle", duration: 1.5, ease: "power3.out" });
  const titleRef = useScrollTextReveal({ duration: 0.7, stagger: 0.05, delay: 0.1 });
  const subtitleRef = useScrollTextReveal({ duration: 0.5, stagger: 0.03, delay: 0.3 });
  const textRef = useScrollReveal({ y: 30, duration: 0.8, delay: 0.2 });

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Orb with clip reveal */}
        <div className="relative flex items-center justify-center">
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
          {[...Array(6)].map((_, i) => (
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

        {/* Right — Text content */}
        <div className="flex flex-col gap-6">
          <div>
            <span ref={subtitleRef} className="block text-violet-400 text-sm font-bold uppercase tracking-widest mb-3">
              Why Heart Plus
            </span>
            <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-white leading-tight">
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
            {[
              { emoji: "\u{1F3E5}", label: "Advanced Diagnostics" },
              { emoji: "\u{1FA7A}", label: "Expert Specialists" },
              { emoji: "\u{1F48E}", label: "Premium Pharmacy" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-white/70"
              >
                <span>{item.emoji}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Float animation keyframe */}
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
