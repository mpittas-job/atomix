import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiUserSearchFill } from "react-icons/ri";

export default function FetchAutomationDataSlide03() {
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
        icon={RiUserSearchFill}
        title="Cross-reference and verify applicant-provided information against authoritative databases to catch discrepancies and reduce fraud risk."
        lineHeight={265}
        connectorLeft="62%"
      />
    </div>
  );
}
