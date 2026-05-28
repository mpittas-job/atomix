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

      <MainProblemsTabsLight />

      <TestPyramidSection />

      <MainBenefitsLight />

      <div className="px-4 py-6 md:px-12 md:py-12">
        <MainTheMarket />
      </div>

      <div className="lg:hidden py-6">
        <MobileCurrentStatus />
      </div>

      <div className="lg:hidden py-6">
        <MobileTeamOpportunities />
      </div>

      <div className="hidden lg:block px-4 py-6 md:px-12 md:py-12">
        <MainCurrentStatusLight />
      </div>

      {SHOW_SECTIONS_BELOW_MISSION_VISION && (
        <div className="hidden lg:block">
          <div className="mt-6 mb-12 flex flex-col gap-6 px-12">
            <MainSolutionsAnimationLight />
            {/* TEMP: hidden for now
            <SliderWhyWorkWithUs />
            */}
          </div>
        </div>
      )}

      <DefCta title="Build the Future of Asset-Backed Lending" />
      <Footer />
    </div>
  );
}
