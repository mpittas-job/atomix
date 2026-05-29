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
          description={
            <>
              <p>
                Property lending infrastructure is overdue for a rebuild. Atomix
                is the rebuild.
              </p>
              <p className="mt-4">
                £65bn+ in specialist property lending processed every year on
                infrastructure that doesn&apos;t work. Atomix replaces it.
              </p>
            </>
          }
          titleClassName="max-w-none whitespace-nowrap"
          descriptionClassName="max-w-none"
          showCta={false}
        />
      </div>

      <AboutUsStackingCards />
      <DefCta title="Build the Future of Asset-Backed Lending" />
      <Footer />
    </>
  );
}
