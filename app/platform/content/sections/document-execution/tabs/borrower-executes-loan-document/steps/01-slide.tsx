import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaUsers } from "react-icons/fa";
import { RiKey2Line } from "react-icons/ri";
import { MdConnectWithoutContact } from "react-icons/md";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: MdConnectWithoutContact,
    title:
      "Borrowers can choose and update their witness before completing the signature. ",
    lineHeight: 105,
    connectorLeft: "64.5%",
  },
  {
    icon: FaUsers,
    title:
      "All signatures are time-stamped and recorded for audit and compliance. ",
    lineHeight: 120,
    connectorLeft: "83%",
  },
  {
    icon: RiKey2Line,
    title: "Signed documents remain accessible to the borrower at all times.",
    lineHeight: 220,
    connectorLeft: "23%",
  },
];

export default function BorrowerExecutesLoanDocumentSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-4/tab-2/de-tab2-step1-main.svg"
        alt="Borrower executes the loan document — guided signing"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-0 -right-[4%]"
        blurBackdropClassName="pointer-events-none absolute -inset-2.5 bottom-0 rounded-t-3xl bg-white/20 backdrop-blur-md"
        src="/advanced-slider/section-4/tab-2/de-tab2-step2-overlay.svg"
        alt="Borrower executes the loan document — signing overlay"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[560px] border-2 border-[#499DB8] border-b-0 rounded-t-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
