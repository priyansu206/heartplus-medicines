"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

interface BlurTextProps {
  text?: string;
  children?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
}

export function BlurText({
  text,
  children,
  delay = 0.06,
  className = "",
  animateBy = "words",
  direction = "top",
}: BlurTextProps) {
  const content = text ?? children ?? "";
  const elements = content.split(animateBy === "words" ? " " : "");
  const containerRef = useRef<HTMLSpanElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const targets = gsap.utils.toArray<HTMLElement>(
      "[data-blur-word]",
      containerRef.current
    );

    const tween = gsap.fromTo(
      targets,
      {
        opacity: 0.15,
        filter: "blur(12px)",
        y: direction === "top" ? 24 : -24,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.7,
        stagger: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [content, delay, animateBy, direction, isMobile]);

  return (
    <span ref={containerRef} className={className}>
      {elements.map((el, i) => (
        <span
          key={i}
          data-blur-word
          className="inline-block will-change-transform"
        >
          {el}
          {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}