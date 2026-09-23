"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered safely in browser environments
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Custom hook to run GSAP animations scoped to a container ref with automatic cleanup
 */
export function useGSAPScope<T extends HTMLElement = HTMLDivElement>(
  callback: (ctx: gsap.Context, isReduced: boolean) => void,
  dependencies: any[] = []
) {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    const isReduced = prefersReducedMotion();

    // Create and initialize the GSAP context first
    const ctx = gsap.context(() => {}, scopeRef);

    // Invoke callback now that ctx is fully initialized
    ctx.add((self) => {
      callback(self, isReduced);
    });

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return scopeRef;
}

export { gsap, ScrollTrigger };

export type CardFlowMotion = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
};

type CardFlowOptions = {
  root: HTMLElement | null;
  cardSelector: string;
  imageSelector?: string;
  motions: CardFlowMotion[];
  start?: string;
  end?: string;
  stagger?: number;
  reveal?: boolean;
  isReduced?: boolean;
};

/**
 * Builds the scroll-scrubbed editorial collage used across the homepage.
 * Cards begin as a layered, irregular arrangement and settle sequentially
 * into their authored layout. The card and its image deliberately use
 * separate transforms so the image has a restrained depth movement.
 */
export function createCardFlow({
  root,
  cardSelector,
  imageSelector,
  motions,
  start = "top 88%",
  end = "top 24%",
  stagger = 0.18,
  reveal = false,
  isReduced = false,
}: CardFlowOptions) {
  if (!root || isReduced) return;

  const cards = Array.from(root.querySelectorAll<HTMLElement>(cardSelector));
  if (!cards.length) return;

  const viewport = window.innerWidth;
  const distance = viewport < 640 ? 0.36 : viewport < 1024 ? 0.62 : 1;
  const rotation = viewport < 640 ? 0.42 : viewport < 1024 ? 0.68 : 1;
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start,
      end,
      scrub: 1,
      invalidateOnRefresh: true,
    },
    defaults: { ease: "none" },
  });

  cards.forEach((card, index) => {
    const motion = motions[index % motions.length];
    const image = imageSelector ? card.querySelector<HTMLElement>(imageSelector) : null;

    gsap.set(card, {
      x: motion.x * distance,
      y: motion.y * distance,
      rotation: motion.rotation * rotation,
      scale: 1 - (1 - motion.scale) * distance,
      autoAlpha: reveal ? 0 : 0.7,
      zIndex: motion.zIndex,
      transformOrigin: "50% 50%",
      willChange: "transform, opacity",
    });
    if (image) {
      gsap.set(image, {
        scale: 1.08,
        yPercent: index % 2 ? -4 : 5,
        willChange: "transform",
      });
    }

    if (reveal) {
      timeline.to(card, { autoAlpha: 1, duration: 0.12 }, index * stagger);
    }

    timeline.to(
      card,
      { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.82 },
      index * stagger + (reveal ? 0.06 : 0)
    );
    if (image) {
      timeline.to(image, { scale: 1, yPercent: 0, duration: 0.72 }, index * stagger + (reveal ? 0.12 : 0.08));
    }
  });

  return timeline;
}
