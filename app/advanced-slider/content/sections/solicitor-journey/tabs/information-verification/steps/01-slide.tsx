import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaListCheck } from "react-icons/fa6";

export default function InformationVerificationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-4/sj-tab3-step3-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <Image
        src="/advanced-slider/section-2/tab-4/sj-tab3-step3-main2.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-100"
        quality={100}
        priority
      />

      <div className="absolute bottom-[15%] -left-[4%] opacity-100">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-2/tab-4/sj-tab2-step3-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={820}
          height={300}
          className="block h-auto max-w-[700px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={FaListCheck}
        title="The lender determines which verification methods are acceptable and who is authorised to validate specific information. "
        lineHeight={355}
        connectorLeft="34%"
      />
    </div>
  );
}
