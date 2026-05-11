import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { TbProgressCheck } from "react-icons/tb";

export default function GetStartedSlide01() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-1/bj-tab1-step1-main.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <div className="absolute bottom-[30%] left-[3%]">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-1/bj-tab1-step1-overlay.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[700px]  border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-2xl relative"
          quality={100}
          priority
        />
      </div>

      <div className="absolute top-[70%] left-[50%] translate-x-[-50%]">
        <AdvSliderTooltip
          icon={TbProgressCheck}
          title="If at this stage the responses show the applicant is ineligible they are prevented from progressing."
          lineHeight={190}
        />
      </div>
    </div>
  );
}
