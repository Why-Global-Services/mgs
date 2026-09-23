"use client";

import { useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

export function AdmissionsBanner() {
  const sectionRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    // 1. Image reveal
    tl.fromTo(
      ".admissions-banner-img-wrapper",
      { clipPath: "inset(8% 0% 8% 0%)", scale: 1.05, opacity: 0.7 },
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1, ease: "power2.inOut" }
    );

    // 2. Heading line reveal
    tl.fromTo(
      ".admissions-banner-heading .line-mask-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
      "-=0.6"
    );

    tl.fromTo(
      ".admissions-banner-subtitle",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.4"
    );

    // 3. CTA fade-up
    tl.fromTo(
      ".admissions-banner-cta",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    // Subtle parallax on image
    gsap.to(".admissions-banner-img", {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-10 sm:py-14"
      id="admissions-banner"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 sm:p-8 lg:p-6 lg:px-10">
            {/* Left: Building Image with right edge soft fade */}
            <div className="admissions-banner-img-wrapper w-full lg:w-[38%] shrink-0 h-44 sm:h-52 lg:h-36 overflow-hidden rounded-lg">
              <img
                src={homepageImages.admissionsBanner.src}
                alt={homepageImages.admissionsBanner.alt}
                className="admissions-banner-img h-full w-full object-cover object-left will-change-transform"
                loading="lazy"
              />
            </div>

            {/* Center: Editorial Copy */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="admissions-banner-heading font-serif text-[22px] sm:text-[28px] lg:text-[30px] font-bold leading-[1.2] text-[#072338]">
                <span className="line-mask block">
                  <span className="line-mask-inner">Begin Your Child&apos;s Journey</span>
                </span>
                <span className="line-mask block">
                  <span className="line-mask-inner text-[#072338]">With Maharishi Global School</span>
                </span>
              </h2>
              <p className="admissions-banner-subtitle mt-2 text-[14px] sm:text-[15px] font-normal text-neutral-600">
                Take the first step towards a brighter future.
              </p>
            </div>

            {/* Right: Apply Now CTA and Book Visit Link */}
            <div className="admissions-banner-cta flex flex-col items-center lg:items-end gap-2.5 shrink-0">
              <a
                href="#admissions"
                className="btn-editorial inline-flex items-center justify-center gap-2 rounded-sm bg-[#9a1827] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#801320]"
              >
                <span>Apply Now</span>
                <span className="btn-arrow font-sans">→</span>
              </a>

              <a
                href="#admissions"
                className="text-[12px] font-medium text-[#072338] underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-[#9a1827]"
              >
                Book a Campus Visit →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
