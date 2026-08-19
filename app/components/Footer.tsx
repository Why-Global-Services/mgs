export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[linear-gradient(145deg,#004e64_0%,#00875a_58%,#073042_100%)] px-5 py-10 text-raya-cream sm:px-8 lg:px-10 md:py-14"
      id="contact"
    >
      <div className="absolute bottom-[-72px] right-[-18px] text-[150px] font-black leading-none text-raya-gold/16 sm:text-[210px] lg:text-[260px]">
        MGS
      </div>
      <div className="absolute left-[-90px] top-[-120px] h-72 w-72 rounded-full bg-raya-sky/18 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-[1280px] gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1.35fr_auto] lg:gap-12">
        <div className="flex items-start gap-4 sm:block">
          <img
            alt="Maharishi Global School logo"
            className="w-20 shrink-0 rounded-full bg-white/90 ring-1 ring-raya-gold/50 sm:w-24"
            src="/assets/optimized/maharishi-logo-transparent.png"
          />
          <p className="text-sm leading-6 text-white/65 sm:mt-8">
            © 2026
            <span className="block">Maharishi Global School</span>
          </p>
        </div>

        <div className="max-w-[360px]">
          <h4 className="text-[22px] font-semibold leading-tight text-raya-gold">
            Visit us at our campus
          </h4>
          <p className="mt-4 text-[16px] leading-[1.65] text-white/72">
            Maharishi Global School brings IB and Cambridge pathways to a safe,
            inclusive, and intellectually stimulating campus.
          </p>
          <a
            className="mt-5 inline-block font-semibold text-raya-gold transition hover:text-white"
            href="/#admissions"
          >
            Book campus visit
          </a>
        </div>

        <div className="max-w-[420px]">
          <h4 className="text-[22px] font-semibold leading-tight text-raya-gold">
            Write to us at
          </h4>
          <a
            className="mt-4 inline-block break-all text-[16px] leading-[1.65] text-white/72 transition hover:text-raya-gold"
            href="mailto:admin@maharishiglobalschool.com"
          >
            admin@maharishiglobalschool.com
          </a>
          <h4 className="mt-8 text-[22px] font-semibold leading-tight text-raya-gold">
            Social Links
          </h4>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[16px] text-white/72">
            <a className="transition hover:text-raya-gold" href="#">
              Facebook
            </a>
            <a className="transition hover:text-raya-gold" href="#">
              LinkedIn
            </a>
            <a className="transition hover:text-raya-gold" href="#">
              Instagram
            </a>
          </div>
        </div>

        <div className="self-end text-[48px] font-black leading-none text-raya-gold/35 sm:col-span-2 lg:col-span-1 lg:text-[70px]">
          MGS
        </div>
      </div>
    </footer>
  );
}
