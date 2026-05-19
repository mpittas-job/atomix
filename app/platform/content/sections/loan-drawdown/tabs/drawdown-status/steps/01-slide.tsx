import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaFolderTree } from "react-icons/fa6";

export default function DrawdownStatusSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-5/ld-tab3-step1-main.svg"
        alt="Loan drawdown — status and visibility"
      />

      <AdvSliderTooltip
        icon={FaFolderTree}
        title="A full audit trail of the instruction and timing is captured for lender records."
        lineHeight={430}
        connectorLeft="10%"
      />
    </div>
  );
}
