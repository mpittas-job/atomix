import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiCheckBadge } from "react-icons/hi2";

export default function DocumentsSlide05() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-3/sj-tab3-step3-main2.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <div className="absolute bottom-[15%] -left-[4%] opacity-100">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-2/tab-3/sj-tab2-step3-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={820}
          height={300}
          className="block h-auto max-w-[700px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={HiCheckBadge}
        title="Solicitors can verify information submitted by the borrower or provide new verified data - including details obtained from third parties."
        lineHeight={190}
        connectorLeft="7%"
      />
    </div>
  );
}
