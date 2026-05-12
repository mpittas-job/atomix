import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaCircleCheck } from "react-icons/fa6";

export default function BorrowerModificationsSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Borrower modifications — lender acknowledgment"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaCircleCheck}
        title="Once changes are acknowledged, the journey continues with a clean audit trail: who approved, what was superseded, and what remains in force."
        lineHeight={220}
        connectorLeft="40%"
      />
    </div>
  );
}
