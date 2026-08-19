"use client";

import { useEffect, useRef } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface TextScrambleOptions {
  /** Characters per second */
  speed?: number;
  /** Max number of random chars per position */
  maxIterations?: number;
  /** Delay before starting in ms */
  delay?: number;
}

/**
 * Text scramble effect — characters randomly cycle before settling.
 * Like the Matrix decode or prismatic text effect.
 */
export function useTextScramble<T extends HTMLElement = HTMLDivElement>(
  options: TextScrambleOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { speed = 40, maxIterations = 12, delay = 0 } = options;
    const text = el.textContent || "";

    let frameId: number;
    let iteration = 0;

    const animate = () => {
      el.textContent = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      iteration += 1 / (speed / 16);

      if (iteration <= text.length) {
        frameId = requestAnimationFrame(animate);
      } else {
        el.textContent = text; // ensure final state is exact
      }
    };

    const timeout = setTimeout(() => {
      animate();
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameId);
      el.textContent = text;
    };
  }, []);

  return ref;
}
