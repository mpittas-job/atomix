import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { MdConnectWithoutContact } from "react-icons/md";

export default function BorrowerExecutesLoanDocumentSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-4/tab-2/de-tab2-step1-main.svg"}
        alt={"Signature request — issue signing pack"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-0 -right-[4%]"
        blurBackdropClassName="pointer-events-none absolute -inset-2.5 bottom-0 rounded-t-3xl bg-white/20 backdrop-blur-md"
        src="/advanced-slider/section-4/tab-2/de-tab2-step2-overlay.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[560px] border-2 border-[#499DB8] border-b-0 rounded-t-xl relative"
      />

      <AdvSliderTooltip
        icon={MdConnectWithoutContact}
        title="Borrowers can choose and update their witness before completing the signature. "
        lineHeight={105}
        connectorLeft="64.5%"
      />
    </div>
  );
}
