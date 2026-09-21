import { schoolContact } from "../content/contact";

export function LocationSection() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24" id="contact">
      <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.9fr_1fr] md:items-center">
        <div>
          <h3 className="text-[38px] font-semibold leading-[1.05] md:text-[58px]">
            A safe, inclusive, and stimulating environment.
            <span className="block">Where every learner is valued.</span>
          </h3>
          <p className="mt-8 text-[17px] leading-[1.65] text-raya-muted md:text-[20px]">
            MGS provides a learning environment grounded in inquiry, reflection,
            international mindedness, respect for diverse cultures, and strong
            parent-school partnerships.
          </p>
          {/* School address */}
          <address className="mt-8 not-italic text-[17px] leading-[1.8] text-raya-muted md:text-[19px]">
            <span className="block font-bold text-raya-ink">
              {schoolContact.name}
            </span>
            {schoolContact.addressLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </address>
          <a
            className="mt-6 inline-block font-semibold text-raya-forest underline-offset-2 transition hover:underline"
            href={schoolContact.googleMapsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            View on Google Maps →
          </a>
        </div>

        {/* Live Google Maps embed */}
        <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_48px_rgba(0,78,100,0.14)]">
          <iframe
            allowFullScreen
            className="aspect-square w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={schoolContact.googleMapsEmbed}
            title="Maharishi Global School Location Map"
          />
        </div>
      </div>
    </section>
  );
}

