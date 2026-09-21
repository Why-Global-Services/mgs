export function AcademicPrograms() {
  return (
    <section className="bg-[#fcfdfd] py-16 lg:py-24" id="programmes">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Centered Editorial Header */}
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-raya-muted sm:text-[12px]">
            Two Pathways. A Brighter Tomorrow.
          </p>
          <h2 className="mt-2 font-serif text-[32px] font-bold text-[#073042] sm:text-[42px] lg:text-[48px]">
            IB &amp; Cambridge Programmes
          </h2>
          <p className="mt-2 text-[14px] font-medium text-raya-muted sm:text-[16px]">
            Globally recognised. Future focused.
          </p>
        </div>

        {/* 2-Column Content Container with Subtle Borders */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#c48f3b]/35 bg-white shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-[#c48f3b]/25 md:grid-cols-2 md:divide-y-0 md:divide-x">
            {/* IB Curriculum */}
            <div className="group p-8 transition-colors duration-300 hover:bg-[#fffdf9] sm:p-12">
              <div className="flex flex-col items-center text-center">
                <h3 className="font-serif text-[24px] font-bold text-[#073042] sm:text-[28px]">
                  IB Curriculum
                </h3>
                <div className="my-3.5 h-[2px] w-14 bg-[#c48f3b]" />
                <p className="max-w-[440px] text-[15px] leading-[1.7] text-raya-muted sm:text-[16px]">
                  Developing inquiring, knowledgeable, and caring young minds with global
                  perspectives and future-ready skills through inquiry-based learning and self-reflection.
                </p>
                <a
                  href="/programmes/ib-curriculum"
                  className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0a3d2e] transition hover:text-[#c48f3b]"
                >
                  <span>Explore IB Pathway</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Cambridge Curriculum */}
            <div className="group p-8 transition-colors duration-300 hover:bg-[#fffdf9] sm:p-12">
              <div className="flex flex-col items-center text-center">
                <h3 className="font-serif text-[24px] font-bold text-[#073042] sm:text-[28px]">
                  Cambridge Curriculum
                </h3>
                <div className="my-3.5 h-[2px] w-14 bg-[#c48f3b]" />
                <p className="max-w-[440px] text-[15px] leading-[1.7] text-raya-muted sm:text-[16px]">
                  A world-class curriculum focused on academic excellence, critical thinking,
                  and international standards preparing learners for prestigious universities worldwide.
                </p>
                <a
                  href="/programmes/cambridge"
                  className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0a3d2e] transition hover:text-[#c48f3b]"
                >
                  <span>Explore Cambridge Pathway</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

