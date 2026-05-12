import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaClipboardCheck } from "react-icons/fa6";

export default function SolicitorTasksSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Solicitor tasks — completion and evidence"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaClipboardCheck}
        title="Completed tasks can carry notes, attachments, and timestamps so lenders can audit progress without chasing email threads."
        lineHeight={170}
        connectorLeft="33%"
      />
    </div>
  );
}
