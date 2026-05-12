import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaMoneyBillWave } from "react-icons/fa";

export default function RefineOfferSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-3/bj-tab3-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderOverlayImage
        className="absolute right-9 top-25"
        src="/advanced-slider/section-1/tab-3/bj-tab3-step2-overlay1.svg"
        alt=""
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[290px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderOverlayImage
        className="absolute -right-10 top-55"
        src="/advanced-slider/section-1/tab-3/bj-tab3-step2-overlay2.svg"
        alt=""
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[290px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
        enterDelay={0.08}
      />

      <AdvSliderTooltip
        icon={FaMoneyBillWave}
        title="The offer remains visible throughout the application journey and updates dynamically as additional information is provided."
        lineHeight={215}
        connectorLeft="78%"
      />
    </div>
  );
}
