import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaFileLines } from "react-icons/fa6";

export default function DocumentsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Documents — request and upload pack"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaFileLines}
        title="Solicitors collect lender-required documents in one place, with clear labels and templates so borrowers know exactly what to provide."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
