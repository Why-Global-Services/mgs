export type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type NavigationPage = {
  title: string;
  path: string;
  legacyPaths?: string[];
  sections?: ContentSection[];
};

export type NavigationItem = NavigationPage & { children?: NavigationPage[] };

// Faithful transcription of the supplied website plan. Pages without sections
// deliberately have no body copy: the document supplies only their labels.
export const navigation: NavigationItem[] = [
  { title: "Home", path: "/", children: [
    { title: "Brief about MGS", path: "/home/brief-about-mgs", legacyPaths: ["/mgs-at-a-glance"] },
    { title: "Location Map", path: "/home/location-map" },
    { title: "Why MGS", path: "/home/why-mgs" },
  ] },
  { title: "About us", path: "/about-us", children: [
    { title: "Evolving Campus", path: "/about-us/evolving-campus", legacyPaths: ["/logo-interpretation"] },
    { title: "Vision & Mission", path: "/about-us/vision-mission", legacyPaths: ["/vision-mission"], sections: [
      { heading: "School’s Vision", paragraphs: ["MGS Vision Statement", "Nurture curious and ethically responsible lifelong learners who demonstrate intercultural understanding, principled leadership, and global responsibility by cultivating inner stability, clear thinking, and purposeful action, empowering them to contribute to a harmonious and sustainable world."] },
      { heading: "MGS Mission Statement", bullets: ["Provide a safe, inclusive, and intellectually stimulating learning environment grounded in inquiry and reflection.", "Foster curiosity, international mindedness, and respect for diverse perspectives and cultures.", "Develop knowledgeable, principled, and reflective learners who think critically and act with integrity.", "Cultivate inner calm, focus, and self-awareness through regular reflection, leading to responsible contributions toward a peaceful and sustainable world."] },
    ] },
    { title: "Leadership", path: "/about-us/leadership", legacyPaths: ["/board-of-governors", "/head-of-school"], sections: [
      { heading: "PMR, Chairman", paragraphs: ["Also the message (larger space for the Chairman’s message)"] },
      { heading: "Ms. Anitha, Principal", paragraphs: ["Image and link to click at to read brief profile"] },
      { heading: "Leadership", paragraphs: ["Dear Parents, Students, and Well-Wishers,", "It is with great pride and enthusiasm that I welcome you to our new International Baccalaureate (IB) School. As the Head of this institution, I am honored to be part of a learning community that is committed to nurturing young minds and shaping future global citizens.", "At our school, we believe that education goes beyond textbooks. Our approach is rooted in inquiry, creativity, and critical thinking, encouraging students to ask questions, explore ideas, and develop a lifelong love for learning. Through the IB philosophy, we aim to foster internationally minded learners who are compassionate, responsible, and open to diverse perspectives.", "We are dedicated to providing a safe, inclusive, and stimulating environment where every child feels valued and empowered. Our experienced educators work collaboratively to support each student’s academic, social, and emotional growth, ensuring a holistic development.", "As we begin this exciting journey, we look forward to building strong partnerships with parents and the wider community. Together, we will inspire our learners to achieve excellence and make meaningful contributions to the world.", "Let us work hand in hand to create a future filled with knowledge, integrity, and innovation.", "Warm regards,\nAnitha Shanu\nHead of School"] },
      { heading: "Programme Coordinators", paragraphs: ["IBPYP Coordinator: Brief profile with a pic", "IBMYP Coordinator: Brief profile with a pic", "IBCP Coordinator: Brief profile with a pic", "Cambridge Coordinator"] },
    ] },
    { title: "Faculty", path: "/about-us/faculty" }, { title: "Infrastructure", path: "/about-us/infrastructure" }, { title: "Awards & Honours", path: "/about-us/awards-honours" }, { title: "Testimonials", path: "/about-us/testimonials" },
  ] },
  { title: "Programmes", path: "/programmes", children: [
    { title: "IB Curriculum ( Sub division )", path: "/programmes/ib-curriculum", legacyPaths: ["/early-years-programme"] }, { title: "The Primary Years Programme (PYP)", path: "/programmes/primary-years-programme", legacyPaths: ["/primary-years-programme"] }, { title: "The Middle Years Programme (MYP)", path: "/programmes/middle-years-programme", legacyPaths: ["/middle-years-programme"] }, { title: "The Diploma Programme (DP)", path: "/programmes/diploma-programme", legacyPaths: ["/diploma-programme"] }, { title: "The Career-related Programme (IBCP)", path: "/programmes/career-related-programme" }, { title: "Cambridge", path: "/programmes/cambridge", legacyPaths: ["/cambridge"] }, { title: "CBSE", path: "/programmes/cbse", legacyPaths: ["/cbse"] }, { title: "Student Support Services", path: "/programmes/student-support-services" }, { title: "Library", path: "/programmes/library" },
  ] },
  { title: "Admissions", path: "/admissions", children: [
    { title: "Apply Now", path: "/admissions/apply-now" }, { title: "Schedule a Tour", path: "/admissions/schedule-a-tour", legacyPaths: ["/book-campus-visit", "/schedule-a-call"] }, { title: "Admissions Process", path: "/admissions/admissions-process", legacyPaths: ["/admission-process"] }, { title: "Fee Structure", path: "/admissions/fee-structure" }, { title: "Scholarship", path: "/admissions/scholarship" }, { title: "Transport Facility", path: "/admissions/transport-facility" }, { title: "Admissions FAQ", path: "/admissions/admissions-faq" },
  ] },
  { title: "what Make us differences", path: "/what-make-us-differences", children: [
    { title: "The Arts", path: "/what-make-us-differences/the-arts" }, { title: "Technology", path: "/what-make-us-differences/technology" }, { title: "Sports", path: "/what-make-us-differences/sports" }, { title: "Maker Space", path: "/what-make-us-differences/maker-space" }, { title: "After School Activities", path: "/what-make-us-differences/after-school-activities" }, { title: "Extended Music Programme", path: "/what-make-us-differences/extended-music-programme" }, { title: "Social Emotional Learning", path: "/what-make-us-differences/social-emotional-learning" }, { title: "Primary School Trips", path: "/what-make-us-differences/primary-school-trips" }, { title: "Secondary School Trips", path: "/what-make-us-differences/secondary-school-trips" }, { title: "Community services", path: "/what-make-us-differences/community-services" }, { title: "Sustainability at MGS", path: "/what-make-us-differences/sustainability-at-mgs" },
  ] },
  { title: "University career counselling", path: "/university-career-counselling" },
  { title: "Events and Gallery", path: "/events-and-gallery", children: [{ title: "Programme-wise", path: "/events-and-gallery/programme-wise" }] },
  { title: "Career", path: "/career", children: [{ title: "Opportunities", path: "/career/opportunities" }, { title: "Work life at MGS", path: "/career/work-life-at-mgs" }] },
];

export const contentPages = navigation.flatMap((item) => item.children ?? (item.path === "/" ? [] : [item]));
export function getPage(path: string) { return contentPages.find((page) => page.path === path || page.legacyPaths?.includes(path)); }
