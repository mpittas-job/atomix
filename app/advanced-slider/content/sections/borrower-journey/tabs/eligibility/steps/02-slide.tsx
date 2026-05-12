import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { PiListChecksFill } from "react-icons/pi";

export default function EligibilitySlide02() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-1/tab-4/bj-tab4-step1-main.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <div className="absolute top-[18%] right-[2%]">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-4/bj-tab4-step2-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={700}
          height={300}
          className="block h-auto max-w-[310px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

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
