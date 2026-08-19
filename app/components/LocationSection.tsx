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
          <p className="mt-8 text-[17px] leading-[1.65] text-raya-muted md:text-[20px]">
            Campus visit and schedule-a-call options are available through the
            admissions inquiry form.
            <span className="block">Admin can download admission data from the Excel link.</span>
          </p>
        </div>
        <a
          aria-label="googleMap"
          className="relative block aspect-square overflow-hidden bg-raya-line"
          href="https://www.google.com/maps/place/The+School+of+Raya/"
        >
          <img
            alt="Map Mobile"
            className="h-full w-full object-cover"
            src="/assets/optimized/location-map.jpg"
          />
          <img
            alt="Map Pin"
            className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
            src="/assets/optimized/map-pin.webp"
          />
        </a>
      </div>
    </section>
  );
}
