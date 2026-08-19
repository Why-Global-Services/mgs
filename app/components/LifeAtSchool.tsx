import { lifeCards } from "./data";

export function LifeAtSchool() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_10%_20%,rgba(255,183,3,0.2),transparent_28%),linear-gradient(180deg,#fffaf0_0%,#e6fbf7_50%,#f6fbff_100%)] px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:px-10">
      <div className="absolute right-[-120px] top-[-90px] h-80 w-80 rounded-full bg-raya-sky/15 blur-3xl" />
      <div className="absolute bottom-[-120px] left-[-120px] h-80 w-80 rounded-full bg-raya-gold/18 blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.78fr_1fr] md:items-end">
          <div>
            <p className="text-[13px] font-black uppercase text-raya-gold">
              Learning advantage
            </p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] text-raya-navy">
              Why Choose IB & Cambridge?
            </h2>
          </div>
          <p className="max-w-[520px] text-[17px] leading-[1.65] text-raya-muted md:justify-self-end md:text-[19px]">
            A bright international school experience with inquiry, creativity,
            innovation, wellbeing, and real-world confidence at the centre.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lifeCards.map((card) => (
            <article
              className="group overflow-hidden rounded-[26px] bg-white shadow-[0_24px_64px_rgba(0,78,100,0.13)] ring-1 ring-raya-sky/15 transition hover:-translate-y-1 hover:shadow-[0_34px_78px_rgba(0,168,204,0.2)]"
              key={card.title}
            >
              <div className="relative aspect-[1.1] overflow-hidden bg-raya-line">
                <img
                  alt={card.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  src={card.image}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,48,66,0.04)_0%,rgba(7,48,66,0.58)_100%)]" />
                <span className="absolute bottom-4 left-4 rounded-full bg-raya-gold px-3 py-1.5 text-[11px] font-black uppercase text-raya-ink">
                  MGS
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[22px] font-black leading-tight text-raya-forest">
                  {card.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.6] text-raya-muted">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
