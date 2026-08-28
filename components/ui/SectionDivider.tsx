"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  /** SVG path data for the wave morph states */
  paths?: string[];
  /** Fill color */
  fill?: string;
  /** Height of the divider */
  height?: number;
  /** Flip vertically */
  flip?: boolean;
  /** Blur the SVG for a softer look */
  blur?: number;
}

const DEFAULT_PATHS = [
  "M0,160 C320,300 420,40 640,160 C860,280 960,40 1280,160 L1280,320 L0,320 Z",
  "M0,200 C320,40 420,280 640,200 C860,40 960,280 1280,200 L1280,320 L0,320 Z",
  "M0,120 C320,280 420,0 640,120 C860,240 960,0 1280,120 L1280,320 L0,320 Z",
  "M0,240 C320,0 420,320 640,240 C860,0 960,320 1280,240 L1280,320 L0,320 Z",
];

export function SectionDivider({
  paths = DEFAULT_PATHS,
  fill = "rgba(6, 6, 15, 0.6)",
  height = 200,
  flip = false,
  blur = 0,
}: SectionDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path || paths.length < 2) return;

    gsap.set(path, { attr: { d: paths[0] } });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 1,
      },
    });

    for (let i = 1; i < paths.length; i++) {
      tl.to(path, {
        attr: { d: paths[i] },
        duration: 1,
        ease: "power2.inOut",
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [paths]);

  return (
    <div
      className="relative w-full pointer-events-none -my-px"
      style={{
        height,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1280 320"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={blur ? { filter: `blur(${blur}px)` } : undefined}
      >
        <path ref={pathRef} d={paths[0]} fill={fill} />
      </svg>
    </div>
  );
}

export function MultiLayerDivider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paths = container.querySelectorAll<SVGPathElement>("path");
    const cleanups: (() => void)[] = [];

    const layer1Tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
      },
    });
    if (paths[0]) {
      layer1Tl.to(paths[0], {
        attr: {
          d: "M0,80 C200,280 400,0 640,140 C880,280 1080,40 1280,180 L1280,320 L0,320 Z",
        },
        duration: 1,
        ease: "power1.inOut",
      });
      layer1Tl.to(paths[0], {
        attr: {
          d: "M0,180 C200,0 400,260 640,100 C880,0 1080,280 1280,80 L1280,320 L0,320 Z",
        },
        duration: 1,
        ease: "power1.inOut",
      });
    }
    cleanups.push(() => { layer1Tl.scrollTrigger?.kill(); layer1Tl.kill(); });

    const layer2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.5,
      },
    });
    if (paths[1]) {
      layer2Tl.to(paths[1], {
        attr: {
          d: "M0,200 C320,60 640,260 960,120 C1100,60 1200,200 1280,140 L1280,320 L0,320 Z",
        },
        duration: 1,
        ease: "power1.inOut",
      });
      layer2Tl.to(paths[1], {
        attr: {
          d: "M0,100 C320,260 640,40 960,200 C1100,260 1200,80 1280,200 L1280,320 L0,320 Z",
        },
        duration: 1,
        ease: "power1.inOut",
      });
    }
    cleanups.push(() => { layer2Tl.scrollTrigger?.kill(); layer2Tl.kill(); });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-48 pointer-events-none -my-px">
      <svg
        viewBox="0 0 1280 320"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0,160 C320,300 420,40 640,160 C860,280 960,40 1280,160 L1280,320 L0,320 Z"
          fill="rgba(6, 6, 15, 0.3)"
        />
        <path
          d="M0,200 C320,40 420,280 640,200 C860,40 960,280 1280,200 L1280,320 L0,320 Z"
          fill="rgba(6, 6, 15, 0.5)"
        />
        <path
          d="M0,240 C320,120 640,280 960,160 C1100,120 1200,240 1280,200 L1280,320 L0,320 Z"
          fill="rgba(6, 6, 15, 0.8)"
        />
      </svg>
    </div>
  );
}
