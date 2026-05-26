"use client";

import Header from "@/components/header";
import MainHero from "@/main/MainHero";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import MainProblemsTabsLight from "@/main/MainProblemsTabsLight";
import TestPyramidWrapper from "@/main/TestPyramidWrapper";
import MainSolutionsAnimationLight from "@/main/MainSolutionsAnimationLight";
import MainBenefitsLight from "@/main/MainBenefitsLight";
import MainTheMarket from "@/main/MainTheMarket";
import MainCurrentStatusLight from "@/main/MainCurrentStatusLight";
import SliderWhyWorkWithUs from "@/components/SliderWhyWorkWithUs";
import MainMissionVisionCards from "@/main/MainMissionVisionCards";

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Header />
      <div
        className="pb-[var(--hero-y-gap,1rem)] pt-[calc(var(--header-height,5.5rem)+var(--hero-y-gap,1rem))]"
        id="def-hero-main"
        style={{
          ["--header-height" as string]: "5.5rem",
          ["--hero-y-gap" as string]: "1rem",
        }}
      >
        <MainHero />
      </div>

      <MainMissionVisionCards />
      <div className="px-12 mt-6 mb-12 flex flex-col gap-6">
        <MainProblemsTabsLight />
        <TestPyramidWrapper />
        <MainSolutionsAnimationLight />
        <MainBenefitsLight />
        <MainTheMarket />
        <MainCurrentStatusLight />
        <SliderWhyWorkWithUs />
      </div>

      <DefCta title="Build the Future of Asset-Backed Lending" />

      <Footer />
    </div>
  );
}
