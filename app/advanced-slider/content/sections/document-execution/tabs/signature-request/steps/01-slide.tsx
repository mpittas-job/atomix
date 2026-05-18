import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaSignature } from "react-icons/fa6";
import { RiFoldersFill } from "react-icons/ri";
import { TbFileDownloadFilled } from "react-icons/tb";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: RiFoldersFill,
    title: "All documents are tracked and logged on the platform.",
    lineHeight: 330,
    connectorLeft: "32%",
  },
  {
    icon: FaSignature,
    title:
      "DocuSign can be used for all borrower and solicitor signatures where permitted.",
    lineHeight: 340,
    connectorLeft: "49%",
  },
  {
    icon: TbFileDownloadFilled,
    title: "Legal charge downloaded and handled directly by the solicitor.",
    lineHeight: 235,
    connectorLeft: "1.5%",
  },
];

export default function SignatureRequestSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-4/tab-1/de-tab1-step1-main.svg"
        alt="Signature request — issue signing pack"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-0 -right-[4%]"
        blurBackdropClassName="pointer-events-none absolute -inset-2.5 bottom-0 rounded-t-3xl bg-white/20 backdrop-blur-md"
        src="/advanced-slider/section-4/tab-1/de-tab1-step1-overlay.svg"
        alt="Signature request — signing pack overlay"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[270px] border-2 border-[#499DB8] border-b-0 rounded-t-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}

