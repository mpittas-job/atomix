import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { HiCheckBadge } from "react-icons/hi2";
import { PiListChecksFill } from "react-icons/pi";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: HiCheckBadge,
    title:
      "Capital providers create their account and complete an onboarding process to verify investor status and eligibility. This ensures only verified participants can fund loans on the platform.",
    lineHeight: 430,
    connectorLeft: "21%",
  },
  {
    icon: PiListChecksFill,
    title:
      "Onboarding can include integrated KYC, KYB and AML. Additional APIs are available, depending on lender requirements.",
    lineHeight: 300,
    connectorLeft: "21%",
  },
];

export default function CapitalProviderOnboardingSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab1-step1-main.svg"
        alt="Capital providers — onboarding"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
