import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaMoneyBillWave } from "react-icons/fa";

export default function RefineOfferSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-1/tab-3/bj-tab3-step1-main.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <div className="absolute right-9 top-25">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-3/bj-tab3-step2-overlay1.svg"
          alt=""
          width={700}
          height={300}
          className="block h-auto max-w-[290px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <div className="absolute -right-10 top-55">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-3/bj-tab3-step2-overlay2.svg"
          alt=""
          width={700}
          height={300}
          className="block h-auto max-w-[290px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={FaMoneyBillWave}
        title="The offer remains visible throughout the application journey and updates dynamically as additional information is provided."
        lineHeight={215}
        connectorLeft="78%"
      />
    </div>
  );
}
