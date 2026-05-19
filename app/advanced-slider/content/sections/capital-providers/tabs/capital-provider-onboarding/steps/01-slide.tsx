import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { PiJoystickFill } from "react-icons/pi";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: PiJoystickFill,
    title:
      "Capital providers create their account and complete an onboarding process to verify investor status and eligibility. This ensures only verified participants can fund loans on the platform.",
    lineHeight: 430,
    connectorLeft: "21%",
  },
  {
    icon: PiJoystickFill,
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
