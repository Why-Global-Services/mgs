"use client";

import { ScrollReveal } from "./ScrollReveal";
import { schoolContact } from "../content/contact";
import { homepageImages } from "../lib/images";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071c2a] text-white" id="contact">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_1px_1.3fr] lg:gap-16">
            {/* ============================================================ */}
            {/* LEFT: BRAND LOGO & TAGLINE                                   */}
            {/* ============================================================ */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <img
                  alt="Maharishi Global School Seal"
                  className="h-16 w-16 shrink-0 rounded-full bg-white p-1 shadow-md sm:h-20 sm:w-20"
                  src={homepageImages.logo.src}
                />
                <div>
                  <h3 className="font-serif text-[20px] sm:text-[24px] font-extrabold uppercase tracking-wider text-white">
                    Maharishi <br />
                    <span className="tracking-[0.14em]">Global School</span>
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[12px] sm:text-[13px] font-black uppercase tracking-[0.16em] text-[#c59139]">
                  Enroll Today For a Brighter Future!
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4 text-xs text-white/50">
                <p>© {new Date().getFullYear()} Maharishi Global School. All rights reserved.</p>
              </div>
            </div>

            {/* ============================================================ */}
            {/* CENTER: VERTICAL SEPARATOR LINE                              */}
            {/* ============================================================ */}
            <div className="hidden h-40 w-[1px] bg-white/20 md:block" />

            {/* ============================================================ */}
            {/* RIGHT: ADDRESS, EMAIL, PHONE                                 */}
            {/* ============================================================ */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c59139]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/90">
                  Maharishi Global School, Aishwarya Nagar, <br />
                  Ayanambakkam, Chennai 600 095.
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c59139]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href="mailto:mgspmrcampus@gmail.com"
                  className="text-[14px] sm:text-[15px] text-white/90 transition hover:text-[#c59139]"
                >
                  mgspmrcampus@gmail.com
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c59139]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="space-y-0.5 font-bold tracking-wider text-[15px] sm:text-[16px] text-white">
                  <a href="tel:+919994499850" className="block hover:text-[#c59139] transition">
                    99944 99850
                  </a>
                  <a href="tel:+919994499851" className="block hover:text-[#c59139] transition">
                    99944 99851
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
