"use client";

import { useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
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

function AboutCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  return (
    <article
      className="about-stack-card absolute inset-x-0 top-0 rounded-3xl bg-white/90 p-5 shadow-[0_24px_80px_rgba(18,42,53,0.10)] ring-1 ring-[#dce4e8] backdrop-blur-md sm:p-7"
      style={{
        zIndex: index + 1,
        opacity: 0,
        visibility: "hidden",
        transform: index === 0 ? "translateY(42px)" : `translateY(${520 + index * 80}px)`,
      }}
    >
      <div className="mb-7 flex items-center gap-2 text-2xl font-semibold text-[#242b31]">
        <span>{card.title}</span>
        <ChevronDown className="h-5 w-5 text-[#63757e]" aria-hidden="true" />
      </div>

      <div
        className="about-stack-card-content grid gap-x-14 gap-y-8 lg:grid-cols-2"
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

export default function AboutUsStackingCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsRef.current) return;

      const cardElements = gsap.utils.toArray<HTMLElement>(".about-stack-card", cardsRef.current);
      const cardContentElements = gsap.utils.toArray<HTMLElement>(
        ".about-stack-card-content",
        cardsRef.current,
      );

      gsap.set(cardElements, {
        autoAlpha: (index) => (index === 0 ? 1 : 0),
        y: (index) => (index === 0 ? 0 : 520 + index * 80),
        scale: 1,
        transformOrigin: "top center",
      });
      gsap.set(cardContentElements, { overflow: "hidden" });
      gsap.set(cardContentElements[0], { autoAlpha: 1, height: "auto" });
      gsap.set(cardContentElements.slice(1), { autoAlpha: 0, height: 0 });

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
          end: () => `+=${window.innerHeight * (cardElements.length + 2)}`,
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
          cardContentElements[index],
          {
            autoAlpha: 1,
            height: "auto",
            duration: 0.85,
            ease: "power2.out",
          },
          index - 0.18,
        );
      });

      tl.set({}, {}, cardElements.length);
      ScrollTrigger.refresh();

      return () => {
        introTl.kill();
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-[#eef3f6] px-6 py-12 text-[#222b31] sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-[1280px] flex-col justify-start pt-10 lg:pt-16">
        <div className="mb-16 max-w-[980px]">
          <h1
            className="about-intro-animate mb-4 text-3xl font-semibold tracking-[-0.04em] text-[#212329] sm:text-[40px]"
            style={{ opacity: 0, visibility: "hidden", transform: "translateY(42px)" }}
          >
            Mission
          </h1>
          <div
            className="about-intro-animate text-xl leading-10 text-[#485E64] sm:text-2xl"
            style={{ opacity: 0, visibility: "hidden", transform: "translateY(42px)" }}
          >
            Rebuild UK property lending. Start with bridging.
            <br />
            Extend into SME CRE term loans — same infrastructure, no rebuild.
          </div>
        </div>

        <div
          ref={cardsRef}
          className="relative h-[430px] w-full"
          style={{ opacity: 0, visibility: "hidden", transform: "translateY(42px)" }}
        >
          {cards.map((card, index) => (
            <AboutCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
