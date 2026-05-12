import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiCheckBadge } from "react-icons/hi2";

export default function ReferralJourneyMainSlide04() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step4-main.svg"
        alt="Referral journey — decline and withdraw reasons"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiCheckBadge}
        title="The lender reviews the case and can approve, adjust, or reject the application, with any changes reflected instantly on the platform. "
        lineHeight={110}
        connectorLeft="48%"
      />
    </div>
  );
}
