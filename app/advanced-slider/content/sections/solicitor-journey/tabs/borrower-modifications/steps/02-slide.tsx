import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaListCheck } from "react-icons/fa6";

export default function BorrowerModificationsSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-6/sj-tab-6-step1-main.svg"}
        alt={"Documents — request and upload pack"}
      />

      <div className="absolute bottom-[8%] -left-[5%]">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-2/tab-6/sj-tab6-step1-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[560px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={FaListCheck}
        title="Atomix can shift the responsibility for resolving and re-verifying changes either to the borrower or the solicitor, subject to the lender's rules, streamlining the process without consuming lender time while ensuring accuracy."
        lineHeight={70}
        connectorLeft="5%"
      />
    </div>
  );
}
