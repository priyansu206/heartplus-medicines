import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen site-bg text-white font-sans relative overflow-hidden flex items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 20% 20%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(500px circle at 80% 80%, rgba(139,92,246,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center max-w-md">
        <p className="text-[7rem] sm:text-[9rem] leading-none font-black bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(59,130,246,0.25)]">
          404
        </p>

        <div className="mt-4 mb-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-white/50 font-medium leading-relaxed text-sm">
            The page you&apos;re looking for doesn&apos;t exist or may have
            been moved. Let&apos;s get you back to your health.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:scale-105 transition-transform transform-gpu"
          >
            Back to Homepage
          </Link>
          <Link
            href="/#services"
            className="w-full sm:w-auto rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
