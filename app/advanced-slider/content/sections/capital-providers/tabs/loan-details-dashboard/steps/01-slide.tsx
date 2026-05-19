import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { MdDescription } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: PiChartLineUpBold,
    title:
      "The dashboard provides real-time calculations of interest earned, repayments made, total returns to date, along with additional information on the loan that may be required.",
    lineHeight: 360,
    connectorLeft: "60%",
  },
  {
    icon: IoShieldCheckmarkSharp,
    title:
      "Atomix enforces capital providers' lending policies automatically, ensuring compliant fund usage and reducing lenders' need to monitor and manage policy compliance.",
    lineHeight: 210,
    connectorLeft: "30%",
  },
];

export default function LoanDetailsDashboardSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab9-step1-main.svg"
        alt="Capital providers — loan details dashboard"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
