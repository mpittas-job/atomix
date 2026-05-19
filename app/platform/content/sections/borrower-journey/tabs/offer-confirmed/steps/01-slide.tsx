import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function OfferConfirmedSlide01() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src={"/platform-assets/section-1/tab-7/bj-tab7-step1-main.svg"}
        alt={""}
      />

      <AdvSliderTooltip
        icon={IoIosCheckmarkCircle}
        title="Once the offer is confirmed, the system prompts the borrower to invite a solicitor."
        lineHeight={70}
        connectorLeft="33%"
      />
    </div>
  );
}
