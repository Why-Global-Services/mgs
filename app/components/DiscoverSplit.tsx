import { zipAsset } from "./data";

export function DiscoverSplit() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.15fr] xl:gap-16">
          {/* Left Text Content */}
          <div className="max-w-[560px]">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#c48f3b]">
              Discover MGS
            </p>
            <h2 className="mt-3 font-serif text-[32px] font-bold leading-[1.15] text-[#073042] sm:text-[40px] lg:text-[46px]">
              Discover <br />
              <span className="text-[#0a3d2e]">a World of Possibilities</span>
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-raya-muted sm:text-[17px]">
              At Maharishi Global School, we nurture curious minds, compassionate hearts,
              and principled leaders through a globally respected IB and Cambridge curriculum.
              Our holistic learning approach connects intellectual inquiry, inner stability,
              and purposeful action in a state-of-the-art campus.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/admissions/apply-now"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#9c182f] px-8 text-[13px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#801326]"
              >
                Apply Now
              </a>
              <a
                href="/about-us/vision-mission"
                className="inline-flex min-h-12 items-center justify-center border border-[#0a3d2e]/30 px-6 text-[13px] font-bold uppercase tracking-wider text-[#0a3d2e] transition hover:bg-[#0a3d2e] hover:text-white"
              >
                Our Philosophy ?
              </a>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr] items-stretch">
              {/* Main Photo of Running Students */}
              <div className="group relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src="/assets/hero-students-campus.jpg"
                  alt="MGS Students on Campus"
                  className="h-full min-h-[380px] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Accent Editorial Card */}
              <div className="flex flex-col justify-center rounded-lg bg-[#9c182f] p-8 text-white shadow-xl sm:p-10">
                <h3 className="font-serif text-[26px] font-bold leading-tight sm:text-[30px]">
                  Learning <br />
                  Beyond <br />
                  Boundaries
                </h3>
                <div className="my-5 h-[2px] w-12 bg-white/40" />
                <p className="text-[14px] font-medium leading-relaxed text-white/90">
                  Ideas. <br />
                  Innovation. <br />
                  Impact.
                </p>
                <div className="mt-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/70">
                    MGS Advantage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
