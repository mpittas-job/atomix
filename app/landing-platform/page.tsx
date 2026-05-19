"use client";

import MainHeroV3 from "@/components/MainHeroV3";
import HeaderRounded from "@/components/headerRounded";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import ScrollableTabsPlatform from "@/components/ScrollableTabsPlatform";
import { SliderAnimationPage } from "@/slider-animation/SliderAnimationPage";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import DefHeading from "@/components/typo/DefHeading";
import AtomixJourneyFlowChart from "@/components/AtomixJourneyFlowChart";

export default function LandingPlatformPage() {
  const isDesktop = useIsDesktop();
  return (
    <div className="overflow-x-hidden">
      <HeaderRounded />
      <MainHeroV3 />

      <ScrollableTabsPlatform />

      <div className="mb-30 mt-30 bg-red-500/0 min-h-[50vh]" id="use-cases">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="max-w-[1060px] mx-auto">
            <DefHeading
              theme="dark"
              badgeText=""
              showBadge={false}
              title="The Atomix Journey"
              description="Real-time data captured at every stage — powering faster decisions, structured
collaboration, and continuous loan management beyond completion."
            />
          </div>

          <div className="mt-16 w-full min-w-0">
            <AtomixJourneyFlowChart className="w-full" />
          </div>
          </div>
      </div>

      <SliderAnimationPage isDesktop={isDesktop} />

      <div id="def-cta" className="pt-30">
        <DefCta
          title="Build the Future of
Asset-Backed Lending"
        />
      </div>

      <Footer />
    </div>
  );
}
