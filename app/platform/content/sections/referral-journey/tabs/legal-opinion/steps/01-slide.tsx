import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiProgress3Line } from "react-icons/ri";

export default function LegalOpinionSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-3/tab-1/rj-tab1-step1-main.svg"
        alt="Legal opinion — referral triggered by lender rules"
      />

      <AdvSliderTooltip
        icon={RiProgress3Line}
        title="When a situation arises that requires lender input, as defined by the lender’s rules, the platform automatically triggers a referral, including any supporting documentation."
        lineHeight={320}
      />
    </div>
  );
}
