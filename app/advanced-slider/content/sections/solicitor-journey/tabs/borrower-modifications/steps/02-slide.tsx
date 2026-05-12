import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaFilePen } from "react-icons/fa6";

export default function BorrowerModificationsSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Borrower modifications — document updates"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaFilePen}
        title="Updated drafts and re-signed paperwork stay linked to the original versions so lenders can diff what moved and when it was approved."
        lineHeight={170}
        connectorLeft="33%"
      />
    </div>
  );
}
