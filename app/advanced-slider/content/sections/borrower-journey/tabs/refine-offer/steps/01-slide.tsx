import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaMoneyBillWave } from "react-icons/fa";

export default function RefineOfferSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-3/bj-tab3-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <Image
        src="/advanced-slider/section-1/tab-3/bj-tab3-step1-main-2.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-0"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaMoneyBillWave}
        title="The platform dynamically determines which questions, such as property condition, influence the loan amount based on the lenders’ eligibility criteria and responses to earlier questions."
        lineHeight={300}
        connectorLeft="18%"
      />
    </div>
  );
}
