import { notFound } from "next/navigation";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { zipAsset } from "../components/data";
import { contentPages, getPage } from "../content/navigation";
import { infoPages } from "../content/pages";

type PageProps = { params: Promise<{ slug: string[] }> };
export const dynamic = "force-static";
export const dynamicParams = false;

const pageImages: Record<string, string> = {
  "/about-us/vision-mission": zipAsset("maharisi-ji"),
  "/about-us/leadership": zipAsset("girl-with-book"),
  "/programmes/primary-years-programme": zipAsset("story-nook-2"),
  "/programmes/middle-years-programme": zipAsset("group-of-student"),
  "/programmes/diploma-programme": zipAsset("thinkers-haven"),
  "/programmes/cambridge": zipAsset("global-desk"),
  "/programmes/cbse": zipAsset("girl-with-book"),
  "/programmes/ib-curriculum": zipAsset("stem-learning"),
  "/programmes/career-related-programme": zipAsset("innovation-forge"),
  "/programmes/student-support-services": zipAsset("melody-makers"),
  "/programmes/library": zipAsset("story-nook"),
};

/** Derive a pages.ts key from a navigation page's path or its legacyPaths. */
function getInfoPageKey(pagePath: string, legacyPaths?: string[]): string | undefined {
  // Try last segment of the canonical path first (e.g. "primary-years-programme")
  const lastSegment = pagePath.split("/").filter(Boolean).at(-1);
  if (lastSegment && infoPages[lastSegment]) return lastSegment;

  // Try each legacy path's last segment (e.g. "/primary-years-programme" → "primary-years-programme")
  for (const lp of legacyPaths ?? []) {
    const lpSegment = lp.split("/").filter(Boolean).at(-1);
    if (lpSegment && infoPages[lpSegment]) return lpSegment;
  }
  return undefined;
}

export function generateStaticParams() {
  return contentPages.flatMap((page) => [page.path, ...(page.legacyPaths ?? [])])
    .map((path) => ({ slug: path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = (await params) || {};
  if (!slug || !Array.isArray(slug)) return {};
  const page = getPage(`/${slug.join("/")}`);
  return page ? { title: `${page.title} | Maharishi Global School` } : {};
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = (await params) || {};
  if (!slug || !Array.isArray(slug)) notFound();
  const page = getPage(`/${slug.join("/")}`);
  if (!page) notFound();
  const image = pageImages[page.path] ?? zipAsset("main-image");

  // Prefer navigation.ts sections; fall back to pages.ts content when absent.
  const hasSections = page.sections && page.sections.length > 0;
  const infoKey = !hasSections ? getInfoPageKey(page.path, page.legacyPaths) : undefined;
  const infoPage = infoKey ? infoPages[infoKey] : undefined;

  // Normalise to a unified section shape for rendering
  type RenderSection = { heading?: string; paragraphs?: string[]; bullets?: string[] };
  const sections: RenderSection[] = hasSections
    ? (page.sections ?? [])
    : infoPage
    ? [
        ...(infoPage.intro ? [{ heading: undefined, paragraphs: [infoPage.intro] }] : []),
        ...infoPage.sections.map((s) => ({ heading: s.heading, paragraphs: s.body })),
      ]
    : [];

  return <main className="min-h-screen overflow-x-hidden bg-raya-cream text-raya-ink">
    <Navbar />
    <section className="overflow-hidden bg-[radial-gradient(circle_at_80%_10%,rgba(255,183,3,0.3),transparent_30%),radial-gradient(circle_at_14%_28%,rgba(0,168,204,0.18),transparent_32%),linear-gradient(145deg,#fffaf0_0%,#dff7f3_55%,#f2fbff_100%)] px-5 pb-12 pt-[120px] sm:px-8 sm:pt-[134px] md:px-10 md:pb-16 md:pt-[146px] lg:px-10 lg:pb-20 lg:pt-[170px]">
      <div className="mx-auto grid w-full max-w-[1280px] gap-7 lg:grid-cols-[1.1fr_1fr] lg:items-end xl:gap-12">
        <div className="min-w-0">
          {infoPage?.eyebrow && (
            <p className="mb-3 text-[12px] font-black uppercase tracking-wider text-raya-gold sm:text-[13px]">
              {infoPage.eyebrow}
            </p>
          )}
          <h1 className="max-w-[900px] text-[clamp(2.1rem,8vw,5.1rem)] font-black leading-[1.02] text-raya-navy">{page.title}</h1>
        </div>
        <div className="relative min-w-0 overflow-hidden rounded-[22px] bg-raya-navy shadow-[0_20px_58px_rgba(0,78,100,0.18)] sm:rounded-[28px] lg:rounded-[30px]"><img alt="" className="aspect-[1.25] w-full object-cover sm:aspect-[1.45] lg:aspect-[1.18]" src={image} /></div>
      </div>
    </section>
    <section className="min-h-[240px] overflow-hidden bg-white px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6">
        {sections.length === 0 && (
          <p className="text-[17px] leading-[1.7] text-raya-muted">
            Content for this page is coming soon.
          </p>
        )}
        {sections.map((section, index) => (
          <article
            className="min-w-0 rounded-[20px] border border-raya-line bg-raya-cream/70 p-5 shadow-[0_18px_45px_rgba(0,78,100,0.08)] md:grid md:grid-cols-[0.38fr_1fr] md:gap-8 md:p-7"
            key={`${section.heading ?? ""}-${index}`}
          >
            {section.heading ? (
              <h2 className="text-[22px] font-black leading-tight text-raya-forest sm:text-[24px] lg:text-[26px]">
                {section.heading}
              </h2>
            ) : <div />}
            <div className="grid gap-4 md:mt-0">
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p className="whitespace-pre-line text-[16px] leading-[1.7] text-raya-muted md:text-[18px] lg:text-[19px]" key={paragraphIndex}>
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="grid list-disc gap-3 pl-5 text-[16px] leading-[1.7] text-raya-muted marker:text-raya-sky md:text-[18px]">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
    <Footer />
  </main>;
}
