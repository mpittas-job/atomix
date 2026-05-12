import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoSearchOutline } from "react-icons/io5";

export default function InformationVerificationSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Information verification — sign-off"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={IoSearchOutline}
        title="A final verification summary ties sources to fields so lenders can sign off with confidence—or request targeted follow-ups in one click."
        lineHeight={220}
        connectorLeft="40%"
      />
    </div>
  );
}
