import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaChartPie } from "react-icons/fa6";

export default function FundsAllocationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab7-step1-main.svg"
        alt="Capital providers — funds allocation"
      />

      <AdvSliderTooltip
        icon={FaChartPie}
        title="Committed capital is allocated across tranches and facilities with clear audit trails."
        lineHeight={320}
      />
    </div>
  );
}
