import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaListCheck } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: IoCheckmarkCircleSharp,
    title: "Modified data triggers re-verification where required.",
    lineHeight: 70,
    connectorLeft: "5%",
  },
  {
    icon: FaListCheck,
    title:
      "Atomix can shift the responsibility for resolving and re-verifying changes either to the borrower or the solicitor, subject to the lender's rules, streamlining the process without consuming lender time while ensuring accuracy.",
    lineHeight: 70,
    connectorLeft: "5%",
  },
];

export default function BorrowerModificationsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-2/tab-6/sj-tab-6-step1-main.svg"
        alt="Borrower modifications — re-verification and responsibility"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[8%] -left-[5%]"
        src="/advanced-slider/section-2/tab-6/sj-tab6-step1-overlay1.svg"
        alt="Borrower modifications — modification overlay"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[560px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
