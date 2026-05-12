import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaUserPen } from "react-icons/fa6";

export default function BorrowerExecutesLoanDocumentSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Borrower executes loan document — guided signing"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaUserPen}
        title="The borrower completes execution inside a guided flow with clear field validation and lender-defined signing rules."
        lineHeight={215}
        connectorLeft="28%"
      />
    </div>
  );
}
