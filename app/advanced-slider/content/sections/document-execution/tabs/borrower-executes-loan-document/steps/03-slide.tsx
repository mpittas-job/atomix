import Image from "next/image";
import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaUsers } from "react-icons/fa";

export default function BorrowerExecutesLoanDocumentSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/advanced-slider/section-4/tab-2/de-tab2-step1-main.svg"}
        alt={"Signature request — issue signing pack"}
      />

      <div className="absolute bottom-0 -right-[4%]">
        <div className="absolute -inset-2.5 bottom-0 rounded-t-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-4/tab-2/de-tab2-step2-overlay.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[560px] border-2 border-[#499DB8] border-b-0 rounded-t-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={FaUsers}
        title="All signatures are time-stamped and recorded for audit and compliance. "
        lineHeight={120}
        connectorLeft="83%"
      />
    </div>
  );
}
