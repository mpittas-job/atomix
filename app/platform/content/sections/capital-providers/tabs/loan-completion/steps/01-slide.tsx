import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function LoanCompletionSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-6/cp-tab6-step1-main.svg"
        alt="Capital providers — loan completion"
      />

      <AdvSliderOverlayImage
        className="absolute right-[14%] top-[13%]"
        src="/platform-assets/section-6/cp-tab6-step1-overlay2.svg"
        alt="Capital providers — loan completion summary"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[190px] shadow-xl shadow-neutral-500/20 rounded-xl relative border-2 border-[#499DB8]"
        enterDelay={0.08}
      />

      <AdvSliderOverlayImage
        className="absolute -right-[3%] top-[35%]"
        src="/platform-assets/section-6/cp-tab6-step1-overlay1.svg"
        alt="Capital providers — loan completion detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[520px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={IoMdCheckmarkCircle}
        title="Solicitor confirms the loan as completed."
        lineHeight={385}
        connectorLeft="85%"
      />
    </div>
  );
}
