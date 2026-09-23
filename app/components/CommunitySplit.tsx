"use client";

import { createCardFlow, useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

export function CommunitySplit() {
  const sectionRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    // Eyebrow and copy rise while the image/copy cards settle from a collage.
    tl.fromTo(
      ".community-eyebrow",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      "+=0.1"
    );

    tl.fromTo(
      ".community-heading .line-mask-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
      "-=0.4"
    );

    // 3. Body & CTA fade-up
    tl.fromTo(
      ".community-body",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    tl.fromTo(
      ".community-cta",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    createCardFlow({
      root: sectionRef.current,
      cardSelector: ".community-flow-card",
      imageSelector: ".community-img",
      motions: [
        { x: -78, y: 76, rotation: -5.4, scale: 0.88, zIndex: 3 },
        { x: 82, y: -54, rotation: 4.8, scale: 0.92, zIndex: 2 },
      ],
      start: "top 90%",
      end: "top 24%",
      stagger: 0.32,
      isReduced,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="relative isolate grid grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-16">
          {/* ============================================================ */}
          {/* LEFT: STUDENT LIBRARY READING IMAGE                          */}
          {/* ============================================================ */}
          <div className="community-flow-card relative">
            <div className="community-img-wrapper group relative overflow-hidden rounded-xl shadow-xl">
              <img
                src={homepageImages.community.src}
                alt={homepageImages.community.alt}
                className="community-img h-[340px] w-full object-cover object-center sm:h-[420px] lg:h-[460px] will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: EDITORIAL COPY                                       */}
          {/* ============================================================ */}
          <div className="community-flow-card relative max-w-[540px] lg:pl-6">
            <p className="community-eyebrow text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#314e58]">
              More Than a School
            </p>

            <h2 className="community-heading mt-2.5 font-serif text-[34px] sm:text-[44px] lg:text-[50px] font-bold leading-[1.12] text-[#072338]">
              <span className="line-mask block">
                <span className="line-mask-inner">A Community</span>
              </span>
              <span className="line-mask block">
                <span className="line-mask-inner">
                  <span className="relative inline-block text-[#072338]">
                    That Belongs
                    <span className="absolute -bottom-1 left-0 h-[2px] w-14 bg-[#c59139]" />
                  </span>
                </span>
              </span>
            </h2>

            <p className="community-body mt-6 text-[15px] sm:text-[16px] leading-[1.8] text-[#2d4756]">
              We believe in fostering a safe, inclusive and inspiring environment where every learner is known, valued and encouraged to grow.
            </p>

            <div className="community-cta mt-8">
              <a
                href="/home/why-mgs"
                className="btn-editorial group inline-flex items-center gap-2 rounded-sm border border-[#c59139] bg-white px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#072338] shadow-2xs hover:bg-[#c59139] hover:text-white"
              >
                <span>Why MGS</span>
                <span className="btn-arrow font-sans">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
