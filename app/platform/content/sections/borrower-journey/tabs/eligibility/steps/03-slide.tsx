import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaEye } from "react-icons/fa";

export default function EligibilitySlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-4/bj-tab4-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderOverlayImage
        className="absolute -right-15 top-20"
        src="/advanced-slider/section-1/tab-4/bj-tab4-step3-overlay2.svg"
        alt=""
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[360px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderOverlayImage
        className="absolute -right-15 top-60"
        src="/advanced-slider/section-1/tab-4/bj-tab4-step3-overlay1.svg"
        alt=""
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[460px] shadow-xl shadow-neutral-500/20 rounded-xl relative"
        enterDelay={0.08}
      />

      <AdvSliderTooltip
        icon={FaEye}
        title={
          <>
            <strong className="font-bold">Transparency:</strong> The platform
            can send automated reminder or prompts to users if information or
            tasks are outstanding, delivering transparency to users and
            improving efficiency.
          </>
        }
        lineHeight={120}
        connectorLeft="66%"
      />
    </div>
  );
}
