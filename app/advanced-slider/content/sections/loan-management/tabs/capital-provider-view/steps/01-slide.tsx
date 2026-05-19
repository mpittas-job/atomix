import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaHandshake } from "react-icons/fa6";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaHandshake,
    title:
      "Capital providers have access to a dedicated, fully customised dashboard that offers full transparency into the loans they are funding, customised analysis and reporting.",
    lineHeight: 390,
    connectorLeft: "50%",
  },
  {
    icon: FaHandshake,
    title:
      "They can view all active and past investments, along with key loan information, performance metrics, and upcoming maturity dates.",
    lineHeight: 320,
    connectorLeft: "20%",
  },
];

export default function CapitalProviderViewSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-8/bv-tab3-step1-main.svg"
        alt="Loan management — capital provider view"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
