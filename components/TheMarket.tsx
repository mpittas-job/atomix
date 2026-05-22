"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaBuilding,
  FaCoins,
  FaScrewdriverWrench,
  FaHandshake,
  FaGlobe,
  FaGavel,
  FaMicrochip,
  FaChartLine,
  FaFlagUsa,
} from "react-icons/fa6";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "./IconBox";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const marketStats = [
  {
    icon: <FaBuilding className="h-10 w-10" />,
    value: "£350bn",
    description: "Total annual UK property loan originations",
  },
  {
    icon: <FaCoins className="h-10 w-10" />,
    value: "£60bn",
    description:
      "across bridging, buy-to-let and SME CRE term loans — the core Atomix market",
  },
  {
    icon: <FaScrewdriverWrench className="h-10 w-10" />,
    value: "£11.5bn",
    description:
      "in annual UK bridging originations — majority processed manually, smaller loans structurally underserved",
  },
  {
    icon: <FaHandshake className="h-10 w-10" />,
    value: "70%",
    description:
      "of bridging loans originate through brokers — smaller loans unprofitable to service; automation changes this",
  },
  {
    icon: <FaGlobe className="h-10 w-10" />,
    value: "30%",
    description:
      "of commercial lending already direct-to-customer — a growing channel Atomix supports natively",
  },
  {
    icon: <FaGavel className="h-10 w-10" />,
    value: "£5.5bn",
    description:
      "in auction sales stalled by 28-day completion requirements manual lending cannot meet",
  },
  {
    icon: <FaMicrochip className="h-10 w-10" />,
    value: "70%",
    description:
      "of lenders actively considering technology investment — Atomix pay-as-you-go model removes the barrier to entry",
  },
  {
    icon: <FaChartLine className="h-10 w-10" />,
    value: "64%",
    description:
      "of leading non-bank lenders need to raise or refinance within 12 months — compliance and transparency is the unlock",
  },
  {
    icon: <FaFlagUsa className="h-10 w-10" />,
    value: "$2 trillion",
    description:
      "— the US commercial real estate market opportunity, addressable on the same model",
  },
];

export default function TheMarket() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsTlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      // Find badge and description elements within the section
      const badgeEl = sectionRef.current?.querySelector("[data-badge]");
      const descEl = sectionRef.current?.querySelector("[data-description]");

      // Set initial states
      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      if (badgeEl) {
        gsap.set(badgeEl, {
          opacity: 0,
          y: -30,
        });
      }

      if (descEl) {
        gsap.set(descEl, {
          opacity: 0,
          y: 30,
        });
      }

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 40%",
          scrub: 2,
        },
      });

      // Animate badge
      if (badgeEl) {
        mainTl.to(
          badgeEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "0",
        );
      }

      // Animate description
      if (descEl) {
        mainTl.to(
          descEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "0.2",
        );
      }

      // Animate stats
      mainTl.to(
        statsRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "0.4",
      );

      statsTlRef.current = mainTl;

      return () => {
        statsTlRef.current?.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === sectionRef.current) st.kill();
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="py-36">
      <DefHeading
        theme="light"
        badgeText="Opportunity"
        showBadge={false}
        title="The Market"
        description="UK property lending is large, active and chronically under-automated."
      />

      <div ref={statsRef} className="mt-16 grid grid-cols-3 gap-4">
        {marketStats.map((stat, index) => (
          <div key={index}>
            <IconBox
              icon={stat.icon}
              title={`<span class="text-3xl font-bold block">${stat.value}</span>`}
              description={stat.description}
              titleClassName="text-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
