import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { MdEditDocument } from "react-icons/md";
import { HiDocumentCheck } from "react-icons/hi2";
import { PiChartLineUpBold } from "react-icons/pi";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: MdEditDocument,
    title:
      "Borrowers can request and arrange loan extensions, renewals, partial repayments, etc. Subject to the lender's rules, these can be dealt with automatically, or as a referral.",
    lineHeight: 430,
    connectorLeft: "80%",
  },
  {
    icon: HiDocumentCheck,
    title:
      "Borrowers can generate redemption statements instantly and submit a redemption request directly through the platform - without needing to contact the lender.",
    lineHeight: 320,
    connectorLeft: "80%",
  },
  {
    icon: PiChartLineUpBold,
    title:
      "Borrowers can access all key documents, review statements, monitor outstanding balances, and see upcoming payments or charges in real time.",
    lineHeight: 225,
    connectorLeft: "29%",
  },
];

export default function BorrowerViewSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-8/bv-tab1-step1-main.svg"
        alt="Loan management — borrower view"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
