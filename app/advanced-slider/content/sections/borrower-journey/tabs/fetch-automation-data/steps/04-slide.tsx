import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiQuestionnaireFill } from "react-icons/ri";

export default function FetchAutomationDataSlide04() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-6/bj-tab6-step1-main.svg"}
        alt={""}
      />

      <div className="absolute top-[8%] left-1/2 -translate-x-1/2">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-6/bj-tab6-step1-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[500px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={RiQuestionnaireFill}
        title="Conflicting data sources are clearly displayed to support lender decision-making, with next steps such as automatic rejection, referral, or solicitor confirmation,  determined by the lender’s credit policy and rules."
        lineHeight={220}
        connectorLeft="21%"
      />
    </div>
  );
}
