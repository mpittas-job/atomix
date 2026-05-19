import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function EligibilitySlide04() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/platform-assets/section-1/tab-4/bj-tab4-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
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
