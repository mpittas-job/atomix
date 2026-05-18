import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaFlagCheckered } from "react-icons/fa6";

export default function LoanCompletionMainSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-7/lc-tab1-step1-main.svg"
        alt="Loan completion"
      />

      <AdvSliderOverlayImage
        className="absolute top-[25%] -left-[3%]"
        src="/advanced-slider/section-7/lc-tab1-step1-overlay.svg"
        alt="Loan completion detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[680px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={FaFlagCheckered}
        title="Loan completion is recorded with full visibility for capital providers and the lender."
        lineHeight={120}
      />
    </div>
  );
}
