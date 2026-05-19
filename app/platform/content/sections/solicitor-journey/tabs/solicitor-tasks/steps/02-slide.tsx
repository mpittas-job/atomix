import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { IoMdCheckmark } from "react-icons/io";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: IoMdCheckmark,
    title: "Provide Legal opinion.",
    lineHeight: 470,
    connectorLeft: "12%",
    iconColor: "#00AE3A",
  },
  {
    icon: IoMdCheckmark,
    title: "Send any Documents for signing via DocuSign.",
    lineHeight: 470,
    connectorLeft: "19%",
    iconColor: "#00AE3A",
  },
  {
    icon: IoMdCheckmark,
    title: "Provide any Confirmations and Undertakings",
    lineHeight: 470,
    connectorLeft: "36%",
    iconColor: "#00AE3A",
  },
];

export default function SolicitorTasksSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-2/tab-2/sj-tab2-step1-main.svg"
        alt="Solicitor tasks — legal opinion and documents"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
