export type InfoPage = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const infoPages: Record<string, InfoPage> = {
  "mgs-at-a-glance": {
    title: "Maharishi Global School at a Glance",
    eyebrow: "About MGS",
    intro:
      "Maharishi Global School brings world-class learning experiences through globally respected International Baccalaureate and Cambridge pathways.",
    sections: [
      {
        heading: "Global education rooted in values",
        body: [
          "MGS empowers young minds with internationally recognized education designed for the leaders of tomorrow.",
          "The school focuses on inquiry-based learning, critical thinking, creativity, holistic development, and responsible action.",
        ],
      },
      {
        heading: "Why MGS",
        body: [
          "Students develop global perspectives while staying rooted in values and culture.",
          "The learning environment is safe, inclusive, intellectually stimulating, and grounded in inquiry and reflection.",
        ],
      },
    ],
  },
  "vision-mission": {
    title: "Vision, Mission & Philosophy",
    eyebrow: "About MGS",
    intro:
      "MGS nurtures curious and ethically responsible lifelong learners who demonstrate intercultural understanding, principled leadership, and global responsibility.",
    sections: [
      {
        heading: "MGS Vision Statement",
        body: [
          "Nurture curious and ethically responsible lifelong learners who demonstrate intercultural understanding, principled leadership, and global responsibility by cultivating inner stability, clear thinking, and purposeful action.",
          "The school empowers learners to contribute to a harmonious and sustainable world.",
        ],
      },
      {
        heading: "MGS Mission Statement",
        body: [
          "Provide a safe, inclusive, and intellectually stimulating learning environment grounded in inquiry and reflection.",
          "Foster curiosity, international mindedness, and respect for diverse perspectives and cultures.",
          "Develop knowledgeable, principled, and reflective learners who think critically and act with integrity.",
          "Cultivate inner calm, focus, and self-awareness through regular reflection.",
        ],
      },
      {
        heading: "IB Mission Statement",
        body: [
          "The International Baccalaureate aims to develop inquiring, knowledgeable and caring young people who help create a better and more peaceful world through intercultural understanding and respect.",
          "IB programmes encourage students to become active, compassionate and lifelong learners who understand that other people, with their differences, can also be right.",
        ],
      },
    ],
  },
  "board-of-governors": {
    title: "Board of Governors",
    eyebrow: "Leadership",
    intro:
      "The MGS leadership vision is shaped by the educational philosophy and core values of the Velammal Group and Maharishi Global School.",
    sections: [
      {
        heading: "Governance philosophy",
        body: [
          "The Board of Governors page is designed for brief introductions, education philosophy, and leadership messages.",
          "The Chairman's message receives dedicated space, while leadership profiles can open as detailed read-more pages.",
        ],
      },
      {
        heading: "Leadership profiles",
        body: [
          "The planned profile structure includes PMR, Chairman; Ms. Anitha, Principal and Head of School; programme coordinators; and administrative leadership.",
          "Coordinator profiles can be added for IB PYP, IB MYP, and IBCP as the school finalizes images and bios.",
        ],
      },
    ],
  },
  "head-of-school": {
    title: "Head of School",
    eyebrow: "Leadership",
    intro:
      "A welcome message from Anitha Shanu, Head of School, for parents, students, and well-wishers.",
    sections: [
      {
        heading: "Welcome message",
        body: [
          "It is with great pride and enthusiasm that I welcome you to our new International Baccalaureate School.",
          "At our school, education goes beyond textbooks. Our approach is rooted in inquiry, creativity, and critical thinking, encouraging students to ask questions, explore ideas, and develop a lifelong love for learning.",
          "Through the IB philosophy, we aim to foster internationally minded learners who are compassionate, responsible, and open to diverse perspectives.",
          "We are dedicated to providing a safe, inclusive, and stimulating environment where every child feels valued and empowered.",
          "Together, we will inspire our learners to achieve excellence and make meaningful contributions to the world.",
        ],
      },
      {
        heading: "Warm regards",
        body: ["Anitha Shanu, Head of School"],
      },
    ],
  },
  "logo-interpretation": {
    title: "Logo & Interpretation",
    eyebrow: "Identity",
    intro:
      "The MGS logo carries the statement 'Knowledge is structured in consciousness' around the school identity.",
    sections: [
      {
        heading: "Knowledge and consciousness",
        body: [
          "The tree at the centre represents rooted growth, wisdom, stability, and the nurturing of learners.",
          "The red circular form expresses continuity, protection, and a complete learning environment.",
          "The green MGS letters reflect growth, balance, and purposeful education.",
        ],
      },
    ],
  },
  "early-years-programme": {
    title: "Early Years Programme",
    eyebrow: "Curriculum",
    intro:
      "The Early Years Programme introduces young learners to inquiry, play, expression, and social-emotional development.",
    sections: [
      {
        heading: "Foundation for inquiry",
        body: [
          "Students begin learning through exploration, imaginative play, real-world connections, and meaningful interactions.",
          "The programme supports curiosity, language development, independence, and confidence within a caring environment.",
        ],
      },
    ],
  },
  "primary-years-programme": {
    title: "Primary Years Programme (PYP)",
    eyebrow: "Curriculum",
    intro:
      "At MGS, the PYP transdisciplinary framework emphasizes holistic development of each student as an inquirer within and beyond the classroom.",
    sections: [
      {
        heading: "Transdisciplinary learning at MGS",
        body: [
          "The curriculum fosters academic, social, and emotional wellbeing while promoting international-mindedness, student agency, and strong personal values.",
          "Students explore local and global issues through six transdisciplinary themes: Who We Are; Where We Are in Place and Time; How We Express Ourselves; How the World Works; How We Organize Ourselves; and Sharing the Planet.",
        ],
      },
      {
        heading: "The learner profile",
        body: [
          "Students engage in thinking, planning, modifying, creating, discussing, questioning, and demonstrating self-directed learning.",
          "They connect experiences to real-world applications, exercise voice and choice, take risks, and reflect on their learning and actions.",
        ],
      },
      {
        heading: "Assessment in the PYP",
        body: [
          "Assessment includes monitoring learning, documenting learning, measuring learning, and reporting learning.",
          "Student-led conferences, progress reports, and portfolios make the learning journey visible for students and parents.",
        ],
      },
    ],
  },
  "middle-years-programme": {
    title: "Middle Years Programme (MYP)",
    eyebrow: "Curriculum",
    intro:
      "The MYP supports self-discovery, conceptual understanding, academic excellence, and personal growth.",
    sections: [
      {
        heading: "Middle years learning",
        body: [
          "Students deepen their understanding across subjects while building research, communication, collaboration, and problem-solving skills.",
          "The programme encourages learners to connect knowledge with real-world contexts and act with integrity.",
        ],
      },
    ],
  },
  "diploma-programme": {
    title: "Diploma Programme (DP)",
    eyebrow: "Curriculum",
    intro:
      "The Diploma Programme prepares learners for higher education and diverse career pathways.",
    sections: [
      {
        heading: "Future-ready pathway",
        body: [
          "The DP provides an enriching and comprehensive educational experience.",
          "Students build higher-order thinking, research habits, communication skills, international-mindedness, and readiness for university life.",
        ],
      },
    ],
  },
  cbse: {
    title: "CBSE",
    eyebrow: "Curriculum",
    intro:
      "The CBSE pathway is part of the planned curriculum structure for Maharishi Global School.",
    sections: [
      {
        heading: "Structured academic foundation",
        body: [
          "The CBSE route supports strong subject foundations, systematic assessment, and readiness for Indian higher education pathways.",
          "Detailed coordinator profiles and programme briefs can be added as the school finalizes the curriculum page.",
        ],
      },
    ],
  },
  cambridge: {
    title: "Cambridge Pathway",
    eyebrow: "Curriculum",
    intro:
      "The Cambridge pathway includes Cambridge Primary, Cambridge Lower Secondary, IGCSE, and AS & A Levels.",
    sections: [
      {
        heading: "Globally respected curriculum",
        body: [
          "Cambridge learning helps students develop global perspectives, critical thinking, communication, research, collaboration, and problem-solving skills.",
          "It prepares students for top universities and global careers while remaining rooted in values and culture.",
        ],
      },
    ],
  },
  "admission-process": {
    title: "Admission Process",
    eyebrow: "Admissions",
    intro:
      "The MGS admission journey helps families understand the school, complete formalities, and prepare students for a smooth start.",
    sections: [
      {
        heading: "Admission steps",
        body: [
          "Book a campus visit or schedule a call.",
          "Purchase the application form and brochure.",
          "Submit primary documents.",
          "Complete assessment and interview.",
          "Sign the school fee policy document.",
          "Receive approval from the Head of School to enroll the student.",
          "Submit essential documents and complete fee payment.",
          "Submit parent consent for student discipline and anti-bullying expectations.",
          "Complete student understanding documents for IBDP or IBCP where applicable.",
          "Collect uniform and stationery.",
        ],
      },
    ],
  },
  "book-campus-visit": {
    title: "Book Campus Visit",
    eyebrow: "Admissions",
    intro:
      "Families can request a campus visit to experience the learning environment, facilities, and programme pathways at MGS.",
    sections: [
      {
        heading: "Visit request",
        body: [
          "Use the admissions inquiry form to share parent name, student details, grade, preferred curriculum, and contact information.",
          "Select 'Book campus visit' as the preferred action so the admissions team can follow up.",
        ],
      },
    ],
  },
  "schedule-a-call": {
    title: "Schedule a Call",
    eyebrow: "Admissions",
    intro:
      "Families can schedule a call to understand the IB and Cambridge pathways before beginning the application process.",
    sections: [
      {
        heading: "Call request",
        body: [
          "Use the admissions inquiry form and select 'Schedule a call' as the preferred action.",
          "The admissions team can guide families through curriculum choices, grade placement, application forms, documents, assessment, and interview steps.",
        ],
      },
    ],
  },
};

export const pageSlugs = Object.keys(infoPages);
