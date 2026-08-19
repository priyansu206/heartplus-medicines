"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextRevealOptions {
  /** Animation duration per word in seconds */
  duration?: number;
  /** Stagger between words in seconds */
  stagger?: number;
  /** GSAP ease string */
  ease?: string;
  /** Delay before animation starts in seconds */
  delay?: number;
}

/**
 * Animates text by splitting into words and revealing each one.
 * The element should have `overflow: hidden` on a parent for clip effect.
 */
export function useTextReveal<T extends HTMLElement = HTMLDivElement>(
  options: TextRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      duration = 0.8,
      stagger = 0.04,
      ease = "power4.out",
      delay = 0.2,
    } = options;

    // Split text into words, wrapping each in a span
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
    });

    return () => {
      gsap.killTweensOf(spans);
      el.textContent = text; // restore original
    };
  }, []);

  return ref;
}

/**
 * Animates a heading by splitting into lines, then words.
 * Each line gets a clip-reveal effect.
 */
export function useLineReveal<T extends HTMLElement = HTMLHeadingElement>(
  options: TextRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      duration = 0.9,
      stagger = 0.06,
      ease = "power4.out",
      delay = 0.3,
    } = options;

    const text = el.textContent || "";

    // Split by <br> or newlines to get lines
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
    });

    return () => {
      gsap.killTweensOf(lineSpans);
      el.textContent = text;
    };
  }, []);

  return ref;
}
