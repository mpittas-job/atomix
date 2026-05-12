import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaClock } from "react-icons/fa6";

export default function GetStartedSlide04() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src="/advanced-slider/section-1/tab-1/bj-tab1-step3-main.svg"
        alt="Get started — handoff to eligibility"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[13%] left-[5%]"
        src="/advanced-slider/section-1/tab-1/bj-tab1-step4-overlay.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[660px]  border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={FaClock}
        title={
          <>
            <strong className="font-bold">No re-keying:</strong> Enter
            information once and have it automatically applied across the flow,
            reducing repetition and saving time.
          </>
        }
        lineHeight={170}
      />
    </div>
  );
}
