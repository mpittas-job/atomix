import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaHighlighter } from "react-icons/fa";
import { PiListChecksFill } from "react-icons/pi";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaHighlighter,
    title:
      "If there is a discrepancy between borrower-submitted information and solicitors’ response, the platform highlights the conflict and applies the lender’s rules to determine the next step.",
    lineHeight: 325,
    connectorLeft: "5%",
  },
  {
    icon: PiListChecksFill,
    title:
      "For example, the lender may specify that solicitors’ answers always take precedence. All changes are logged and clearly visible to the lender.",
    lineHeight: 325,
    connectorLeft: "5%",
  },
];

export default function ResolveConflictsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-2/tab-5/sj-tab-5-step1-main.svg"
        alt="Resolve conflicts — discrepancy highlighting"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[15%] -left-[5%]"
        src="/platform-assets/section-2/tab-5/sj-tab5-step1-overlay1.svg"
        alt="Resolve conflicts — conflict resolution overlay"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[610px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
