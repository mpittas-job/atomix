import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaHandshake } from "react-icons/fa6";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaHandshake,
    title:
      "Capital providers can select the amount they wish to invest in the loan, up to the limit defined by the lender. The platform automatically validates the investment against the available allocation.",
    lineHeight: 90,
    connectorLeft: "65%",
  },
  {
    icon: FaHandshake,
    title:
      "Investors can view key loan details on the platform - including borrower, property, loan size and terms - before deciding to participate.",
    lineHeight: 380,
    connectorLeft: "22%",
  },
  {
    icon: FaHandshake,
    title: "All required investment documents are made available for review.",
    lineHeight: 180,
    connectorLeft: "22%",
  },
];

export default function AcceptInvitationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab3-step1-main.svg"
        alt="Capital providers — accept invitation"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[15%] -right-[5%]"
        src="/advanced-slider/section-6/cp-tab3-step1-overlay.svg"
        alt="Capital providers — accept invitation detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[560px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
