import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { TbApi } from "react-icons/tb";

export default function FetchAutomationDataSlide01() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-6/bj-tab6-step1-main.svg"}
        alt={""}
      />

      <AdvSliderOverlayImage
        className="absolute top-[8%] left-1/2 -translate-x-1/2"
        src="/advanced-slider/section-1/tab-6/bj-tab6-step1-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[500px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={TbApi}
        title="Atomix connects to trusted third-party data providers for instant access to property and applicant information."
        lineHeight={265}
        connectorLeft="22%"
      />
    </div>
  );
}
