import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaEnvelope } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaEnvelope,
    title:
      "The selected solicitor receives an email invitation to join the loan process.",
    lineHeight: 300,
    connectorLeft: "33%",
  },
  {
    icon: IoDocumentText,
    title:
      "The email can include the lender’s name and key property information customized to the lender's requirements, allowing the solicitor to identify the request from a trusted lender with whom they have already onboarded. ",
    lineHeight: 170,
    connectorLeft: "33%",
  },
];

export default function AcceptInvitationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Accept invitation — solicitor email invitation"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
