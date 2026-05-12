import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoDocumentText } from "react-icons/io5";

export default function AcceptInvitationSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"}
        alt={"Accept invitation — invitation details and lender context"}
      />

      <AdvSliderTooltip
        icon={IoDocumentText}
        title="The email can include the lender’s name and key property information customized to the lender's requirements, allowing the solicitor to identify the request from a trusted lender with whom they have already onboarded. "
        lineHeight={170}
        connectorLeft="33%"
      />
    </div>
  );
}
