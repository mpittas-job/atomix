import AdvSliderMainImage from "@/components/AdvSliderMainImage";
import AdvSliderOverlayImage from "@/components/AdvSliderOverlayImage";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { PiListChecksFill } from "react-icons/pi";

export default function EligibilitySlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <AdvSliderMainImage
        src={"/platform-assets/section-1/tab-4/bj-tab4-step1-main.svg"}
        alt={"Get started — welcome and account setup"}
      />

      <AdvSliderOverlayImage
        className="absolute top-[18%] right-[2%]"
        src="/platform-assets/section-1/tab-4/bj-tab4-step2-overlay1.svg"
        alt="Get started — welcome and account setup"
        width={700}
        height={300}
        imageClassName="block h-auto max-w-[310px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
      />

      <AdvSliderTooltip
        icon={PiListChecksFill}
        title={
          <>
            <strong className="font-bold">Self-serve:</strong> Lenders can
            choose from a prebuilt rules library or define their own eligibility
            criteria. To simplify loan product building, they can drag in
            preconfigured sets of eligibility criteria aligned with lenders’
            credit policy, or start from a simple template and adjust as needed.
          </>
        }
        lineHeight={140}
        connectorLeft="76%"
      />
    </div>
  );
}
