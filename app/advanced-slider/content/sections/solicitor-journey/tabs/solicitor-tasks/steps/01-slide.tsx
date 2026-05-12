import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiUserSearchFill } from "react-icons/ri";

export default function SolicitorTasksSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-2/sj-tab2-step1-main.svg"}
        alt={"Accept invitation — solicitor email invitation"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[18%] -left-[5%]"
        src="/advanced-slider/section-2/tab-2/sj-tab2-step1-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={720}
        height={300}
        imageClassName="block h-auto max-w-[720px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={RiUserSearchFill}
        title="The selected solicitor receives an email invitation to join the loan process."
        lineHeight={490}
        connectorLeft="77%"
      />
    </div>
  );
}
