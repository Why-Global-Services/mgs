// "use client";

// import { createCardFlow, useGSAPScope, gsap } from "../lib/motion";

// export function ValueHighlights() {
//   const containerRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
//     if (isReduced) return;

//     const icons = gsap.utils.toArray<HTMLElement>(".feature-strip-icon");
//     createCardFlow({
//       root: containerRef.current,
//       cardSelector: ".feature-strip-card",
//       motions: [
//         { x: -58, y: 64, rotation: -5.2, scale: 0.89, zIndex: 4 },
//         { x: -30, y: -18, rotation: 3.6, scale: 0.95, zIndex: 2 },
//         { x: 30, y: 28, rotation: -3.8, scale: 0.93, zIndex: 3 },
//         { x: 58, y: -36, rotation: 5.1, scale: 0.9, zIndex: 1 },
//       ],
//       start: "top 94%",
//       end: "top 48%",
//       stagger: 0.13,
//       isReduced,
//     });

//     // Icon scale and fade
//     gsap.fromTo(
//       icons,
//       { opacity: 0.4, scale: 0.82 },
//       {
//         opacity: 1,
//         scale: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 88%",
//           end: "top 55%",
//           scrub: 1,
//         },
//       }
//     );
//   }, []);

//   const highlights = [
//     {
//       icon: (
//         <svg
//           className="h-7 w-7 text-[#072338] transition-transform duration-300 group-hover:scale-105"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.6"
//             d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       ),
//       title: "International Curriculum",
//       subtitle: "IB & Cambridge",
//     },
//     {
//       icon: (
//         <svg
//           className="h-7 w-7 text-[#072338] transition-transform duration-300 group-hover:scale-105"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.6"
//             d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//           />
//         </svg>
//       ),
//       title: "Holistic Development",
//       subtitle: "Mind | Body | Character",
//     },
//     {
//       icon: (
//         <svg
//           className="h-7 w-7 text-[#072338] transition-transform duration-300 group-hover:scale-105"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.6"
//             d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//           />
//         </svg>
//       ),
//       title: "Future-Ready Learning",
//       subtitle: "Skills for Tomorrow",
//     },
//     {
//       icon: (
//         <svg
//           className="h-7 w-7 text-[#072338] transition-transform duration-300 group-hover:scale-105"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.6"
//             d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//           />
//         </svg>
//       ),
//       title: "A Supportive Community",
//       subtitle: "Students | Parents | Educators",
//     },
//   ];

//   return (
//     <section
//       ref={containerRef}
//       className="relative z-20 overflow-hidden border-y border-gray-200/80 bg-[#f8faf9]"
//     >
//       <div className="mx-auto max-w-[1400px]">
//         <div className="relative isolate grid grid-cols-1 divide-y divide-gray-200/70 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
//           {highlights.map((item) => (
//             <div
//               key={item.title}
//               className="feature-strip-card group flex h-full flex-col items-center justify-center px-6 py-9 text-center transition-all duration-300 hover:bg-white hover:shadow-xs"
//             >
//               <div className="feature-strip-icon mb-3.5 flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white shadow-2xs transition-all duration-300 group-hover:border-[#c59139]/40 group-hover:shadow-md">
//                 {item.icon}
//               </div>
//               <h3 className="font-serif text-[17px] font-bold text-[#072338] transition-colors duration-200 group-hover:text-[#c59139] lg:text-[18px]">
//                 {item.title}
//               </h3>
//               <p className="mt-1 text-[12px] font-semibold tracking-wide text-[#314e58] sm:text-[13px]">
//                 {item.subtitle}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useGSAPScope, gsap } from "../lib/motion";

/* Brand colour for this section: #9a1827 (deep maroon) */

export function ValueHighlights() {
  const containerRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    const line = gsap.utils.toArray<HTMLElement>(".feature-strip-line");
    const cards = gsap.utils.toArray<HTMLElement>(".feature-strip-card");
    const glyphs = gsap.utils.toArray<HTMLElement>(".feature-strip-glyph");
    const paths = gsap.utils.toArray<SVGGeometryElement>(".feature-strip-glyph path");
    const icons = gsap.utils.toArray<HTMLElement>(".feature-strip-icon");
    const titles = gsap.utils.toArray<HTMLElement>(".feature-strip-title");
    const subtitles = gsap.utils.toArray<HTMLElement>(".feature-strip-subtitle");

    // -1 = left side-la irundhu varum, 1 = right side-la irundhu varum
    // Desktop/tablet: first 2 left, last 2 right | Mobile: zig-zag
    const isMobile = window.innerWidth < 640;
    const dir = (i: number) => (isMobile ? (i % 2 === 0 ? -1 : 1) : i < 2 ? -1 : 1);

    // Section screen-ku varum bodhellam replay aagum, veliya pona reset aagum
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reset play reset",
      },
    });

    // 0. Red line center-la irundhu rendu pakkamum neelum
    tl.fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "50% 50%" },
      0
    );

    // 1. 4 cards-um same time: left/right slide + blur-to-sharp
    tl.fromTo(
      cards,
      { opacity: 0, x: (i: number) => dir(i) * 170, filter: "blur(12px)" },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power4.out",
        clearProps: "filter",
      },
      0.1
    );

    // 2. Icon circles pop with a little spin
    tl.fromTo(
      icons,
      { scale: 0.3, opacity: 0, rotate: (i: number) => dir(i) * -40 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "back.out(2)" },
      0.45
    );

    // 3. Icon lines "draw" themselves (SVG stroke draw)
    tl.fromTo(
      paths,
      {
        strokeDasharray: (_i: number, el: SVGGeometryElement) => el.getTotalLength(),
        strokeDashoffset: (_i: number, el: SVGGeometryElement) => el.getTotalLength(),
      },
      { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
      0.55
    );

    // 4. Titles slide from the same side
    tl.fromTo(
      titles,
      { opacity: 0, x: (i: number) => dir(i) * 45 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      0.7
    );

    // 5. Subtitles rise up
    tl.fromTo(
      subtitles,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.85
    );

    // 6. Gentle floating icons (idle, very subtle)
    gsap.to(glyphs, {
      y: -3,
      duration: 2.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.35, from: "start" },
      delay: 1.6,
    });
  }, []);

  const iconClass =
    "h-7 w-7 text-[#9a1827] transition-all duration-300 group-hover:scale-110 group-hover:text-white";

  const highlights = [
    {
      icon: (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "International Curriculum",
      subtitle: "IB & Cambridge",
    },
    {
      icon: (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Holistic Development",
      subtitle: "Mind | Body | Character",
    },
    {
      icon: (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Future-Ready Learning",
      subtitle: "Skills for Tomorrow",
    },
    {
      icon: (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "A Supportive Community",
      subtitle: "Students | Parents | Educators",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative z-20 overflow-hidden border-y border-gray-200/80 bg-[#f8faf9]"
    >
      {/* Red line that draws across the top on scroll */}
      <span
        aria-hidden="true"
        className="feature-strip-line pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-[#9a1827]"
      />

      <div className="mx-auto max-w-[1400px]">
        <div className="relative isolate grid grid-cols-1 divide-y divide-gray-200/70 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="feature-strip-card group relative flex h-full flex-col items-center justify-center overflow-hidden px-6 py-10 text-center transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full before:origin-left before:scale-x-0 before:bg-[#9a1827] before:transition-transform before:duration-500 hover:bg-white hover:shadow-[0_14px_34px_rgba(154,24,39,0.12)] hover:before:scale-x-100"
            >
              {/* Light sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-full w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-[#9a1827]/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[400%]"
              />

              {/* Icon circle: fills maroon on hover, ring pulse */}
              <div className="feature-strip-icon relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#9a1827]/25 bg-white shadow-sm transition-all duration-300 group-hover:border-[#9a1827] group-hover:bg-[#9a1827] group-hover:shadow-[0_8px_20px_rgba(154,24,39,0.35)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full border border-[#9a1827]/60 opacity-0 group-hover:animate-ping group-hover:opacity-100 motion-reduce:group-hover:animate-none"
                />
                <span className="feature-strip-glyph relative flex items-center justify-center">
                  {item.icon}
                </span>
              </div>

              <h3 className="feature-strip-title relative font-serif text-[17px] font-bold text-[#9a1827] lg:text-[18px]">
                {item.title}
              </h3>

              {/* Underline grows on hover */}
              <span
                aria-hidden="true"
                className="relative mt-2 block h-[2px] w-0 rounded-full bg-[#9a1827] transition-all duration-300 group-hover:w-12"
              />

              <p className="feature-strip-subtitle relative mt-2 text-[12px] font-semibold tracking-wide text-[#314e58] sm:text-[13px]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}