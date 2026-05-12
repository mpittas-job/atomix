import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiProgress2Fill } from "react-icons/ri";

export default function OnboardingSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-5/bj-tab5-step1-main.svg"}
        alt={""}
      />

      <AdvSliderTooltip
        icon={RiProgress2Fill}
        title="Onboarding can be customised depending on whether the user is a capital provider, borrower, or solicitor, etc."
        lineHeight={375}
        connectorLeft="10%"
      />
    </div>
  );
}
