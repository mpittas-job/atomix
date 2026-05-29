"use client";

import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DefHeading from "@/components/typo/DefHeading";
import LazySoftAurora from "@/components/backgrounds/LazySoftAurora";
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
  valuePrefixLabel?: string;
  descriptionMaxWidth?: string | number;
  className?: string;
  isActive?: boolean;
}

function MainStatCard({
  badge,
  value,
  unit,
  description,
  valuePrefixLabel,
  descriptionMaxWidth,
  className,
  isActive,
}: MainStatCardProps) {
  const countParts = getCountParts(value);
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (isActive === undefined || !isActive || !valueRef.current) return;

    const counter = { value: 0 };
    gsap.killTweensOf(counter);

    gsap.to(counter, {
      value: countParts.target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = formatCount(counter.value, countParts.decimals);
        }
      },
    });
  }, [isActive, countParts.target, countParts.decimals]);

  return (
    <div
      className={`relative h-full overflow-hidden bg-[#145060] p-6 ${className || ""}`}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#4a8a9a]/10 via-transparent to-transparent" /> */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-5 -right-5 w-[45%] h-[45%] rounded-full bg-white/10  blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[45%] h-[45%] rounded-full bg-white/10  blur-xl" />
      </div>

      <div className="relative z-10">
        <BadgeHeadingPill color="dark">{badge}</BadgeHeadingPill>
        <div className="mt-4 flex items-baseline gap-1 market-count-glow-group">
          <span className="inline-flex items-start gap-0.5">
            {valuePrefixLabel && (
              <span className="mt-2 md:mt-3 text-[11px] md:text-xs font-semibold text-white/75 leading-none shrink-0">
                {valuePrefixLabel}
              </span>
            )}
            <span className="market-count-glow-target inline-flex items-baseline gap-1">
              {countParts.prefix && (
                <span className="text-5xl md:text-7xl font-semibold text-white">
                  {countParts.prefix}
                </span>
              )}
              <span
                ref={valueRef}
                className="text-5xl md:text-7xl font-semibold text-white market-count-value"
                data-count-target={countParts.target}
                data-count-decimals={countParts.decimals}
              >
                {formatCount(0, countParts.decimals)}
              </span>
              <span className="text-xl md:text-2xl font-medium text-white">{unit}</span>
            </span>
          </span>
        </div>
        <p
          className="mt-4 text-base md:text-lg leading-7 text-white/80"
          style={
            descriptionMaxWidth
              ? {
                  maxWidth:
                    typeof descriptionMaxWidth === "number"
                      ? `${descriptionMaxWidth}px`
                      : descriptionMaxWidth,
                }
              : undefined
          }
        >
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
  descriptionMaxWidth?: string | number;
  isActive?: boolean;
}

function SimpleStatBox({
  value,
  unit,
  title,
  description,
  descriptionMaxWidth,
  isActive,
}: SimpleStatBoxProps) {
  const countParts = getCountParts(value);
  const boxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const circleSize = 165;
  const circleRadius = circleSize / 2 - 18;
  const circleCenter = circleSize / 2;
  const circleCircumference = 2 * Math.PI * circleRadius;

  useGSAP(
    () => {
      if (isActive !== undefined) {
        if (!isActive) return;

        // Carousel active state animation (mobile)
        if (progressRef.current) {
          const targetProgress = countParts.target / 100;
          const circumference = circleCircumference;

          gsap.set(progressRef.current, {
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          });

          gsap.to(progressRef.current, {
            strokeDashoffset: circumference * (1 - targetProgress),
            duration: 1.8,
            ease: "power2.out",
          });
        }

        if (valueRef.current) {
          const counter = { value: 0 };
          gsap.killTweensOf(counter);
          gsap.to(counter, {
            value: countParts.target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              if (valueRef.current) {
                valueRef.current.textContent = formatCount(counter.value, countParts.decimals);
              }
            },
          });
        }
      } else {
        // Original ScrollTrigger animation (desktop)
        if (progressRef.current) {
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
        }
      }
    },
    { dependencies: [isActive, countParts.target, countParts.decimals], scope: boxRef },
  );

  return (
    <div ref={boxRef} className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <svg
          width={circleSize}
          height={circleSize}
          viewBox={`0 0 ${circleSize} ${circleSize}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={circleCenter}
            cy={circleCenter}
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
            cx={circleCenter}
            cy={circleCenter}
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
                <span className="text-2xl font-semibold text-white">
                  {countParts.prefix}
                </span>
              )}
              <span
                ref={valueRef}
                className="text-2xl font-semibold text-white market-count-value"
                data-count-target={countParts.target}
                data-count-decimals={countParts.decimals}
              >
                {formatCount(0, countParts.decimals)}
              </span>
              {unit && (
                <span className="text-lg font-medium text-white">{unit}</span>
              )}
            </span>
          </div>
        </div>
      </div>
      {title && (
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{title}</h3>
      )}
      <p
        className="text-base md:text-lg leading-relaxed text-white/80 max-w-xl"
        style={
          descriptionMaxWidth
            ? {
                maxWidth:
                  typeof descriptionMaxWidth === "number"
                    ? `${descriptionMaxWidth}px`
                    : descriptionMaxWidth,
              }
            : undefined
        }
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

const mainStats: {
  badge: string;
  value: string;
  unit: string;
  description: string;
  valuePrefixLabel?: string;
}[] = [
  {
    badge: "Core Atomix Market",
    value: "£65",
    unit: "bn+",
    description:
      "in annual non-bank and specialist property lending — bridging and term loans, the core Atomix market",
  },
  {
    badge: "UK Bridging",
    value: "£13",
    unit: "bn+",
    description:
      "in annual UK bridging originations — majority processed manually, smaller loans structurally underserved",
  },
  {
    badge: "Growth Segment",
    value: "£300",
    unit: "k",
    valuePrefixLabel: "Sub",
    description:
      "bridging accounts for £2.6bn+ annually — the largest underleveraged growth segment; uneconomical under manual models, viable on Atomix",
  },
  {
    badge: "Broker-led",
    value: "70",
    unit: "%",
    description:
      "of bridging originates through brokers — smaller loans unprofitable to service manually; automation changes this",
  },
  {
    badge: "Direct-to-Customer",
    value: "30",
    unit: "%",
    description:
      "of commercial lending already direct-to-customer — a growing channel Atomix supports natively",
  },
  {
    badge: "Collapsed Transactions",
    value: "£818",
    unit: "million",
    description:
      "lost annually to collapsed property transactions — quick home sale providers are the alternative, competing on speed and certainty of funding",
  },
];

const mainStatBorderClasses = [
  "rounded-t-3xl border-t border-x border-b border-white/15 md:rounded-3xl md:border md:rounded-r-none md:rounded-b-none md:border-white/8",
  "rounded-none border-x border-b border-white/15 md:border md:border-white/8",
  "rounded-none border-x border-b border-white/15 md:rounded-3xl md:border md:rounded-l-none md:rounded-b-none md:border-white/8",
  "rounded-none border-x border-b border-white/15 md:rounded-3xl md:border md:rounded-t-none md:rounded-r-none md:border-white/8",
  "rounded-none border-x border-b border-white/15 md:border md:rounded-none md:rounded-t-none md:border-white/8",
  "rounded-b-3xl border-x border-b border-white/15 md:rounded-3xl md:border md:rounded-t-none md:rounded-l-none md:border-white/8",
];

const simpleStats = [
  {
    value: "£5.5",
    unit: "bn",
    title: "Auction Sales",
    description:
      "in auction sales chronically underserved — most completions are cash-funded because traditional lenders cannot meet the 28-day window; Atomix enables bridging finance to access this market",
  },
  {
    value: "70",
    unit: "%",
    title: "Technology Investment",
    description:
      "of lenders considering technology investment — Atomix pay-as-you-go removes the barrier to entry",
  },
  {
    value: "64",
    unit: "%",
    title: "Refinancing Pressure",
    description:
      "of leading non-bank lenders need to raise or refinance within 12 months — compliance and transparency is the unlock",
  },
  {
    value: "$400",
    unit: "bn+",
    title: "US Market",
    description:
      "the US non-bank and specialist lending market across bridging and term loans; same platform, same model",
  },
];

export default function MainTheMarket() {
  const contentRef = useRef<HTMLDivElement>(null);
  const revealStartedRef = useRef(false);

  // Carousel states for mobile
  const mainCarouselRef = useRef<HTMLDivElement>(null);
  const simpleCarouselRef = useRef<HTMLDivElement>(null);
  const [activeMainSlide, setActiveMainSlide] = useState(0);
  const [activeSimpleSlide, setActiveSimpleSlide] = useState(0);

  const handleMainCarouselScroll = () => {
    const el = mainCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    if (width <= 0) return;
    const index = Math.round(el.scrollLeft / width);
    setActiveMainSlide(index);
  };

  const handleSimpleCarouselScroll = () => {
    const el = simpleCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    if (width <= 0) return;
    const index = Math.round(el.scrollLeft / width);
    setActiveSimpleSlide(index);
  };

  const goToMainSlide = (index: number) => {
    const el = mainCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    gsap.to(el, {
      scrollLeft: index * width,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const goToSimpleSlide = (index: number) => {
    const el = simpleCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    gsap.to(el, {
      scrollLeft: index * width,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handlePrevMainSlide = () => {
    if (activeMainSlide > 0) goToMainSlide(activeMainSlide - 1);
  };

  const handleNextMainSlide = () => {
    if (activeMainSlide < mainStats.length - 1) goToMainSlide(activeMainSlide + 1);
  };

  const handlePrevSimpleSlide = () => {
    if (activeSimpleSlide > 0) goToSimpleSlide(activeSimpleSlide - 1);
  };

  const handleNextSimpleSlide = () => {
    if (activeSimpleSlide < simpleStats.length - 1) goToSimpleSlide(activeSimpleSlide + 1);
  };

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
    <div className="min-h-[calc(100vh-126px)] rounded-none md:rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center">
      <LazySoftAurora
        className="absolute top-0 left-0 w-full h-[500px]"
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

      <div className="relative z-10 flex flex-col gap-y-8 md:gap-y-12 w-full max-w-[1900px] px-6 py-12 md:px-32 md:py-32">
        <DefHeading
          theme="light"
          badgeText=""
          title="The Market"
          description="UK property lending is large, active and chronically under-automated."
          showBadge={false}
          onAnimationComplete={handleHeadingComplete}
        />

        <div ref={contentRef} className="w-full space-y-0">
          {/* Desktop — Grid structure */}
          <div className="hidden md:flex md:flex-col md:gap-2 w-full">
            {/* Top row - 3 main stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2">
              {mainStats.slice(0, 3).map((stat, idx) => (
                <div key={stat.badge} className="market-reveal-item">
                  <MainStatCard
                    badge={stat.badge}
                    value={stat.value}
                    unit={stat.unit}
                    description={stat.description}
                    valuePrefixLabel={stat.valuePrefixLabel}
                    className={mainStatBorderClasses[idx]}
                  />
                </div>
              ))}
            </div>

            {/* Second row - 3 main stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2">
              {mainStats.slice(3, 6).map((stat, idx) => (
                <div key={stat.badge} className="market-reveal-item">
                  <MainStatCard
                    badge={stat.badge}
                    value={stat.value}
                    unit={stat.unit}
                    description={stat.description}
                    valuePrefixLabel={stat.valuePrefixLabel}
                    className={mainStatBorderClasses[idx + 3]}
                  />
                </div>
              ))}
            </div>

            {/* Bottom section - 4 simple stat boxes in 2x2 grid */}
            <div className="pt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14">
              {simpleStats.map((stat) => (
                <div key={stat.title} className="market-reveal-item">
                  <SimpleStatBox
                    value={stat.value}
                    unit={stat.unit}
                    title={stat.title}
                    description={stat.description}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — MainStatCards Carousel */}
          <div className="block md:hidden w-full">
            <div
              ref={mainCarouselRef}
              onScroll={handleMainCarouselScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {mainStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 snap-center snap-always"
                >
                  <MainStatCard
                    badge={stat.badge}
                    value={stat.value}
                    unit={stat.unit}
                    description={stat.description}
                    valuePrefixLabel={stat.valuePrefixLabel}
                    className="rounded-3xl border border-white/15 min-h-[220px]"
                    isActive={idx === activeMainSlide}
                  />
                </div>
              ))}
            </div>

            {/* Carousel navigation controls (arrows + indicators) */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevMainSlide}
                disabled={activeMainSlide === 0}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-sm transition-all active:scale-95 ${
                  activeMainSlide === 0 ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-white/10"
                }`}
                aria-label="Previous slide"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2">
                {mainStats.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToMainSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeMainSlide ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextMainSlide}
                disabled={activeMainSlide === mainStats.length - 1}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-sm transition-all active:scale-95 ${
                  activeMainSlide === mainStats.length - 1 ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-white/10"
                }`}
                aria-label="Next slide"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile — SimpleStatBoxes Carousel */}
          <div className="block md:hidden w-full pt-14">
            <div
              ref={simpleCarouselRef}
              onScroll={handleSimpleCarouselScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {simpleStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 snap-center snap-always px-4"
                >
                  <SimpleStatBox
                    value={stat.value}
                    unit={stat.unit}
                    title={stat.title}
                    description={stat.description}
                    isActive={idx === activeSimpleSlide}
                  />
                </div>
              ))}
            </div>

            {/* Carousel navigation controls (arrows + indicators) */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevSimpleSlide}
                disabled={activeSimpleSlide === 0}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-sm transition-all active:scale-95 ${
                  activeSimpleSlide === 0 ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-white/10"
                }`}
                aria-label="Previous slide"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2">
                {simpleStats.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSimpleSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeSimpleSlide ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSimpleSlide}
                disabled={activeSimpleSlide === simpleStats.length - 1}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-sm transition-all active:scale-95 ${
                  activeSimpleSlide === simpleStats.length - 1 ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-white/10"
                }`}
                aria-label="Next slide"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
