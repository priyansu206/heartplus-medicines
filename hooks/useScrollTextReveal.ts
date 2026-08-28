"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextRevealOptions {
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
  start?: string;
}

export function useScrollTextReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollTextRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      duration = 0.6,
      stagger = 0.04,
      ease = "power4.out",
      delay = 0,
      start = "top 85%",
    } = options;

    const text = el.textContent || "";
    const words = text.split(/\s+/).filter(Boolean);
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full opacity-0">${word}</span></span>`
      )
      .join(" ");

    const spans = el.querySelectorAll<HTMLElement>("span > span");

    gsap.to(spans, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      gsap.killTweensOf(spans);
      el.textContent = text;
    };
  }, []);

  return ref;
}

export function useScrollLineReveal<T extends HTMLElement = HTMLHeadingElement>(
  options: ScrollTextRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      duration = 0.8,
      stagger = 0.1,
      ease = "power4.out",
      delay = 0,
      start = "top 85%",
    } = options;

    const text = el.textContent || "";
    const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);

    el.innerHTML = lines
      .map(
        (line) =>
          `<span class="block overflow-hidden"><span class="block translate-y-full opacity-0">${line}</span></span>`
      )
      .join("");

    const lineSpans = el.querySelectorAll<HTMLElement>("span > span");

    gsap.to(lineSpans, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      gsap.killTweensOf(lineSpans);
      el.textContent = text;
    };
  }, []);

  return ref;
}
