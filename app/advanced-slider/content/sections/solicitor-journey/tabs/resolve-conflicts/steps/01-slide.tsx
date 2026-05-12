import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiScale } from "react-icons/hi2";

export default function ResolveConflictsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Resolve conflicts — matter and party conflicts"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiScale}
        title="Conflict checks are logged with outcomes and rationale so firms can evidence compliance and lenders can see why a matter paused or continued."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
