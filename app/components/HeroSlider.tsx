"use client";

import { useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

export function HeroSlider() {
  const containerRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Hero Image: Clip-path + scale reveal (scale 1.05 -> 1)
    tl.fromTo(
      ".hero-bg-wrapper",
      {
        clipPath: "inset(2% 0% 2% 0%)",
        scale: 1.03,
        opacity: 0.85,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }
    );

    // 2. Exact Order of Text Reveals:
    // (1) Eyebrow
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45 },
      "-=0.5"
    );

    // (2) Main Heading: Line-by-line mask reveal
    tl.fromTo(
      ".hero-heading .line-mask-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
      "-=0.3"
    );

    // Gold underline under 'Here'
    tl.fromTo(
      ".hero-heading-underline",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );

    // (3) Subtitle
    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2"
    );

    // (4) Apply Now button
    tl.fromTo(
      ".hero-btn-apply",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35 },
      "-=0.15"
    );

    // (5) Explore Our School button
    tl.fromTo(
      ".hero-btn-explore",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35 },
      "-=0.25"
    );

    // (6) Right-Side Editorial Quote Card
    tl.fromTo(
      ".hero-quote-card",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
      "-=0.2"
    );

    // Hero Scroll: subtle parallax on image and text
    gsap.to(".hero-bg-img", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".hero-content-col", {
      yPercent: -4,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#fafaf9] min-h-[580px] sm:min-h-[640px] lg:min-h-[740px] xl:min-h-[820px] flex items-center"
    >
      {/* FULL-WIDTH HERO IMAGE BACKGROUND (NO SPLIT CONTAINER) */}
      <div className="hero-bg-wrapper absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={homepageImages.hero.src}
          alt={homepageImages.hero.alt}
          className="hero-bg-img h-full w-full object-cover object-[52%_top] sm:object-[50%_top] lg:object-[48%_top]"
          loading="eager"
        />

        {/* Localized Crisp Gradient Overlay behind Text for High Contrast & Zero Guruji Obstruction */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[38%] xl:w-[34%] bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"
        />
      </div>

      {/* TEXT & HERO CONTENT OVERLAY ON THE LEFT SIDE */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 py-12 sm:py-18 lg:py-24">
        <div className="hero-content-col max-w-[320px] xs:max-w-[380px] sm:max-w-[480px] lg:max-w-[580px]">
          {/* 1. Top Motto Eyebrow */}
          <div>
            <p className="hero-eyebrow text-[10px] sm:text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#072338]">
              Knowledge is Structured in Consciousness
            </p>
          </div>

          {/* 2. Main Headline: Line-By-Line Text Mask Reveal */}
          <h1 className="hero-heading mt-3 sm:mt-4 font-serif text-[30px] xs:text-[34px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[66px] font-bold leading-[1.1] text-[#072338]">
            <span className="line-mask block">
              <span className="line-mask-inner block">A Brighter</span>
            </span>
            <span className="line-mask block">
              <span className="line-mask-inner block">Tomorrow Begins</span>
            </span>
            <span className="line-mask block">
              <span className="line-mask-inner block">
                <span className="relative inline-block">
                  Here
                  <span className="hero-heading-underline absolute -bottom-1 left-0 h-[2.5px] sm:h-[3px] w-12 sm:w-14 bg-[#c59139]" />
                </span>
              </span>
            </span>
          </h1>

          {/* 3. Subtitle */}
          <p className="hero-subtitle mt-4 sm:mt-5 max-w-[480px] text-[13px] sm:text-[16px] md:text-[18px] font-medium leading-relaxed text-[#2d4756]">
            A Future Ready IB &amp; Cambridge School at PMR Campus
          </p>

          {/* 4. CTAs with Editorial Micro-Interactions */}
          <div className="hero-buttons mt-6 sm:mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-5">
            <a
              href="#admissions"
              className="hero-btn-apply btn-editorial group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#9a1827] px-6 sm:px-8 py-3 sm:py-3.5 text-[11px] sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#801320]"
            >
              <span>Apply Now</span>
              <span className="btn-arrow font-sans">→</span>
            </a>
            <a
              href="#discover"
              className="hero-btn-explore btn-editorial group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#072338] bg-white px-5 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-[13px] font-bold uppercase tracking-wider text-[#072338] shadow-xs hover:bg-[#072338] hover:text-white"
            >
              <span>Explore Our School</span>
              <span className="btn-arrow font-sans">→</span>
            </a>
          </div>
        </div>

        {/* 5. RIGHT-SIDE BANNER CARD - Fully Visible, Responsive, Unclipped */}
        <div className="hero-quote-card mt-6 sm:mt-0 sm:absolute sm:bottom-8 sm:right-6 lg:bottom-12 lg:right-8 xl:right-12 z-20 w-auto min-w-[200px] max-w-[240px] rounded-lg bg-[#072338]/95 p-4 sm:p-5 lg:p-6 text-white shadow-2xl border border-white/10 pointer-events-auto">
          <p className="font-serif text-[17px] sm:text-[19px] lg:text-[22px] font-normal leading-[1.28] tracking-normal text-[#f8fafc]">
            Curiosity<br />
            Creates<br />
            a Brighter World
          </p>
          <div className="mt-3 sm:mt-3.5 h-[2px] sm:h-[2.5px] w-8 sm:w-10 bg-[#c59139]" />
        </div>
      </div>
    </section>
  );
}
