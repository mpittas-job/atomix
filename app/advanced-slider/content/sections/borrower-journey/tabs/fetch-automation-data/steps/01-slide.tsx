import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaDatabase } from "react-icons/fa6";
import { RiQuestionnaireFill, RiUserSearchFill } from "react-icons/ri";
import { TbApi } from "react-icons/tb";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: TbApi,
    title:
      "Atomix connects to trusted third-party data providers for instant access to property and applicant information.",
    lineHeight: 265,
    connectorLeft: "22%",
  },
  {
    icon: FaDatabase,
    title:
      "Auto-fill application forms with verified data to accelerate the loan process.",
    lineHeight: 455,
    connectorLeft: "52%",
  },
  {
    icon: RiUserSearchFill,
    title:
      "Cross-reference and verify applicant-provided information against authoritative databases to catch discrepancies and reduce fraud risk.",
    lineHeight: 265,
    connectorLeft: "62%",
  },
  {
    icon: RiQuestionnaireFill,
    title:
      "Conflicting data sources are clearly displayed to support lender decision-making, with next steps such as automatic rejection, referral, or solicitor confirmation,  determined by the lender’s credit policy and rules.",
    lineHeight: 220,
    connectorLeft: "21%",
  },
];

export default function FetchAutomationDataSlide01() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src="/advanced-slider/section-1/tab-6/bj-tab6-step1-main.svg"
        alt="Fetch automation data — third-party integrations"
      />

      <AdvSliderOverlayImage
        className="absolute top-[8%] left-1/2 -translate-x-1/2"
        src="/advanced-slider/section-1/tab-6/bj-tab6-step1-overlay1.svg"
        alt="Fetch automation data — data provider overlay"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[500px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
