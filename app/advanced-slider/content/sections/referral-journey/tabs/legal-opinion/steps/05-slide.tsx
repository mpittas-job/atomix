import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoDocumentText } from "react-icons/io5";

export default function LegalOpinionSlide05() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-3/tab-1/rj-tab1-step5-main.svg"
        alt="Legal opinion — updated documents"
      />

      <AdvSliderTooltip
        icon={IoDocumentText}
        title="Updated documents are generated automatically, the solicitor is notified to reissue them for signing, and once executed, the process resumes."
        lineHeight={215}
        connectorLeft="50%"
      />
    </div>
  );
}
