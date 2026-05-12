import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaUsers } from "react-icons/fa";

export default function InviteSolicitorSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-8/bj-tab8-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[10%] -left-[5%]"
        src="/advanced-slider/section-1/tab-8/bj-tab8-step1-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={820}
        height={300}
        imageClassName="block h-auto max-w-[740px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={FaUsers}
        title="Borrower selects from a panel of lender-approved solicitors."
        lineHeight={140}
      />
    </div>
  );
}
