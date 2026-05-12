import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { LuShield } from "react-icons/lu";

export default function ReferralJourneyMainSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step2-main.svg"
        alt="Referral journey — role-based access"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={LuShield}
        title="Role-based access keeps referrer visibility appropriate at every stage without oversharing borrower or case detail."
        lineHeight={200}
        connectorLeft="55%"
      />
    </div>
  );
}
