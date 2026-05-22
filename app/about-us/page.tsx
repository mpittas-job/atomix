import AboutUsStackingCards from "@/components/AboutUsStackingCards";
import DefCta from "@/components/DefCta";
import HeroAnimatedBg from "@/components/HeroAnimatedBg";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function AboutUsPage() {
  return (
    <>
      <Header />

      <div className="pt-34 mb-18">
        <HeroAnimatedBg
          tileDisplayMode="static"
          heroCardBackgroundImage="/hero/hero-about.jpg"
          heroTitleId="about-us-hero-title"
          title="About Atomix"
          description="Property lending is overdue for a rebuild. Atomix is it."
          titleClassName="max-w-none whitespace-nowrap"
          descriptionClassName="max-w-none whitespace-nowrap"
          showCta={false}
        />
      </div>

      <AboutUsStackingCards />
      <DefCta title="Build the Future of Asset-Backed Lending" />
      <Footer />
    </>
  );
}
