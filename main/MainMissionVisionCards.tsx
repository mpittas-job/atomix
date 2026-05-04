"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button as DefButton } from "@/components/ui";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

const MISSION_VISION_SCROLL_DISTANCE_MULTIPLIER = 2.5;

function renderTypewriterTitle(title: string) {
  const lines = [title];
  return lines.map((line, lineIdx) => (
    <span key={lineIdx} className="block leading-[1.05]">
      {Array.from(line).map((ch, i) => (
        <span
          key={`${lineIdx}-${i}`}
          data-mission-vision-type-char
          className="inline-block opacity-0"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  ));
}

interface MissionVisionCardProps {
  cardRef: RefObject<HTMLDivElement | null>;
  title: string;
  description: string;
}

function MissionVisionCard({
  cardRef,
  title,
  description,
}: MissionVisionCardProps) {
  return (
    <div
      ref={cardRef}
      className="absolute left-1/2 top-1/2 -translate-1/2 md:p-8 text-left flex flex-col justify-center gap-5 w-5xl"
    >
      <h3 className="text-[80px] font-semibold uppercase leading-[1.05]">
        {renderTypewriterTitle(title)}
      </h3>
      <div data-mission-vision-item className="w-full h-px bg-white/16 mb-3" />
      <div data-mission-vision-item className="text-base md:text-3xl leading-relaxed mb-6">
        {description}
      </div>
      <div data-mission-vision-item>
        <DefButton href="#" size="large">
          Learn More
        </DefButton>
      </div>
    </div>
  );
}

export default function MainMissionVisionCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const missionCardRef = useRef<HTMLDivElement>(null);
  const visionCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const missionCard = missionCardRef.current;
    const visionCard = visionCardRef.current;

    if (!section || !missionCard || !visionCard) return;

    const missionChars = missionCard.querySelectorAll<HTMLElement>(
      "[data-mission-vision-type-char]",
    );
    const missionItems = missionCard.querySelectorAll<HTMLElement>(
      "[data-mission-vision-item]",
    );
    const visionChars = visionCard.querySelectorAll<HTMLElement>(
      "[data-mission-vision-type-char]",
    );
    const visionItems = visionCard.querySelectorAll<HTMLElement>(
      "[data-mission-vision-item]",
    );

    gsap.set(missionCard, { autoAlpha: 0 });
    gsap.set(visionCard, { autoAlpha: 0 });
    gsap.set(missionChars, { opacity: 0 });
    gsap.set(visionChars, { opacity: 0 });
    gsap.set(missionItems, { y: 40, opacity: 0 });
    gsap.set(visionItems, { y: 40, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top+=110px",
        end: () =>
          `+=${section.offsetHeight * MISSION_VISION_SCROLL_DISTANCE_MULTIPLIER}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      missionCard,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
      0,
    )
      .to(
        missionChars,
        {
          opacity: 1,
          duration: 0.06,
          ease: "none",
          stagger: 0.095,
        },
        0,
      )
      .to(
        missionItems,
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power2.out",
          stagger: 0.28,
        },
        0.45,
      )
      .addLabel("visionVisible", 2.4)
      .to(
        missionItems,
        {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.05,
        },
        "visionVisible",
      )
      .to(
        missionChars,
        {
          opacity: 0,
          duration: 0.03,
          ease: "none",
          stagger: { each: 0.018, from: "end" },
        },
        "visionVisible+=0.05",
      )
      .to(
        missionCard,
        { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" },
        "visionVisible+=0.3",
      )
      .fromTo(
        visionCard,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.55, ease: "power2.inOut" },
        "visionVisible+=0.3",
      )
      .to(
        visionChars,
        {
          opacity: 1,
          duration: 0.06,
          ease: "none",
          stagger: 0.095,
        },
        "visionVisible+=1.15",
      )
      .to(
        visionItems,
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power2.out",
          stagger: 0.28,
        },
        "visionVisible+=1.7",
      )
      .to({}, { duration: 1 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100vh-110px)] bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center"
    >
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

      <div className="relative w-full max-w-[1200px] min-h-[520px] md:min-h-[420px] text-white">
        <MissionVisionCard
          cardRef={missionCardRef}
          title="Mission"
          description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
        />

        <MissionVisionCard
          cardRef={visionCardRef}
          title="Vision"
          description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
        />
      </div>
    </section>
  );
}
