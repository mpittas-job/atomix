import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { PiJoystickFill } from "react-icons/pi";

export default function OnboardingSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-5/bj-tab5-step1-main.svg"}
        alt={""}
      />

      <AdvSliderTooltip
        icon={PiJoystickFill}
        title={
          <>
            <strong className="font-bold">Flexible Onboarding:</strong> The
            lender controls when and where onboarding is triggered within the
            borrower journey.
          </>
        }
        lineHeight={430}
      />
    </div>
  );
}
