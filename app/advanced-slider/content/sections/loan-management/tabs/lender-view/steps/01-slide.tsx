import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaCircleExclamation } from "react-icons/fa6";
import { PiChartLineUpBold } from "react-icons/pi";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaCircleExclamation,
    title:
      "They can report technical breaches of the loan, place a loan into default, or refer cases to an insolvency practitioner, insurer or solicitor - all within a single interface.",
    lineHeight: 410,
    connectorLeft: "80%",
  },
  {
    icon: PiChartLineUpBold,
    title:
      "Lenders can monitor borrower activity, view payment histories, track key milestones, and access all loan-related documentation in real time. ",
    lineHeight: 225,
    connectorLeft: "35%",
  },
];

export default function LenderViewSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-8/bv-tab2-step1-main.svg"
        alt="Loan management — lender view"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
