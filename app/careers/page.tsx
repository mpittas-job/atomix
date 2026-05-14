import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import HeroCareers from "@/components/HeroCareers";

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="mt-20">
        <HeroCareers />
        <section
          id="open-roles"
          aria-label="Open roles"
          className="w-full scroll-mt-28 py-16 md:scroll-mt-32 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1240px] px-6 min-h-screen flex flex-col items-center justify-center">
            <p className="max-w-2xl text-lg leading-relaxed text-[#474D5D]">
              More content coming soon.
            </p>
          </div>
        </section>
      </main>
      <div id="def-cta" className="pt-16">
        <DefCta title="Build the Future of Asset-Backed Lending" />
      </div>
      <Footer />
    </>
  );
}
