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
import IconBoxLight from "@/components/IconBoxLight";

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

const getTabButtons = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.querySelectorAll("[data-tab]")) : [];

const getIconBoxes = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.children) : [];

const icons = {
  noVisibility: <FaBinoculars className="h-7 w-7" />,
  noCompliance: <FaShieldHalved className="h-7 w-7" />,
  noAudit: <FaFileCircleXmark className="h-7 w-7" />,
  noAccess: <FaUserLock className="h-7 w-7" />,
  fragmented: <FaLink className="h-7 w-7" />,
  noWarning: <FaTriangleExclamation className="h-7 w-7" />,
  touchpoints: <FaPeopleGroup className="h-7 w-7" />,
  uneconomic: <FaScaleUnbalanced className="h-7 w-7" />,
  hiring: <FaUsersSlash className="h-7 w-7" />,
  fraud: <FaBan className="h-7 w-7" />,
  slow: <FaHourglassHalf className="h-7 w-7" />,
  noData: <FaXmark className="h-7 w-7" />,
  opaque: <FaPersonCircleQuestion className="h-7 w-7" />,
  delays: <FaClockRotateLeft className="h-7 w-7" />,
  chasing: <FaShuffle className="h-7 w-7" />,
  noMatch: <FaUserSlash className="h-7 w-7" />,
  costly: <FaMoneyBillTransfer className="h-7 w-7" />,
  scattered: <FaHandHoldingDollar className="h-7 w-7" />,
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

export default function MainProblemsTabsLight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const iconBoxContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);
  const initialAnimDone = useRef(false);
  const learnMoreRef = useRef<HTMLDivElement>(null);
  const entranceStartedRef = useRef(false);

  // Set initial hidden state for tab buttons and content
  useGSAP(() => {
    if (tabButtonsRef.current) {
      gsap.set(tabButtonsRef.current, { opacity: 0 });
    }

    const tabButtons = getTabButtons(tabButtonsRef);
    if (tabButtons.length) gsap.set(tabButtons, { opacity: 0, y: 15 });

    if (activePillRef.current) {
      gsap.set(activePillRef.current, { opacity: 0, scale: 0.85 });
    }

    const iconBoxes = getIconBoxes(iconBoxContainerRef);
    if (iconBoxes.length) gsap.set(iconBoxes, { opacity: 0, y: 30 });

    if (learnMoreRef.current) {
      gsap.set(learnMoreRef.current, { opacity: 0, y: 20 });
    }
  });

  // Tab-switch animation — skip on initial render (handled by entrance chain)
  useGSAP(
    () => {
      if (!initialAnimDone.current) return;
      const boxes = getIconBoxes(iconBoxContainerRef);
      if (!boxes.length) return;
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

    // 1. Background container fades in first
    if (tabButtonsRef.current) {
      tl.to(tabButtonsRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // 2. Active pill scales in
    if (activePillRef.current) {
      tl.to(
        activePillRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );
    }

    // 3. Tab buttons slide up and fade in with stagger
    const tabButtons = getTabButtons(tabButtonsRef);
    if (tabButtons.length) {
      tl.to(
        tabButtons,
        {
          opacity: 1,
          y: 0,
          duration: TAB_ANIMATION.buttonDuration,
          stagger: TAB_ANIMATION.buttonStagger,
          ease: TAB_ANIMATION.buttonEase,
        },
        "-=0.4",
      );
    }

    // Mark entrance done so tab-switch animation is unlocked
    tl.add(() => {
      initialAnimDone.current = true;
    });

    // 2. Tab content fade in up (same animation as tab switch)
    const iconBoxes = getIconBoxes(iconBoxContainerRef);
    if (iconBoxes.length) {
      tl.to(
        iconBoxes,
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

  useGSAP(
    () => {
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
    },
    { dependencies: [startTabsEntrance] },
  );

  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-[#EBEFF2] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="relative z-7 flex flex-col gap-y-12 max-w-[1200px] w-full px-7 py-32">
        <DefHeading
          theme="dark"
          badgeText=""
          title="The Existing Problems"
          description="Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. Legacy infrastructure was never built to handle the volume, complexity or transparency this market demands."
          showBadge={false}
          onAnimationComplete={startTabsEntrance}
        />

        <div className="w-full flex flex-col gap-y-6">
          {/* Tab Buttons - Horizontal */}
          <div
            ref={tabButtonsRef}
            className="relative flex w-full bg-[#DFE4E8] rounded-2xl p-1.5"
          >
            {/* Sliding active pill */}
            <div
              ref={activePillRef}
              className="absolute top-1.5 bottom-1.5 rounded-2xl bg-white shadow-sm transition-all duration-300 ease-out pointer-events-none"
              style={{
                width: `calc((100% - 0.75rem) / ${tabsData.length})`,
                left: `calc(0.375rem + ${activeIndex} * (100% - 0.75rem) / ${tabsData.length})`,
              }}
            />

            {tabsData.map((tab, index) => (
              <div
                key={tab.title}
                data-tab
                onClick={() => setActiveIndex(index)}
                className={`flex-1 flex items-center justify-center rounded-xl p-5 cursor-pointer transition-colors duration-300 relative z-10 ${
                  index === activeIndex
                    ? "text-[#011F27] font-semibold"
                    : "text-[#5B6F75] font-medium hover:text-[#3a4a4e]"
                }`}
              >
                <span className="text-base">{tab.title}</span>
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
              <div
                key={`${activeIndex}-${index}`}
                className="relative h-full will-change-transform"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.2,
                    zIndex: 10,
                    duration: 0.25,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    zIndex: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }}
              >
                <IconBoxLight
                  icon={iconBox.icon}
                  title={iconBox.title}
                  description={iconBox.description}
                  className="h-full"
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
