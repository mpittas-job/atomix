import Image from "next/image";

export default function ReferralJourneyMainSlide03() {
  return (
    <div className="w-full min-w-0 relative">
      <Image
        src="/advanced-slider/section-3/tab-1/rj-tab1-step3-main.svg"
        alt="Referral journey — lead submission and pipeline"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain rounded-t-2xl"
        quality={100}
        priority
      />
    </div>
  );
}
