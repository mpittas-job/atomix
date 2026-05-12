import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiQueueList } from "react-icons/hi2";

export default function SolicitorTasksSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Solicitor tasks — priorities and dependencies"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={HiQueueList}
        title="Queues and dependencies make it obvious what is blocked—whether waiting on the borrower, lender, or a third party—so SLAs stay predictable."
        lineHeight={220}
        connectorLeft="40%"
      />
    </div>
  );
}
