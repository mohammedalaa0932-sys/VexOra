import { useState } from "react";
import { PresentationShell, type SlideId } from "@/components/PresentationShell";
import { CoverSlide } from "@/slides/CoverSlide";
import { IntroSlide } from "@/slides/IntroSlide";
import { MarketingSlide } from "@/slides/MarketingSlide";
import { DataSlide } from "@/slides/DataSlide";
import { SampleSlide } from "@/slides/SampleSlide";
import { SurveySlide } from "@/slides/SurveySlide";
import { DemandSlide } from "@/slides/DemandSlide";
import { ConclusionSlide } from "@/slides/ConclusionSlide";
import { CinematicHero } from "@/components/CinematicHero";
import { HospitalityGallery } from "@/components/HospitalityGallery";
import { OperationsDashboard } from "@/components/OperationsDashboard";
import { BrandShowcase } from "@/components/BrandShowcase";

export default function App() {
  const [active, setActive] = useState<SlideId>("cover");

  return (
    <PresentationShell active={active} onChange={setActive}>
      {active === "cover" && (
        <div className="space-y-12">
          <CoverSlide />
          <BrandShowcase />
          <CinematicHero />
          <HospitalityGallery />
          <OperationsDashboard />
        </div>
      )}
      {active === "intro" && <IntroSlide />}
      {active === "marketing" && <MarketingSlide />}
      {active === "data" && <DataSlide />}
      {active === "sample" && <SampleSlide />}
      {active === "survey" && <SurveySlide />}
      {active === "demand" && <DemandSlide />}
      {active === "conclusion" && <ConclusionSlide />}
    </PresentationShell>
  );
}