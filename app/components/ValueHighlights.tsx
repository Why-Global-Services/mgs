export function ValueHighlights() {
  const highlights = [
    {
      icon: (
        <svg className="h-7 w-7 text-raya-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "International Curriculum",
      subtitle: "IB & Cambridge",
    },
    {
      icon: (
        <svg className="h-7 w-7 text-raya-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Holistic Development",
      subtitle: "Mind | Body | Character",
    },
    {
      icon: (
        <svg className="h-7 w-7 text-raya-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Future-Ready Learning",
      subtitle: "Skills for Tomorrow",
    },
    {
      icon: (
        <svg className="h-7 w-7 text-raya-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "A Supportive Community",
      subtitle: "Students | Parents | Educators",
    },
  ];

  return (
    <section className="border-b border-raya-line bg-[#fbfdfc]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 divide-y divide-raya-line sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center px-6 py-8 text-center transition-all duration-300 hover:bg-white"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-raya-line bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-[#0a3d2e]/30">
                {item.icon}
              </div>
              <h3 className="font-serif text-[17px] font-bold text-[#073042] transition-colors group-hover:text-raya-forest lg:text-[18px]">
                {item.title}
              </h3>
              <p className="mt-1 text-[12px] font-semibold tracking-wide text-raya-muted">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
