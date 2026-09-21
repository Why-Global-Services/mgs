import { zipAsset } from "./data";

export function CommunitySplit() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 xl:gap-20">
          {/* Left Student Library Reading Image */}
          <div className="group relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src={zipAsset("story-nook")}
              alt="MGS Student Reading in Library"
              className="h-[380px] w-full object-cover object-center transition duration-700 group-hover:scale-105 sm:h-[460px] lg:h-[500px]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Right Editorial Text */}
          <div className="max-w-[540px] lg:pl-4">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#c48f3b] sm:text-[12px]">
              More Than a School
            </p>
            <h2 className="mt-3 font-serif text-[34px] font-bold leading-[1.12] text-[#073042] sm:text-[44px] lg:text-[50px]">
              A Community <br />
              <span className="text-[#0a3d2e]">That Belongs</span>
            </h2>
            <div className="my-6 h-[2px] w-14 bg-[#c48f3b]" />
            <p className="text-[16px] leading-[1.8] text-raya-muted sm:text-[17px]">
              We believe in fostering a safe, inclusive and inspiring environment where every learner
              is known, valued, and encouraged to grow. MGS brings together experienced international
              educators, reflective inquiry, and strong parent partnerships to empower students as
              compassionate citizens.
            </p>
            <div className="mt-8">
              <a
                href="/home/why-mgs"
                className="inline-flex items-center gap-2 rounded-sm border border-[#073042] px-7 py-3 text-[13px] font-bold uppercase tracking-wider text-[#073042] transition-all duration-300 hover:bg-[#073042] hover:text-white"
              >
                <span>Why MGS</span>
                <span aria-hidden="true">?</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
