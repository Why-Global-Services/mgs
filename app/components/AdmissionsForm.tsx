"use client";

import { FormEvent, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

type Status = "idle" | "saving" | "success" | "error";

const googleSheetsWebhookUrl =
  "https://script.google.com/macros/s/AKfycbxcqG_2e4hck6HSDfAsmIX17DdlN2gy9IGyhuw58oQNKbJ2bq_OTyncJNUFN6ny5U_HDQ/exec";

export function AdmissionsForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const row = {
      "Submitted At": new Date().toISOString(),
      "Parent Name": String(data.parentName || "").trim(),
      "Student Name": String(data.studentName || "").trim(),
      Phone: String(data.phone || "").trim(),
      Email: String(data.email || "").trim(),
      Grade: String(data.grade || "").trim(),
      Curriculum: String(data.curriculum || "").trim(),
      "Preferred Action": String(data.preferredAction || "").trim(),
      Message: String(data.message || "").trim(),
    };

    try {
      await fetch(googleSheetsWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(row),
      });

      form.reset();
      setStatus("success");
      setMessage("Thank you! Your admission inquiry has been received. Our team will contact you shortly.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or call our admissions office.");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#071c2a] py-16 sm:py-20 lg:py-24 text-white" id="admissions">
      {/* Decorative subtle background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#c59139]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-[#0a3d2e]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
            {/* Left Content */}
            <div>
              <p className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#c59139]">
                Admissions 2026 - 2027
              </p>
              <h2 className="mt-3 font-serif text-[34px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.12] text-white">
                Begin Your Inquiry
              </h2>
              <div className="my-5 h-[2px] w-12 bg-[#c59139]" />
              <p className="text-[15px] sm:text-[16px] leading-[1.8] text-white/80">
                Take the first step toward world-class international education at Maharishi Global School.
                Our admissions team is available to guide you through programme choices, schedule a campus tour,
                and assist with your application.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-[12px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-[#c59139] hover:bg-[#c59139] hover:text-[#072338]"
                  download
                  href="/assets/mgs-brochure.pdf"
                >
                  <span>Download Brochure</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    ↓
                  </span>
                </a>
                <a
                  href="tel:+919994499850"
                  className="text-[13px] font-bold text-[#c59139] hover:underline"
                >
                  Call +91 99944 99850
                </a>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md shadow-2xl sm:p-8 lg:p-10">
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139]">
                  Parent Name *
                  <input
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15"
                    name="parentName"
                    placeholder="Enter full name"
                    required
                  />
                </label>

                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139]">
                  Student Name *
                  <input
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15"
                    name="studentName"
                    placeholder="Enter student's name"
                    required
                  />
                </label>

                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139]">
                  Phone Number *
                  <input
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15"
                    name="phone"
                    placeholder="+91 "
                    required
                    type="tel"
                  />
                </label>

                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139]">
                  Email Address *
                  <input
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15"
                    name="email"
                    placeholder="name@example.com"
                    required
                    type="email"
                  />
                </label>

                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139]">
                  Grade Applying For *
                  <select
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15 [&>option]:text-[#072338]"
                    name="grade"
                    required
                    defaultValue=""
                  >
                    <option disabled value="">
                      Select grade
                    </option>
                    <option>Early Years</option>
                    <option>Primary</option>
                    <option>Middle School</option>
                    <option>Senior School</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139]">
                  Preferred Curriculum *
                  <select
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15 [&>option]:text-[#072338]"
                    name="curriculum"
                    required
                    defaultValue=""
                  >
                    <option disabled value="">
                      Select curriculum
                    </option>
                    <option>IB Pathway</option>
                    <option>Cambridge Pathway</option>
                    <option>Need Guidance</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139] sm:col-span-2">
                  Preferred Action *
                  <select
                    className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15 [&>option]:text-[#072338]"
                    name="preferredAction"
                    required
                    defaultValue=""
                  >
                    <option disabled value="">
                      Select action
                    </option>
                    <option>Book campus visit</option>
                    <option>Schedule a call</option>
                    <option>Purchase application form</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#c59139] sm:col-span-2">
                  Questions / Message
                  <textarea
                    rows={3}
                    className="w-full resize-y rounded-lg border border-white/20 bg-white/10 px-3.5 py-2.5 font-[inherit] normal-case text-white outline-none transition focus:border-[#c59139] focus:bg-white/15"
                    name="message"
                    placeholder="Tell us about your child's learning needs..."
                  />
                </label>

                <button
                  className="group mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c59139] px-8 text-[13px] font-bold uppercase tracking-wider text-[#072338] shadow-lg transition-all duration-300 hover:bg-[#d8a64d] hover:scale-[1.02] active:scale-98 disabled:opacity-50 sm:col-span-2"
                  disabled={status === "saving"}
                  type="submit"
                >
                  <span>{status === "saving" ? "Submitting Inquiry..." : "Submit Inquiry"}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                {message ? (
                  <p
                    className={`mt-2 text-center text-[14px] font-semibold sm:col-span-2 ${
                      status === "success" ? "text-[#c59139]" : "text-red-300"
                    }`}
                  >
                    {message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
