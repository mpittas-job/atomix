"use client";

import Image from "next/image";
import { Button as DefButton } from "@/components/ui";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { useBookDemoModal } from "@/components/BookDemoModalProvider";

export default function MobileHero() {
  const { openBookDemoModal } = useBookDemoModal();

  return (
    <div className="mx-auto w-full max-w-[1920px] px-4 md:px-12">
      <section className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#014355] to-[#247691]">
        <div className="pointer-events-none absolute inset-0 z-0 min-h-full min-w-full">
          <SoftAurora
            speed={1.3}
            scale={1.2}
            brightness={0.35}
            color1="#78cfe3"
            color2="#87b9d4"
            noiseFrequency={1}
            noiseAmplitude={3.5}
            bandHeight={0.85}
            bandSpread={1}
            octaveDecay={0.12}
            layerOffset={0.5}
            colorSpeed={1}
            enableMouseInteraction={false}
            mouseInfluence={0.2}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5 px-5 pt-10 pb-4 text-center text-white">
          <Image
            src="/logo/atomix-logo-big-white.svg"
            alt="Atomix Logo"
            width={200}
            height={60}
            className="h-auto w-[130px] mb-5"
            priority
          />

          <h1 className="max-w-[320px] text-[1.75rem] font-semibold leading-[1.2]">
            Platform-as-a-Service{" "}
            <span className="text-[#5BC7E4]">Automating Lending End-to-End</span>
          </h1>

          <DefButton onClick={openBookDemoModal} className="mb-7">
            Contact Us
          </DefButton>
        </div>

        <div className="relative z-10 mt-auto w-full">
          <div className="relative mx-auto w-full">
            <Image
              src="/dashboard/hero-desktop-img.svg"
              alt="Atomix desktop dashboard preview"
              width={1200}
              height={800}
              className="relative -bottom-6 -right-3 w-full h-auto select-none object-contain pl-[12%]"
              priority
            />

            <div className="absolute -bottom-[8%] left-0 w-[30%] pl-[6%]">
              <Image
                src="/dashboard/hero-mobile-img.svg"
                alt="Atomix mobile form preview"
                width={300}
                height={600}
                className="h-auto w-full select-none object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
