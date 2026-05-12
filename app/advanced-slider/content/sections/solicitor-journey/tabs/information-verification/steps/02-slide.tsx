import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiProgress3Line } from "react-icons/ri";

export default function InformationVerificationSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-4/sj-tab3-step3-main2.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <div className="absolute bottom-[15%] -left-[4%] opacity-100">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-2/tab-4/sj-tab2-step3-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={820}
          height={300}
          className="block h-auto max-w-[700px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={RiProgress3Line}
        title="Multiple verification methods can be assigned to each required piece of information, including automated data provider checks."
        lineHeight={233}
        connectorLeft="35%"
      />
    </div>
  );
}
