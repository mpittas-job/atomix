import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export default function TransferFundsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab4-step1-main.svg"
        alt="Capital providers — transfer funds"
      />

      <AdvSliderOverlayImage
        className="absolute top-[24%] left-[50%] -translate-x-1/2"
        src="/advanced-slider/section-6/cp-tab4-step1-overlay.svg"
        alt="Capital providers — transfer funds detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[250px] border-2 border-[#499DB8] rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={FaMoneyBillTransfer}
        title="The platform links the transfer reference to the investment so funding can be automatically reconciled."
        lineHeight={190}
        connectorLeft="20%"
      />
    </div>
  );
}
