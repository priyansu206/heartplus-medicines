"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setRemaining(data.remaining ?? null);
        setIsLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg border border-slate-100 flex flex-col gap-4"
      >
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-slate-900">Admin Access</h2>
          <p className="text-slate-400 text-xs font-medium mt-1">
            Enter the admin password to continue.
          </p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="Password"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          autoFocus
        />

        {error && (
          <p className="text-red-500 text-xs font-bold text-center">{error}</p>
        )}

        {remaining !== null && remaining <= 2 && remaining > 0 && (
          <p className="text-amber-500 text-xs font-bold text-center">
            {remaining} attempt{remaining !== 1 ? "s" : ""} remaining before lockout.
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-800/50 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98]"
        >
          {isLoading ? "Verifying..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
