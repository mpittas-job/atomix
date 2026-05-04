"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DefHeading from "@/components/typo/DefHeading";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";

gsap.registerPlugin(ScrollTrigger);

function getCountParts(value: string) {
  const match = value.match(/^([^\d.-]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return {
      prefix: "",
      target: 0,
      decimals: 0,
    };
  }

  const [, prefix, numericPart] = match;
  const decimals = numericPart.includes(".")
    ? numericPart.split(".")[1].length
    : 0;

  return {
    prefix,
    target: Number(numericPart),
    decimals,
  };
}

function formatCount(value: number, decimals: number) {
  if (decimals === 0) {
    return Math.round(value).toString();
  }

  return value.toFixed(decimals);
}

const MARKET_COUNT_GLOW_CONFIG = {
  glowStrength: 1,
  sweepDuration: 3,
  pulseDuration: 1.5,
};

const MARKET_COUNT_GLOW_COLOR = "157,246,255";
const MARKET_COUNT_GLOW_EDGE_ALPHA =
  0.4 + MARKET_COUNT_GLOW_CONFIG.glowStrength * 0.35;
const MARKET_COUNT_GLOW_CENTER_ALPHA =
  0.5 + MARKET_COUNT_GLOW_CONFIG.glowStrength * 0.4;
const MARKET_COUNT_GLOW_BLUR = 4 + MARKET_COUNT_GLOW_CONFIG.glowStrength * 6;
const MARKET_COUNT_GLOW_PULSE_ALPHA =
  0.16 + MARKET_COUNT_GLOW_CONFIG.glowStrength * 0.24;

const MARKET_COUNT_GLOW_GRADIENT = `linear-gradient(110deg, rgba(255,255,255,${MARKET_COUNT_GLOW_EDGE_ALPHA}) 0%, rgba(${MARKET_COUNT_GLOW_COLOR},${MARKET_COUNT_GLOW_CENTER_ALPHA}) 42%, rgba(255,255,255,${MARKET_COUNT_GLOW_EDGE_ALPHA}) 100%)`;

function startCountGlowSweep(group: Element) {
  const glowTargets = group.querySelectorAll<HTMLElement>(
    ".market-count-glow-target",
  );

  glowTargets.forEach((target) => {
    gsap.set(target, {
      backgroundImage: MARKET_COUNT_GLOW_GRADIENT,
      backgroundSize: "220% 100%",
      backgroundPosition: "-120% 50%",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: `0 0 0 rgba(${MARKET_COUNT_GLOW_COLOR},0)`,
    });

    gsap.to(target, {
      backgroundPosition: "120% 50%",
      duration: MARKET_COUNT_GLOW_CONFIG.sweepDuration,
      ease: "none",
      repeat: -1,
      repeatDelay: 0,
    });

    gsap.to(target, {
      textShadow: `0 0 ${MARKET_COUNT_GLOW_BLUR}px rgba(${MARKET_COUNT_GLOW_COLOR},${MARKET_COUNT_GLOW_PULSE_ALPHA})`,
      duration: MARKET_COUNT_GLOW_CONFIG.pulseDuration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}

interface MainStatCardProps {
  badge: string;
  value: string;
  unit: string;
  description: string;
  className?: string;
}

function MainStatCard({
  badge,
  value,
  unit,
  description,
  className,
}: MainStatCardProps) {
  const countParts = getCountParts(value);

  return (
    <div
      className={`relative h-full overflow-hidden rounded-3xl bg-[#145060] border border-white/8 p-6 ${className || ""}`}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#4a8a9a]/10 via-transparent to-transparent" /> */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-5 -right-5 w-[45%] h-[45%] rounded-full bg-white/10  blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[45%] h-[45%] rounded-full bg-white/10  blur-xl" />
      </div>

      <div className="relative z-10">
        <BadgeHeadingPill color="dark" size="small">
          {badge}
        </BadgeHeadingPill>
        <div className="mt-4 flex items-baseline gap-1 market-count-glow-group">
          <span className="market-count-glow-target inline-flex items-baseline gap-1">
            {countParts.prefix && (
              <span className="text-5xl font-bold text-white">
                {countParts.prefix}
              </span>
            )}
            <span
              className="text-5xl font-bold text-white market-count-value"
              data-count-target={countParts.target}
              data-count-decimals={countParts.decimals}
            >
              {formatCount(0, countParts.decimals)}
            </span>
            <span className="text-2xl font-medium text-white">{unit}</span>
          </span>
        </div>
        <p className="mt-3 text-md leading-relaxed text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
}

interface SimpleStatBoxProps {
  value: string;
  unit?: string;
  title?: string;
  description: string;
}

function SimpleStatBox({
  value,
  unit,
  title,
  description,
}: SimpleStatBoxProps) {
  const countParts = getCountParts(value);
  const boxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const circleRadius = 56;
  const circleCircumference = 2 * Math.PI * circleRadius;

  useGSAP(
    () => {
      if (!progressRef.current) return;

      const targetProgress = countParts.target / 100;
      const circumference = circleCircumference;

      gsap.set(progressRef.current, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });

      gsap.to(progressRef.current, {
        strokeDashoffset: circumference * (1 - targetProgress),
        duration: 2.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: boxRef },
  );

  return (
    <div ref={boxRef} className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={circleRadius}
            fill="none"
            stroke="rgba(88, 255, 252, 0.15)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <defs>
            <linearGradient
              id={`progressGradient-${value}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#19a1c6" />
              <stop offset="100%" stopColor="#2bb9df" />
            </linearGradient>
          </defs>
          <circle
            ref={progressRef}
            cx="70"
            cy="70"
            r={circleRadius}
            fill="none"
            stroke={`url(#progressGradient-${value})`}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-baseline gap-0.5">
            <span className="inline-flex items-baseline gap-0.5">
              {countParts.prefix && (
                <span className="text-3xl font-semibold text-white">
                  {countParts.prefix}
                </span>
              )}
              <span
                className="text-3xl font-semibold text-white market-count-value"
                data-count-target={countParts.target}
                data-count-decimals={countParts.decimals}
              >
                {formatCount(0, countParts.decimals)}
              </span>
              {unit && (
                <span className="text-xl font-medium text-white">{unit}</span>
              )}
            </span>
          </div>
        </div>
      </div>
      {title && (
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      )}
      <p className="text-base leading-relaxed text-white/80 max-w-md">
        {description}
      </p>
    </div>
  );
}

export default function MainTheMarket() {
  const contentRef = useRef<HTMLDivElement>(null);
  const revealStartedRef = useRef(false);

  // Set initial hidden state for each reveal item
  useGSAP(() => {
    if (contentRef.current) {
      const revealItems = contentRef.current.querySelectorAll(
        ".market-reveal-item",
      );
      gsap.set(revealItems, { opacity: 0, y: 30 });
    }
  });

  // Animate content in when heading completes
  const handleHeadingComplete = () => {
    if (!contentRef.current || revealStartedRef.current) return;

    revealStartedRef.current = true;
    const revealItems = contentRef.current.querySelectorAll(
      ".market-reveal-item",
    );
    const countValues = contentRef.current.querySelectorAll<HTMLElement>(
      ".market-count-value",
    );
    const countGlowGroups = contentRef.current.querySelectorAll(
      ".market-count-glow-group",
    );

    const tl = gsap.timeline();

    tl.to(revealItems, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.5,
      ease: "power2.out",
    });

    countGlowGroups.forEach((group, index) => {
      tl.call(() => startCountGlowSweep(group), [], index * 0.5);
    });

    countValues.forEach((element, index) => {
      const target = Number(element.dataset.countTarget ?? "0");
      const decimals = Number(element.dataset.countDecimals ?? "0");
      const counter = { value: 0 };

      tl.to(
        counter,
        {
          value: target,
          duration: 2.3,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = formatCount(counter.value, decimals);
          },
        },
        index * 0.5,
      );
    });
  };

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
          title="The Market"
          description="UK property lending is large, active and chronically under-automated."
          showBadge={false}
          onAnimationComplete={handleHeadingComplete}
        />

        <div ref={contentRef} className="w-full space-y-2">
          {/* Top row - 3 main stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="market-reveal-item">
              <MainStatCard
                badge="Total Market"
                value="£350"
                unit="bn"
                description="total annual UK property loan originations"
                className="rounded-r-none rounded-b-none"
              />
            </div>
            <div className="market-reveal-item">
              <MainStatCard
                badge="Core Atomix Market"
                value="£60"
                unit="bn"
                description="Bridging, buy-to-let and SME CRE term loans – the Atomix target segment"
                className="rounded-none"
              />
            </div>
            <div className="market-reveal-item">
              <MainStatCard
                badge="Immediate Opportunity"
                value="£11.5"
                unit="bn"
                description="Annual UK bridging originations - majority processed manually, smaller loans structurally underserved"
                className="rounded-l-none rounded-b-none"
              />
            </div>
          </div>

          {/* Second row - 2 stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="market-reveal-item">
              <MainStatCard
                badge="US Market"
                value="£2"
                unit="tn"
                description="Global expansion - same model, next market"
                className="rounded-t-none rounded-r-none"
              />
            </div>
            <div className="market-reveal-item">
              <MainStatCard
                badge="Global Market"
                value="£4"
                unit="tn"
                description="Global expansion - same model, next market"
                className="rounded-t-none rounded-l-none"
              />
            </div>
          </div>

          {/* Bottom section - 6 simple stat boxes in 3x2 grid */}
          <div className="pt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14">
            <div className="market-reveal-item">
              <SimpleStatBox
                value="70"
                unit="%"
                title="Broker-led Loan Origination"
                description="70% of bridging loans come through brokers, making smaller loans costly to service — automation changes this."
              />
            </div>
            <div className="market-reveal-item">
              <SimpleStatBox
                value="30"
                unit="%"
                title="Direct-to-Customer Growth"
                description="30% of commercial lending is already direct-to-customer — a growing channel Atomix supports natively."
              />
            </div>
            <div className="market-reveal-item">
              <SimpleStatBox
                value="70"
                unit="%"
                title="Rising Tech Adoption"
                description="70% of lenders are considering tech investment — Atomix’s pay-as-you-go model lowers the barrier to entry."
              />
            </div>
            <div className="market-reveal-item">
              <SimpleStatBox
                value="64"
                unit="%"
                title="Refinancing Pressure"
                description="64% of leading non-bank lenders need to raise or refinance within 12 months — compliance and transparency are key."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
