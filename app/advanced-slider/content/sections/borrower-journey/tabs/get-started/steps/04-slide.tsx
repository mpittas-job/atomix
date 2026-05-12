import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaClock } from "react-icons/fa6";

export default function GetStartedSlide04() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-1/bj-tab1-step3-main.svg"
        alt="Get started — handoff to eligibility"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
      />

      <div className="absolute bottom-[13%] left-[5%]">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-1/bj-tab1-step4-overlay.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[660px]  border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={FaClock}
        title={
          <>
            <strong className="font-bold">No re-keying:</strong> Enter
            information once and have it automatically applied across the flow,
            reducing repetition and saving time.
          </>
        }
        lineHeight={170}
      />
    </div>
  );
}
