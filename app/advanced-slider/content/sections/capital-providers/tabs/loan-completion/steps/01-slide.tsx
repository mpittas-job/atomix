import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaFlagCheckered } from "react-icons/fa6";

export default function LoanCompletionSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab6-step1-main.svg"
        alt="Capital providers — loan completion"
      />

      <AdvSliderOverlayImage
        className="absolute right-[14%] top-[13%]"
        src="/advanced-slider/section-6/cp-tab6-step1-overlay2.svg"
        alt="Capital providers — loan completion summary"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[190px] shadow-xl shadow-neutral-500/20 rounded-xl relative border-2 border-[#499DB8]"
        enterDelay={0.08}
      />

      <AdvSliderOverlayImage
        className="absolute -right-[3%] top-[35%]"
        src="/advanced-slider/section-6/cp-tab6-step1-overlay1.svg"
        alt="Capital providers — loan completion detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[520px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={FaFlagCheckered}
        title="Loan completion is recorded with full visibility for capital providers and the lender."
        lineHeight={120}
        connectorLeft="66%"
      />
    </div>
  );
}
