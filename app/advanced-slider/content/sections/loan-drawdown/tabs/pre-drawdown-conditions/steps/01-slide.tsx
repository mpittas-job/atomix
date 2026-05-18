import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { PiListChecksFill } from "react-icons/pi";

export default function PreDrawdownConditionsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-5/ld-tab1-step1-main.svg"
        alt="Loan drawdown — pre-drawdown conditions"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[3%] -right-[5%]"
        src="/advanced-slider/section-5/ld-tab1-step1-overlay.svg"
        alt="Loan drawdown — pre-drawdown conditions detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[380px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={PiListChecksFill}
        title="Once all tasks are completed and all eligibility criteria are met and verified, the lender's solicitor initiates the drawdown process."
        lineHeight={30}
        connectorLeft="85%"
      />
    </div>
  );
}
