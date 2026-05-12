import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaUserCheck } from "react-icons/fa6";

export default function GetStartedSlide03() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-1/bj-tab1-step3-main.svg"
        alt="Get started — review indicative offer and account"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
      />

      <AdvSliderTooltip
        icon={FaUserCheck}
        title={
          <>
            <strong className="font-bold">White Labelled:</strong> The interface
            is fully customisable to reflect the lender’s branding, including
            logo, colours, and terminology, ensuring a seamless customer
            experience.
          </>
        }
        lineHeight={510}
        connectorLeft="20%"
      />
    </div>
  );
}
