"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If browser doesn't support IntersectionObserver, reveal immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      {
        threshold: threshold ?? 0.05,
        rootMargin: "0px 0px 60px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";

  return (
    <div ref={ref} className={`reveal-init ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
