import { notFound } from "next/navigation";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { zipAsset } from "../components/data";
import { infoPages, pageSlugs } from "../content/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

const pageImages: Record<string, string> = {
  "mgs-at-a-glance": zipAsset("group-of-student"),
  "vision-mission": zipAsset("maharisi-ji"),
  "board-of-governors": zipAsset("global-desk"),
  "head-of-school": zipAsset("girl-with-book"),
  "logo-interpretation": zipAsset("maharishi-ji-3"),
  "early-years-programme": zipAsset("story-nook"),
  "primary-years-programme": zipAsset("story-nook-2"),
  "middle-years-programme": zipAsset("thinkers-haven"),
  "diploma-programme": zipAsset("ted"),
  cbse: zipAsset("reading"),
  cambridge: zipAsset("language-hub"),
  "admission-process": zipAsset("main-image"),
  "book-campus-visit": zipAsset("champion-court"),
  "schedule-a-call": zipAsset("global-desk"),
};

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = infoPages[slug];

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | Maharishi Global School`,
    description: page.intro,
  };
}

export default async function InfoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = infoPages[slug];

  if (!page) {
    notFound();
  }

  const image = pageImages[slug] || zipAsset("main-image");

  return (
    <main className="min-h-screen overflow-x-hidden bg-raya-cream text-raya-ink">
      <Navbar />
      <section className="overflow-hidden bg-[radial-gradient(circle_at_80%_10%,rgba(255,183,3,0.3),transparent_30%),radial-gradient(circle_at_14%_28%,rgba(0,168,204,0.18),transparent_32%),linear-gradient(145deg,#fffaf0_0%,#dff7f3_55%,#f2fbff_100%)] px-5 pb-12 pt-[120px] sm:px-8 sm:pt-[134px] md:px-10 md:pb-16 md:pt-[146px] lg:px-10 lg:pb-20 lg:pt-[170px]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[1.1fr_1fr] lg:items-end xl:gap-12">
          <div className="min-w-0">
            <p className="text-[13px] font-black uppercase text-raya-gold">
              {page.eyebrow}
            </p>
            <h1 className="mt-3 max-w-[900px] text-[clamp(2.1rem,8vw,5.1rem)] font-black leading-[1.02] text-raya-navy">
              {page.title}
            </h1>
            <p className="mt-5 max-w-[780px] text-[16px] leading-[1.65] text-raya-muted sm:text-[18px] md:mt-7 md:text-[21px] lg:text-[23px]">
              {page.intro}
            </p>
            {slug === "admission-process" ? (
              <a
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-raya-gold px-6 text-[12px] font-black uppercase text-raya-ink shadow-[0_16px_34px_rgba(255,183,3,0.24)] transition hover:-translate-y-px hover:bg-raya-wine hover:text-white"
                download
                href="/assets/mgs-brochure.pdf"
              >
                Download Brochure
              </a>
            ) : null}
          </div>
          <div className="relative min-w-0 overflow-hidden rounded-[22px] bg-raya-navy shadow-[0_20px_58px_rgba(0,78,100,0.18)] ring-1 ring-raya-sky/20 sm:rounded-[28px] lg:rounded-[30px] lg:shadow-[0_28px_80px_rgba(0,78,100,0.22)]">
            <img
              alt={page.title}
              className="aspect-[1.25] h-full w-full object-cover sm:aspect-[1.45] lg:aspect-[1.18]"
              loading="eager"
              src={image}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(7,48,66,0.55)_100%)]" />
            <span className="absolute bottom-5 left-5 rounded-full bg-raya-gold px-4 py-2 text-xs font-black uppercase text-raya-ink">
              MGS
            </span>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-white px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1280px] gap-6">
          {page.sections.map((section) => (
            <article
              className="min-w-0 rounded-[20px] border border-raya-line bg-raya-cream/70 p-5 shadow-[0_18px_45px_rgba(0,78,100,0.08)] md:grid md:grid-cols-[0.38fr_1fr] md:gap-8 md:p-7 lg:grid-cols-[0.42fr_1fr] lg:gap-10 lg:p-8"
              key={section.heading}
            >
              <h2 className="text-[22px] font-black leading-tight text-raya-forest sm:text-[24px] lg:text-[26px]">
                {section.heading}
              </h2>
              <div className="mt-5 grid gap-4 md:mt-0">
                {section.body.map((paragraph) => (
                  <p
                    className="text-[16px] leading-[1.7] text-raya-muted md:text-[18px] lg:text-[19px]"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
