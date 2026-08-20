"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { isMobileDevice } from "@/lib/isMobile";

interface CountUpOptions {
  /** Target number to count to */
  target: number;
  /** Duration in seconds */
  duration?: number;
  /** Suffix to append (e.g., "+", "k") */
  suffix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** ScrollTrigger start position */
  start?: string;
}

/**
 * Animates a number counting up from 0 to target when element enters viewport.
 * The element's textContent will be replaced with the animated number.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  options: CountUpOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      target,
      duration = 2,
      suffix = "",
      decimals = 0,
      start = "top 85%",
    } = options;

    // On mobile, show final value immediately — skip the GSAP count-up animation
    if (isMobileDevice()) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent =
          counter.value.toFixed(decimals) + suffix;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}
