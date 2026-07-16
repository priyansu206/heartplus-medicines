"use client";

import { useState } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";

interface HeroSectionProps {
  onBookClick: () => void;
}

export default function HeroSection({ onBookClick }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 shrink-0">
            <img
              src="/logo.jpg"
              alt="Heart Plus Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Heart Plus
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {["Home", "Services", "Reviews", "Reach Us"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          onClick={onBookClick}
          className="hidden md:block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform"
        >
          Book Now
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center active:scale-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu
            className={`absolute transition-all duration-300 text-white ${mobileMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
          />
          <X
            className={`absolute transition-all duration-300 text-white ${mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`absolute inset-x-0 top-0 z-20 bg-black/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "h-screen opacity-100"
            : "h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 delay-100 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {["Home", "Services", "Reviews", "Reach Us"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 text-3xl font-medium text-white/90 hover:text-white"
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform max-w-max"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        {/* Top */}
        <div className="max-w-3xl">
          <div className="mb-3 sm:mb-4 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
            <span className="text-xs sm:text-sm text-white/90 font-medium tracking-wide">
              Durgapur&apos;s Trusted Polyclinic
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
            Your Health, <br />
            Our <span className="text-blue-400">Priority</span>.
          </h1>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-6 sm:mt-8 animate-[fadeSlideUp_0.8s_ease_0.55s_both]">
            {[
              { value: "9+", label: "Specialties" },
              { value: "5k+", label: "Patients Treated" },
              { value: "10+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-xs sm:text-sm text-white/40 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mt-5 sm:mt-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            Expert doctors, advanced diagnostics, and compassionate care — all under one roof at Durgapur Chowk, Jobra.
          </p>
        </div>

        {/* Bottom */}
        <div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            <button
              onClick={onBookClick}
              className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Book Appointment
              <ArrowRight size={16} />
            </button>
            <a
              href="tel:8400661188"
              className="rounded-lg border border-white/30 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <Phone size={14} />
              8400661188
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
