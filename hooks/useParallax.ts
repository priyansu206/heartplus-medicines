"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  /** Vertical offset in px (positive = moves down as you scroll) */
  y?: number;
  /** Horizontal offset in px */
  x?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Element to scrub against — defaults to window scroller */
  scrub?: boolean | number;
}

/**
 * Parallax an element at a different rate than the page scroll.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = -80,
      x = 0,
      start = "top bottom",
      end = "bottom top",
      scrub = true,
    } = options;

    const fromVars: gsap.TweenVars = {};
    const toVars: gsap.TweenVars = {
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    };

    if (y !== 0) {
      fromVars.y = 0;
      toVars.y = y;
    }
    if (x !== 0) {
      fromVars.x = 0;
      toVars.x = x;
    }

    gsap.fromTo(el, fromVars, toVars);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}
