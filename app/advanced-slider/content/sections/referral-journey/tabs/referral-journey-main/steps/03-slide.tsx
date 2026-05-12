import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiCheckBadge } from "react-icons/hi2";
import Image from "next/image";

export default function ReferralJourneyMainSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-3/tab-1/rj-tab1-step3-main.svg"}
        alt={"Referral journey — lead submission and pipeline"}
      />

      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step4-main.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="main-img-overlay block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-100"
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
