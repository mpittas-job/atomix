import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { PiListChecksFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaCircleCheck,
    title:
      "Once all tasks are completed and all eligibility criteria are met and verified, the lender's solicitor initiates the drawdown process.",
    lineHeight: 30,
    connectorLeft: "85%",
  },
  {
    icon: PiListChecksFill,
    title:
      "Drawdown is only enabled once all solicitor tasks and lender rules are satisfied.",
    lineHeight: 400,
    connectorLeft: "10%",
  },
  {
    icon: PiListChecksFill,
    title:
      "The platform checks eligibility, documentation, and any other lender requirements.",
    lineHeight: 220,
    connectorLeft: "88%",
  },
];

export default function PreDrawdownConditionsSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/platform-assets/section-5/ld-tab1-step1-main.svg"
        alt="Loan drawdown — pre-drawdown conditions"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[3%] -right-[5%]"
        src="/platform-assets/section-5/ld-tab1-step1-overlay.svg"
        alt="Loan drawdown — pre-drawdown conditions detail"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[380px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
