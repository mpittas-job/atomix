import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaBalanceScale } from "react-icons/fa";

export default function InviteSolicitorSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-1/tab-8/bj-tab8-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <Image
        src="/advanced-slider/section-1/tab-8/bj-tab8-step1-main2.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="main-img-overlay block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-0"
        quality={100}
        priority
      />

      <Image
        src="/advanced-slider/section-1/tab-8/bj-tab8-step1-main3.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="main-img-overlay block h-auto rounded-t-2xl absolute left-0 bottom-0 opacity-0"
        quality={100}
        priority
      />

      <div className="absolute bottom-[10%] -left-[5%]">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-8/bj-tab8-step1-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={820}
          height={300}
          className="block h-auto max-w-[740px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={FaBalanceScale}
        title="Option for dual or single-party representation, as defined by the lender."
        lineHeight={255}
        connectorLeft="41%"
      />
    </div>
  );
}
