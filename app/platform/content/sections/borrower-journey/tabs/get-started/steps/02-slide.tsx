import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltipSequence, {
  type AdvSliderTooltipSequenceStep,
} from "@/components/AdvSliderTooltipSequence";
import { FaClock, FaUserCheck } from "react-icons/fa6";

const TOOLTIP_STEPS: AdvSliderTooltipSequenceStep[] = [
  {
    icon: FaUserCheck,
    title: (
      <>
        <strong className="font-bold">White Labelled:</strong> The interface is
        fully customisable to reflect the lender’s branding, including logo,
        colours, and terminology, ensuring a seamless customer experience.
      </>
    ),
    lineHeight: 525,
    connectorLeft: "20%",
  },
  {
    icon: FaClock,
    title: (
      <>
        <strong className="font-bold">No re-keying:</strong> Enter information
        once and have it automatically applied across the flow, reducing
        repetition and saving time.
      </>
    ),
    lineHeight: 170,
  },
];

export default function GetStartedSlide02() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src="/platform-assets/section-1/tab-1/bj-tab1-step3-main.svg"
        alt="Get started — review indicative offer and account"
      />

      <AdvSliderOverlayImage
        className="absolute bottom-[13%] left-[5%]"
        src="/platform-assets/section-1/tab-1/bj-tab1-step4-overlay.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[660px]  border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltipSequence steps={TOOLTIP_STEPS} />
    </div>
  );
}
