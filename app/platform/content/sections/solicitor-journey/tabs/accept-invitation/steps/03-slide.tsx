import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaLink } from "react-icons/fa6";

export default function AcceptInvitationSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderOverlayImage
        className="absolute bottom-0 -right-[2%]"
        blurBackdropClassName="pointer-events-none absolute -inset-2.5 bottom-0 rounded-t-3xl bg-white/20 backdrop-blur-md"
        src="/advanced-slider/section-2/tab-1/sj-tab1-step3-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[380px] border-2 border-[#499DB8] border-b-0 rounded-t-xl relative"
      />

      <AdvSliderTooltip
        icon={FaLink}
        title="Solicitor clicks a secure link to accept the instruction and access the file."
        lineHeight={60}
        connectorLeft="33%"
      />
    </div>
  );
}
