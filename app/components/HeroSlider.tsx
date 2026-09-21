"use client";

import { useEffect, useState } from "react";
import { heroSlides } from "./data";

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8faf8] to-white pt-[108px] pb-12 sm:pt-[124px] lg:pt-[132px] lg:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1.3fr] xl:gap-14">
          {/* ============================================================ */}
          {/* LEFT: EDITORIAL COPY & BRAND IDENTITY                        */}
          {/* ============================================================ */}
          <div className="relative flex flex-col justify-center">
            {/* Soft, Faded Large Guruji Background Watermark */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 right-0 -z-0 h-[320px] w-[320px] sm:-top-14 sm:right-4 sm:h-[420px] sm:w-[420px] lg:-top-16 lg:right-2 lg:h-[480px] lg:w-[480px] xl:h-[520px] xl:w-[520px]"
            >
              <img
                src="/assets/guruji-cutout-soft.png"
                alt=""
                className="h-full w-full object-contain object-right-top opacity-[0.20] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]"
                loading="eager"
              />
            </div>

            {/* Top Motto */}
            <div className="relative z-10">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-raya-muted sm:text-[12px]">
                Knowledge is Structured in Consciousness
              </p>
              <div className="mt-2 h-[2px] w-12 bg-[#c48f3b]" />
            </div>

            {/* Main Headline */}
            <h1 className="relative z-10 mt-5 font-serif text-[36px] font-extrabold leading-[1.08] text-[#073042] sm:text-[46px] md:text-[52px] xl:text-[56px]">
              A Brighter <br />
              <span className="text-[#0a3d2e]">Tomorrow Begins</span> <br />
              Here
            </h1>

            {/* Subtitle */}
            <p className="relative z-10 mt-4 text-[16px] font-semibold text-raya-muted sm:text-[18px]">
              A Future Ready IB &amp; Cambridge School at PMR Campus
            </p>

            {/* CTAs */}
            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/admissions/apply-now"
                className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#9c182f] px-6 text-[12px] font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#801326] sm:text-[13px]"
              >
                Apply Now →
              </a>
              <a
                href="#admissions"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#073042] px-6 text-[12px] font-bold uppercase tracking-wider text-[#073042] transition-all hover:bg-[#073042] hover:text-white sm:text-[13px]"
              >
                Explore Our School →
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: LARGE IMMERSIVE PHOTOGRAPHIC SHOWCASE                 */}
          {/* ============================================================ */}
          <div className="relative">
            <div className="group relative aspect-[4/3] min-h-[340px] overflow-hidden rounded-xl bg-raya-navy shadow-2xl sm:aspect-[16/11] sm:min-h-[420px] lg:aspect-[16/11] lg:min-h-[460px]">
              {heroSlides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={`Maharishi Global School Showcase ${index + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${slide.imageClass} ${
                    active === index
                      ? "animate-[ken-burns_6s_ease-in-out_both] opacity-100"
                      : "scale-105 opacity-0 pointer-events-none"
                  }`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}

              {/* Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

              {/* Lower Right Overlay Badge from Screenshot */}
              <div className="absolute bottom-6 right-6 z-20 max-w-[200px] rounded-lg bg-black/60 p-3.5 text-right backdrop-blur-md">
                <p className="font-serif text-[14px] font-bold leading-tight text-white sm:text-[15px]">
                  Curiosity Creates <br />
                  <span className="text-raya-gold">a Brighter World</span>
                </p>
              </div>

              {/* Slide Dots Indicator */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    aria-label={`Slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      active === index ? "w-8 bg-raya-gold" : "w-2 bg-white/70 hover:bg-white"
                    }`}
                    onClick={() => setActive(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





