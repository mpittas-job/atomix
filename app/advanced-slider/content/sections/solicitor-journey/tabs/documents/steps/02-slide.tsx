import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiFoldersFill } from "react-icons/ri";

export default function DocumentsSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-3/sj-tab3-step1-main.svg"}
        alt={"Documents — request and upload pack"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[15%] -right-[5%]"
        src="/advanced-slider/section-2/tab-3/sj-tab3-step2-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[500px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={RiFoldersFill}
        title="Atomix can provide a centralised and secure hub for documents during the preparation, due diligence and completion phases of a transaction."
        lineHeight={115}
        connectorLeft="60%"
      />
    </div>
  );
}
