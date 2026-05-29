"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button as DefButton } from "@/components/ui";
import LazySoftAurora from "@/components/backgrounds/LazySoftAurora";

gsap.registerPlugin(ScrollTrigger);

const MISSION_VISION_SCROLL_DISTANCE_MULTIPLIER = 2.5;
const FALLBACK_HEADER_OFFSET_PX = 110;

function getHeaderOffsetPx() {
  if (typeof window === "undefined") return FALLBACK_HEADER_OFFSET_PX;

  // Prefer the app-wide header CSS var (used elsewhere in the codebase).
  const rootStyle = getComputedStyle(document.documentElement);
  const raw = rootStyle.getPropertyValue("--header-height").trim();

  if (raw) {
    const num = Number.parseFloat(raw);
    if (!Number.isNaN(num)) {
      if (raw.endsWith("rem")) {
        const rootFontSize = Number.parseFloat(
          getComputedStyle(document.documentElement).fontSize || "16",
        );
        return Math.round(num * (Number.isNaN(rootFontSize) ? 16 : rootFontSize));
      }

      // Covers px and any other numeric-ish value we can treat as px.
      return Math.round(num);
    }
  }

  // Fallback to a real header element if present.
  const headerEl = document.querySelector("header");
  const headerRect = headerEl?.getBoundingClientRect();
  if (headerRect?.height) return Math.round(headerRect.height);

  return FALLBACK_HEADER_OFFSET_PX;
}

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

const MISSION_DESCRIPTION_LINES = [
  "Rebuild UK property lending. Start with bridging.",
  "Extend into specialist term loans and beyond — same infrastructure, no rebuild.",
] as const;

const VISION_DESCRIPTION_LINES = [
  "One ecosystem. Every stakeholder connected.",
  "Property lending transformed — starting in the UK, built for international scale."
] as const;

interface MissionVisionCardProps {
  cardRef: RefObject<HTMLDivElement | null>;
  title: string;
  descriptionLines: readonly string[];
}

function MissionVisionCard({
  cardRef,
  title,
  descriptionLines,
}: MissionVisionCardProps) {
  return (
    <div
      ref={cardRef}
      className="absolute left-1/2 top-1/2 w-full max-w-[1900px] -translate-x-1/2 -translate-y-1/2 px-6 py-10 text-left flex flex-col justify-center gap-5 md:px-32 md:py-8 opacity-0"
      style={{ visibility: "hidden" }}
    >
      <h3 className="text-6xl font-medium uppercase leading-[1.05] md:text-[80px]">
        {renderTypewriterTitle(title)}
      </h3>
      <div data-mission-vision-item className="w-full h-px bg-white/16 mb-3" />
      <div
        data-mission-vision-item
        className="text-xl leading-8 mb-6 md:text-3xl md:leading-10"
      >
        {descriptionLines.map((line, index) => (
          <span
            key={index}
            className="block"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>
      <div data-mission-vision-item>
        <DefButton href="/about-us" size="large">
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mql.matches);
    const update = () => setIsMobile(mql.matches);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

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

    const mm = gsap.matchMedia();

    let tl: gsap.core.Timeline | null = null;

    const buildTimeline = (start: string) => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start,
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

      return tl;
    };

    const startBelowHeader = () => `top top+=${getHeaderOffsetPx()}px`;

    // Mobile + tablet (and really all sizes) should pin right below the header.
    mm.add("all", () => buildTimeline(startBelowHeader()));

    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[calc(100svh-var(--header-height,110px))] bg-white flex flex-col justify-center px-0 pt-12 pb-22 md:px-0 lg:min-h-[calc(100svh-var(--header-height,110px))]"
    >
      <div className="relative flex w-full min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-none bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] text-white">
        <LazySoftAurora
          className="absolute top-0 left-0 h-[500px] w-full"
          speed={1.3}
          scale={1.2}
          brightness={isMobile ? 0.35 : 0.65}
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

        <div className="relative min-h-[520px] w-full md:min-h-[420px]">
          <MissionVisionCard
            cardRef={missionCardRef}
            title="Mission"
            descriptionLines={MISSION_DESCRIPTION_LINES}
          />

          <MissionVisionCard
            cardRef={visionCardRef}
            title="Vision"
            descriptionLines={VISION_DESCRIPTION_LINES}
          />
        </div>
      </div>
    </section>
  );
}
