import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaScaleBalanced } from "react-icons/fa6";

export default function SolicitorViewSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-8/bv-tab4-step1-main.svg"
        alt="Loan management — solicitor view"
      />

      <AdvSliderTooltip
        icon={FaScaleBalanced}
        title="Solicitors can view active case files, complete post-drawdown tasks, upload required documents, and track the status of each transaction in real time."
        lineHeight={120}
      />
    </div>
  );
}
