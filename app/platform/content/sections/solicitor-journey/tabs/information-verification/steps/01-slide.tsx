import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaListCheck } from "react-icons/fa6";
import { HiCheckBadge } from "react-icons/hi2";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { RiProgress3Line } from "react-icons/ri";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaListCheck,
    title:
      "The lender determines which verification methods are acceptable and who is authorised to validate specific information. ",
    lineHeight: 355,
    connectorLeft: "34%",
  },
  {
    icon: RiProgress3Line,
    title:
      "Multiple verification methods can be assigned to each required piece of information, including automated data provider checks.",
    lineHeight: 233,
    connectorLeft: "35%",
  },
  {
    icon: HiCheckBadge,
    title:
      "Solicitors can verify information submitted by the borrower or provide new verified data - including details obtained from third parties.",
    lineHeight: 190,
    connectorLeft: "7%",
  },
  {
    icon: IoShieldCheckmarkSharp,
    title:
      "The information verification allows the platform to assess compliance with the lender’s eligibility criteria based on verified inputs.",
    lineHeight: 140,
    connectorLeft: "4%",
  },
];

export default function InformationVerificationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-2/tab-4/sj-tab3-step3-main.svg"
        alt="Information verification — lender verification methods"
      />

      <Image
        src="/advanced-slider/section-2/tab-4/sj-tab3-step3-main2.svg"
        alt=""
        width={1984}
        height={996}
        className="main-img-overlay block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-0"
        quality={100}
        priority
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[15%] -left-[4%]"
        src="/advanced-slider/section-2/tab-4/sj-tab2-step3-overlay1.svg"
        alt="Information verification — verification overlay"
        width={820}
        height={300}
        imageClassName="block h-auto max-w-[700px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
