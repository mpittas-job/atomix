"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import MobileHero from "@/mobile/MobileHero";
import MainHero from "@/main/MainHero";
import MobileAboutAtomix from "@/mobile/MobileAboutAtomix";
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

/** TEMP: set false or delete when done testing hero scroll behavior. */
const SHOW_SCROLL_TEST_SPACER = true;

/** Flip one section to `true` at a time to test responsiveness in isolation. */
const LANDING_SECTIONS = {
  missionVision: false,
  problemsTabs: false,
  testPyramid: false,
  solutions: false,
  benefits: false,
  theMarket: false,
  currentStatus: false,
  whyWorkWithUs: false,
  defCta: false,
  footer: false,
} as const;

export default function LandingPage() {
  const {
    missionVision,
    problemsTabs,
    testPyramid,
    solutions,
    benefits,
    theMarket,
    currentStatus,
    whyWorkWithUs,
    defCta,
    footer,
  } = LANDING_SECTIONS;

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)"); // Tailwind `lg`
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsDesktop("matches" in e ? e.matches : e.matches);

    setIsDesktop(mql.matches);

    // Safari < 14 fallback uses addListener/removeListener
    if ("addEventListener" in mql) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

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
        {isDesktop ? <MainHero /> : <MobileHero />}
      </div>

      {!isDesktop && <MobileAboutAtomix />}

      {SHOW_SCROLL_TEST_SPACER && (
        <div
          aria-hidden
          className="h-screen shrink-0 bg-zinc-50"
          data-scroll-test-spacer
        />
      )}

      {missionVision && <MainMissionVisionCards />}

      {(problemsTabs ||
        testPyramid ||
        solutions ||
        benefits ||
        theMarket ||
        currentStatus ||
        whyWorkWithUs) && (
        <div className="px-12 mt-6 mb-12 flex flex-col gap-6">
          {problemsTabs && <MainProblemsTabsLight />}
          {testPyramid && <TestPyramidWrapper />}
          {solutions && <MainSolutionsAnimationLight />}
          {benefits && <MainBenefitsLight />}
          {theMarket && <MainTheMarket />}
          {currentStatus && <MainCurrentStatusLight />}
          {whyWorkWithUs && <SliderWhyWorkWithUs />}
        </div>
      )}

      {defCta && (
        <DefCta title="Build the Future of Asset-Backed Lending" />
      )}

      {footer && <Footer />}
    </div>
  );
}
