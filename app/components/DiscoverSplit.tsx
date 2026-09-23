"use client";

import { createCardFlow, useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

export function DiscoverSplit() {
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

    // 1. Text line mask reveal
    tl.fromTo(
      ".discover-heading .line-mask-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12 }
    );

    tl.fromTo(
      ".discover-body",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    // CTA follows the editorial copy; the adjacent cards are driven by scroll below.
    tl.fromTo(
      ".discover-cta",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.4"
    );

    createCardFlow({
      root: sectionRef.current,
      cardSelector: ".discover-flow-card",
      imageSelector: ".discover-img",
      motions: [
        { x: -84, y: 94, rotation: -6.8, scale: 0.87, zIndex: 2 },
        { x: 72, y: -62, rotation: 5.6, scale: 0.9, zIndex: 3 },
      ],
      start: "top 92%",
      end: "top 22%",
      stagger: 0.3,
      isReduced,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      id="discover"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="relative isolate grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1.3fr_0.9fr] xl:gap-12">
          {/* ============================================================ */}
          {/* PART 1: LEFT EDITORIAL NARRATIVE                            */}
          {/* ============================================================ */}
          <div className="max-w-[480px]">
            <h2 className="discover-heading font-serif text-[34px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.14] text-[#072338]">
              <span className="line-mask block">
                <span className="line-mask-inner">Discover</span>
              </span>
              <span className="line-mask block">
                <span className="line-mask-inner">
                  <span className="relative inline-block text-[#072338]">
                    a World of Possibilities
                    <span className="absolute -bottom-1 left-0 h-[2px] w-20 bg-[#c59139]" />
                  </span>
                </span>
              </span>
            </h2>

            <p className="discover-body mt-6 text-[15px] sm:text-[16px] leading-[1.75] text-[#2d4756]">
              At Maharishi Global School, we nurture curious minds, compassionate hearts
              and principled leaders through a globally respected IB and Cambridge curriculum.
            </p>

            <div className="discover-cta mt-8">
              <a
                href="#admissions"
                className="btn-editorial group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#9a1827] px-7 text-[12px] font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#801320]"
              >
                <span>Apply Now</span>
                <span className="btn-arrow font-sans">→</span>
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PART 2: MIDDLE STUDENTS RUNNING PHOTO                        */}
          {/* ============================================================ */}
          <div className="discover-flow-card relative h-full">
            <div className="discover-img-wrapper group relative h-full min-h-[360px] overflow-hidden rounded-xl shadow-lg lg:min-h-[440px]">
              <img
                src={homepageImages.discover.src}
                alt={homepageImages.discover.alt}
                className="discover-img h-full w-full object-cover object-center will-change-transform"
                loading="lazy"
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* PART 3: RIGHT CRIMSON "LEARNING BEYOND BOUNDARIES" PANEL    */}
          {/* ============================================================ */}
          <div className="discover-flow-card relative h-full">
            <div className="discover-red-panel flex h-full min-h-[360px] flex-col justify-center rounded-xl bg-[#9a1827] p-8 text-white shadow-xl sm:p-10 lg:min-h-[440px]">
              <h3 className="font-serif text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-white">
                Learning <br />
                Beyond <br />
                Boundaries
              </h3>

              <div className="my-6 h-[2px] w-12 bg-white/40" />

              <div className="space-y-1.5 text-[15px] sm:text-[16px] font-medium tracking-wide text-white/90">
                <p>Ideas.</p>
                <p>Innovation.</p>
                <p>Impact.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
