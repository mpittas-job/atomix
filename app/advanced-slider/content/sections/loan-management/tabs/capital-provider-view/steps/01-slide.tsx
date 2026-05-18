import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaHandshake } from "react-icons/fa6";

export default function CapitalProviderViewSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-8/bv-tab3-step1-main.svg"
        alt="Loan management — capital provider view"
      />

      <AdvSliderTooltip
        icon={FaHandshake}
        title="Capital providers have access to a dedicated, fully customised dashboard that offers full transparency into the loans they are funding, customised analysis and reporting."
        lineHeight={320}
        connectorLeft="20%"
      />
    </div>
  );
}
