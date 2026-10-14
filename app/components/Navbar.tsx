// "use client";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { navigation, type NavigationPage } from "../content/navigation";
// import { useGSAPScope, gsap } from "../lib/motion";
// import { homepageImages } from "../lib/images";

// function Brand() {
//   return (
//     <a
//       aria-label="Maharishi Global School home"
//       className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-95"
//       href="/"
//     >
//       <img
//         alt="Maharishi Global School Logo"
//         className="nav-logo h-[52px] w-[52px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[60px] sm:w-[60px]"
//         src={homepageImages.logo.src}
//       />
//       <div className="flex flex-col justify-center">
//         <span className="font-serif text-[15px] font-extrabold uppercase leading-none tracking-wider text-[#072338] sm:text-[18px]">
//           Maharishi
//         </span>
//         <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#072338] sm:text-[13px]">
//           Global School
//         </span>
//         <div className="mt-1">
//           <span className="nav-badge inline-block rounded-full bg-[#c59139] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs sm:text-[10px]">
//             @ PMR Campus
//           </span>
//         </div>
//       </div>
//     </a>
//   );
// }

// export function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [expanded, setExpanded] = useState<string | null>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   const headerRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
//     if (isReduced) return;

//     const tl = ctx.selector
//       ? (window as any).gsap?.timeline?.()
//       : null;

//     // Use gsap from window or imported
//     const gsap = (window as any).gsap;
//     if (!gsap) return;

//     const navTl = gsap.timeline({ defaults: { ease: "power2.out" } });

//     navTl.fromTo(
//       ".nav-logo",
//       { opacity: 0, y: 15 },
//       { opacity: 1, y: 0, duration: 0.7 }
//     );

//     navTl.fromTo(
//       ".nav-badge",
//       { opacity: 0 },
//       { opacity: 1, duration: 0.5 },
//       "-=0.4"
//     );

//     navTl.fromTo(
//       ".nav-link-item",
//       { opacity: 0, y: 10 },
//       { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
//       "-=0.3"
//     );
//   }, []);

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   const close = () => {
//     setOpen(false);
//     setExpanded(null);
//   };

//   const navLinks = [
//     { label: "About us", href: "/about-us/vision-mission", match: "/about-us" },
//     { label: "Programmes", href: "/#programmes", match: "programmes" },
//     { label: "Admissions", href: "/#admissions", match: "admissions" },
//     { label: "Events & Gallery", href: "/#life-at-mgs", match: "events" },
//     { label: "Contact", href: "/#contact", match: "contact" },
//   ];

//   return (
//     <>
//       <header
//         ref={headerRef}
//         className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//           scrolled
//             ? "bg-white/95 shadow-[0_4px_24px_rgba(7,35,56,0.08)] backdrop-blur-md"
//             : "bg-white border-b border-gray-100"
//         }`}
//       >
//         <div className="mx-auto flex h-[82px] max-w-[1400px] items-center justify-between px-5 sm:h-[92px] sm:px-8 lg:px-12">
//           {/* Logo & PMR Campus gold strip */}
//           <Brand />

//           {/* Desktop Navigation matching the reference screenshot */}
//           <nav
//             aria-label="Primary navigation"
//             className="hidden items-center gap-7 lg:flex xl:gap-9"
//           >
//             {navLinks.map((item) => {
//               const isActive = pathname.includes(item.match);
//               return (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className={`nav-link-item group relative py-2 text-[14px] font-bold transition-colors duration-200 xl:text-[15px] ${
//                     isActive ? "text-[#c59139]" : "text-[#072338] hover:text-[#c59139]"
//                   }`}
//                 >
//                   <span>{item.label}</span>
//                   <span
//                     className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#c59139] transition-all duration-300 group-hover:w-full ${
//                       isActive ? "w-full" : ""
//                     }`}
//                   />
//                 </a>
//               );
//             })}
//           </nav>

//           {/* Mobile Hamburger Button */}
//           <div className="flex items-center lg:hidden">
//             <button
//               aria-expanded={open}
//               aria-label={open ? "Close menu" : "Open menu"}
//               className="flex h-11 w-11 items-center justify-center rounded-lg text-[#072338] transition hover:bg-gray-100"
//               onClick={() => setOpen((val) => !val)}
//               type="button"
//             >
//               <span className="sr-only">Toggle navigation</span>
//               <div className="flex flex-col gap-1.5">
//                 <span
//                   className={`block h-0.5 w-6 bg-[#072338] transition-transform duration-300 ${
//                     open ? "translate-y-2 rotate-45" : ""
//                   }`}
//                 />
//                 <span
//                   className={`block h-0.5 w-6 bg-[#072338] transition-opacity duration-300 ${
//                     open ? "opacity-0" : ""
//                   }`}
//                 />
//                 <span
//                   className={`block h-0.5 w-6 bg-[#072338] transition-transform duration-300 ${
//                     open ? "-translate-y-2 -rotate-45" : ""
//                   }`}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Drawer */}
//       <div
//         aria-hidden={!open}
//         className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
//           open
//             ? "pointer-events-auto opacity-100 translate-y-0"
//             : "pointer-events-none opacity-0 -translate-y-4"
//         }`}
//       >
//         <div className="flex h-full flex-col px-6 pt-24 pb-8 overflow-y-auto">
//           <div className="border-b border-gray-100 pb-4 mb-4">
//             <p className="text-[12px] font-extrabold uppercase tracking-widest text-[#c59139]">
//               Menu
//             </p>
//           </div>
//           <ul className="flex flex-col divide-y divide-gray-100">
//             {navLinks.map((item) => (
//               <li key={item.label} className="py-3.5">
//                 <a
//                   href={item.href}
//                   onClick={close}
//                   className="flex items-center justify-between text-[17px] font-bold text-[#072338] hover:text-[#c59139] transition"
//                 >
//                   <span>{item.label}</span>
//                   <span className="text-gray-400">→</span>
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-8 pt-6 border-t border-gray-100">
//             <a
//               href="/#admissions"
//               onClick={close}
//               className="flex w-full items-center justify-center rounded-full bg-[#9a1827] py-3.5 text-center text-[13px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#7f1320]"
//             >
//               Apply Now →
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAPScope } from "../lib/motion";
import { homepageImages } from "../lib/images";

/* ---------- LOGO ---------- */
// scrolled = false -> maroon background -> white text
// scrolled = true  -> cream background  -> maroon text
function Brand({ scrolled }: { scrolled: boolean }) {
  const textColor = scrolled ? "text-[#9a1827]" : "text-white";

  return (
    <a
      aria-label="Maharishi Global School home"
      className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-95"
      href="/"
    >
      <img
        alt="Maharishi Global School Logo"
        className="nav-logo h-[52px] w-[52px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[60px] sm:w-[60px]"
        src={homepageImages.logo.src}
      />
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif text-[15px] font-extrabold uppercase leading-none tracking-wider transition-colors duration-300 sm:text-[18px] ${textColor}`}
        >
          Maharishi
        </span>
        <span
          className={`text-[12px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 sm:text-[13px] ${textColor}`}
        >
          Global School
        </span>
        <div className="mt-1">
          <span className="nav-badge inline-block rounded-full bg-[#c59139] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs sm:text-[10px]">
            @ PMR Campus
          </span>
        </div>
      </div>
    </a>
  );
}

/* ---------- NAV DATA (hrefs unga actual routes-ku maathikonga) ---------- */
type NavChild = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

type NavItem = {
  label: string;
  href: string;
  match: string;
  children?: NavChild[];
};

const navLinks: NavItem[] = [
  {
    label: "Home",
    href: "/",
    match: "/",
    children: [
      { label: "Brief about MGS", href: "/#brief-about-mgs" },
      { label: "Location Map", href: "/#location-map" },
      { label: "Why MGS", href: "/#why-mgs" },
    ],
  },
  {
    label: "About us",
    href: "/about-us/vision-mission",
    match: "/about-us",
    children: [
      { label: "Evolving Campus", href: "/about-us/evolving-campus" },
      { label: "Vision & Mission", href: "/about-us/vision-mission" },
      { label: "Leadership", href: "/about-us/leadership" },
      { label: "Faculty", href: "/about-us/faculty" },
      { label: "Infrastructure", href: "/about-us/infrastructure" },
      { label: "Awards & Honours", href: "/about-us/awards-honours" },
      { label: "Testimonials", href: "/about-us/testimonials" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    match: "/programmes",
    children: [
      {
        label: "IB Curriculum",
        href: "/programmes/ib",
        children: [
          { label: "The Primary Years Programme (PYP)", href: "/programmes/ib/pyp" },
          { label: "The Middle Years Programme (MYP)", href: "/programmes/ib/myp" },
          { label: "The Diploma Programme (DP)", href: "/programmes/ib/dp" },
          { label: "The Career-related Programme (IBCP)", href: "/programmes/ib/ibcp" },
        ],
      },
      { label: "Cambridge", href: "/programmes/cambridge" },
      { label: "CBSE", href: "/programmes/cbse" },
      { label: "Student Support Services", href: "/programmes/student-support-services" },
      { label: "Library", href: "/programmes/library" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    match: "/admissions",
    children: [
      { label: "Apply Now", href: "/admissions/apply-now" },
      { label: "Schedule a Tour", href: "/admissions/schedule-a-tour" },
      { label: "Admissions Process", href: "/admissions/process" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
      { label: "Scholarship", href: "/admissions/scholarship" },
      { label: "Transport Facility", href: "/admissions/transport" },
      { label: "Admissions FAQ", href: "/admissions/faq" },
    ],
  },
  {
    label: "What makes us different?",
    href: "/what-makes-us-different",
    match: "/what-makes-us-different",
    children: [
      { label: "The Arts", href: "/what-makes-us-different/the-arts" },
      { label: "Technology", href: "/what-makes-us-different/technology" },
      { label: "Sports", href: "/what-makes-us-different/sports" },
      { label: "Maker Space", href: "/what-makes-us-different/maker-space" },
      { label: "After School Activities", href: "/what-makes-us-different/after-school-activities" },
      { label: "Extended Music Programme", href: "/what-makes-us-different/extended-music-programme" },
      { label: "Social Emotional Learning", href: "/what-makes-us-different/social-emotional-learning" },
      { label: "Primary School Trips", href: "/what-makes-us-different/primary-school-trips" },
      { label: "Secondary School Trips", href: "/what-makes-us-different/secondary-school-trips" },
      { label: "Community Services", href: "/what-makes-us-different/community-services" },
      { label: "Sustainability at MGS", href: "/what-makes-us-different/sustainability" },
    ],
  },
  {
    label: "University career counselling",
    href: "/university-career-counselling",
    match: "/university-career-counselling",
    children: [
      { label: "Counselling Overview", href: "/university-career-counselling/overview" },
      { label: "Meet the Counsellors", href: "/university-career-counselling/counsellors" },
      { label: "University Admissions Support", href: "/university-career-counselling/admissions-support" },
      { label: "Career Assessments", href: "/university-career-counselling/career-assessments" },
      { label: "Higher Education Pathways", href: "/university-career-counselling/pathways" },
      { label: "Alumni Network", href: "/university-career-counselling/alumni" },
    ],
  },
  {
    label: "Events & Gallery",
    href: "/events-gallery",
    match: "/events-gallery",
    children: [{ label: "Programme-wise", href: "/events-gallery/programme-wise" }],
  },
  {
    label: "Career",
    href: "/career",
    match: "/career",
    children: [
      { label: "Opportunities", href: "/career/opportunities" },
      { label: "Work life at MGS", href: "/career/work-life-at-mgs" },
    ],
  },
];

/* ---------- NAVBAR ---------- */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const headerRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const navTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    navTl.fromTo(".nav-logo", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 });
    navTl.fromTo(".nav-badge", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.4");
    navTl.fromTo(
      ".nav-link-item",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      "-=0.3"
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
    setSubExpanded(null);
  };

  const isItemActive = (match: string) =>
    match === "/" ? pathname === "/" : pathname.startsWith(match);

  /* ---------- Colours that follow the navbar background ---------- */
  // #730404 bg (top)  -> white text, light-gold hover/active
  // Cream bg (scroll) -> maroon text, gold hover/active
  const linkIdle = scrolled ? "text-[#9a1827]" : "text-white";
  const linkHover = scrolled
    ? "group-hover:text-[#c59139]"
    : "group-hover:text-[#f3d9a4]";
  const linkActive = scrolled ? "text-[#c59139]" : "text-[#f3d9a4]";
  const dividerColor = scrolled ? "border-[#9a1827]/20" : "border-white/25";
  const barColor = scrolled ? "bg-[#9a1827]" : "bg-white";
  const burgerHover = scrolled ? "hover:bg-[#9a1827]/10" : "hover:bg-white/10";

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#730404]/95 shadow-[0_4px_24px_rgba(7,35,56,0.08)] backdrop-blur-md"
            : "border-b border-[#730404] bg-[#730404]"
        }`}
      >
        <div className="mx-auto flex h-[82px] max-w-[1600px] items-center justify-between gap-4 px-5 sm:h-[120px] sm:px-8 xl:px-8">
          <Brand scrolled={scrolled} />

          {/* ---------- Desktop nav ---------- */}
          <nav
            aria-label="Primary navigation"
            className="hidden h-full items-stretch xl:flex"
          >
            {navLinks.map((item, i) => {
              const active = isItemActive(item.match);
              const alignRight = i >= navLinks.length - 2; // last 2 menus right-aligned

              return (
                <div
                  key={item.label}
                  className={`nav-link-item group relative my-3 flex items-center ${
                    i !== 0 ? `border-l transition-colors duration-300 ${dividerColor}` : ""
                  }`}
                >
                  <a
                    href={item.href}
                    className={`flex h-full max-w-[150px] items-center px-3.5 text-[12.5px] font-bold uppercase leading-tight tracking-wide transition-colors duration-200 2xl:max-w-[190px] 2xl:px-5 2xl:text-[13.5px] ${
                      active ? linkActive : `${linkIdle} ${linkHover}`
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <svg
                        className="ml-1 h-3 w-3 shrink-0 transition-transform duration-200 group-hover:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5.5 7.5 10 12l4.5-4.5z" />
                      </svg>
                    )}
                  </a>

                  {/* Dropdown (white panel, dark text) */}
                  {item.children && (
                    <div
                      className={`invisible absolute top-full z-50 w-[290px] translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                        alignRight ? "right-0" : "left-0"
                      }`}
                    >
                      <ul className="rounded-b-3xl border-t-4 border-[#9a1827] bg-white py-4 shadow-[0_12px_32px_rgba(7,35,56,0.18)]">
                        {item.children.map((child) => (
                          <li key={child.label} className="group/sub relative">
                            <a
                              href={child.href}
                              className="flex items-center justify-between px-7 py-2 text-[14px] font-semibold text-[#072338]/80 transition-colors hover:bg-[#9a1827]/5 hover:text-[#9a1827]"
                            >
                              <span>{child.label}</span>
                              {child.children && (
                                <span className="ml-3 text-[12px] text-gray-400">▸</span>
                              )}
                            </a>

                            {/* Side sub-menu (IB Curriculum) */}
                            {child.children && (
                              <div className="invisible absolute left-full top-0 z-50 w-[320px] -translate-x-2 pl-1 opacity-0 transition-all duration-200 group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100">
                                <ul className="rounded-2xl border-t-4 border-[#c59139] bg-white py-3 shadow-[0_12px_32px_rgba(7,35,56,0.18)]">
                                  {child.children.map((sub) => (
                                    <li key={sub.label}>
                                      <a
                                        href={sub.href}
                                        className="block px-6 py-2 text-[13.5px] font-semibold text-[#072338]/80 transition-colors hover:bg-[#9a1827]/5 hover:text-[#9a1827]"
                                      >
                                        {sub.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ---------- Mobile hamburger ---------- */}
          <div className="flex items-center xl:hidden">
            <button
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={`flex h-11 w-11 items-center justify-center rounded-lg transition ${burgerHover}`}
              onClick={() => setOpen((val) => !val)}
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 ${barColor} ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 ${barColor} ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 ${barColor} ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Mobile drawer (white bg, dark text) ---------- */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-white backdrop-blur-xl transition-all duration-300 xl:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-24">
          <div className="mb-4 border-b border-gray-100 pb-4">
            <p className="text-[12px] font-extrabold uppercase tracking-widest text-[#9a1827]">
              Menu
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-gray-100">
            {navLinks.map((item) => {
              const isOpen = expanded === item.label;
              return (
                <li key={item.label} className="py-3.5">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => {
                          setExpanded(isOpen ? null : item.label);
                          setSubExpanded(null);
                        }}
                        className="flex w-full items-center justify-between text-left text-[15px] font-bold uppercase text-[#072338] transition hover:text-[#9a1827]"
                      >
                        <span>{item.label}</span>
                        <span
                          className={`text-gray-400 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      <ul
                        className={`overflow-hidden border-l-2 border-[#9a1827] pl-4 transition-all duration-300 ${
                          isOpen ? "mt-3 max-h-[900px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.children.map((child) => {
                          const subOpen = subExpanded === child.label;
                          return (
                            <li key={child.label}>
                              {child.children ? (
                                <>
                                  <button
                                    type="button"
                                    aria-expanded={subOpen}
                                    onClick={() =>
                                      setSubExpanded(subOpen ? null : child.label)
                                    }
                                    className="flex w-full items-center justify-between py-2 text-left text-[14.5px] font-semibold text-[#072338]/80 hover:text-[#9a1827]"
                                  >
                                    <span>{child.label}</span>
                                    <span
                                      className={`text-gray-400 transition-transform duration-300 ${
                                        subOpen ? "rotate-180" : ""
                                      }`}
                                    >
                                      ▾
                                    </span>
                                  </button>
                                  <ul
                                    className={`overflow-hidden border-l-2 border-[#c59139] pl-4 transition-all duration-300 ${
                                      subOpen
                                        ? "my-1 max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                    }`}
                                  >
                                    {child.children.map((sub) => (
                                      <li key={sub.label}>
                                        <a
                                          href={sub.href}
                                          onClick={close}
                                          className="block py-2 text-[13.5px] font-semibold text-[#072338]/75 hover:text-[#9a1827]"
                                        >
                                          {sub.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                <a
                                  href={child.href}
                                  onClick={close}
                                  className="block py-2 text-[14.5px] font-semibold text-[#072338]/80 hover:text-[#9a1827]"
                                >
                                  {child.label}
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={close}
                      className="flex items-center justify-between text-[15px] font-bold uppercase text-[#072338] transition hover:text-[#9a1827]"
                    >
                      <span>{item.label}</span>
                      <span className="text-gray-400">→</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <a
              href="/admissions/apply-now"
              onClick={close}
              className="flex w-full items-center justify-center rounded-full bg-[#9a1827] py-3.5 text-center text-[13px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#7f1320]"
            >
              Apply Now →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}