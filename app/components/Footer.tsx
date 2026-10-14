// "use client";

// import { ScrollReveal } from "./ScrollReveal";
// import { schoolContact } from "../content/contact";
// import { homepageImages } from "../lib/images";

// export function Footer() {
//   return (
//     <footer className="relative overflow-hidden bg-[#071c2a] text-white" id="contact">
//       <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
//         <ScrollReveal>
//           <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_1px_1.3fr] lg:gap-16">
//             {/* ============================================================ */}
//             {/* LEFT: BRAND LOGO & TAGLINE                                   */}
//             {/* ============================================================ */}
//             <div className="flex flex-col items-start">
//               <div className="flex items-center gap-4">
//                 <img
//                   alt="Maharishi Global School Seal"
//                   className="h-16 w-16 shrink-0 rounded-full bg-white p-1 shadow-md sm:h-20 sm:w-20"
//                   src={homepageImages.logo.src}
//                 />
//                 <div>
//                   <h3 className="font-serif text-[20px] sm:text-[24px] font-extrabold uppercase tracking-wider text-white">
//                     Maharishi <br />
//                     <span className="tracking-[0.14em]">Global School</span>
//                   </h3>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <p className="text-[12px] sm:text-[13px] font-black uppercase tracking-[0.16em] text-[#c59139]">
//                   Enroll Today For a Brighter Future!
//                 </p>
//               </div>

//               <div className="mt-6 flex items-center gap-4 text-xs text-white/50">
//                 <p>© {new Date().getFullYear()} Maharishi Global School. All rights reserved.</p>
//               </div>
//             </div>

//             {/* ============================================================ */}
//             {/* CENTER: VERTICAL SEPARATOR LINE                              */}
//             {/* ============================================================ */}
//             <div className="hidden h-40 w-[1px] bg-white/20 md:block" />

//             {/* ============================================================ */}
//             {/* RIGHT: ADDRESS, EMAIL, PHONE                                 */}
//             {/* ============================================================ */}
//             <div className="space-y-6">
//               {/* Address */}
//               <div className="flex items-start gap-3.5">
//                 <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c59139]">
//                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/90">
//                   Maharishi Global School, Aishwarya Nagar, <br />
//                   Ayanambakkam, Chennai 600 095.
//                 </p>
//               </div>

//               {/* Email */}
//               <div className="flex items-center gap-3.5">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c59139]">
//                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <a
//                   href="mailto:mgspmrcampus@gmail.com"
//                   className="text-[14px] sm:text-[15px] text-white/90 transition hover:text-[#c59139]"
//                 >
//                   mgspmrcampus@gmail.com
//                 </a>
//               </div>

//               {/* Phone Numbers */}
//               <div className="flex items-start gap-3.5">
//                 <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c59139]">
//                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="space-y-0.5 font-bold tracking-wider text-[15px] sm:text-[16px] text-white">
//                   <a href="tel:+919994499850" className="block hover:text-[#c59139] transition">
//                     99944 99850
//                   </a>
//                   <a href="tel:+919994499851" className="block hover:text-[#c59139] transition">
//                     99944 99851
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ScrollReveal>
//       </div>
//     </footer>
//   );
// }


"use client";

import { ScrollReveal } from "./ScrollReveal";
import { homepageImages } from "../lib/images";

/* ---------- MAP SETTINGS ---------- */
// 1. Map image-ah public folder la vechi path inga podunga (example: /images/map-preview.png)
//    illa online image URL-um podalaam.
const MAP_IMAGE = "../images/home/schoolmap.jpg.png";

// 2. Click panna open aagura Google Maps link.
//    Exact location venum na Google Maps la "Share" -> "Copy link" panni inga paste pannunga.
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Maharishi+Global+School+Ayanambakkam+Chennai+600095";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071c2a] text-white" id="contact">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_1px_1.3fr] lg:grid-cols-[1.1fr_1px_1.2fr_1.2fr] lg:gap-12">
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
                  <h3 className="font-serif text-[20px] font-extrabold uppercase tracking-wider text-white sm:text-[24px]">
                    Maharishi <br />
                    <span className="tracking-[0.14em]">Global School</span>
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#c59139] sm:text-[13px]">
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
            {/* ADDRESS, EMAIL, PHONE                                        */}
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
                <p className="text-[14px] leading-relaxed text-white/90 sm:text-[15px]">
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
                  className="text-[14px] text-white/90 transition hover:text-[#c59139] sm:text-[15px]"
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
                <div className="space-y-0.5 text-[15px] font-bold tracking-wider text-white sm:text-[16px]">
                  <a href="tel:+919994499850" className="block transition hover:text-[#c59139]">
                    99944 99850
                  </a>
                  <a href="tel:+919994499851" className="block transition hover:text-[#c59139]">
                    99944 99851
                  </a>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* MAP IMAGE (click -> opens Google Maps)                       */}
            {/* ============================================================ */}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Maharishi Global School location in Google Maps"
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/15 shadow-lg md:col-span-3 lg:col-span-1"
            >
              <img
                alt="Maharishi Global School location map"
                src={MAP_IMAGE}
                className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[220px]"
              />

              {/* Dark gradient + label */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071c2a]/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#072338] shadow-md transition group-hover:bg-[#c59139] group-hover:text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                View on Google Maps
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
