"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/lib/constants";
import { CheckCircle2, Loader2 } from "lucide-react";

interface BookingFormProps {
  services: readonly Service[];
  onSuccess: () => void;
}

const inputBase =
  "w-full rounded-xl bg-white/[0.04] border px-4 py-3 text-sm font-medium text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all";

export function BookingForm({ services, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; submit?: string }>({});
  const [success, setSuccess] = useState(false);

  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
    };
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (!validate()) return;

    setIsSending(true);
    try {
      const { error } = await supabase
        .from("appointments")
        .insert([{ name: formData.name, phone: formData.phone, service: formData.service }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: "", phone: "", service: "" });

      autoCloseRef.current = setTimeout(() => onSuccess(), 2200);
    } catch (error) {
      setErrors({ submit: (error as Error).message || "Something went wrong. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  if (success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-4 py-8 text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
            <CheckCircle2 size={30} className="text-emerald-400" />
          </div>
        </div>
        <div>
          <p className="text-lg font-bold text-white">Request Sent Successfully</p>
          <p className="mt-1 text-sm text-white/50">
            Our team will contact you shortly to confirm your appointment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-white/50 uppercase tracking-wider">
          Full Name
        </label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-invalid={!!errors.name}
          className={`${inputBase} ${
            errors.name
              ? "border-red-500/60 focus:ring-red-500/40 focus:border-red-500/60"
              : "border-white/[0.08] hover:border-white/[0.16] focus:ring-blue-500/40 focus:border-blue-500/40"
          }`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-xs font-medium text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-white/50 uppercase tracking-wider">
          Phone Number
        </label>
        <input
          required
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
          aria-invalid={!!errors.phone}
          className={`${inputBase} ${
            errors.phone
              ? "border-red-500/60 focus:ring-red-500/40 focus:border-red-500/60"
              : "border-white/[0.08] hover:border-white/[0.16] focus:ring-blue-500/40 focus:border-blue-500/40"
          }`}
          placeholder="9876543210"
          maxLength={10}
          inputMode="numeric"
        />
        {errors.phone && <p className="mt-1 text-xs font-medium text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-white/50 uppercase tracking-wider">
          Service Needed
        </label>
        <select
          required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className={`${inputBase} border-white/[0.08] hover:border-white/[0.16] focus:ring-blue-500/40 focus:border-blue-500/40 appearance-none ${
            formData.service ? "text-white" : "text-white/30"
          }`}
        >
          <option value="" className="bg-[#0b0d1a] text-white/50">
            Select a service...
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.name} className="bg-[#0b0d1a] text-white">
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {errors.submit && (
        <p className="text-center text-xs font-medium text-red-400">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={isSending}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-violet-500 disabled:opacity-60 active:scale-[0.99] tracking-wide"
      >
        {isSending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          "Submit Request"
        )}
      </button>
    </form>
  );
}