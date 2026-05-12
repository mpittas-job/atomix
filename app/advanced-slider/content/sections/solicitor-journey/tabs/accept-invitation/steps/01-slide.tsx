import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaEnvelope } from "react-icons/fa6";

export default function AcceptInvitationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"}
        alt={"Accept invitation — solicitor email invitation"}
      />

      <AdvSliderTooltip
        icon={FaEnvelope}
        title="The selected solicitor receives an email invitation to join the loan process."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
