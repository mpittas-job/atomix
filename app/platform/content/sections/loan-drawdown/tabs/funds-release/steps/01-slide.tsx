import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { RiUserSearchFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: RiUserSearchFill,
    title:
      "Prior to the drawdown process the lender can request from the platform a credit paper for manual review.",
    lineHeight: 419,
    connectorLeft: "65%",
  },
  {
    icon: FaEdit,
    title:
      "Transfer details are recorded on-platform and visible to all relevant parties.",
    lineHeight: 260,
    connectorLeft: "6%",
  },
  {
    icon: FaMoneyBillTransfer,
    title:
      "Funds are transferred only after all pre-drawdown conditions are satisfied. This can be automated or carried out manually, subject to the lender's preference.",
    lineHeight: 70,
    connectorLeft: "50%",
  },
];

export default function FundsReleaseSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-5/ld-tab4-step1-main.svg"
        alt="Loan drawdown — funds released"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[7%] -left-[3%]"
        src="/platform-assets/section-5/ld-tab4-step1-overlay.svg"
        alt="Loan drawdown — funds released detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[640px] border-2 border-[#499DB8] rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
