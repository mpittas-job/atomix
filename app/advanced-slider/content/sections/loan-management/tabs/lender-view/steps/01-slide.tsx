import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaLandmark } from "react-icons/fa6";

export default function LenderViewSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-8/bv-tab2-step1-main.svg"
        alt="Loan management — lender view"
      />

      <AdvSliderTooltip
        icon={FaLandmark}
        title="They can report technical breaches of the loan, place a loan into default, or refer cases to an insolvency practitioner, insurer or solicitor - all within a single interface."
        lineHeight={410}
        connectorLeft="80%"
      />
    </div>
  );
}
