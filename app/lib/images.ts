/**
 * Centralized Homepage Image Registry
 * 
 * To replace any image manually:
 * 1. Overwrite the corresponding file in `public/images/home/`, OR
 * 2. Update the path in this file to point to your new image.
 * 
 * NO GSAP OR ANIMATION CODE NEEDS TO BE TOUCHED TO CHANGE IMAGES!
 */

export interface HomepageImageMetadata {
  src: string;
  alt: string;
  recommendedWidth: number;
  recommendedHeight: number;
  aspectRatio: string;
  section: string;
  notes: string;
}

export const homepageImages = {
  // Hero Section - Full width background
  hero: {
    src: "/images/home/hero.jpg",
    alt: "Maharishi Global School PMR Campus - Full Width Hero",
    recommendedWidth: 1920,
    recommendedHeight: 922,
    aspectRatio: "1920:922 (wide)",
    section: "Hero / Top Section",
    notes: "School entrance arch on right, smiling students with books, Maharishi in sky",
  },

  // Discover Section - Students in courtyard
  discover: {
    src: "/images/home/discover.webp",
    alt: "Students running joyfully through campus colonnade",
    recommendedWidth: 1000,
    recommendedHeight: 1200,
    aspectRatio: "4:5 (portrait/editorial)",
    section: "Discover a World of Possibilities",
    notes: "Action shot of students in uniforms in campus courtyard",
  },

  // Community Section - Library reader
  community: {
    src: "/images/home/community.jpg",
    alt: "Young student engaged in reading in the school library",
    recommendedWidth: 1200,
    recommendedHeight: 800,
    aspectRatio: "3:2 (editorial landscape)",
    section: "A Community That Belongs",
    notes: "Warm, focused portrait of student with open book in library",
  },

  // Campus Dark Section - Architectural facade
  campusDark: {
    src: "/images/home/campus.jpg",
    alt: "Maharishi Global School Campus Architecture & Grounds",
    recommendedWidth: 1920,
    recommendedHeight: 600,
    aspectRatio: "16:5 (panoramic)",
    section: "Global / Holistic / Future-Ready / Lifelong Values",
    notes: "Modern school building facade with green trees against dusky sky",
  },

  // Life at MGS Card 1 - Library & Reading Culture
  lifeLibrary: {
    src: "/images/home/card-library.jpg",
    alt: "Students learning and reading in the Maharishi Global School library",
    recommendedWidth: 1200,
    recommendedHeight: 900,
    aspectRatio: "4:3 (landscape card)",
    section: "Life at MGS (Card 1)",
    notes: "Library research and reading scene",
  },

  // Life at MGS Card 2 - Practical Learning
  lifePractical: {
    src: "/images/home/card-practical.jpg",
    alt: "Students collaborating in the Maharishi Global School STEM lab",
    recommendedWidth: 1200,
    recommendedHeight: 900,
    aspectRatio: "4:3 (landscape card)",
    section: "Life at MGS (Card 2)",
    notes: "Students designing, coding, and building in STEM lab",
  },

  // Life at MGS Card 3 - Sports Activities
  lifeSports: {
    src: "/images/home/card-sports.jpg",
    alt: "Maharishi Global School sports facilities and student athletes",
    recommendedWidth: 1200,
    recommendedHeight: 900,
    aspectRatio: "4:3 (landscape card)",
    section: "Life at MGS (Card 3)",
    notes: "Cricket stadium and indoor multi-sport activity",
  },

  // Life at MGS secondary cards — used by the scroll-revealed collage.
  lifeMusic: {
    src: "/images/home/card-music.jpg",
    alt: "Students performing music together at Maharishi Global School",
    recommendedWidth: 1200,
    recommendedHeight: 900,
    aspectRatio: "4:3 (landscape card)",
    section: "Life at MGS (Card 4)",
    notes: "Student music ensemble",
  },
  lifeDesign: {
    src: "/images/home/card-design.jpg",
    alt: "Students collaborating in a Maharishi Global School design lab",
    recommendedWidth: 1200,
    recommendedHeight: 900,
    aspectRatio: "4:3 (landscape card)",
    section: "Life at MGS (Card 5)",
    notes: "Collaborative design and innovation session",
  },
  lifeLeadership: {
    src: "/images/home/card-leadership.jpg",
    alt: "Students presenting and collaborating at Maharishi Global School",
    recommendedWidth: 1200,
    recommendedHeight: 900,
    aspectRatio: "4:3 (landscape card)",
    section: "Life at MGS (Card 6)",
    notes: "Student leadership and global learning discussion",
  },

  // Final CTA Admissions Banner
  admissionsBanner: {
    src: "/images/home/admissions.png",
    alt: "Maharishi Global School Modern Architecture",
    recommendedWidth: 1200,
    recommendedHeight: 411,
    aspectRatio: "1200:411 (horizontal banner)",
    section: "Begin Your Child's Journey / Admissions Banner",
    notes: "Lush green trees and modern academic building entrance",
  },

  // Header / Footer Logo
  logo: {
    src: "/images/home/logo.png",
    alt: "Maharishi Global School Tree Logo Emblem",
    recommendedWidth: 1024,
    recommendedHeight: 1024,
    aspectRatio: "1:1 (square transparent PNG)",
    section: "Navbar & Footer",
    notes: "Round tree logo with Knowledge is Structured in Consciousness motto",
  },
};
