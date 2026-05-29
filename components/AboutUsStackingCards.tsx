"use client";

import { type ReactNode, useRef } from "react";
import {
  Blocks,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Compass,
  Cpu,
  FileCheck2,
  Fingerprint,
  Globe2,
  Handshake,
  Landmark,
  LineChart,
  Link2,
  Network,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type AboutCardData = {
  title: string;
  items: string[];
  columns?: 2 | 3;
};

const missionCards: AboutCardData[] = [
  {
    title: "Capital providers",
    items: [
      "Real-time visibility — live loan status and portfolio analytics on demand",
      "Enforce every rule automatically — capital deployed exactly as intended, no self-certification required",
      "Record every decision immutably on-chain — every action transparent, permanent and tamper-proof",
      "Connect institutional and private capital to multiple lenders via a single integration — lower barriers, lower due diligence costs",
      "Automate portfolio reporting — granular loan positions monitored at no additional overhead; diversified portfolios no longer penalised",
      "Connect all parties in a unified workspace — capital providers maintain live visibility across every funded loan and decision in real time",
    ],
  },
  {
    title: "Lenders",
    columns: 3,
    items: [
      "End-to-end workflow automation — goal-driven reasoning finds the most efficient compliant route; manual intervention by credit policy only",
      "Connect smaller lenders to institutional capital — removing the scale barrier that previously shut them out",
      "Make smaller loans economical and scale without hiring — near-zero marginal processing cost and pay-as-you-go pricing remove both the fixed cost floor and the headcount barrier",
      "No-code configuration — product changes and rule updates self-served; open API connects to any data provider or third-party system",
      "Cut the cost of incomplete applications — automated decisioning identifies ineligible applications earlier, protecting margins across the book",
      "Make every lending decision auditable — on-chain records provide a complete, traceable trail from application to exit, removing black-box risk",
      "Connect all parties in a unified workspace — lenders maintain live visibility across every document, decision and stakeholder throughout",
      "A self-reinforcing network takes hold — as lenders onboard, brokers and capital providers follow, driving volume and deepening the marketplace",
      "Scale without hiring — automation absorbs growth; the platform handles compliance, configuration and connectivity",
    ],
  },
  {
    title: "Borrowers",
    items: [
      "Eliminate re-keying — data entered once, shared across all lenders and parties for the full loan journey",
      "Keep borrowers informed at every step — live loan status, transparent next steps, no chasing required",
      "Connect all parties in a unified workspace — instant, consistent process, no handoff delays",
      "Deliver transparent process and certain outcomes at every stage",
    ],
  },
];

function getItemIcon(item: string): LucideIcon {
  const text = item.toLowerCase();

  if (/ai|agent|natural language/.test(text)) return Bot;
  if (/on-chain|token|tokeni|blockchain/.test(text)) return Blocks;
  if (/compliance|audit|traceable|rule/.test(text)) return ShieldCheck;
  if (
    /report|analytics|real-time visibility|portfolio visibility|monitoring/.test(
      text,
    )
  )
    return LineChart;
  if (/capital|fund|funding|investor|investors|liquidity/.test(text))
    return CircleDollarSign;
  if (/marketplace|market structure|secondary market/.test(text))
    return Landmark;
  if (/lender|lenders|borrower|borrowers|parties|stakeholder/.test(text))
    return Handshake;
  if (/integration|connect|api|third-party|ecosystem|platform/.test(text))
    return Link2;
  if (/workflow|automation|automated|process/.test(text)) return Cpu;
  if (/decision|approval|policy|credit|enforcement/.test(text))
    return FileCheck2;
  if (/journey|origination|drawdown|progress/.test(text)) return Compass;
  if (/mortgage|loan|lending/.test(text)) return Briefcase;
  if (/shared data|market pricing|risk appetite/.test(text)) return Network;
  if (/permissioned|identity|immutably/.test(text)) return Fingerprint;
  if (/global|scale/.test(text)) return Globe2;
  if (/fair|level playing field/.test(text)) return Scale;

  return CheckCircle2;
}

const visionCards: AboutCardData[] = [
  {
    title: "Capital providers",
    items: [
      "A single integration gives access to diversified, on-chain-audited loan pools across multiple lenders",
      "Each participation represented as a digital token — tradeable on secondary markets, no longer locked for the full term",
      "Flexible capital access — fiat or stablecoin, direct or via institutional funds; regulatory responsibility sits with the capital provider",
      "A dedicated marketplace replaces bilateral relationships — multiple lenders in one place, due diligence costs collapsed, competitive capital deployment at scale",
      "Granular, diversified portfolios become viable — smaller loan positions carry no greater monitoring burden than concentrated ones",
      "Real-time compliance enforcement and portfolio visibility across every loan in the ecosystem",
    ],
  },
  {
    title: "Lenders",
    items: [
      "A level playing field emerges — credit rules enforced by the platform; lenders compete on product, not process",
      "Secondary capital markets open to all — tokenised liquidity pools give lenders access to funding previously available only to large institutions",
      "Aggregation transforms the market — smaller lenders collectively reach institutional scale, becoming institutional-grade originators",
      "The same infrastructure extends beyond bridging — consumer mortgages, asset-backed lending and connected financial services, no rebuild required",
      "Distribution partners deploy discrete, white-labelled environments within the same ecosystem — brokers, auction houses and beyond, no additional infrastructure",
      "A shared data advantage emerges — real market intelligence no longer exclusive to the largest institutions; fraud-proof records cannot be retrofitted",
    ],
  },
  {
    title: "Borrowers",
    items: [
      "A single unbroken journey from enquiry to drawdown — application, underwriting, legal and capital matching on one platform; no other solution covers the complete journey",
      "AI agents available 24/7 — handling queries, tracking progress and answering loan-specific questions in natural language",
      "A loan optimiser — matched lenders, predicted rates and approval likelihood, in real time",
      "Direct access to a broader, more competitive pool of capital as the marketplace scales",
    ],
  },
];

const ABOUT_CARD_ITEM_MIN_HEIGHT = 72;
const ABOUT_CARD_ROW_GAP = 16;

function getCardsContainerHeight(cards: AboutCardData[]) {
  const heights = cards.map((card) => {
    const cols = card.columns ?? 2;
    const rows = Math.ceil(card.items.length / cols);
    return (
      120 +
      rows * ABOUT_CARD_ITEM_MIN_HEIGHT +
      Math.max(0, rows - 1) * ABOUT_CARD_ROW_GAP
    );
  });

  return Math.max(380, ...heights);
}

function AboutCard({
  card,
  index,
  onClick,
}: {
  card: AboutCardData;
  index: number;
  onClick: () => void;
}) {
  const columns = card.columns ?? 2;
  const gridColsClass =
    columns === 3 ? "md:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-2";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className="about-stack-card absolute inset-x-0 top-0 rounded-3xl bg-white p-5 ring-1 ring-[#fff] shadow-[inset_0_1px_20px_rgba(255,255,255,0.65)] backdrop-blur-md sm:p-7"
      style={{
        zIndex: index + 1,
        opacity: 0,
        visibility: "hidden",
        transform:
          index === 0
            ? "translateY(42px)"
            : `translateY(${260 + index * 80}px)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute -top-5 -right-5 w-[35%] h-[35%] rounded-full bg-white/60 blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[35%] h-[35%] rounded-full bg-white/60 blur-xl" />
      </div>

      <div className="mb-7 flex items-center gap-2 text-2xl font-semibold text-[#242b31] relative z-10">
        <span>{card.title}</span>
        <ChevronDown
          className="about-stack-card-chevron h-5 w-5 text-[#63757e]"
          aria-hidden="true"
        />
      </div>

      <div
        className={`about-stack-card-content grid content-start gap-x-8 gap-y-4 ${gridColsClass} relative z-10 overflow-hidden`}
      >
        {card.items.map((item) => (
          <div
            key={item}
            className="flex min-h-[72px] items-start gap-4"
          >
            {(() => {
              const ItemIcon = getItemIcon(item);

              return (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E2F1F4] text-[#1eb7d8]">
                  <ItemIcon className="h-7 w-7 stroke-[2]" aria-hidden="true" />
                </div>
              );
            })()}
            <p
              className={`text-md leading-6 text-[#16313b] ${columns === 3 ? "max-w-none" : "max-w-[520px]"}`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function AboutStackingSection({
  title,
  description,
  cards,
}: {
  title: string;
  description: ReactNode;
  cards: AboutCardData[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const cardProgressRefs = useRef<number[]>([]);

  const handleCardClick = (index: number) => {
    const scrollTrigger = scrollTriggerRef.current;
    const targetProgress = cardProgressRefs.current[index];

    if (!scrollTrigger || targetProgress === undefined) return;

    const targetScroll =
      scrollTrigger.start +
      (scrollTrigger.end - scrollTrigger.start) * targetProgress;

    gsap.to(window, {
      scrollTo: { y: targetScroll },
      duration: 1.1,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsRef.current) return;

      const cardElements = gsap.utils.toArray<HTMLElement>(
        ".about-stack-card",
        cardsRef.current,
      );
      const cardContentElements = gsap.utils.toArray<HTMLElement>(
        ".about-stack-card-content",
        cardsRef.current,
      );
      const cardChevronElements = gsap.utils.toArray<HTMLElement>(
        ".about-stack-card-chevron",
        cardsRef.current,
      );

      gsap.set(cardElements, {
        autoAlpha: (index) => (index === 0 ? 1 : 0),
        y: (index) => (index === 0 ? 0 : 260 + index * 80),
        backgroundColor: (index) => (index === 0 ? "#ffffff" : "#EDF1F3"),
        scale: 1,
        transformOrigin: "top center",
      });
      gsap.set(cardContentElements, { overflow: "hidden", height: "auto", autoAlpha: 1 });

      const measuredContentHeights = cardContentElements.map(
        (element) => element.offsetHeight,
      );

      gsap.set(cardContentElements[0], {
        autoAlpha: 1,
        height: measuredContentHeights[0],
      });
      gsap.set(cardContentElements.slice(1), { autoAlpha: 0, height: 0 });
      gsap.set(cardChevronElements, {
        rotate: 0,
        transformOrigin: "center center",
      });

      const introElements = gsap.utils.toArray<HTMLElement>(
        ".about-intro-animate",
        sectionRef.current,
      );

      gsap.set(introElements, { autoAlpha: 0, y: 42 });
      gsap.set(cardsRef.current, { autoAlpha: 0, y: 42 });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      introTl
        .to(introElements, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
        })
        .to(
          cardsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.35",
        );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=103",
          end: () => `+=${window.innerHeight * (cardElements.length + 0.7)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cardElements.forEach((card, index) => {
        if (index === 0) return;

        tl.to(
          card,
          {
            autoAlpha: 1,
            y: index * 80,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          index - 0.25,
        );

        cardElements
          .slice(0, index + 1)
          .forEach((visibleCard, visibleIndex) => {
            tl.to(
              visibleCard,
              {
                y: visibleIndex * 80,
                scale: 1,
                duration: 0.9,
                ease: "power2.out",
              },
              index - 0.25,
            );
          });

        tl.to(
          cardElements.slice(0, index),
          {
            backgroundColor: "#EDF1F3",
            duration: 0.7,
            ease: "power2.out",
          },
          index - 0.25,
        );

        tl.to(
          cardContentElements.slice(0, index),
          {
            autoAlpha: 0,
            height: 0,
            duration: 0.7,
            ease: "power2.inOut",
          },
          index - 0.25,
        );

        tl.to(
          cardChevronElements.slice(0, index),
          {
            rotate: -90,
            duration: 0.7,
            ease: "power2.out",
          },
          index - 0.25,
        );

        tl.to(
          cardContentElements[index],
          {
            autoAlpha: 1,
            height: measuredContentHeights[index],
            duration: 0.85,
            ease: "power2.inOut",
          },
          index - 0.18,
        );

        tl.to(
          cardElements[index],
          {
            backgroundColor: "#ffffff",
            duration: 0.7,
            ease: "power2.out",
          },
          index - 0.18,
        );

        tl.to(
          cardChevronElements[index],
          {
            rotate: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          index - 0.18,
        );
      });

      const finalCloseStart = cardElements.length - 0.25;

      tl.to(
        cardContentElements,
        {
          autoAlpha: 0,
          height: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        finalCloseStart,
      );

      tl.to(
        cardElements,
        {
          backgroundColor: "#EDF1F3",
          duration: 0.7,
          ease: "power2.out",
        },
        finalCloseStart,
      );

      tl.to(
        cardChevronElements,
        {
          rotate: -90,
          duration: 0.7,
          ease: "power2.out",
        },
        finalCloseStart,
      );

      tl.set({}, {}, cardElements.length + 0.5);
      scrollTriggerRef.current = tl.scrollTrigger ?? null;
      const timelineDuration = tl.duration();
      cardProgressRefs.current = cards.map((_, index) =>
        index === 0
          ? 0
          : gsap.utils.clamp(0, 1, (index + 0.67) / timelineDuration),
      );
      ScrollTrigger.refresh();

      return () => {
        scrollTriggerRef.current = null;
        introTl.kill();
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  const cardsContainerHeight = getCardsContainerHeight(cards);
  const hasThreeColumnCard = cards.some((card) => card.columns === 3);

  return (
    <section
      ref={sectionRef}
      className=" overflow-hidden bg-linear-to-b from-[#fff] via-[#eef3f6] to-[#fff] px-6 py-6 text-[#222b31] sm:px-10 lg:px-16"
    >
      <div
        className={`mx-auto flex min-h-[calc(61vh)] w-full flex-col justify-start pt-2 ${hasThreeColumnCard ? "max-w-[1480px]" : "max-w-[1280px]"}`}
      >
        <div className="mb-10 max-w-[980px]">
          <h1
            className="about-intro-animate mb-4 text-3xl font-semibold tracking-[-0.04em] text-[#212329] sm:text-[40px]"
            style={{
              opacity: 0,
              visibility: "hidden",
              transform: "translateY(42px)",
            }}
          >
            {title}
          </h1>
          <div
            className="about-intro-animate text-xl leading-10 text-[#485E64] sm:text-2xl"
            style={{
              opacity: 0,
              visibility: "hidden",
              transform: "translateY(42px)",
            }}
          >
            {description}
          </div>
        </div>

        <div
          ref={cardsRef}
          className="relative w-full"
          style={{
            height: cardsContainerHeight,
            opacity: 0,
            visibility: "hidden",
            transform: "translateY(42px)",
          }}
        >
          {cards.map((card, index) => (
            <AboutCard
              key={card.title}
              card={card}
              index={index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutUsStackingCards() {
  return (
    <>
      <AboutStackingSection
        title="Mission"
        cards={missionCards}
        description={
          <>
            Rebuild UK property lending. Start with bridging.
            <br />
            Extend into specialist term loans and beyond — same infrastructure, no rebuild.
          </>
        }
      />
      <AboutStackingSection
        title="Vision"
        cards={visionCards}
        description={
          <>
            One ecosystem. Every stakeholder connected. Property lending 
            transformed — starting in the UK, built for international scale.
          </>
        }
      />
    </>
  );
}
