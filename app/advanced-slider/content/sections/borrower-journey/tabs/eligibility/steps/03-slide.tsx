import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { PiListChecksFill } from "react-icons/pi";

export default function EligibilitySlide03() {
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

      <div className="absolute -right-15 top-20">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-4/bj-tab4-step3-overlay2.svg"
          alt=""
          width={700}
          height={300}
          className="block h-auto max-w-[360px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <div className="absolute -right-15 top-60">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-1/tab-4/bj-tab4-step3-overlay1.svg"
          alt=""
          width={700}
          height={300}
          className="block h-auto max-w-[460px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={PiListChecksFill}
        title={
          <>
            <strong className="font-bold">Transparency:</strong> The platform
            can send automated reminder or prompts to users if information or
            tasks are outstanding, delivering transparency to users and
            improving efficiency.
          </>
        }
        lineHeight={120}
        connectorLeft="66%"
      />
    </div>
  );
}
