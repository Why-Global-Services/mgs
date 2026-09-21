import { schoolContact } from "../content/contact";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#071d2b] text-white"
      id="contact"
    >
      <div className="relative mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.1fr_1.1fr_320px] lg:gap-8 xl:gap-12">
          {/* Col 1: School Identity & Logo */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <img
                alt="Maharishi Global School Logo"
                className="h-16 w-16 shrink-0 rounded-full bg-white/95 p-1 ring-2 ring-[#c48f3b]/60 sm:h-20 sm:w-20"
                src="/assets/optimized/maharishi-logo-transparent.png"
              />
              <div>
                <h3 className="font-serif text-[18px] font-bold uppercase tracking-wider text-white sm:text-[20px]">
                  Maharishi <br />
                  <span className="text-[#c48f3b]">Global School</span>
                </h3>
              </div>
            </div>
            <p className="mt-5 text-[11px] font-black uppercase tracking-[0.16em] text-[#c48f3b]">
              Enroll Today For a Brighter Future!
            </p>
            <p className="mt-6 text-xs text-white/50">
              © {new Date().getFullYear()} Maharishi Global School. <br />
              All rights reserved.
            </p>
          </div>

          {/* Col 2: Campus Address */}
          <div>
            <h4 className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#c48f3b]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Campus Address
            </h4>
            <address className="mt-4 not-italic text-[14px] leading-[1.8] text-white/80">
              <span className="block font-semibold text-white">
                {schoolContact.name}
              </span>
              {schoolContact.addressLines.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </address>
            <a
              href="/home/location-map"
              className="mt-4 inline-block text-[12px] font-bold text-[#c48f3b] hover:underline"
            >
              View Location Details →
            </a>
          </div>

          {/* Col 3: Contact & Numbers */}
          <div>
            <h4 className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#c48f3b]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </h4>
            <a
              href={`mailto:${schoolContact.email}`}
              className="mt-4 block text-[14px] text-white/80 transition hover:text-[#c48f3b]"
            >
              {schoolContact.email}
            </a>

            <div className="mt-5 space-y-1 text-[15px] font-bold tracking-wide text-white">
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#c48f3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                99944 99850
              </p>
              <p className="pl-6 text-white/90">99944 99851</p>
            </div>

            <div className="mt-5 flex gap-3 text-[13px] text-white/60">
              <a href="#" className="hover:text-[#c48f3b]">Facebook</a>
              <span>•</span>
              <a href="#" className="hover:text-[#c48f3b]">LinkedIn</a>
              <span>•</span>
              <a href="#" className="hover:text-[#c48f3b]">Instagram</a>
            </div>
          </div>

          {/* Col 4: Live Google Map Box */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#c48f3b]">
              Location Map
            </h4>
            <div className="overflow-hidden rounded-lg border border-white/15 shadow-md">
              <iframe
                allowFullScreen
                className="h-[180px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={schoolContact.googleMapsEmbed}
                title="Maharishi Global School Location Map"
              />
            </div>
            <a
              href={schoolContact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[11px] font-semibold text-white/50 transition hover:text-[#c48f3b]"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
