"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileMenuOpen]);

  const scrollTo = (label: string) => {
    setMobileMenuOpen(false);
    const id = label.toLowerCase().replace(" ", "-");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Heart Plus — Go to homepage"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20 shrink-0">
            <Image
              src="/logo.jpg"
              alt="Heart Plus Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Heart Plus
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={onBookClick}
          className="hidden md:block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform transform-gpu"
        >
          Book Now
        </button>

        {/* Mobile Toggle */}
        <button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden relative z-50 flex h-11 w-11 items-center justify-center active:scale-90 transition-transform transform-gpu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu
            className={`absolute transition-all duration-300 text-white transform-gpu ${
              mobileMenuOpen
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            className={`absolute transition-all duration-300 text-white transform-gpu ${
              mobileMenuOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
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
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 delay-100 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="py-4 text-3xl font-medium text-white/90 hover:text-white text-left"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
            className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform transform-gpu max-w-max"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
}
