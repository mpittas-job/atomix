import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiShieldExclamation } from "react-icons/hi2";

export default function ResolveConflictsSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Resolve conflicts — lender sign-off"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiShieldExclamation}
        title="When lender sign-off is required, the resolution pack bundles evidence and decisions so credit teams can approve or reject with full context."
        lineHeight={220}
        connectorLeft="40%"
      />
    </div>
  );
}
