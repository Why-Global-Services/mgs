import { programs } from "./data";

export function AcademicPrograms() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#e9fbf8_100%)] px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:px-10" id="programmes">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="mb-10 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] text-raya-forest md:mb-14">
          Programmes Offered
        </h2>
        <div className="grid gap-10 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-5">
          {programs.map((program) => (
            <article
              className="group rounded-[18px] border border-raya-sky/18 bg-white p-3 shadow-[0_22px_58px_rgba(0,78,100,0.1)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,168,204,0.2)]"
              key={program.title}
            >
              <div className="aspect-[1.45] overflow-hidden rounded-[14px] bg-raya-line sm:aspect-[1.53]">
                <img
                  alt={program.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  src={program.image}
                />
              </div>
              <h3 className="mt-6 text-[22px] font-semibold leading-tight text-raya-forest md:mt-7 md:text-[25px]">
                {program.title}
              </h3>
              {program.body.map((text) => (
                <p
                  className="mt-5 text-justify text-[16px] leading-[1.5] text-raya-muted md:text-[18px]"
                  key={text}
                >
                  {text}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
