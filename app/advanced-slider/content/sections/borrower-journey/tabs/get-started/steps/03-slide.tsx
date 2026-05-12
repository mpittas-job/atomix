import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaUserCheck } from "react-icons/fa6";

export default function GetStartedSlide03() {
  return (
    <div className="w-full min-w-0">
      <AdvSliderMainImage
        src="/advanced-slider/section-1/tab-1/bj-tab1-step3-main.svg"
        alt="Get started — review indicative offer and account"
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
        lineHeight={525}
        connectorLeft="20%"
      />
    </div>
  );
}
