import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import HeroCareers from "@/components/HeroCareers";
import MeetTheTeam from "@/components/MeetTheTeam";
import OpenPositions from "@/components/OpenPositions";

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="mt-20">
        <HeroCareers />
        <MeetTheTeam />
        <OpenPositions />
      </main>
      <div id="def-cta" className="pt-16">
        <DefCta title="Build the Future of Asset-Backed Lending" />
      </div>
      <Footer />
    </>
  );
}
