"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { X, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/forms/BookingForm";
import type { Service } from "@/lib/constants";
import { CONTACT } from "@/lib/constants";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  services: readonly Service[];
}

export function BookingModal({ open, onClose, services }: BookingModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Request an appointment"
        >
          {/* Soft vignette for depth */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0b0d1a] shadow-[0_36px_100px_rgba(0,0,0,0.55)]"
          >
            {/* Top accent hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/60 transition-colors hover:bg-white/[0.1] hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Brand panel */}
              <div className="relative hidden overflow-hidden border-r border-white/[0.06] bg-gradient-to-br from-[#111a3d] via-[#0d1026] to-[#181033] p-8 md:flex md:flex-col md:justify-between">
                {/* Ambient glows */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-500/[0.16] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-violet-500/[0.14] blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06]">
                      <Image
                        src="/logo.jpg"
                        alt="Heart Plus Logo"
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">Heart Plus</p>
                      <p className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                        Medicines &amp; Poly Clinic
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-white/55">
                    Book your consultation in under a minute. Our front desk
                    confirms every request and calls you back the same day.
                  </p>
                </div>

                <div className="relative mt-8 space-y-4">
                  <a
                    href={`tel:${CONTACT.phone.clinic}`}
                    className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Phone size={15} className="text-blue-400" />
                    {CONTACT.phone.clinic}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <MapPin size={15} className="text-blue-400" />
                    {CONTACT.address}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <Clock size={15} className="text-blue-400" />
                    Open every day
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <ShieldCheck size={15} className="text-emerald-400" />
                    Doctors on call, anytime
                  </div>
                </div>
              </div>

              {/* Form panel */}
              <div className="relative p-8 sm:p-10">
                <div className="mb-7">
                  <span className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-300">
                    Book Appointment
                  </span>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
                    Request an Appointment
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Fill in your details and our team will get back to you
                    shortly.
                  </p>
                </div>

                <BookingForm services={services} onSuccess={onClose} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}