import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoMdCloudUpload } from "react-icons/io";

export default function OnboardingSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-1/tab-5/bj-tab5-step1-main.svg"
        alt=""
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={IoMdCloudUpload}
        title="Lenders can decide when KYC, KYB, AML, and additional APIs including credit, fraud, income, affordability, and criminal background checks, etc."
        lineHeight={265}
        connectorLeft="2%"
      />
    </div>
  );
}
