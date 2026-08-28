"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollMorphOptions {
  /** Vertical translate range in px */
  y?: [number, number];
  /** Scale range */
  scale?: [number, number];
  /** Opacity range */
  opacity?: [number, number];
  /** Blur range in px */
  blur?: [number, number];
  /** Rotation range in degrees */
  rotate?: [number, number];
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Ease string */
  ease?: string;
}

export function useScrollMorph<T extends HTMLElement = HTMLDivElement>(
  options: ScrollMorphOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y,
      scale,
      opacity,
      blur,
      rotate,
      start = "top bottom",
      end = "bottom top",
      ease = "none",
    } = options;

    const fromVars: gsap.TweenVars = {};
    const toVars: gsap.TweenVars = {
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
      },
    };

    if (y) {
      fromVars.y = y[0];
      toVars.y = y[1];
    }
    if (scale) {
      fromVars.scale = scale[0];
      toVars.scale = scale[1];
    }
    if (opacity) {
      fromVars.opacity = opacity[0];
      toVars.opacity = opacity[1];
    }
    if (rotate) {
      fromVars.rotation = rotate[0];
      toVars.rotation = rotate[1];
    }

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (blur && !isTouch) {
      fromVars.filter = `blur(${blur[0]}px)`;
      toVars.filter = `blur(${blur[1]}px)`;
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

interface ClipMorphOptions {
  /** Array of clip-path values to cycle through on scroll */
  clips: string[];
  /** ScrollTrigger start */
  start?: string;
  /** ScrollTrigger end */
  end?: string;
}

export function useClipMorph<T extends HTMLElement = HTMLDivElement>(
  options: ClipMorphOptions
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { clips, start = "top bottom", end = "bottom top" } = options;

    if (clips.length < 2) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 0.6,
      },
    });

    gsap.set(el, { clipPath: clips[0] });

    for (let i = 1; i < clips.length; i++) {
      tl.to(el, {
        clipPath: clips[i],
        ease: "power2.inOut",
        duration: 1,
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return ref;
}
