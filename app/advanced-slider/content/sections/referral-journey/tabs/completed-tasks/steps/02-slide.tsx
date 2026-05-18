import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { HiCheckBadge } from "react-icons/hi2";

export default function CompletedTasksSlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src="/advanced-slider/section-3/tab-2/rj-tab2-step2-main.svg"
        alt="Completed tasks — completed items"
      />

      <AdvSliderTooltip
        icon={HiCheckBadge}
        title="The lender reviews the case and can approve, adjust, or reject the application, with any changes reflected instantly on the platform."
        lineHeight={200}
      />
    </div>
  );
}
