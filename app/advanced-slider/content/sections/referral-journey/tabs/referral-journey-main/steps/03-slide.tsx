import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { TbChartDots } from "react-icons/tb";

export default function ReferralJourneyMainSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step3-main.svg"
        alt="Referral journey — lead submission and pipeline"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={TbChartDots}
        title="Submit leads with minimal friction and see pipeline status in real time, so partners always know what happens next."
        lineHeight={210}
        connectorLeft="28%"
      />
    </div>
  );
}
