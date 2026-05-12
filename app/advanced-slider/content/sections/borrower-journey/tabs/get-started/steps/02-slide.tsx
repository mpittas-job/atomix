import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function GetStartedSlide02() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-1/bj-tab1-step2-main.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiMiniQuestionMarkCircle}
        title="Borrowers begin their application with a short set of questions to receive an initial indicative offer."
        lineHeight={420}
      />
    </div>
  );
}
