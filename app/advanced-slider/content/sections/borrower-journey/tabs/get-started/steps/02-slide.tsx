import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function GetStartedSlide02() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-1/bj-tab1-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderTooltip
        icon={HiMiniQuestionMarkCircle}
        title="Borrowers begin their application with a short set of questions to receive an initial indicative offer."
        lineHeight={440}
      />
    </div>
  );
}
