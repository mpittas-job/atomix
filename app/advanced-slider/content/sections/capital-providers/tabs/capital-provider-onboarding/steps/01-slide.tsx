import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { PiJoystickFill } from "react-icons/pi";

export default function CapitalProviderOnboardingSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab1-step1-main.svg"
        alt="Capital providers — onboarding"
      />

      <AdvSliderTooltip
        icon={PiJoystickFill}
        title="Capital providers create their account and complete an onboarding process to verify investor status and eligibility. This ensures only verified participants can fund loans on the platform."
        lineHeight={415}
        connectorLeft="20%"
      />
    </div>
  );
}
