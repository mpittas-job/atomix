import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiCheckBadge } from "react-icons/hi2";

export default function ReferralJourneyMainSlide04() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-3/tab-1/rj-tab1-step4-main.svg"}
        alt={"Referral journey — decline and withdraw reasons"}
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
