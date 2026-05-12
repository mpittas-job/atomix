import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiShieldExclamation } from "react-icons/hi2";

export default function InformationVerificationSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Information verification — discrepancies"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiShieldExclamation}
        title="When data conflicts, the workflow captures what differs, why it matters, and what evidence is needed—so exceptions are actionable, not vague."
        lineHeight={170}
        connectorLeft="33%"
      />
    </div>
  );
}
