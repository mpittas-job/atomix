import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiLoopLeftLine } from "react-icons/ri";

export default function DrawdownStatusSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-5/ld-tab3-step1-main.svg"
        alt="Loan drawdown — status and visibility"
      />

      <AdvSliderTooltip
        icon={RiLoopLeftLine}
        title="A full audit trail of the instruction and timing is captured for lender records."
        lineHeight={430}
        connectorLeft="10%"
      />
    </div>
  );
}
