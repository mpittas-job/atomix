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
        title="Multiple capital funding structures - including syndicated loans, institutional credit lines, and other capital provider models - with built-in tools for allocation and tracking."
        lineHeight={185}
        connectorLeft="6%"
      />
    </div>
  );
}
