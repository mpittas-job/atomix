import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoDocumentText } from "react-icons/io5";

export default function DocumentsSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Documents — review and versioning"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={IoDocumentText}
        title="Each document can carry version history, reviewer comments, and approval states so nothing gets lost between firm and lender."
        lineHeight={170}
        connectorLeft="33%"
      />
    </div>
  );
}
