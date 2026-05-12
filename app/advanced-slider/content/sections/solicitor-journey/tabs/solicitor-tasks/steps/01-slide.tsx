import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaClipboardList } from "react-icons/fa6";

export default function SolicitorTasksSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Solicitor tasks — work queue and assignments"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaClipboardList}
        title="Solicitors see a structured task list with owners, due dates, and lender-visible milestones so everyone stays aligned on what is next."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
