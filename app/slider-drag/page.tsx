import Header from "@/components/header";
import Footer from "@/components/Footer";
import SliderWhyWorkWithUs from "@/components/SliderWhyWorkWithUs";

export default function SliderDragPage() {
  return (
    <div>
      <Header />

      <div className="page-wrapper flex flex-col gap-y-6 pb-6 min-h-[50vh]">
        <SliderWhyWorkWithUs />
      </div>
      <Footer />
    </div>
  );
}
