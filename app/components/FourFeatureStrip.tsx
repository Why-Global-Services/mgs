export function FourFeatureStrip() {
  const features = [
    { title: "Global Curriculum", subtitle: "IB & Cambridge" },
    { title: "Holistic Learning", subtitle: "Consciousness & Wellness" },
    { title: "Future-Ready Skills", subtitle: "Innovation & Robotics" },
    { title: "Lifelong Values", subtitle: "Principled Leadership" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#072432] py-20 lg:py-28">
      {/* Background Campus Image with Deep Tinted Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/optimized/hero-campus.jpg"
          alt="MGS Green Campus"
          className="h-full w-full object-cover object-center opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#072432]/95 via-[#0a3d2e]/90 to-[#072432]/95" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-8 divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/15 lg:grid-cols-4 lg:gap-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center px-4 py-4 text-center transition duration-300 lg:px-8"
            >
              <h3 className="font-serif text-[20px] font-bold tracking-wide text-white transition duration-300 group-hover:text-raya-gold sm:text-[24px] lg:text-[26px]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/60 transition group-hover:text-white/90">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
