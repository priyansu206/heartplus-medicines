"use client";

import { ReactNode } from "react";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationDuration?: number;
  borderWidth?: number;
}

export function GlowBorder({
  children,
  className = "",
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"],
  animationDuration = 5,
  borderWidth = 1.5,
}: GlowBorderProps) {
  return (
    <div className={`relative rounded-3xl p-[${borderWidth}px] overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          padding: `${borderWidth}px`,
          background: `conic-gradient(${colors.join(", ")})`,
          animation: `glow-border-spin ${animationDuration}s linear infinite`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative h-full w-full rounded-3xl bg-[#0a0a1a]/90">
        {children}
      </div>
      <style jsx>{`
        @keyframes glow-border-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}