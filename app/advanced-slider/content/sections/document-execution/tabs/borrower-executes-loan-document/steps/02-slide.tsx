import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export default function BorrowerExecutesLoanDocumentSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-1/tab-5/bj-tab5-step1-main.svg"
        alt="Borrower executes loan document — identity and consent"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={IoShieldCheckmarkOutline}
        title="Identity checks and consent capture are recorded alongside the document so compliance can reconstruct what happened later."
        lineHeight={230}
        connectorLeft="52%"
      />
    </div>
  );
}
