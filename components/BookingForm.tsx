"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface BookingFormProps {
  services: readonly { id: number; name: string; desc: string }[];
  onSuccess: () => void;
}

export function BookingForm({ services, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; submit?: string }>({});
  const [success, setSuccess] = useState(false);

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

      setTimeout(() => {
        onSuccess();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setErrors({ submit: (error as Error).message || "Something went wrong. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-center font-bold">
        Request Sent Successfully! We will contact you soon.
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">
          Full Name
        </label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">
          Phone Number
        </label>
        <input
          required
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="9876543210"
          maxLength={10}
        />
        {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">
          Service Needed
        </label>
        <select
          required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {errors.submit && (
        <p className="text-red-500 text-xs font-bold text-center">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={isSending}
        className="mt-4 w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-800/50 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex justify-center items-center"
      >
        {isSending ? "Sending..." : "Submit Request"}
      </button>
    </form>
  );
}
