export function SocialSection() {
  const socials = ["facebook", "instagram", "linkedin"];

  return (
    <section className="px-6 py-16 text-center md:px-10 md:py-24">
      <div className="mx-auto max-w-[820px]">
        <h2 className="text-[44px] font-semibold leading-none md:text-[78px]">
          Connect with MGS
        </h2>
        <p className="mx-auto mt-8 max-w-[520px] text-[18px] leading-[1.55] text-raya-muted md:text-[22px]">
          Stay connected with Maharishi Global School updates, events,
          admissions, and learning stories.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {socials.map((social) => (
            <a
              className="inline-flex min-h-10 min-w-[210px] items-center justify-center rounded-full border-2 border-raya-ink px-7 text-xs font-extrabold uppercase transition hover:-translate-y-px hover:bg-raya-ink hover:text-raya-cream"
              href="#"
              key={social}
            >
              follow us on {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
