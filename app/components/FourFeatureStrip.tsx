"use client";

import { createCardFlow, useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

export function FourFeatureStrip() {
  const containerRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    createCardFlow({
      root: containerRef.current,
      cardSelector: ".dark-feature-item",
      motions: [
        { x: -70, y: 52, rotation: -4.8, scale: 0.9, zIndex: 4 },
        { x: -24, y: -42, rotation: 3.4, scale: 0.94, zIndex: 2 },
        { x: 30, y: 38, rotation: -3.7, scale: 0.93, zIndex: 3 },
        { x: 70, y: -32, rotation: 4.6, scale: 0.9, zIndex: 1 },
      ],
      start: "top 92%",
      end: "top 34%",
      stagger: 0.15,
      isReduced,
    });

    gsap.fromTo(
      ".dark-feature-underline",
      { scaleX: 0, transformOrigin: "center center" },
      {
        scaleX: 1,
        duration: 0.65,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Subtle background parallax
    gsap.to(".dark-feature-bg", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const features = [
    { title: "Global\nCurriculum" },
    { title: "Holistic\nLearning" },
    { title: "Future-Ready\nSkills" },
    { title: "Lifelong\nValues" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#071c2a] py-16 sm:py-20 lg:py-24"
    >
      {/* Background Dusk Campus Image with Deep Navy Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={homepageImages.campusDark.src}
          alt={homepageImages.campusDark.alt}
          className="dark-feature-bg h-[115%] w-full object-cover object-center opacity-25 will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071c2a]/95 via-[#082336]/88 to-[#071c2a]/95" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="relative isolate grid grid-cols-2 divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/15 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="dark-feature-item group flex h-full flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:bg-white/[0.04]"
            >
              <h3 className="font-serif text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-snug tracking-wide text-white transition-colors duration-300 group-hover:text-[#c59139] whitespace-pre-line">
                {item.title}
              </h3>
              <div className="dark-feature-underline mt-4 h-[2px] w-10 bg-[#c59139]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
