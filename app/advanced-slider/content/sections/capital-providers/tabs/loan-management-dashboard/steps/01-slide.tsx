import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { MdDashboard } from "react-icons/md";

export default function LoanManagementDashboardSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab8-step1-main.svg"
        alt="Capital providers — loan management dashboard"
      />

      <Image
        src="/advanced-slider/section-6/cp-tab8-step1-main2.svg"
        alt="Capital providers — loan management dashboard detail"
        width={1984}
        height={996}
        className="main-img-overlay block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-0"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={MdDashboard}
        title="Capital providers access a dedicated dashboard for portfolio visibility and loan management."
        lineHeight={350}
        connectorLeft="40%"
      />
    </div>
  );
}
