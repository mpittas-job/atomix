import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { TbFileDownloadFilled } from "react-icons/tb";

export default function SignatureRequestSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-4/tab-1/de-tab1-step1-main.svg"
        alt="Signature request — issue signing pack"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <div className="absolute bottom-0 -right-[4%]">
        <div className="absolute -inset-2.5 bottom-0 rounded-t-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-4/tab-1/de-tab1-step1-overlay.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[270px] border-2 border-[#499DB8] border-b-0 rounded-t-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={TbFileDownloadFilled}
        title="Legal charge downloaded and handled directly by the solicitor."
        lineHeight={235}
        connectorLeft="1.5%"
      />
    </div>
  );
}
