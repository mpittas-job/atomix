"use client";

import Image from "next/image";
import { Button as DefButton } from "@/components/ui";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { useBookDemoModal } from "@/components/BookDemoModalProvider";

export default function MobileHero() {
  const { openBookDemoModal } = useBookDemoModal();

  return (
    <div className="mx-auto w-full max-w-[1920px] px-4">
      <section className="relative flex min-h-[calc(100svh-var(--header-height,5.5rem)-(var(--hero-y-gap,1rem)*2))] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#014355] to-[#247691]">
        <div className="pointer-events-none absolute inset-0 z-0 min-h-full min-w-full">
          <SoftAurora
            speed={1.3}
            scale={1.2}
            brightness={0.65}
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

        <div className="relative z-10 flex flex-col items-center gap-6 px-5 pt-10 pb-6 text-center text-white">
          <Image
            src="/logo/atomix-logo-big-white.svg"
            alt="Atomix Logo"
            width={200}
            height={60}
            className="h-auto w-[130px]"
            priority
          />

          <h1 className="max-w-[320px] text-[1.75rem] font-semibold leading-[1.2]">
            Platform-as-a-Service{" "}
            <span className="text-[#5BC7E4]">Automating Lending End-to-End</span>
          </h1>

          <DefButton size="large" onClick={openBookDemoModal}>
            Contact Us
          </DefButton>
        </div>

        <div className="relative z-10 mt-auto w-full px-4 pb-6">
          <div className="relative mx-auto w-full max-w-[360px]">
            <Image
              src="/dashboard/hero-desktop-img.svg"
              alt="Atomix desktop dashboard preview"
              width={1200}
              height={800}
              className="w-full select-none object-contain pl-[12%]"
              priority
            />

            <Image
              src="/dashboard/hero-mobile-img.svg"
              alt="Atomix mobile form preview"
              width={300}
              height={600}
              className="absolute bottom-2 left-0 w-[30%] select-none object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
