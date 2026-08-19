import { AdmissionsForm } from "./components/AdmissionsForm";
import { AcademicPrograms } from "./components/AcademicPrograms";
import { EventsSection } from "./components/EventsSection";
import { Footer } from "./components/Footer";
import { HeroSlider } from "./components/HeroSlider";
import { LifeAtSchool } from "./components/LifeAtSchool";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-raya-cream text-raya-ink">
      <Navbar />
      <HeroSlider />
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_16%_12%,rgba(255,183,3,0.22),transparent_28%),radial-gradient(circle_at_82%_82%,rgba(0,168,204,0.2),transparent_32%),linear-gradient(135deg,#ffffff_0%,#effffc_48%,#fff7df_100%)] px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:px-10">
        <div className="absolute left-[-80px] top-10 h-48 w-48 rounded-full border-[28px] border-raya-sky/10" />
        <div className="absolute bottom-[-90px] right-[-50px] h-64 w-64 rounded-full bg-raya-gold/18 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center xl:gap-12">
          <div className="flex h-full flex-col justify-center rounded-[28px] bg-raya-navy p-6 text-white shadow-[0_28px_80px_rgba(0,78,100,0.22)] md:p-8 xl:p-10">
            <p className="text-[12px] font-black uppercase tracking-wider text-raya-gold sm:text-[13px]">
              Maharishi Global School
            </p>
            <h2 className="mt-3 text-[32px] font-black leading-[1.08] sm:text-[38px] md:text-[46px] lg:text-[48px]">
              World-class pathways, built around confident learners.
            </h2>
            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 md:gap-4">
              {["IB", "Cambridge", "Grade 7"].map((item) => (
                <div
                  className="min-w-0 rounded-[16px] border border-white/18 bg-white/10 p-3 sm:p-4"
                  key={item}
                >
                  <span className="block max-w-full break-words text-[18px] font-black leading-tight text-raya-gold sm:text-[20px] lg:text-[22px]">
                    {item}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-white/70 sm:mt-1.5 sm:text-[11px]">
                    Learning Route
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 xl:gap-5">
            <article className="rounded-[24px] border border-raya-line bg-white/82 p-5 shadow-[0_18px_48px_rgba(0,78,100,0.1)] backdrop-blur md:p-6 lg:p-7">
              <p className="text-[17px] leading-[1.65] text-raya-muted md:text-[19px] lg:text-[20px]">
                At Maharishi Global School, world-class learning experiences come
                together through the globally respected International
                Baccalaureate and Cambridge pathways.
              </p>
            </article>
            <article className="rounded-[24px] border border-raya-line bg-white/82 p-5 shadow-[0_18px_48px_rgba(0,78,100,0.1)] backdrop-blur md:p-6 lg:p-7">
              <p className="text-[16px] leading-[1.7] text-raya-muted md:text-[18px] lg:text-[19px]">
                Our vision is to nurture curious and ethically responsible
                lifelong learners who demonstrate intercultural understanding,
                principled leadership, and global responsibility.
              </p>
            </article>
            {/* <article className="rounded-[24px] bg-[linear-gradient(135deg,#ffb703_0%,#ff4d6d_100%)] p-5 text-white shadow-[0_22px_54px_rgba(255,77,109,0.18)] md:p-6 lg:p-7">
              <p className="text-[18px] font-bold leading-[1.55] md:text-[20px] lg:text-[22px]">
                This is education shaped by inquiry, reflection, inner stability,
                clear thinking, and purposeful action.
              </p>
              <h2 className="mt-4 text-[22px] font-black leading-tight md:text-[28px] lg:mt-5 lg:text-[30px]">
                This is Maharishi Global School.
              </h2>
            </article> */}
          </div>
        </div>
      </section>
      <AcademicPrograms />
      <LifeAtSchool />
      <EventsSection />
      <AdmissionsForm />
      <Footer />
    </main>
  );
}
