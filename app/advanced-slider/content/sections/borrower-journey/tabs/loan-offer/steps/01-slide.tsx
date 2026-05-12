import Image from "next/image";
import AdvSliderTooltip from "@/components/AdvSliderTooltip";
import { FaClock } from "react-icons/fa6";

export default function LoanOfferSlide01() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-2/bj-tab2-step1-main.svg"
        alt=""
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />

      <AdvSliderTooltip
        icon={FaClock}
        title={
          <>
            <strong className="font-bold">Fast:</strong> Each stage of the
            borrower journey takes only a few minutes, enabling faster
            completion compared to traditional lending processes.
          </>
        }
        lineHeight={475}
      />
    </div>
  );
}
