import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function EligibilitySlide04() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-1/tab-4/bj-tab4-step1-main.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={IoIosCheckmarkCircle}
        title={
          <>
            <strong className="font-bold">Input compliance rules:</strong>{" "}
            Atomix will ensure all rules (e.g. title insurance, regulatory) are
            accurately adhered to and automatically configure the underwriting
            process.
          </>
        }
        lineHeight={265}
      />
    </div>
  );
}
