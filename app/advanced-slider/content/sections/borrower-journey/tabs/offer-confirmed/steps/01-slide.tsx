import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function OfferConfirmedSlide01() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-7/bj-tab7-step1-main.svg"
        alt=""
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
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
