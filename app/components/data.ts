export const arrowIcon = "/assets/optimized/arrow.png";
export const zipAsset = (name: string) => `/assets/zip-webp/${name}.webp`;

export const menuSections = [
  {
    title: "About Us",
    links: [
      { label: "MGS at a glance", href: "/mgs-at-a-glance" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Board of Governors", href: "/board-of-governors" },
      { label: "Head of School", href: "/head-of-school" },
      { label: "Logo Interpretation", href: "/logo-interpretation" },
    ],
  },
  {
    title: "Curriculum",
    links: [
      { label: "Early Years Programme", href: "/early-years-programme" },
      { label: "Primary Years Programme (PYP)", href: "/primary-years-programme" },
      { label: "Middle Years Programme (MYP)", href: "/middle-years-programme" },
      { label: "Diploma Programme (DP)", href: "/diploma-programme" },
      { label: "CBSE", href: "/cbse" },
      { label: "Cambridge", href: "/cambridge" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Process", href: "/admission-process" },
      { label: "Book Campus Visit", href: "/book-campus-visit" },
      { label: "Schedule a Call", href: "/schedule-a-call" },
    ],
  },
];

export const heroSlides = [
  {
    src: "/assets/hero-students-campus.jpg",
    imageClass: "object-cover object-top",
  },
  {
    src: zipAsset("main-image"),
    imageClass: "object-cover object-center",
  },
  {
    src: zipAsset("global-desk"),
    imageClass: "object-cover object-center",
  },
  {
    src: zipAsset("stem-learning"),
    imageClass: "object-cover object-center",
  },
  {
    src: zipAsset("story-nook"),
    imageClass: "object-cover object-center",
  },
];


export const programs = [
  {
    title: "IB Pathway",
    image: zipAsset("global-desk"),
    body: [
      "Maharishi Global School introduces internationally respected IB learning through Early Years, PYP, MYP, and DP pathways.",
      "The IB approach develops inquiring, knowledgeable, and caring learners through inquiry, reflection, student agency, and global responsibility.",
    ],
  },
  {
    title: "Cambridge Pathway",
    image: zipAsset("thinkers-haven"),
    body: [
      "The Cambridge pathway supports learners through Cambridge Primary, Lower Secondary, IGCSE, and AS & A Levels.",
      "Students build strong academic foundations, critical thinking, research skills, communication, and readiness for universities worldwide.",
    ],
  },
];


export const lifeCards = [
  {
    title: "Internationally Recognized Curriculum",
    image: zipAsset("global-desk"),
    body: "IB and Cambridge pathways prepare students for top universities, global careers, and lifelong learning.",
  },
  {
    title: "Inquiry-Based Learning",
    image: zipAsset("innovation-forge"),
    body: "Learning encourages curiosity and wonder, allowing students to ask questions, investigate, and build their own understanding.",
  },
  {
    title: "Holistic Development",
    image: zipAsset("melody-makers"),
    body: "MGS focuses on academics, leadership, arts, sports, life skills, inner calm, focus, and self-awareness.",
  },
  {
    title: "Future-Ready Education",
    image: zipAsset("tech-park"),
    body: "Communication, research, collaboration, problem-solving, principled leadership, and purposeful action prepare students for tomorrow.",
  },
];

export const eventImages = [
  zipAsset("champion-court"),
  zipAsset("champion"),
  zipAsset("choroegraphy-zone"),
  zipAsset("design-hive"),
  zipAsset("language-hub"),
  zipAsset("markers-den"),
  zipAsset("sketch-spot"),
  zipAsset("reading-stage"),
  zipAsset("reading"),
  zipAsset("start-up"),
  zipAsset("ted"),
  zipAsset("stem-learning"),
];
