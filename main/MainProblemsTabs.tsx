"use client";

import { type ReactNode, useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button as DefButton } from "@/components/ui";
import DefHeading from "@/components/typo/DefHeading";

import {
  FaBan,
  FaBinoculars,
  FaClockRotateLeft,
  FaFileCircleXmark,
  FaHandHoldingDollar,
  FaHourglassHalf,
  FaLink,
  FaMoneyBillTransfer,
  FaPeopleGroup,
  FaPersonCircleQuestion,
  FaScaleUnbalanced,
  FaShieldHalved,
  FaShuffle,
  FaTriangleExclamation,
  FaUserLock,
  FaUserSlash,
  FaUsersSlash,
  FaXmark,
} from "react-icons/fa6";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger);

interface TabData {
  title: string;
  items: string[];
  iconBoxes: {
    src?: string;
    icon?: ReactNode;
    title: string;
    description: string;
  }[];
}

const TAB_ANIMATION = {
  buttonDuration: 0.75,
  buttonStagger: 0.1,
  contentDuration: 1.4,
  contentStagger: 0.22,
  buttonEase: "power1.out",
  contentEase: "power2.out",
};

const icons = {
  noVisibility: <FaBinoculars className="h-10 w-10" />,
  noCompliance: <FaShieldHalved className="h-10 w-10" />,
  noAudit: <FaFileCircleXmark className="h-10 w-10" />,
  noAccess: <FaUserLock className="h-10 w-10" />,
  fragmented: <FaLink className="h-10 w-10" />,
  noWarning: <FaTriangleExclamation className="h-10 w-10" />,
  touchpoints: <FaPeopleGroup className="h-10 w-10" />,
  uneconomic: <FaScaleUnbalanced className="h-10 w-10" />,
  hiring: <FaUsersSlash className="h-10 w-10" />,
  fraud: <FaBan className="h-10 w-10" />,
  slow: <FaHourglassHalf className="h-10 w-10" />,
  noData: <FaXmark className="h-10 w-10" />,
  opaque: <FaPersonCircleQuestion className="h-10 w-10" />,
  delays: <FaClockRotateLeft className="h-10 w-10" />,
  chasing: <FaShuffle className="h-10 w-10" />,
  noMatch: <FaUserSlash className="h-10 w-10" />,
  costly: <FaMoneyBillTransfer className="h-10 w-10" />,
  scattered: <FaHandHoldingDollar className="h-10 w-10" />,
};

const tabsData: TabData[] = [
  {
    title: "Capital Providers",
    items: [
      "Invest with full transparency",
      "Automated compliance checks",
      "Diversified lending opportunities",
      "Real-time portfolio tracking",
    ],
    iconBoxes: [
      {
        icon: icons.noVisibility,
        title:
          "No real-time visibility into loan performance, policy adherence or portfolio analytics",
        description:
          "lenders cannot be held to account in real time; oversight only after the fact",
      },
      {
        icon: icons.noCompliance,
        title: "Must trust lenders to follow stated policies",
        description:
          "With no mechanism to verify compliance until it is too late",
      },
      {
        icon: icons.fraud,
        title: "Lending rules can be broken with no mechanism for detection",
        description:
          "Fraud and misrepresentation risks are structural, not incidental",
      },
      {
        icon: icons.scattered,
        title: "Capital locked for the full term",
        description:
          "Incumbents lack the blockchain layer and regulatory architecture needed to unlock secondary liquidity; no exit mechanism exists",
      },
      {
        icon: icons.fragmented,
        title:
          "Diversified small-loan portfolios are administratively punishing",
        description:
          "Pushing capital toward larger, more concentrated positions",
      },
      {
        icon: icons.costly,
        title: "Bolt-on compliance controls have become a permanent overhead",
        description:
          "Costs that exist because the underlying infrastructure cannot be trusted",
      },
    ],
  },
  {
    title: "Lenders",
    items: [
      "Automate lending workflows",
      "Access capital faster",
      "Scale without adding headcount",
      "Reduce manual touchpoints",
    ],
    iconBoxes: [
      {
        icon: icons.touchpoints,
        title: "100+ manual touchpoints per loan",
        description:
          "Growth requires hiring, scaling requires heavy investment",
      },
      {
        icon: icons.noAccess,
        title: "Smaller originators shut out of institutional capital",
        description:
          "Too small for dedicated facilities, unable to achieve securitisation scale individually",
      },
      {
        icon: icons.uneconomic,
        title:
          "High fixed processing costs make smaller, most in-demand loans uneconomic to originate",
        description: "",
      },
      {
        icon: icons.noAudit,
        title: "Existing systems are rigid and expensive to adapt",
        description:
          "New products, rule changes and workflow modifications require developers, long lead times and significant cost",
      },
      {
        icon: icons.slow,
        title: "40-60% of applications never complete",
        description:
          "But their full processing costs are absorbed by completed loans, further eroding margins",
      },
      {
        icon: icons.costly,
        title: "Due diligence costs are prohibitive for smaller lenders",
        description:
          "Institutional capital remains out of reach regardless of loan book quality",
      },
    ],
  },
  {
    title: "Borrowers",
    items: [
      "Faster loan approvals",
      "Transparent process tracking",
      "Reduced documentation burden",
      "Better rate accessibility",
    ],
    iconBoxes: [
      {
        icon: icons.chasing,
        title:
          "Re-enter the same data for every lender and every service provider",
        description: "",
      },
      {
        icon: icons.opaque,
        title: "No certainty of outcome until the final moment",
        description: "Process lacks transparency, consistency and certainty",
      },
      {
        icon: icons.delays,
        title: "Opaque, slow process",
        description:
          "Completions exceed 35 days, initial underwriting alone takes up to a week",
      },
      {
        icon: icons.noVisibility,
        title: "No visibility into status or next steps",
        description:
          "Entirely dependent on manual updates and underwriter discretion",
      },
    ],
  },
];

export default function MainProblemsTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const iconBoxContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const initialAnimDone = useRef(false);
  const learnMoreRef = useRef<HTMLDivElement>(null);
  const entranceStartedRef = useRef(false);

  // Set initial hidden state for tab buttons and content
  useGSAP(() => {
    if (tabButtonsRef.current) {
      gsap.set(Array.from(tabButtonsRef.current.children), {
        opacity: 0,
      });
    }
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

  // Tab-switch animation — skip on initial render (handled by entrance chain)
  useGSAP(
    () => {
      if (!iconBoxContainerRef.current) return;
      if (!initialAnimDone.current) return;
      const boxes = iconBoxContainerRef.current.children;
      gsap.fromTo(
        boxes,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
      );
    },
    { dependencies: [activeIndex] },
  );

  // Called when DefHeading finishes its full animation sequence
  const startTabsEntrance = useCallback(() => {
    if (entranceStartedRef.current) return;
    entranceStartedRef.current = true;

    const tl = gsap.timeline({ delay: 1 });

    // 1. Tab buttons fade in up with stagger
    if (tabButtonsRef.current) {
      tl.to(Array.from(tabButtonsRef.current.children), {
        opacity: 1,
        duration: TAB_ANIMATION.buttonDuration,
        stagger: TAB_ANIMATION.buttonStagger,
        ease: TAB_ANIMATION.buttonEase,
      });
    }

    // Mark entrance done so tab-switch animation is unlocked
    tl.add(() => {
      initialAnimDone.current = true;
    });

    // 2. Tab content fade in up (same animation as tab switch)
    if (iconBoxContainerRef.current) {
      tl.to(
        Array.from(iconBoxContainerRef.current.children),
        {
          opacity: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
        "+=0.15",
      );
    }

    // 3. Learn more button fade in up
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

  useGSAP(() => {
    if (!tabButtonsRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: tabButtonsRef.current,
      start: "top 92%",
      once: true,
      onEnter: startTabsEntrance,
    });

    return () => {
      trigger.kill();
    };
  }, [startTabsEntrance]);

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

      <div className="relative z-10 flex flex-col gap-y-12 max-w-[1200px] w-full px-8 py-32">
        <DefHeading
          theme="light"
          badgeText=""
          title="The Existing Problems"
          description="Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. Legacy infrastructure was never built to handle the volume, complexity or transparency this market demands."
          showBadge={false}
          onAnimationComplete={startTabsEntrance}
        />

        <div className="w-full flex flex-col gap-y-6">
          {/* Tab Buttons - Horizontal */}
          <div ref={tabButtonsRef} className="flex gap-4 w-full">
            {tabsData.map((tab, index) => (
              <div
                key={tab.title}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 overflow-hidden ${
                  index === activeIndex
                    ? "bg-[#eaeff1] text-black border-transparent"
                    : "border border-[#1491B3] bg-[#003746]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-8 -bottom-8 right-4 w-[15%] rotate-20 bg-[#58fffc]/15 blur-2xl" />
                  <div className="absolute -top-8 -bottom-8 right-65 w-[3%] rotate-20 bg-[#58fffc]/15 blur-xl" />
                </div>
                <h3
                  className={`text-lg font-semibold text-center relative z-10 ${
                    index === activeIndex ? "text-[#0f1b1e]" : "text-white"
                  }`}
                >
                  {tab.title}
                </h3>
              </div>
            ))}
          </div>

          {/* IconBox content with fade-in animation */}
          <div
            ref={iconBoxContainerRef}
            key={activeIndex}
            className={`grid ${
              tabsData[activeIndex].iconBoxes.length === 4
                ? "grid-cols-4"
                : "grid-cols-3"
            } gap-5 w-full`}
          >
            {tabsData[activeIndex].iconBoxes.map((iconBox, index) => (
              <div key={`${activeIndex}-${index}`} className="relative">
                <IconBox
                  icon={iconBox.icon}
                  src={iconBox.src}
                  title={iconBox.title}
                  description={iconBox.description}
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={learnMoreRef} className="w-full flex justify-center">
          <DefButton href="/landing-platform-benefits">Learn more</DefButton>
        </div>
      </div>
    </div>
  );
}
