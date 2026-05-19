import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { TbProgressCheck } from "react-icons/tb";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: TbProgressCheck,
    title:
      "If at this stage the responses show the applicant is ineligible they are prevented from progressing.",
    lineHeight: 200,
  },
  {
    icon: HiMiniQuestionMarkCircle,
    title:
      "Borrowers begin their application with a short set of questions to receive an initial indicative offer.",
    lineHeight: 440,
  },
];

export default function GetStartedSlide01() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src="/platform-assets/section-1/tab-1/bj-tab1-step1-main.svg"
        alt="Get started — welcome and account setup"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[31%] left-[5%]"
        src="/platform-assets/section-1/tab-1/bj-tab1-step1-overlay.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[650px]  border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
