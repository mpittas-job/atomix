import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function BorrowerModificationsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-6/sj-tab-6-step1-main.svg"
        alt="Documents — request and upload pack"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
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
        icon={IoCheckmarkCircleSharp}
        title="Modified data triggers re-verification where required."
        lineHeight={70}
        connectorLeft="5%"
      />
    </div>
  );
}
