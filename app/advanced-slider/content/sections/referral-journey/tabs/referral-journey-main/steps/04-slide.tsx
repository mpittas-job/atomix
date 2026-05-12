import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaCircleCheck } from "react-icons/fa6";

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
        icon={FaCircleCheck}
        title="Decline and withdraw reasons feed partner coaching without exposing PII, improving quality on the next introduction."
        lineHeight={225}
        connectorLeft="42%"
      />
    </div>
  );
}
