"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navigation, type NavigationPage } from "../content/navigation";
import { useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

function Brand() {
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
        <span className="font-serif text-[15px] font-extrabold uppercase leading-none tracking-wider text-[#072338] sm:text-[18px]">
          Maharishi
        </span>
        <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#072338] sm:text-[13px]">
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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const headerRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    const tl = ctx.selector
      ? (window as any).gsap?.timeline?.()
      : null;

    // Use gsap from window or imported
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const navTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    navTl.fromTo(
      ".nav-logo",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 }
    );

    navTl.fromTo(
      ".nav-badge",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.4"
    );

    navTl.fromTo(
      ".nav-link-item",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      "-=0.3"
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
  };

  const navLinks = [
    { label: "About us", href: "/about-us/vision-mission", match: "/about-us" },
    { label: "Programmes", href: "/#programmes", match: "programmes" },
    { label: "Admissions", href: "/#admissions", match: "admissions" },
    { label: "Events & Gallery", href: "/#life-at-mgs", match: "events" },
    { label: "Contact", href: "/#contact", match: "contact" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-[0_4px_24px_rgba(7,35,56,0.08)] backdrop-blur-md"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="mx-auto flex h-[82px] max-w-[1400px] items-center justify-between px-5 sm:h-[92px] sm:px-8 lg:px-12">
          {/* Logo & PMR Campus gold strip */}
          <Brand />

          {/* Desktop Navigation matching the reference screenshot */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {navLinks.map((item) => {
              const isActive = pathname.includes(item.match);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-link-item group relative py-2 text-[14px] font-bold transition-colors duration-200 xl:text-[15px] ${
                    isActive ? "text-[#c59139]" : "text-[#072338] hover:text-[#c59139]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#c59139] transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full" : ""
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-[#072338] transition hover:bg-gray-100"
              onClick={() => setOpen((val) => !val)}
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-6 bg-[#072338] transition-transform duration-300 ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-[#072338] transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-[#072338] transition-transform duration-300 ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-24 pb-8 overflow-y-auto">
          <div className="border-b border-gray-100 pb-4 mb-4">
            <p className="text-[12px] font-extrabold uppercase tracking-widest text-[#c59139]">
              Menu
            </p>
          </div>
          <ul className="flex flex-col divide-y divide-gray-100">
            {navLinks.map((item) => (
              <li key={item.label} className="py-3.5">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between text-[17px] font-bold text-[#072338] hover:text-[#c59139] transition"
                >
                  <span>{item.label}</span>
                  <span className="text-gray-400">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <a
              href="/#admissions"
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
