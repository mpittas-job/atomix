import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiCheckBadge } from "react-icons/hi2";

export default function InformationVerificationSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-4/sj-tab3-step3-main2.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[15%] -left-[4%] opacity-100"
        src="/advanced-slider/section-2/tab-4/sj-tab2-step3-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={820}
        height={300}
        imageClassName="block h-auto max-w-[700px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={HiCheckBadge}
        title="Solicitors can verify information submitted by the borrower or provide new verified data - including details obtained from third parties."
        lineHeight={190}
        connectorLeft="7%"
      />
    </div>
  );
}
