import { zipAsset } from "./data";

export function LifeAtSchool() {
  const cards = [
    {
      title: "Library & Reading Culture",
      image: zipAsset("reading"),
    },
    {
      title: "Practical Learning",
      image: zipAsset("stem-learning"),
    },
    {
      title: "Sports Activities",
      image: zipAsset("champion"),
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24" id="life-at-mgs">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-14">
          {/* Left Column: Heading, intro, and CTA */}
          <div className="max-w-[360px]">
            <h2 className="font-serif text-[34px] font-bold text-[#073042] sm:text-[40px] lg:text-[44px]">
              Life at MGS
            </h2>
            <div className="my-4 h-[2px] w-12 bg-[#c48f3b]" />
            <p className="text-[15px] leading-[1.7] text-raya-muted sm:text-[16px]">
              A vibrant campus life with endless opportunities to explore, create, and grow.
              From student-led clubs to cultural and athletic showcases, life at MGS is an enriching journey.
            </p>
            <div className="mt-7">
              <a
                href="/events-and-gallery"
                className="inline-flex items-center gap-2 rounded-sm border border-[#c48f3b] px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#073042] transition-colors hover:bg-[#c48f3b] hover:text-white"
              >
                <span>Events &amp; Gallery</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3 Editorial Photo Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {cards.map((card, index) => (
              <div key={index} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-raya-line shadow-md">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="mt-3.5 text-center font-serif text-[16px] font-bold text-[#073042] transition duration-300 group-hover:text-raya-forest sm:text-[17px]">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

