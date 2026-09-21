import { Navbar } from "./components/Navbar";
import { HeroSlider } from "./components/HeroSlider";
import { ValueHighlights } from "./components/ValueHighlights";
import { DiscoverSplit } from "./components/DiscoverSplit";
import { AcademicPrograms } from "./components/AcademicPrograms";
import { CommunitySplit } from "./components/CommunitySplit";
import { FourFeatureStrip } from "./components/FourFeatureStrip";
import { LifeAtSchool } from "./components/LifeAtSchool";
import { AdmissionsBanner } from "./components/AdmissionsBanner";
import { AdmissionsForm } from "./components/AdmissionsForm";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-raya-ink">
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* 2. Large Hero Section */}
      <HeroSlider />

      {/* 3. Four Key Value / Highlight Items */}
      <ValueHighlights />

      {/* 4. "Discover" / Introduction Split Section */}
      <DiscoverSplit />

      {/* 5. IB & Cambridge Programmes Section */}
      <AcademicPrograms />

      {/* 6. "Community That Belongs" / School Experience Split Section */}
      <CommunitySplit />

      {/* 7. Four Feature / Value Strip */}
      <FourFeatureStrip />

      {/* 8. "Life at MGS" Section with Image Cards */}
      <LifeAtSchool />

      {/* 9. Large Admissions CTA & Admissions Inquiry Section */}
      <AdmissionsBanner />
      <AdmissionsForm />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}

