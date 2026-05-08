import AboutUsStackingCards from "@/components/AboutUsStackingCards";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <div className="mt-20">
        <AboutUsStackingCards />
      </div>
      <Footer />
    </>
  );
}
