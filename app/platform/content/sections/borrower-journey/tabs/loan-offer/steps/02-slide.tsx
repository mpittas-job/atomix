import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaMoneyBillWave } from "react-icons/fa";

export default function LoanOfferSlide02() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src={"/platform-assets/section-1/tab-2/bj-tab2-step1-main.svg"}
        alt={""}
      />

      <div className="absolute flex gap-4 bottom-[5%] left-[5%]">
        <AdvSliderOverlayImage
          className="relative"
          src="/platform-assets/section-1/tab-2/bj-tab2-step2-overlay1.svg"
          alt=""
          width={700}
          height={300}
          imageClassName="block h-auto max-w-[340px]  border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
        />
        <AdvSliderOverlayImage
          className="relative"
          src="/platform-assets/section-1/tab-2/bj-tab2-step2-overlay2.svg"
          alt=""
          width={700}
          height={300}
          imageClassName="block h-auto max-w-[340px]  border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          enterDelay={0.1}
        />
      </div>

      <AdvSliderTooltip
        icon={FaMoneyBillWave}
        title={
          <>
            <strong className="font-bold">Minimum offer</strong> is generated
            using worst case assumptions based on unacquired information, the
            offer can increase as more information is submitted. <br />
            <strong className="font-bold">Maximum offer</strong> is shown as a
            potential upper bound if the best case assumptions are confirmed.
          </>
        }
        lineHeight={90}
      />
    </div>
  );
}
