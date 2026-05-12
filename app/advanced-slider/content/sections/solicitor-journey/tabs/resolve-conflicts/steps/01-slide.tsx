import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaHighlighter } from "react-icons/fa";

export default function ResolveConflictsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-5/sj-tab-5-step1-main.svg"}
        alt={"Documents — request and upload pack"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[15%] -left-[5%]"
        src="/advanced-slider/section-2/tab-5/sj-tab5-step1-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[610px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={FaHighlighter}
        title="If there is a discrepancy between borrower-submitted information and solicitors’ response, the platform highlights the conflict and applies the lender’s rules to determine the next step."
        lineHeight={325}
        connectorLeft="5%"
      />
    </div>
  );
}
