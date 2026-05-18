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
        title="All parties receive confirmation once capital provider funding is verified and recorded."
        lineHeight={280}
        connectorLeft="45%"
      />
    </div>
  );
}
