import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiOutlineUserGroup } from "react-icons/hi2";

export default function ReferralJourneyMainSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step1-main.svg"
        alt="Referral journey — register introducers and agreements"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiOutlineUserGroup}
        title="Register introducers, agreements, and branding in a governed workflow so every referral starts with clear rules of engagement."
        lineHeight={220}
        connectorLeft="35%"
      />
    </div>
  );
}
