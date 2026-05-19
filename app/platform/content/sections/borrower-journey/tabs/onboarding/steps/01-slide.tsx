import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { IoMdCloudUpload } from "react-icons/io";
import { PiJoystickFill } from "react-icons/pi";
import { RiProgress2Fill } from "react-icons/ri";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: PiJoystickFill,
    title: (
      <>
        <strong className="font-bold">Flexible Onboarding:</strong> The lender
        controls when and where onboarding is triggered within the borrower
        journey.
      </>
    ),
    lineHeight: 430,
  },
  {
    icon: RiProgress2Fill,
    title:
      "Onboarding can be customised depending on whether the user is a capital provider, borrower, or solicitor, etc.",
    lineHeight: 375,
    connectorLeft: "10%",
  },
  {
    icon: IoMdCloudUpload,
    title:
      "Lenders can decide when KYC, KYB, AML, and additional APIs including credit, fraud, income, affordability, and criminal background checks, etc.",
    lineHeight: 265,
    connectorLeft: "2%",
  },
];

export default function OnboardingSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-1/tab-5/bj-tab5-step1-main.svg"
        alt="Onboarding — flexible lender-controlled setup"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
