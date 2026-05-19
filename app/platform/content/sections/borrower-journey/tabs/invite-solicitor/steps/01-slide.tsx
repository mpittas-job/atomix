import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaBalanceScale, FaUserTie, FaUsers } from "react-icons/fa";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaBalanceScale,
    title:
      "Option for dual or single-party representation, as defined by the lender.",
    lineHeight: 255,
    connectorLeft: "41%",
  },
  {
    icon: FaUsers,
    title: "Borrower selects from a panel of lender-approved solicitors.",
    lineHeight: 140,
  },
  {
    icon: FaUserTie,
    title:
      "The solicitor invited by the borrower must meet the lender’s eligibility criteria before they can participate in the process.",
    lineHeight: 100,
    connectorLeft: "30%",
  },
];

export default function InviteSolicitorSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-1/tab-8/bj-tab8-step1-main.svg"
        alt="Invite solicitor — representation and panel selection"
      />

      <Image
        src="/platform-assets/section-1/tab-8/bj-tab8-step1-main2.svg"
        alt=""
        width={1984}
        height={996}
        className="main-img-overlay block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-0"
        quality={100}
        priority
      />

      <Image
        src="/platform-assets/section-1/tab-8/bj-tab8-step1-main3.svg"
        alt=""
        width={1984}
        height={996}
        className="main-img-overlay block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-0"
        quality={100}
        priority
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[10%] -left-[5%]"
        src="/platform-assets/section-1/tab-8/bj-tab8-step1-overlay1.svg"
        alt="Invite solicitor — solicitor panel overlay"
        width={820}
        height={300}
        imageClassName="block h-auto max-w-[740px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
