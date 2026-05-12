import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaFileSignature } from "react-icons/fa6";

export default function DocumentsSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Documents — exchange and audit trail"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaFileSignature}
        title="When the pack is complete, exchange and signatures are tracked end-to-end—ideal for compliance teams that need a defensible audit trail."
        lineHeight={220}
        connectorLeft="40%"
      />
    </div>
  );
}
