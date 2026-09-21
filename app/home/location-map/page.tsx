import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { schoolContact } from "../../content/contact";

export const metadata = {
  title: "Location Map | Maharishi Global School",
  description:
    "Find Maharishi Global School at Aishwarya Nagar, Ayanambakkam, Chennai 600 095. View our live campus location on Google Maps.",
};

export default function LocationMapPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-raya-cream text-raya-ink">
      <Navbar />

      {/* ── Hero banner ───────────────────────────────────────── */}
      <section className="overflow-hidden bg-[radial-gradient(circle_at_80%_10%,rgba(255,183,3,0.3),transparent_30%),radial-gradient(circle_at_14%_28%,rgba(0,168,204,0.18),transparent_32%),linear-gradient(145deg,#fffaf0_0%,#dff7f3_55%,#f2fbff_100%)] px-5 pb-10 pt-[120px] sm:px-8 sm:pt-[134px] md:px-10 md:pb-14 md:pt-[146px] lg:px-10 lg:pb-16 lg:pt-[170px]">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-3 text-[12px] font-black uppercase tracking-wider text-raya-gold sm:text-[13px]">
            Our Campus
          </p>
          <h1 className="max-w-[760px] text-[clamp(2.1rem,7vw,4.4rem)] font-black leading-[1.02] text-raya-navy">
            Location Map
          </h1>
        </div>
      </section>

      {/* ── Address + Map ─────────────────────────────────────── */}
      <section className="bg-white px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">

          {/* Address card */}
          <div className="rounded-[24px] border border-raya-line bg-raya-cream/70 p-8 shadow-[0_18px_45px_rgba(0,78,100,0.08)]">
            <h2 className="text-[22px] font-black text-raya-forest sm:text-[26px]">
              Find Us Here
            </h2>
            <address className="mt-6 not-italic text-[17px] leading-[2] text-raya-muted">
              <span className="block text-[19px] font-bold text-raya-ink">
                {schoolContact.name}
              </span>
              {schoolContact.addressLines.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </address>

            <div className="mt-8 flex flex-col gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-raya-gold px-6 py-3 text-[15px] font-bold text-raya-ink shadow transition hover:bg-raya-forest hover:text-white"
                href={schoolContact.googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open in Google Maps ↗
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-raya-line px-6 py-3 text-[15px] font-semibold text-raya-muted transition hover:border-raya-gold hover:text-raya-ink"
                href="/#admissions"
              >
                Book a campus visit
              </a>
            </div>
          </div>

          {/* Live map */}
          <div className="overflow-hidden rounded-[24px] shadow-[0_20px_58px_rgba(0,78,100,0.15)]">
            <iframe
              allowFullScreen
              className="h-[420px] w-full sm:h-[500px] lg:h-[560px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={schoolContact.googleMapsEmbed}
              title="Maharishi Global School Location Map"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
