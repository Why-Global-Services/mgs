"use client";

import { useGSAPScope, gsap } from "../lib/motion";

function GoldFlourish() {
  return (
    <div className="my-4 flex items-center justify-center gap-2">
      {/* Left crimson line */}
      <div className="flourish-l h-[1px] w-12 origin-right bg-[#9A1827]/60" />

      {/* Crimson diamond */}
      <div className="flourish-dot h-1.5 w-1.5 rotate-45 bg-[#9A1827]" />

      {/* Right crimson line */}
      <div className="flourish-r h-[1px] w-12 origin-left bg-[#9A1827]/60" />
    </div>
  );
}

export function AcademicPrograms() {
  const sectionRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 10%",
        toggleActions: "play reset play reset",
        invalidateOnRefresh: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    // ---------- HEADER ----------

    // 1. Eyebrow
    tl.fromTo(
      ".prog-eyebrow",
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }
    )

      // 2. Heading (starts before the eyebrow finishes)
      .fromTo(
        ".prog-heading .line-mask-inner",
        { yPercent: 110, opacity: 0, rotateX: -12 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.3"
      )

      // 3. Subtitle
      .fromTo(
        ".prog-subtitle",
        { opacity: 0, y: 18, filter: "blur(3px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 },
        "-=0.35"
      )

      // ---------- DESCRIPTION (container + cards) ----------

      // 4. Container
      .fromTo(
        ".prog-shell",
        { opacity: 0, y: 60, scale: 0.92, rotateX: 4 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "back.out(1.4)",
        },
        "-=0.3"
      )

      // 5. Cards (tight stagger)
      .fromTo(
        ".prog-card",
        { opacity: 0, y: 50, scale: 0.92, rotateX: 5, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.55,
          stagger: 0.1,
          ease: "back.out(1.6)",
        },
        "-=0.4"
      )

      // 6. Diamond
      .fromTo(
        ".flourish-dot",
        { scale: 0, rotate: 45 },
        {
          scale: 1,
          rotate: 225,
          duration: 0.5,
          stagger: 0.08,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.4"
      )

      // 7. Lines draw outward
      .fromTo(
        ".flourish-l, .flourish-r",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        },
        "<0.05"
      )

      // ---------- BUTTON ----------

      // 8. Learn More buttons
      .fromTo(
        ".btn-editorial",
        { opacity: 0, y: 14, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        "-=0.3"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8faf9] py-16 sm:py-20 lg:py-24"
      id="programmes"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">

        {/* EDITORIAL HEADER */}
        <div className="text-center">
          <p className="prog-eyebrow text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#314e58]">
            Two Pathways. A Brighter Tomorrow.
          </p>

          <h2 className="prog-heading mt-2.5 font-serif text-[34px] sm:text-[44px] lg:text-[50px] font-bold text-[#072338]">
            <span className="line-mask inline-block overflow-hidden align-bottom">
              <span className="line-mask-inner inline-block">
                IB &amp; Cambridge Programmes
              </span>
            </span>
          </h2>

          <p className="prog-subtitle mt-2 text-[14px] sm:text-[16px] font-medium text-[#314e58]">
            Globally recognised. Future focused.
          </p>
        </div>

        {/* PROGRAMME CONTAINER */}
        <div className="prog-shell mt-12 sm:mt-14 rounded-2xl border border-[#c59139]/45 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <div className="relative isolate grid grid-cols-1 overflow-hidden rounded-2xl divide-y divide-[#c59139]/30 md:grid-cols-2 md:divide-y-0 md:divide-x">

            {/* IB CURRICULUM CARD */}
            <div className="prog-card group flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 hover:bg-[#fffdfa] sm:p-12 lg:p-16">

              <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-[#072338] transition-colors duration-300 group-hover:text-[#9A1827]">
                IB Curriculum
              </h3>

              <GoldFlourish />

              <p className="max-w-[420px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-[#2d4756]">
                Developing inquiring, knowledgeable, and caring young minds
                with global perspectives and future-ready skills.
              </p>

              <div className="mt-6">
                <a
                  href="/programmes/ib-curriculum"
                  className="btn-editorial inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#9A1827] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-[#9A1827] transition-all duration-300 hover:bg-[#9A1827] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A1827]"
                >
                  <span>Learn More</span>
                  <span className="btn-arrow font-sans transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* CAMBRIDGE CURRICULUM CARD */}
            <div className="prog-card group flex flex-col items-center justify-center p-8 text-center transition-colors duration-300 hover:bg-[#fffdfa] sm:p-12 lg:p-16">

              <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-[#072338] transition-colors duration-300 group-hover:text-[#9A1827]">
                Cambridge Curriculum
              </h3>

              <GoldFlourish />

              <p className="max-w-[420px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-[#2d4756]">
                A world-class curriculum focused on academic excellence,
                critical thinking, and international standards.
              </p>

              <div className="mt-6">
                <a
                  href="/programmes/cambridge"
                  className="btn-editorial inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#9A1827] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-[#9A1827] transition-all duration-300 hover:bg-[#9A1827] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A1827]"
                >
                  <span>Learn More</span>
                  <span className="btn-arrow font-sans transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}