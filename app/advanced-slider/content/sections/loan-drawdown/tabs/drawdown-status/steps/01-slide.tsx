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
        title="All parties have real-time visibility into drawdown status and outstanding actions."
        lineHeight={330}
      />
    </div>
  );
}
