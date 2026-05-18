import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaEnvelope } from "react-icons/fa6";

export default function ReceiveInvitationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab2-step1-main.svg"
        alt="Capital providers — receive invitation"
      />

      <AdvSliderTooltip
        icon={FaEnvelope}
        title="Capital providers receive an email invitation to participate in a loan facility."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
