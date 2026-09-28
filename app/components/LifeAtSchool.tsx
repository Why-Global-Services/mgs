"use client";

import { useEffect, useRef } from "react";
import { useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

export function LifeAtSchool() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const sectionRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    // 1. Heading line reveal on entering viewport
    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    headTl.fromTo(
      ".life-heading .line-mask-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8 }
    );

    headTl.fromTo(
      ".life-copy",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    headTl.fromTo(
      ".life-cta",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    // If user prefers reduced motion, keep images static
    if (isReduced) return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const initMarquee = () => {
      const maxScroll = Math.max(0, track.scrollWidth - container.clientWidth);
      if (maxScroll <= 0) return;

      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      // Consistent velocity: ~42 pixels/sec for stately, premium viewing
      const duration = Math.max(10, maxScroll / 42);

      // Continuous bidirectional marquee: moves left-to-right <-> right-to-left infinitely
      tweenRef.current = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -maxScroll,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
    };

    // Run after initial render and layout paint
    const timer = setTimeout(initMarquee, 100);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initMarquee, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, []);

  const cards = [
    {
      title: "Library &\nReading Culture",
      image: homepageImages.lifeLibrary.src,
      alt: homepageImages.lifeLibrary.alt,
    },
    {
      title: "Practical\nLearning",
      image: homepageImages.lifePractical.src,
      alt: homepageImages.lifePractical.alt,
    },
    {
      title: "Sports\nActivities",
      image: homepageImages.lifeSports.src,
      alt: homepageImages.lifeSports.alt,
    },
    {
      title: "Music &\nPerformance",
      image: homepageImages.lifeMusic.src,
      alt: homepageImages.lifeMusic.alt,
    },
    {
      title: "Design &\nInnovation",
      image: homepageImages.lifeDesign.src,
      alt: homepageImages.lifeDesign.alt,
    },
    {
      title: "Leadership &\nCollaboration",
      image: homepageImages.lifeLeadership.src,
      alt: homepageImages.lifeLeadership.alt,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
      id="life-at-mgs"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-14">
          {/* ============================================================ */}
          {/* LEFT COLUMN: EDITORIAL HEADLINE, ACCENT, COPY & CTA          */}
          {/* ============================================================ */}
          <div className="max-w-[360px]">
            <h2 className="life-heading font-serif text-[34px] sm:text-[42px] lg:text-[46px] font-bold text-[#072338]">
              <span className="line-mask">
                <span className="line-mask-inner">Life at MGS</span>
              </span>
            </h2>
            <div className="my-4 h-[2px] w-12 bg-[#c59139]" />
            <p className="life-copy text-[15px] sm:text-[16px] leading-[1.7] text-[#2d4756]">
              A vibrant campus life with endless opportunities to explore, create and grow.
            </p>
            <div className="life-cta mt-7">
              <a
                href="/events-and-gallery"
                className="btn-editorial group inline-flex items-center gap-2 rounded-sm border border-[#c59139] bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#072338] shadow-2xs hover:bg-[#c59139] hover:text-white transition-all duration-200"
              >
                <span>Events &amp; Gallery</span>
                <span className="btn-arrow font-sans transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: CONTINUOUS BIDIRECTIONAL IMAGE MARQUEE         */}
          {/* ============================================================ */}
          <div
            ref={containerRef}
            className="life-slider-container relative w-full overflow-hidden"
          >
            {/* Smooth hardware-accelerated continuous marquee track */}
            <div
              ref={trackRef}
              className="flex w-full select-none gap-4 sm:gap-5 lg:gap-6 will-change-transform"
            >
              {cards.map((card, idx) => (
                <div
                  key={`${card.title}-${idx}`}
                  className="life-card group relative flex flex-col shrink-0 w-[260px] xs:w-[280px] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-48px)/3)]"
                >
                  <div className="life-card-img-wrapper relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                    <img
                      src={card.image}
                      alt={card.alt || card.title.replace("\n", " ")}
                      className="life-card-img h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 text-center text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#072338] transition-colors duration-200 group-hover:text-[#c59139] whitespace-pre-line">
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
