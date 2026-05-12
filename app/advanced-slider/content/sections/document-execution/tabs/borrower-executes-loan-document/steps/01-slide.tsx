import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FiKey } from "react-icons/fi";

export default function BorrowerExecutesLoanDocumentSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-4/tab-2/de-tab2-step1-main.svg"
        alt="Signature request — issue signing pack"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FiKey}
        title="Signed documents remain accessible to the borrower at all times. "
        lineHeight={215}
        connectorLeft="2%"
      />
    </div>
  );
}
