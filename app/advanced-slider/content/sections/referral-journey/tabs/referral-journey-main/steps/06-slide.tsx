import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { TbReportAnalytics } from "react-icons/tb";

export default function ReferralJourneyMainSlide06() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step1-main.svg"
        alt="Referral journey — performance and compliance views"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={TbReportAnalytics}
        title="Exportable performance views support partner QBRs and compliance, with filters that respect data minimisation."
        lineHeight={205}
        connectorLeft="65%"
      />
    </div>
  );
}
