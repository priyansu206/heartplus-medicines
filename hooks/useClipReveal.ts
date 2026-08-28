"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ClipShape = "circle" | "inset" | "polygon";

interface ClipRevealOptions {
  /** Shape to reveal with */
  shape?: ClipShape;
  /** Duration in seconds */
  duration?: number;
  /** Ease string */
  ease?: string;
  /** Delay in seconds */
  delay?: number;
  /** ScrollTrigger start */
  start?: string;
}

export function useClipReveal<T extends HTMLElement = HTMLDivElement>(
  options: ClipRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      shape = "circle",
      duration = 1.2,
      ease = "power4.inOut",
      delay = 0,
      start = "top 80%",
    } = options;

    const fromClip: Record<ClipShape, string> = {
      circle: "circle(0% at 50% 50%)",
      inset: "inset(100% 0 0 0)",
      polygon: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    };

    const toClip: Record<ClipShape, string> = {
      circle: "circle(100% at 50% 50%)",
      inset: "inset(0% 0 0 0)",
      polygon: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    };

    gsap.fromTo(
      el,
      { clipPath: fromClip[shape] },
      {
        clipPath: toClip[shape],
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}
