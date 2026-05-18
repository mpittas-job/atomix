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
        title={
          <>
            <strong className="font-bold">Flexible onboarding:</strong> Capital
            providers are onboarded with workflows tailored to lender
            requirements and funding roles.
          </>
        }
        lineHeight={400}
      />
    </div>
  );
}
