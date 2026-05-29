"use client";

import Header from "@/components/header";
import MobileHero from "@/mobile/MobileHero";
import MainHero from "@/main/MainHero";
import MobileAboutAtomix from "@/mobile/MobileAboutAtomix";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import MainProblemsTabsLight from "@/main/MainProblemsTabsLight";
import TestPyramidSection from "@/main/TestPyramidSection";
import MainSolutionsAnimationLight from "@/main/MainSolutionsAnimationLight";
import MainBenefitsLight from "@/main/MainBenefitsLight";
import MainMissionVisionCards from "@/main/MainMissionVisionCards";
import MainTheMarket from "@/main/MainTheMarket";
import MobileCurrentStatus from "@/mobile/MobileCurrentStatus";
import MobileTeamOpportunities from "@/mobile/MobileTeamOpportunities";
import SliderWhyWorkWithUs from "@/components/SliderWhyWorkWithUs";
import MainCurrentStatusLight from "@/main/MainCurrentStatusLight";

/** TEMP: set true when done testing Mission/Vision responsiveness. */
const SHOW_SECTIONS_BELOW_MISSION_VISION = false;

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-white" style={{ ["--header-height" as string]: "5.5rem" }}>
      <Header />
      <div
        id="def-hero-main"
        className="hidden pb-[var(--hero-y-gap,1rem)] pt-[calc(var(--header-height,5.5rem)+var(--hero-y-gap,1rem))] lg:block"
        style={{
          ["--header-height" as string]: "5.5rem",
          ["--hero-y-gap" as string]: "1rem",
        }}
      >
        <MainHero />
      </div>

      <div
        className="pb-[var(--hero-y-gap,1rem)] pt-[calc(var(--header-height,5.5rem)+var(--hero-y-gap,1rem))] lg:hidden"
        style={{
          ["--header-height" as string]: "5.5rem",
          ["--hero-y-gap" as string]: "1rem",
        }}
      >
        <MobileHero />
      </div>

      <div className="lg:hidden">
        <MobileAboutAtomix />
      </div>

      <MainMissionVisionCards />

      <div className="px-0 md:px-12 pb-6">
        <MainProblemsTabsLight />
      </div>

      <div className="pb-6">
        <TestPyramidSection />
      </div>

      <div className="hidden lg:block px-0 md:px-12 pb-6">
        <MainSolutionsAnimationLight />
      </div>

      <div className="px-0 md:px-12 pb-6">
        <MainBenefitsLight />
      </div>

      <div className="px-0 md:px-12 pb-6">
        <MainTheMarket />
      </div>

      <div className="lg:hidden">
        <MobileCurrentStatus />
      </div>

      <div className="md:hidden pb-6 md:py-6">
        <MobileTeamOpportunities />
      </div>

      <div className="hidden lg:block px-0 md:px-12 pb-6">
        <MainCurrentStatusLight />
      </div>

      <div className="hidden md:block px-0 md:px-12 pb-6">
        <SliderWhyWorkWithUs />
      </div>



      <div className="px-0 md:px-12">
        <DefCta title="Build the Future of Asset-Backed Lending" />
      </div>
      <Footer />
    </div>
  );
}
