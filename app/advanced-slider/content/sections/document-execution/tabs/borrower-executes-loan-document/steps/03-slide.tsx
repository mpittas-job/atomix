import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaCircleCheck } from "react-icons/fa6";

export default function BorrowerExecutesLoanDocumentSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-1/tab-6/bj-tab6-step1-main.svg"
        alt="Borrower executes loan document — completion and filing"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaCircleCheck}
        title="On completion, executed artefacts are sealed, indexed, and made available to the next milestones without manual re-upload."
        lineHeight={220}
        connectorLeft="38%"
      />
    </div>
  );
}
