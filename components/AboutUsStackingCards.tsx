"use client";

import { type ReactNode, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type AboutCardData = {
  title: string;
  items: string[];
};

const missionCards: AboutCardData[] = [
  {
    title: "Capital providers",
    items: [
      "Replace blind trust with real-time visibility — live loan status, policy adherence and portfolio analytics on demand",
      "Connect institutional and private capital to multiple lenders via a single integration — lower barriers, lower due diligence costs",
      "Enforce every rule automatically — capital deployed exactly as intended, no self-certification required",
      "Automate portfolio reporting — granular loan positions monitored at no additional overhead, removing the penalty on diversified small-loan portfolios",
      "Record every decision immutably on-chain — compliance instant and continuous",
      "Connect all parties in a unified workspace — capital providers maintain live visibility across every funded loan and decision in real time",
    ],
  },
  {
    title: "Lenders",
    items: [
      "Significantly reduce manual touchpoints — end-to-end workflow automation; manual intervention governed by credit policy, not discretion",
      "Make every lending decision auditable — on-chain records provide a complete, traceable trail from application to drawdown, removing black-box risk",
      "Connect smaller lenders to institutional capital — removing the scale barrier that previously shut them out",
      "Apply goal-driven reasoning to find the most efficient compliant route — every loan processed at pace without manual routing",
      "Make smaller loans economical and scale without hiring — near-zero marginal processing cost and pay-as-you-go pricing remove both the fixed cost floor and the headcount barrier",
      "Connect all parties in a unified workspace — lenders maintain live visibility across every document, decision and stakeholder throughout",
      "Eliminate developer dependency — no-code configuration puts product changes, rule updates and workflow modifications in the hands of the business",
      "A self-reinforcing network takes hold — as lenders onboard, brokers and capital providers follow, driving volume and deepening the marketplace",
      "Cut the cost of incomplete applications — automated decisioning identifies ineligible applications earlier, protecting margins across the book",
      "Connect to any data provider, valuation method or third-party system — open API architecture integrates where needed without rebuilding the platform",
    ],
  },
  {
    title: "Borrowers",
    items: [
      "Eliminate re-keying — data entered once, shared across all lenders and parties for the full loan journey",
      "Connect all parties in a unified workspace — instant, consistent process, no handoff delays",
      "Keep borrowers informed at every step — live loan status, transparent next steps, no chasing required",
      "Deliver transparent process and consistent outcomes at every stage",
    ],
  },
];

const visionCards: AboutCardData[] = [
  {
    title: "Capital providers",
    items: [
      "A single integration gives access to diversified, on-chain-audited loan pools across multiple lenders",
      "Each capital provider's interest represented as a digital token — tradeable on secondary markets, no longer locked for the full term",
      "Flexible capital access — direct pool participation or via institutional funds, in fiat or stablecoin, within a fully permissioned and compliant ecosystem",
      "A dedicated capital provider marketplace replaces bilateral relationships — institutional and private investors access multiple lenders in one place, collapsing due diligence costs and opening competitive capital deployment at scale",
      "Granular, diversified portfolios become viable — automated reporting means a portfolio of smaller loans carries no greater monitoring burden than a concentrated one",
      "Real-time compliance enforcement and portfolio visibility across every loan in the ecosystem",
    ],
  },
  {
    title: "Lenders",
    items: [
      "A level playing field emerges — credit rules enforced by the platform; lenders compete on product, not process",
      "Secondary capital markets open to all — tokenised liquidity pools give lenders access to funding previously available only to large institutions",
      "Aggregation transforms the market structure — smaller lenders collectively reach institutional securitisation scale, converting capital-constrained participants into institutional-grade originators",
      "The same infrastructure extends beyond bridging — consumer mortgages, asset-backed lending and connected financial services, no rebuild required",
      "Distribution partners deploy discrete, white-labelled lending environments within the same ecosystem — expanding origination reach across brokers, auction houses and beyond without additional infrastructure",
      "A shared data advantage emerges — real market pricing, risk appetite and capital flow patterns visible across the ecosystem, giving every lender intelligence previously available only to the largest institutions",
    ],
  },
  {
    title: "Borrowers",
    items: [
      "A single unbroken journey — from first enquiry through to drawdown, entirely within one marketplace; the first time the complete property lending process has been available end-to-end on a single platform",
      "AI agents available 24/7 — handling queries, tracking progress and answering loan-specific questions in natural language",
      "A loan optimiser surfaces matched lenders, predicted rates and approval likelihood in real time",
      "Direct access to a broader, more competitive pool of capital as the marketplace scales",
    ],
  },
];

function AboutCard({
  card,
  index,
  onClick,
}: {
  card: AboutCardData;
  index: number;
  onClick: () => void;
}) {
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
        transform: index === 0 ? "translateY(42px)" : `translateY(${260 + index * 80}px)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute -top-5 -right-5 w-[35%] h-[35%] rounded-full bg-white/60 blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[35%] h-[35%] rounded-full bg-white/60 blur-xl" />
      </div>

      <div className="mb-7 flex items-center gap-2 text-2xl font-semibold text-[#242b31] relative z-10">
        <span>{card.title}</span>
        <ChevronDown className="about-stack-card-chevron h-5 w-5 text-[#63757e]" aria-hidden="true" />
      </div>

      <div
        className="about-stack-card-content grid gap-x-14 gap-y-8 lg:grid-cols-2 relative z-10"
        style={
          index === 0
            ? { overflow: "hidden" }
            : { opacity: 0, visibility: "hidden", height: 0, overflow: "hidden" }
        }
      >
        {card.items.map((item) => (
          <div key={item} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E2F1F4] text-[#1eb7d8]">
              <Check className="h-5 w-5 stroke-[3]" aria-hidden="true" />
            </div>
            <p className="max-w-[520px] text-md leading-6 text-[#16313b]">{item}</p>
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
      scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * targetProgress;

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

      const cardElements = gsap.utils.toArray<HTMLElement>(".about-stack-card", cardsRef.current);
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
      gsap.set(cardContentElements, { overflow: "hidden" });
      gsap.set(cardContentElements[0], { autoAlpha: 1, height: "auto" });
      gsap.set(cardContentElements.slice(1), { autoAlpha: 0, height: 0 });
      gsap.set(cardChevronElements, { rotate: 0, transformOrigin: "center center" });

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
          start: "top top",
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

        cardElements.slice(0, index + 1).forEach((visibleCard, visibleIndex) => {
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
            ease: "power2.out",
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
            height: "auto",
            duration: 0.85,
            ease: "power2.out",
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
        index === 0 ? 0 : gsap.utils.clamp(0, 1, (index + 0.67) / timelineDuration),
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

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-[#eef3f6] px-6 py-6 text-[#222b31] sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-[1280px] flex-col justify-start pt-10 lg:pt-16">
        <div className="mb-16 max-w-[980px]">
          <h1
            className="about-intro-animate mb-4 text-3xl font-semibold tracking-[-0.04em] text-[#212329] sm:text-[40px]"
            style={{ opacity: 0, visibility: "hidden", transform: "translateY(42px)" }}
          >
            {title}
          </h1>
          <div
            className="about-intro-animate text-xl leading-10 text-[#485E64] sm:text-2xl"
            style={{ opacity: 0, visibility: "hidden", transform: "translateY(42px)" }}
          >
            {description}
          </div>
        </div>

        <div
          ref={cardsRef}
          className="relative h-[430px] w-full"
          style={{ opacity: 0, visibility: "hidden", transform: "translateY(42px)" }}
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
            Extend into SME CRE term loans — same infrastructure, no rebuild.
          </>
        }
      />
      <AboutStackingSection
        title="Vision"
        cards={visionCards}
        description={
          <>
            One ecosystem. Every stakeholder connected. Property lending transformed — starting in the UK, built for global scale.
          </>
        }
      />
    </>
  );
}
