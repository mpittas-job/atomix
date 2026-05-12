import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { RiUserSearchFill } from "react-icons/ri";

export default function SolicitorTasksSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-2/sj-tab2-step1-main.svg"
        alt="Accept invitation — solicitor email invitation"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <div className="absolute bottom-[18%] -left-[5%]">
        <div className="absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md" />
        <Image
          src="/advanced-slider/section-2/tab-2/sj-tab2-step1-overlay1.svg"
          alt="Get started — welcome and account setup"
          width={720}
          height={300}
          className="block h-auto max-w-[720px] border-2 border-[#499DB8] shadow-xl shadow-neutral-500/20 rounded-xl relative"
          quality={100}
          priority
        />
      </div>

      <AdvSliderTooltip
        icon={RiUserSearchFill}
        title="The selected solicitor receives an email invitation to join the loan process."
        lineHeight={490}
        connectorLeft="77%"
      />
    </div>
  );
}
