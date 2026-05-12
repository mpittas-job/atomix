import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { TbApi } from "react-icons/tb";

export default function FetchAutomationDataSlide01() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-6/bj-tab6-step1-main.svg"}
        alt={""}
      />

      <div className="absolute top-[8%] left-1/2 -translate-x-1/2">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-6/bj-tab6-step1-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[500px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={TbApi}
        title="Atomix connects to trusted third-party data providers for instant access to property and applicant information."
        lineHeight={265}
        connectorLeft="22%"
      />
    </div>
  );
}
