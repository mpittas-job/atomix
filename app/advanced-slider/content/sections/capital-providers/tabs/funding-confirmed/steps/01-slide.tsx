import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function FundingConfirmedSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab5-step1-main.svg"
        alt="Capital providers — funding confirmed"
      />

      <AdvSliderTooltip
        icon={IoIosCheckmarkCircle}
        title="Once funds are received, the system confirms the investment and moves the loan to the funded stage."
        lineHeight={280}
        connectorLeft="60%"
      />
    </div>
  );
}
