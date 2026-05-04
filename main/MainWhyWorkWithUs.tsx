"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { Button as DefButton } from "@/components/ui";
import IconBox from "@/components/IconBox";

export default function MainWhyWorkWithUs() {
  const iconBoxContainerRef = useRef<HTMLDivElement>(null);
  const learnMoreRef = useRef<HTMLDivElement>(null);

  // Set initial hidden state
  useGSAP(() => {
    if (iconBoxContainerRef.current) {
      gsap.set(Array.from(iconBoxContainerRef.current.children), {
        opacity: 0,
        y: 30,
      });
    }
    if (learnMoreRef.current) {
      gsap.set(learnMoreRef.current, { opacity: 0, y: 20 });
    }
  });

  const handleHeadingComplete = useCallback(() => {
    const tl = gsap.timeline();

    // IconBox containers fade in up with stagger
    if (iconBoxContainerRef.current) {
      tl.to(
        Array.from(iconBoxContainerRef.current.children),
        {
          opacity: 1,
          y: 0,
          duration: 2.4,
          stagger: 0.6,
          ease: "power2.out",
        },
        "+=0.15",
      );
    }

    // Learn more button fade in up
    if (learnMoreRef.current) {
      tl.to(
        learnMoreRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-[500px]">
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

      <div className="relative z-10 flex flex-col gap-y-12 w-full max-w-[1200px] px-8 py-32">
        <DefHeading
          theme="light"
          badgeText=""
          title="Why Work With Us"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius lorem eget leo vehicula consectetur."
          showBadge={false}
          onAnimationComplete={handleHeadingComplete}
        />

        <div ref={iconBoxContainerRef} className="grid grid-cols-2 gap-4">
          <div>
            <IconBox
              align="left"
              hideIcon
              title="Team"
              titleClassName="!text-2xl"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            />
          </div>
          <div>
            <IconBox
              align="left"
              hideIcon
              title="Values"
              titleClassName="!text-2xl"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            />
          </div>
        </div>

        <div ref={learnMoreRef} className="w-full flex justify-center">
          <DefButton>See Opportunities</DefButton>
        </div>
      </div>
    </div>
  );
}
