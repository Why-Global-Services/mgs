"use client";

import { useEffect, useState } from "react";
import { heroSlides } from "./data";

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_78%_8%,rgba(255,183,3,0.32),transparent_30%),radial-gradient(circle_at_12%_26%,rgba(0,168,204,0.16),transparent_34%),linear-gradient(145deg,#fffaf0_0%,#e3fbf7_50%,#eff9ff_100%)] px-5 pb-12 pt-[120px] min-[390px]:pt-[128px] sm:px-8 sm:pt-[148px] md:pb-16 lg:px-10 lg:pt-[172px]">
      <div className="absolute inset-x-0 top-[380px] h-[150px] skew-x-[-12deg] rounded-[44px] bg-[repeating-linear-gradient(90deg,transparent_0_28px,rgba(0,168,204,0.1)_28px_160px,transparent_160px_210px)] opacity-90 sm:top-[410px] md:top-[450px] md:h-[220px] lg:top-[470px]" />
      <div className="relative mx-auto grid w-full max-w-[1280px] gap-9 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <p className="animate-[soft-rise_700ms_ease_both] text-[13px] font-black uppercase text-raya-gold sm:text-[14px]">
            Maharishi Global School
          </p>
          <h1 className="mt-3 animate-[soft-rise_700ms_ease_both] text-[clamp(2.35rem,7vw,4.5rem)] font-black leading-[1.02] text-raya-navy">
            Inspiring the Next Generation of Global Leaders
          </h1>
          <div className="mt-6 inline-flex rounded-full border border-raya-gold/60 bg-white/75 px-4 py-2 text-[12px] font-black uppercase text-raya-forest shadow-[0_14px_34px_rgba(0,78,100,0.1)] backdrop-blur sm:text-[13px]">
            Proudly Launching
          </div>
          <p className="mt-5 max-w-[760px] text-[clamp(1.55rem,4vw,2.25rem)] font-black leading-[1.12] text-raya-forest">
            IB & Cambridge International Curriculum
          </p>
          <div className="mt-6 grid max-w-[760px] gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
            <span className="inline-flex w-max rounded-full bg-raya-wine px-5 py-3 text-[13px] font-black uppercase text-white shadow-[0_18px_38px_rgba(255,77,109,0.24)]">
              Admissions Open
            </span>
            <span className="text-[18px] font-semibold text-raya-navy sm:text-[22px]">
              Early Years to Grade 7
            </span>
          </div>
          <p className="mt-5 max-w-[760px] text-[15px] font-bold uppercase leading-[1.55] text-raya-muted sm:text-[17px]">
            Shaping Thinkers • Nurturing Innovators • Building Global Citizens
          </p>
        </div>

        <div className="relative aspect-[4/4.35] min-h-[300px] overflow-hidden rounded-[22px] bg-raya-navy shadow-[0_32px_90px_rgba(16,38,58,0.24)] ring-1 ring-raya-gold/35 sm:aspect-[16/10] sm:rounded-[26px] md:min-h-[340px] lg:aspect-[0.86] lg:min-h-[540px]">
          {heroSlides.map((slide, index) => (
            <img
              alt=""
              className={`absolute inset-0 h-full w-full bg-raya-navy/95 transition-all duration-1000 ${slide.imageClass} ${
                active === index
                  ? "animate-[ken-burns_6s_ease-in-out_both] opacity-100"
                  : "scale-105 opacity-0"
              }`}
              key={slide.src}
              loading={index === 0 ? "eager" : "lazy"}
              src={slide.src}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,38,58,0.08),rgba(16,38,58,0.48))]" />
          <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:gap-3">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`Show slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  active === index ? "w-10 bg-raya-gold" : "w-2.5 bg-white/65"
                }`}
                key={slide.src}
                onClick={() => setActive(index)}
                type="button"
              />
            ))}
          </div>
          <span className="absolute bottom-5 left-5 rounded-full border border-raya-gold/80 bg-raya-navy/72 px-4 py-2 text-xs font-bold text-white backdrop-blur sm:px-5 sm:py-3 sm:text-sm md:left-6">
            MGS learning spaces
          </span>
        </div>
      </div>
    </section>
  );
}
