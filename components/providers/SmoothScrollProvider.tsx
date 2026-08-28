"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileDevice } from "@/lib/isMobile";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize when the address bar hides/shows — without
// this, every such resize triggers a ScrollTrigger.refresh() and pinned
// sections visibly jump mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = isMobileDevice();

    const coarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (coarsePointer || reducedMotion) {
      // Still sync ScrollTrigger on native scroll
      const onScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => {
        return 1 - Math.pow(1 - t, 4);
      },
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return <>{children}</>;
}
