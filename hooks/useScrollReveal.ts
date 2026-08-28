"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  toggleActions?: string;
  disabled?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      opacity = 0,
      duration = 0.8,
      ease = "power3.out",
      delay = 0,
      start = "top 85%",
      toggleActions = "play none none none",
      disabled = false,
    } = options;

    if (disabled) return;

    gsap.fromTo(
      el,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions,
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

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const {
      y = 40,
      opacity = 0,
      duration = 0.6,
      ease = "power3.out",
      stagger = 0.08,
      start = "top 85%",
      toggleActions = "play none none none",
      disabled = false,
    } = options;

    if (disabled) return;

    gsap.fromTo(
      children,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return ref;
}
