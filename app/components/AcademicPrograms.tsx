"use client";

import { createCardFlow, useGSAPScope, gsap } from "../lib/motion";

function GoldFlourish() {
  return (
    <div className="my-4 flex items-center justify-center gap-2">
      <div className="h-[1px] w-12 bg-[#c59139]/60" />
      <div className="h-1.5 w-1.5 rotate-45 bg-[#c59139]" />
      <div className="h-[1px] w-12 bg-[#c59139]/60" />
    </div>
  );
}

export function AcademicPrograms() {
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

    // 1. Eyebrow fade-up
    tl.fromTo(
      ".prog-eyebrow",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    // 2. Heading line reveal
    tl.fromTo(
      ".prog-heading .line-mask-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    // 3. Subtitle fade-up
    tl.fromTo(
      ".prog-subtitle",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    createCardFlow({
      root: sectionRef.current,
      cardSelector: ".prog-card",
      motions: [
        { x: -96, y: 76, rotation: -6.5, scale: 0.87, zIndex: 3 },
        { x: 88, y: -48, rotation: 5.4, scale: 0.9, zIndex: 2 },
      ],
      start: "top 88%",
      end: "top 28%",
      stagger: 0.28,
      isReduced,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8faf9] py-16 sm:py-20 lg:py-24"
      id="programmes"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* ============================================================ */}
        {/* CENTERED EDITORIAL HEADER                                    */}
        {/* ============================================================ */}
        <div className="text-center">
          <p className="prog-eyebrow text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#314e58]">
            Two Pathways. A Brighter Tomorrow.
          </p>
          <h2 className="prog-heading mt-2.5 font-serif text-[34px] sm:text-[44px] lg:text-[50px] font-bold text-[#072338]">
            <span className="line-mask inline-block">
              <span className="line-mask-inner">IB &amp; Cambridge Programmes</span>
            </span>
          </h2>
          <p className="prog-subtitle mt-2 text-[14px] sm:text-[16px] font-medium text-[#314e58]">
            Globally recognised. Future focused.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2-CARD DUAL CONTAINER WITH GOLD BORDER                       */}
        {/* ============================================================ */}
        <div className="mt-12 sm:mt-14 rounded-2xl border border-[#c59139]/45 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="relative isolate grid grid-cols-1 overflow-hidden rounded-2xl divide-y divide-[#c59139]/30 md:grid-cols-2 md:divide-y-0 md:divide-x">
            {/* IB Curriculum */}
            <div className="prog-card group flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 hover:bg-[#fffdfa] sm:p-12 lg:p-16">
              <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-[#072338] transition-colors duration-200 group-hover:text-[#c59139]">
                IB Curriculum
              </h3>
              <GoldFlourish />
              <p className="max-w-[420px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-[#2d4756]">
                Developing inquiring, knowledgeable, and caring young minds with global
                perspectives and future-ready skills.
              </p>
              <div className="mt-6">
                <a
                  href="/programmes/ib-curriculum"
                  className="btn-editorial inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#072338] hover:text-[#c59139]"
                >
                  <span>Learn More</span>
                  <span className="btn-arrow font-sans">→</span>
                </a>
              </div>
            </div>

            {/* Cambridge Curriculum */}
            <div className="prog-card group flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 hover:bg-[#fffdfa] sm:p-12 lg:p-16">
              <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-[#072338] transition-colors duration-200 group-hover:text-[#c59139]">
                Cambridge Curriculum
              </h3>
              <GoldFlourish />
              <p className="max-w-[420px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-[#2d4756]">
                A world-class curriculum focused on academic excellence, critical thinking,
                and international standards.
              </p>
              <div className="mt-6">
                <a
                  href="/programmes/cambridge"
                  className="btn-editorial inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#072338] hover:text-[#c59139]"
                >
                  <span>Learn More</span>
                  <span className="btn-arrow font-sans">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
