import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { MdDashboard } from "react-icons/md";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: MdDashboard,
    title:
      "They can view all active and past investments, along with key loan information, performance metrics, and upcoming maturity dates.",
    lineHeight: 370,
    connectorLeft: "50%",
  },
  {
    icon: MdDashboard,
    title:
      "They can view all active and past investments, along with key loan information, performance metrics, and upcoming maturity dates.",
    lineHeight: 320,
    connectorLeft: "11%",
  },
];

export default function LoanManagementDashboardSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-6/cp-tab8-step1-main.svg"
        alt="Capital providers — loan management dashboard"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
