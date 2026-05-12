import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoWarning } from "react-icons/io5";

export default function ResolveConflictsSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Resolve conflicts — exceptions and enquiries"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={IoWarning}
        title="Title and underwriting exceptions route here with clear owners: solicitor, borrower, or lender—so nothing sits in an inbox without an SLA."
        lineHeight={170}
        connectorLeft="33%"
      />
    </div>
  );
}
