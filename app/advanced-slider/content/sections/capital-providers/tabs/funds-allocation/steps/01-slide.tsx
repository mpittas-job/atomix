import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaChartPie } from "react-icons/fa6";
import { PiListChecksFill } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: PiListChecksFill,
    title:
      "Multiple capital funding structures - including syndicated loans, institutional credit lines, and other capital provider models - with built-in tools for allocation and tracking.",
    lineHeight: 200,
    connectorLeft: "10%",
  },
  {
    icon: FaEdit,
    title: "Full transparency and auditability.",
    lineHeight: 380,
    connectorLeft: "40%",
  },
  {
    icon: MdConnectWithoutContact,
    title:
      "Automatic and reliable enforcement of the capital provider's credit policy.",
    lineHeight: 225,
    connectorLeft: "88%",
  },
  {
    icon: FaChartPie,
    title: "Automated interest and capital distribution.",
    lineHeight: 120,
    connectorLeft: "50%",
  },
];

export default function FundsAllocationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-6/cp-tab7-step1-main.svg"
        alt="Capital providers — funds allocation"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
