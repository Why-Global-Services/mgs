export function Testimonials() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.95fr_0.7fr] md:items-center">
        <div>
          <h3 className="text-[38px] font-semibold leading-tight md:text-[58px]">
            Head of School Message
          </h3>
          <p className="mt-8 text-[25px] font-semibold leading-[1.35] md:text-[34px]">
            "Education goes beyond textbooks. Our approach is rooted in inquiry,
            creativity, and critical thinking."
          </p>
          <p className="mt-7 text-[17px] leading-[1.65] text-raya-muted md:text-[20px]">
            We aim to foster internationally minded learners who are
            compassionate, responsible, and open to diverse perspectives. Our
            educators support each student's academic, social, and emotional
            growth.
          </p>
          <p className="mt-7 font-semibold">Anitha Shanu - Head of School</p>
        </div>
        <img
          alt="Maharishi Global School learning community"
          className="aspect-square w-full object-cover"
          src="/assets/optimized/head-school.jpg"
        />
      </div>
    </section>
  );
}
