import { arrowIcon, eventImages } from "./data";

export function EventsSection() {
  return (
    <section className="overflow-hidden px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:px-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative -mx-5 sm:-mx-8 md:-mx-10 lg:-mx-10">
          <div className="flex w-max animate-[marquee_44s_linear_infinite] gap-3 hover:[animation-play-state:paused] sm:gap-4">
            {[...eventImages, ...eventImages].map((image, index) => (
              <img
                alt="Index Events"
                className="h-[168px] w-[210px] rounded-[14px] object-cover shadow-[0_16px_36px_rgba(0,78,100,0.14)] sm:h-[210px] sm:w-[250px] md:h-[260px] md:w-[300px]"
                key={`${image}-${index}`}
                loading="lazy"
                src={image}
              />
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-start">
          <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1]">
            Learning Beyond Curriculum
          </h3>
          <div>
            <p className="text-[18px] leading-[1.6] text-raya-muted md:text-[21px]">
              MGS extends learning through extra-curricular activities, clubs,
              CAS, outreach activities, newsletters, podcasts, and programme-wise
              events that make learning visible.
            </p>
            <a className="mt-8 inline-flex items-center gap-3 font-semibold" href="#">
              More Details
              <img alt="" className="h-[14px] w-[18px]" src={arrowIcon} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
