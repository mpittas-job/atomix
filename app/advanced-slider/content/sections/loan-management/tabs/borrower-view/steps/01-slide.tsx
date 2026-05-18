import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaUser } from "react-icons/fa6";

export default function BorrowerViewSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-8/bv-tab1-step1-main.svg"
        alt="Loan management — borrower view"
      />

      <AdvSliderTooltip
        icon={FaUser}
        title="Borrowers can request and arrange loan extensions, renewals, partial repayments, etc. Subject to the lender's rules, these can be dealt with automatically, or as a referral."
        lineHeight={410}
        connectorLeft="80%"
      />
    </div>
  );
}
