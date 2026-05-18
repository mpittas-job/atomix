import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { IoDocumentText } from "react-icons/io5";

export default function ReviewTasksSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-3/tab-3/rj-tab3-step1-main.svg"
        alt="Review tasks — task review"
      />

      <AdvSliderTooltip
        icon={IoDocumentText}
        title="Updated documents are generated automatically, the solicitor is notified to reissue them for signing, and once executed, the process resumes."
        lineHeight={200}
      />
    </div>
  );
}
