"use client";

import { createCardFlow, useGSAPScope, gsap } from "../lib/motion";
import { homepageImages } from "../lib/images";

export function LifeAtSchool() {
  const sectionRef = useGSAPScope<HTMLElement>((ctx, isReduced) => {
    if (isReduced) return;

    // 1. Heading line reveal on entering viewport
    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    headTl.fromTo(
      ".life-heading .line-mask-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8 }
    );

    headTl.fromTo(
      ".life-copy",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    headTl.fromTo(
      ".life-cta",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    createCardFlow({
      root: sectionRef.current,
      cardSelector: ".life-card",
      imageSelector: ".life-card-img",
      motions: [
        { x: -164, y: -98, rotation: -8.5, scale: 0.76, zIndex: 4 },
        { x: -78, y: 110, rotation: 6.8, scale: 0.82, zIndex: 2 },
        { x: 38, y: -122, rotation: -5.6, scale: 0.8, zIndex: 5 },
        { x: 142, y: 82, rotation: 7.4, scale: 0.76, zIndex: 1 },
        { x: -130, y: 32, rotation: -4.8, scale: 0.84, zIndex: 3 },
        { x: 154, y: -38, rotation: 5.4, scale: 0.8, zIndex: 6 },
      ],
      start: "top 93%",
      end: "top 8%",
      stagger: 0.2,
      reveal: true,
      isReduced,
    });
  }, []);

  const cards = [
    {
      title: "Library &\nReading Culture",
      image: homepageImages.lifeLibrary.src,
      alt: homepageImages.lifeLibrary.alt,
    },
    {
      title: "Practical\nLearning",
      image: homepageImages.lifePractical.src,
      alt: homepageImages.lifePractical.alt,
    },
    {
      title: "Sports\nActivities",
      image: homepageImages.lifeSports.src,
      alt: homepageImages.lifeSports.alt,
    },
    {
      title: "Music &\nPerformance",
      image: homepageImages.lifeMusic.src,
      alt: homepageImages.lifeMusic.alt,
    },
    {
      title: "Design &\nInnovation",
      image: homepageImages.lifeDesign.src,
      alt: homepageImages.lifeDesign.alt,
    },
    {
      title: "Leadership &\nCollaboration",
      image: homepageImages.lifeLeadership.src,
      alt: homepageImages.lifeLeadership.alt,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 lg:py-24"
      id="life-at-mgs"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-14">
          {/* ============================================================ */}
          {/* LEFT COLUMN: EDITORIAL COPY & CTA                           */}
          {/* ============================================================ */}
          <div className="max-w-[360px]">
            <h2 className="life-heading font-serif text-[34px] sm:text-[42px] lg:text-[46px] font-bold text-[#072338]">
              <span className="line-mask">
                <span className="line-mask-inner">Life at MGS</span>
              </span>
            </h2>
            <div className="my-4 h-[2px] w-12 bg-[#c59139]" />
            <p className="life-copy text-[15px] sm:text-[16px] leading-[1.7] text-[#2d4756]">
              A vibrant campus life with endless opportunities to explore, create and grow.
            </p>
            <div className="life-cta mt-7">
              <a
                href="/events-and-gallery"
                className="btn-editorial group inline-flex items-center gap-2 rounded-sm border border-[#c59139] bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#072338] shadow-2xs hover:bg-[#c59139] hover:text-white"
              >
                <span>Events &amp; Gallery</span>
                <span className="btn-arrow font-sans">→</span>
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: SCROLL-REVEALED EDITORIAL PHOTO COLLAGE       */}
          {/* ============================================================ */}
          <div className="relative isolate grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
            {cards.map((card) => (
              <div key={card.title} className="life-card group relative flex h-full flex-col">
                <div className="life-card-img-wrapper relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                  <img
                    src={card.image}
                    alt={card.alt || card.title.replace("\n", " ")}
                    className="life-card-img h-full w-full object-cover object-center will-change-transform"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 text-center text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#072338] transition-colors duration-200 group-hover:text-[#c59139] whitespace-pre-line">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
