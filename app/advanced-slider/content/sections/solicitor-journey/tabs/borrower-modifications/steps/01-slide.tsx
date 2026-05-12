import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiPencilSquare } from "react-icons/hi2";

export default function BorrowerModificationsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Borrower modifications — change request"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiPencilSquare}
        title="Borrower-led changes are captured as structured requests—what changed, why, and which documents need re-issuing—instead of ad-hoc messages."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
