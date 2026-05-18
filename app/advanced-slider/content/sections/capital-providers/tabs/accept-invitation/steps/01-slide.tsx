import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaHandshake } from "react-icons/fa6";

export default function AcceptInvitationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab3-step1-main.svg"
        alt="Capital providers — accept invitation"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[15%] -right-[5%]"
        src="/advanced-slider/section-6/cp-tab3-step1-overlay.svg"
        alt="Capital providers — accept invitation detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[560px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={FaHandshake}
        title="Capital providers review invitation details and accept to join the loan process."
        lineHeight={80}
      />
    </div>
  );
}
