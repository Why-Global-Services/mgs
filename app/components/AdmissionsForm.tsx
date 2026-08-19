"use client";

import { FormEvent, useState } from "react";

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
      setMessage("Admission inquiry saved successfully.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-[linear-gradient(135deg,#004e64_0%,#00875a_54%,#00a8cc_100%)] px-5 py-16 text-raya-cream sm:px-8 md:px-10 md:py-24 lg:px-10" id="admissions">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 border-y border-raya-gold/35 py-12 md:py-16 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <h2 className="text-[36px] font-semibold leading-[1.1] text-white md:text-[56px]">
            Admissions
          </h2>
          <p className="mt-7 text-[18px] leading-[1.6] text-white/82 md:text-[21px]">
            Begin your inquiry with Maharishi Global School. Our admissions
            team will use your details to help you book a campus visit, schedule
            a call, or start the application process.
          </p>
          <a
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white px-6 text-[12px] font-black uppercase text-raya-navy shadow-[0_16px_36px_rgba(7,48,66,0.2)] transition hover:-translate-y-px hover:bg-raya-gold"
            download
            href="/assets/mgs-brochure.pdf"
          >
            Download Brochure
          </a>
        </div>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold">
            Parent Name
            <input className="min-h-12 w-full rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22" name="parentName" required />
          </label>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold">
            Student Name
            <input className="min-h-12 w-full rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22" name="studentName" required />
          </label>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold">
            Phone Number
            <input className="min-h-12 w-full rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22" name="phone" required />
          </label>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold">
            Email
            <input className="min-h-12 w-full rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22" name="email" required type="email" />
          </label>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold">
            Grade Applying For
            <select className="min-h-12 w-full rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22 [&>option]:text-raya-ink" name="grade" required defaultValue="">
              <option disabled value="">
                Select grade
              </option>
              <option>Early Years</option>
              <option>Primary</option>
              <option>Middle School</option>
              <option>Senior School</option>
            </select>
          </label>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold">
            Preferred Curriculum
            <select className="min-h-12 w-full rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22 [&>option]:text-raya-ink" name="curriculum" required defaultValue="">
              <option disabled value="">
                Select curriculum
              </option>
              <option>IB Pathway</option>
              <option>Cambridge Pathway</option>
              <option>Need Guidance</option>
            </select>
          </label>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold">
            Preferred Action
            <select className="min-h-12 w-full rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22 [&>option]:text-raya-ink" name="preferredAction" required defaultValue="">
              <option disabled value="">
                Select action
              </option>
              <option>Book campus visit</option>
              <option>Schedule a call</option>
              <option>Purchase application form</option>
            </select>
          </label>
          <label className="grid gap-2 text-[13px] font-extrabold uppercase text-raya-gold sm:col-span-2">
            Message
            <textarea className="min-h-[120px] w-full resize-y rounded-[12px] border border-white/28 bg-white/16 px-3.5 py-3 font-[inherit] normal-case text-white outline-none transition focus:border-raya-gold focus:bg-white/22" name="message" />
          </label>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-raya-gold bg-raya-gold px-7 text-xs font-extrabold uppercase text-raya-ink shadow-[0_18px_40px_rgba(184,138,61,0.24)] transition hover:-translate-y-px hover:bg-raya-cream sm:col-span-2"
            disabled={status === "saving"}
            type="submit"
          >
            {status === "saving" ? "Saving..." : "Submit Inquiry"}
          </button>
          {message ? (
            <p
              className={`sm:col-span-2 ${
                status === "success" ? "text-raya-gold" : "text-red-200"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
