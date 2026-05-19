import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiLoopLeftLine } from "react-icons/ri";

export default function EligibilitySlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/platform-assets/section-1/tab-4/bj-tab4-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderTooltip
        icon={RiLoopLeftLine}
        title={
          <>
            <strong className="font-bold">
              All rule configuration is no-code and requires no technical
              resources.
            </strong>{" "}
            Changes made by the lender instantly update the application journey
            and decision logic.
          </>
        }
        lineHeight={330}
      />
    </div>
  );
}
