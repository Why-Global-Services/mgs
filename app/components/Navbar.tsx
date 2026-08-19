"use client";

import { useEffect, useState } from "react";
import { arrowIcon, menuSections } from "./data";

const primaryLinks = [
  { href: "/",label: "Early Years" },
  {  label: "IB" },
  {  label: "Cambridge" },
  {  label: "Admissions" },
];

function PhoneIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M6.6 4.8 9 4.2l2 4.4-1.5 1.1c.9 1.9 2.4 3.4 4.3 4.3l1.2-1.5 4.4 2-.6 2.4c-.2.9-1 1.5-1.9 1.4C10.7 17.8 6.2 13.3 5.3 7.1c-.1-.9.5-1.7 1.3-1.9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M4 7.5h16v10H4z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /><path d="m5 8 7 5 7-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function Brand() {
  return <a aria-label="Maharishi Global School at PMR Campus home" className="flex min-w-0 items-center gap-2.5 sm:gap-4" href="/">
    <img alt="Maharishi Mahesh Yogi" className="h-[68px] w-[52px] shrink-0 object-contain object-bottom drop-shadow-[0_6px_10px_rgba(0,78,100,0.18)] sm:h-[78px] sm:w-[70px] xl:h-[94px] xl:w-[84px]" src="/assets/zip-webp/maharishi-ji-3.webp" />
    <span className="flex min-w-0 items-center gap-2 sm:gap-3"><span className="min-w-0 max-w-[142px] sm:max-w-[230px] xl:max-w-[270px]"><span className="block text-[12px] font-black leading-[1.05] tracking-[0.01em] text-raya-navy [text-shadow:1px_0_currentColor] sm:text-[16px] xl:text-[18px]">Maharishi Global School</span><span className="block text-[10px] font-black text-raya-navy sm:text-[15px] xl:text-[17px]">@ Pmr Campus</span><span className="mt-1 hidden h-px w-32 bg-raya-sky sm:block" /><span className="mt-1 hidden text-[10px] font-extrabold uppercase text-raya-forest sm:block sm:text-[11px]">IB &amp; Cambridge Launch</span></span><img alt="Maharishi Global School logo" className="h-[38px] w-[38px] shrink-0 rounded-full object-contain ring-2 ring-raya-gold/70 sm:h-[54px] sm:w-[54px] xl:h-[62px] xl:w-[62px]" src="/assets/optimized/maharishi-logo-transparent.png" /></span>
  </a>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return <>
    <header className="fixed inset-x-0 top-0 z-50 text-raya-navy shadow-[0_16px_46px_rgba(0,78,100,0.12)]">
      <div className="border-b border-white/10 bg-raya-navy text-white"><div className="mx-auto flex h-8 w-full max-w-[1280px] items-center justify-end overflow-hidden px-5 sm:h-9 sm:px-8 lg:px-10"><div className="flex items-center divide-x divide-white/30 text-[10px] font-extrabold uppercase tracking-[0.04em] sm:text-[11px]"><a className="whitespace-nowrap px-2 transition hover:text-raya-gold sm:px-3" href="tel:+910000000000">Call Admissions</a><a className="whitespace-nowrap px-2 transition hover:text-raya-gold sm:px-3" href="mailto:admin@maharishiglobalschool.com">Email Us</a><a className="hidden whitespace-nowrap px-3 transition hover:text-raya-gold sm:block" href="/#admissions">Apply Now</a></div></div></div>
      <nav className="border-b border-raya-line bg-white/96 backdrop-blur-xl"><div className="mx-auto flex h-[82px] w-full max-w-[1280px] items-stretch px-5 sm:h-[94px] sm:px-8 lg:h-[116px] lg:px-10">
        <div className="flex min-w-0 flex-1 items-center xl:w-[390px] xl:flex-none xl:border-r xl:border-raya-line xl:pr-8"><Brand /></div>
        <div className="hidden min-w-0 flex-1 items-stretch xl:flex" aria-label="Primary navigation">{primaryLinks.map((link) => <a className="flex min-w-0 flex-1 items-center justify-center border-r border-raya-line px-3 text-center text-[13px] font-extrabold leading-[1.18] text-raya-navy transition hover:bg-raya-sky/10 hover:text-raya-sky" href={link.href} key={link.href}>{link.label}</a>)}</div>
        <div className="flex shrink-0 items-center gap-2 pl-2 sm:gap-3 sm:pl-4 xl:border-r xl:border-raya-line xl:px-4">
          <a aria-label="Call admissions" className="hidden h-10 w-10 place-items-center rounded-full bg-raya-navy text-white shadow-[0_12px_26px_rgba(0,78,100,0.2)] transition hover:-translate-y-px hover:bg-raya-sky sm:grid" href="tel:+910000000000"><PhoneIcon /></a>
          <a aria-label="Email admissions" className="hidden h-10 w-10 place-items-center rounded-full bg-raya-navy text-white shadow-[0_12px_26px_rgba(0,78,100,0.2)] transition hover:-translate-y-px hover:bg-raya-sky md:grid" href="mailto:admin@maharishiglobalschool.com"><MailIcon /></a>
          <a aria-label="Go to admissions" className="hidden h-10 min-w-[112px] items-center justify-center rounded-full bg-raya-gold px-3 text-center text-[11px] font-black uppercase leading-none text-raya-ink shadow-[0_12px_26px_rgba(255,183,3,0.28)] transition hover:-translate-y-px hover:bg-raya-wine hover:text-white sm:inline-flex" href="/#admissions">Apply Now</a>
          {/* <button aria-label={open ? "Close menu" : "Open menu"} className="flex h-10 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full transition hover:bg-raya-sky/10 sm:h-11 sm:w-12 sm:gap-2" onClick={() => setOpen((value) => !value)} type="button"><span className={`block h-0.5 w-7 bg-raya-navy transition sm:w-8 ${open ? "translate-y-[8px] rotate-45 sm:translate-y-[10px]" : ""}`} /><span className={`block h-0.5 w-7 bg-raya-navy transition sm:w-8 ${open ? "opacity-0" : ""}`} /><span className={`block h-0.5 w-7 bg-raya-navy transition sm:w-8 ${open ? "-translate-y-[8px] -rotate-45 sm:-translate-y-[10px]" : ""}`} /></button> */}
        </div>
      </div></nav>
    </header>
    <div className={`fixed inset-0 z-40 h-screen overflow-y-auto bg-[radial-gradient(circle_at_78%_12%,rgba(255,183,3,0.26),transparent_28%),linear-gradient(135deg,#fffaf0_0%,#dff7f3_45%,#e7f7ff_100%)] px-5 pb-12 pt-[128px] transition-all duration-500 sm:px-8 sm:pt-[150px] lg:px-10 xl:pt-[166px] ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}>
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_1fr_260px] lg:gap-10"><div className="grid gap-8 sm:grid-cols-2 lg:col-span-2 lg:gap-9">{menuSections.map((section) => <section key={section.title}><h3 className="border-b border-raya-sky/35 pb-3 text-[22px] font-black text-raya-navy sm:pb-4 sm:text-[26px] lg:text-[30px]">{section.title}</h3><ul className="mt-5 space-y-0">{section.links.map((link) => <li key={link.href}><a className="group flex min-h-[52px] items-center justify-between border-b border-raya-line text-[15px] font-semibold text-raya-muted transition hover:pl-2 hover:text-raya-sky sm:min-h-[60px] sm:text-[16px] lg:min-h-[66px] lg:text-[18px]" href={link.href} onClick={() => setOpen(false)}><span>{link.label}</span><img alt="" className="h-[14px] w-[18px] transition group-hover:translate-x-1" src={arrowIcon} /></a></li>)}</ul></section>)}</div><aside className="rounded-[28px] bg-raya-navy p-6 text-white shadow-[0_28px_70px_rgba(0,78,100,0.2)]"><img alt="MGS learning spaces" className="aspect-[1.15] w-full rounded-[20px] object-cover" src="/assets/zip-webp/main-image.webp" /><p className="mt-5 text-[13px] font-black uppercase text-raya-gold">Admissions Open</p><p className="mt-2 text-[24px] font-black leading-tight">Early Years to Grade 7</p><a className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-raya-gold px-5 text-xs font-black uppercase text-raya-ink transition hover:bg-white" href="/#admissions" onClick={() => setOpen(false)}>Enquire Now</a></aside></div>
    </div>
  </>;
}
