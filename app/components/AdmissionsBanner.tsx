export function AdmissionsBanner() {
  return (
    <section className="relative overflow-hidden border-t border-raya-line bg-[#fbfdfc] py-16 lg:py-20" id="admissions-banner">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1.4fr] xl:gap-14">
          {/* Left: Building & Campus Image */}
          <div className="group relative overflow-hidden rounded-xl shadow-xl">
            <img
              src="/assets/optimized/hero-campus.jpg"
              alt="Maharishi Global School Building & Campus"
              className="h-[280px] w-full object-cover object-center transition duration-700 group-hover:scale-105 sm:h-[340px]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Right: Clean Call to Action */}
          <div className="flex flex-col items-start justify-center">
            <h2 className="font-serif text-[30px] font-bold leading-[1.2] text-[#073042] sm:text-[38px] lg:text-[42px]">
              Begin Your Child&apos;s Journey <br />
              <span className="text-[#0a3d2e]">With Maharishi Global School</span>
            </h2>
            <p className="mt-4 text-[15px] font-medium leading-relaxed text-raya-muted sm:text-[17px]">
              Take the first step towards a brighter future. Admissions open for the upcoming academic year.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="/admissions/apply-now"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#9c182f] px-8 text-[13px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#801326]"
              >
                Apply Now ?
              </a>
              <a
                href="#admissions"
                className="inline-flex items-center text-[13px] font-bold text-[#073042] underline-offset-4 transition hover:text-[#c48f3b] hover:underline"
              >
                Book a Campus Visit ?
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
