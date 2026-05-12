import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaEnvelope } from "react-icons/fa6";

export default function AcceptInvitationSlide01() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-2/tab-1/sj-tab1-step1-main.svg"
        alt="Accept invitation — solicitor email invitation"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaEnvelope}
        title="The selected solicitor receives an email invitation to join the loan process."
        lineHeight={300}
        connectorLeft="33%"
      />
    </div>
  );
}
