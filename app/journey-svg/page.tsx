"use client";

import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import DefHeading from "@/components/typo/DefHeading";
import AtomixJourneyFlowChart from "@/components/AtomixJourneyFlowChart";

export default function JourneySvgPage() {
  return (
    <>
      <Header />
      <main className="mt-20">
        <section
          aria-label="Journey SVG"
          className="w-full scroll-mt-28 py-16 md:scroll-mt-32 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1240px] px-6">
            <DefHeading
              showBadge={false}
              badgeText=""
              title="The Atomix Journey"
              description="Real-time data captured at every stage — powering faster decisions, structured
collaboration, and continuous loan management beyond completion."
              theme="dark"
              className="max-w-5xl"
            />

            <AtomixJourneyFlowChart className="mt-12 md:mt-16" />
          </div>
        </section>

        <div id="def-cta" className="pt-16">
          <DefCta
            title="Build the Future of
Asset-Backed Lending"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
