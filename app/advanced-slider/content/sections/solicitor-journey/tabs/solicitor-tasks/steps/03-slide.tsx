import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoMdCheckmark } from "react-icons/io";

export default function SolicitorTasksSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-2/sj-tab2-step1-main.svg"}
        alt={"Accept invitation — solicitor email invitation"}
      />

      <AdvSliderTooltip
        icon={IoMdCheckmark}
        title="Send any Documents for signing via DocuSign."
        lineHeight={470}
        connectorLeft="19%"
        iconColor="#00AE3A"
      />
    </div>
  );
}
