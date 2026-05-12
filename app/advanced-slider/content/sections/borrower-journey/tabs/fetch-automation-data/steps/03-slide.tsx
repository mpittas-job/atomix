import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiUserSearchFill } from "react-icons/ri";

export default function FetchAutomationDataSlide03() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-6/bj-tab6-step1-main.svg"
        alt=""
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
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
        icon={RiUserSearchFill}
        title="Cross-reference and verify applicant-provided information against authoritative databases to catch discrepancies and reduce fraud risk."
        lineHeight={265}
        connectorLeft="62%"
      />
    </div>
  );
}
