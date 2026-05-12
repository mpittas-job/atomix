import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiShieldCheck } from "react-icons/hi2";

export default function InformationVerificationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Information verification — identity and matter checks"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiShieldCheck}
        title="Solicitors verify borrower, property, and title facts against lender rules—surfacing pass/fail signals early before underwriting wastes cycles."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
