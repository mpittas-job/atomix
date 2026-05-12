import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiMoneyPoundCircleLine } from "react-icons/ri";

export default function ReferralJourneyMainSlide05() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step5-main.svg"
        alt="Referral journey — accruals and payouts"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={RiMoneyPoundCircleLine}
        title="Accruals and payouts tied to funded milestones reduce disputes and keep finance, legal, and partners aligned."
        lineHeight={215}
        connectorLeft="50%"
      />
    </div>
  );
}
