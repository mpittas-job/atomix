import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function FundsReleaseSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-5/ld-tab4-step1-main.svg"
        alt="Loan drawdown — funds released"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[7%] -left-[3%]"
        src="/advanced-slider/section-5/ld-tab4-step1-overlay.svg"
        alt="Loan drawdown — funds released detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[640px] border-2 border-[#499DB8] rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={IoIosCheckmarkCircle}
        title="Funds are released once all conditions are satisfied and approvals are complete."
        lineHeight={50}
        connectorLeft="50%"
      />
    </div>
  );
}
