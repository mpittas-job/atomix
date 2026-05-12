import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { TbFileDownloadFilled } from "react-icons/tb";

export default function SignatureRequestSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-4/tab-1/de-tab1-step1-main.svg"}
        alt={"Signature request — issue signing pack"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-0 -right-[4%]"
        blurBackdropClassName="pointer-events-none absolute -inset-2.5 bottom-0 rounded-t-3xl bg-white/20 backdrop-blur-md"
        src="/advanced-slider/section-4/tab-1/de-tab1-step1-overlay.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[270px] border-2 border-[#499DB8] border-b-0 rounded-t-xl relative"
      />

      <AdvSliderTooltip
        icon={TbFileDownloadFilled}
        title="Legal charge downloaded and handled directly by the solicitor."
        lineHeight={235}
        connectorLeft="1.5%"
      />
    </div>
  );
}
