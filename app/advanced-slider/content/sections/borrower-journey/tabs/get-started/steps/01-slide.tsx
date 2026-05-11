import Image from "next/image";

export default function GetStartedSlide01() {
  return (
    <div className="w-full min-w-0">
      <Image
        src="/advanced-slider/section-1/tab-1/bj-tab1-step-1.svg"
        alt="Get started — welcome and account setup"
        width={1984}
        height={996}
        className="block h-auto w-full max-w-none object-contain"
        quality={100}
        priority
      />
    </div>
  );
}
