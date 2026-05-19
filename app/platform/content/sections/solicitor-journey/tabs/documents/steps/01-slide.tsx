import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiLoopLeftLine } from "react-icons/ri";

export default function DocumentsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/platform-assets/section-2/tab-3/sj-tab3-step1-main.svg"}
        alt={"Documents — request and upload pack"}
      />

      <AdvSliderTooltip
        icon={RiLoopLeftLine}
        title="Documents are issued in draft format if required information is not yet complete or verified, and automatically update as the case progresses."
        lineHeight={275}
        connectorLeft="1.5%"
      />
    </div>
  );
}
