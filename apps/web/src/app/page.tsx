import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { GrowthSequenceSection } from "@/components/sections/growth-sequence-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { TutorTeamSection } from "@/components/sections/tutor-team-section";
import { AIShowcaseSection } from "@/components/sections/ai-showcase-section";
import { SuccessStoriesSection } from "@/components/sections/success-stories-section";
import { FinalCTASection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust — Social proof & statistics */}
      <TrustSection />

      {/* 3. Growth Sequence — Core brand concept */}
      <GrowthSequenceSection />

      {/* 4. Four Core Capabilities */}
      <CapabilitiesSection />

      {/* 5. Tutor Team */}
      <TutorTeamSection />

      {/* 6. AI Showcase */}
      <AIShowcaseSection />

      {/* 7. Success Stories (placeholder) */}
      <SuccessStoriesSection />

      {/* 8. Final CTA */}
      <FinalCTASection />
    </>
  );
}
