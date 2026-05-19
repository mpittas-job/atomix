import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaClock } from "react-icons/fa6";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaBuildingCircleExclamation } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaBuildingCircleCheck,
    title:
      "The platform validates that all pre-drawdown tasks are complete and compliant.",
    lineHeight: 370,
    connectorLeft: "1%",
  },
  {
    icon: FaBuildingCircleExclamation,
    title:
      "Final bankruptcy and priority searches must be confirmed before funds are released.",
    lineHeight: 350,
    connectorLeft: "10%",
  },
  {
    icon: FaMoneyBills,
    title:
      "This marks the formal instruction to the Lender Partner to release funds in accordance with the agreed loan terms.",
    lineHeight: 250,
    connectorLeft: "20%",
  },
];

export default function DrawdownRequestSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-5/ld-tab2-step1-main.svg"
        alt="Loan drawdown — drawdown request"
      />

      <AdvSliderOverlayImage
        className="absolute top-[25%] -left-[3%]"
        src="/platform-assets/section-5/ld-tab2-step1-overlay.svg"
        alt="Loan drawdown — drawdown request detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[680px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
