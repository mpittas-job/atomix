"use client";

import { type ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
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
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
          "Lenders cannot be held to account in real time; oversight only after the fact",
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
          "High ﬁxed processing costs make smaller, most in-demand loans uneconomic to originate",
        description: "",
      },
      {
        icon: icons.noAudit,
        title: "Existing systems are rigid and expensive to adapt",
        description:
          "New products, rule changes and workﬂow modiﬁcations require developers, long lead times and signiﬁcant cost",
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
        title: "No certainty of outcome until the ﬁnal moment",
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

export default function ScrollableTabsv2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const iconBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const segSize = 1 / tabsData.length;
    const segStart = index * segSize;
    const inStart = index === 0 ? 0.04 : segStart + 0.02;
    const animationComplete = inStart + 0.12 + 0.035 * 3;
    const targetProgress = animationComplete;
    const scrollToY = st.start + (st.end - st.start) * targetProgress;
    const progressDelta = Math.abs(st.progress - targetProgress);
    const scrollDuration = gsap.utils.clamp(
      1.8,
      3.2,
      1.8 + progressDelta * 2.0,
    );
    gsap.to(window, {
      scrollTo: { y: scrollToY },
      duration: scrollDuration,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Set initial states - make tabs visible initially
      gsap.set(tabsSectionRef.current, { opacity: 1, y: 0 });

      // Set all icon box groups hidden initially — all animate in via scroll timeline
      iconBoxRefs.current.forEach((group) => {
        if (group) {
          gsap.set(group.children, { scale: 0.8, opacity: 0, y: 30 });
        }
      });

      // Create pinned scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=10000",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              tabsData.length - 1,
              Math.floor(self.progress * tabsData.length),
            );
            setActiveIndex(newIndex);
          },
        },
      });

      // Normalize timeline to exactly 1.0 so positions = scroll progress
      tl.set({}, {}, 1);

      // Animate each tab's IconBox group independently
      tabsData.forEach((_, tabIdx) => {
        const group = iconBoxRefs.current[tabIdx];
        if (!group) return;

        const segSize = 1 / tabsData.length;
        const segStart = tabIdx * segSize;
        const segEnd = (tabIdx + 1) * segSize;
        const inStart = tabIdx === 0 ? 0.04 : segStart + 0.02;
        const outStart = segEnd - 0.08;
        const isLastTab = tabIdx === tabsData.length - 1;

        // Animate in: individually placed cards spread across the segment
        const cardCount = group.children.length;
        const availableRange = outStart - inStart - 0.02;
        const cardSpacing = availableRange / cardCount;
        Array.from(group.children).forEach((child, i) => {
          tl.to(
            child,
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: cardSpacing * 1.2,
              ease: "power2.out",
            },
            inStart + i * cardSpacing,
          );
        });

        // Animate out (skip for last tab)
        if (!isLastTab) {
          tl.to(
            group.children,
            {
              scale: 0.8,
              opacity: 0,
              y: -20,
              stagger: -0.012,
              duration: 0.06,
              ease: "power2.in",
            },
            outStart,
          );
        }
      });

      scrollTriggerRef.current = tl.scrollTrigger!;

      // Refresh ScrollTrigger to ensure proper calculations with multiple pinned sections
      ScrollTrigger.refresh();

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center px-4 pt-[140px] gap-y-16 relative z-[120]"
    >
      {/* Top - DefHeading */}
      <DefHeading
        theme="light"
        badgeText="The Market Reality"
        title="The Existing Problems"
        description="Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. Legacy infrastructure was never built to handle the volume, complexity or transparency this market demands."
        showBadge={false}
      />

      {/* Bottom Section - Tabs and IconBoxes */}
      <div
        ref={tabsSectionRef}
        className="flex flex-col w-full max-w-[1200px] px-8 bg-red-500/0"
        id="main-scoll-tabs"
      >
        {/* Tab Buttons - Horizontal */}
        <div className="flex gap-4 w-full">
          {tabsData.map((tab, index) => (
            <div
              key={tab.title}
              onClick={() => handleTabClick(index)}
              className={`relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 overflow-hidden ${
                index === activeIndex
                  ? "bg-[#eaeff1] text-black"
                  : "bg-[#124652]"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
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

        {/* Bottom Section - Stacked IconBox groups for each tab */}
        <div className="relative mt-8" style={{ minHeight: 200 }}>
          {tabsData.map((tab, tabIdx) => (
            <div
              key={tab.title}
              ref={(el) => {
                iconBoxRefs.current[tabIdx] = el;
              }}
              className={`grid ${tabIdx === 2 ? "grid-cols-4" : "grid-cols-3"} gap-3 w-full `}
              style={{
                position: tabIdx === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                right: 0,
                pointerEvents: tabIdx === activeIndex ? "auto" : "none",
              }}
            >
              {tab.iconBoxes.map((iconBox, index) => (
                <div key={`${tabIdx}-${index}`} className="relative">
                  <IconBox
                    icon={iconBox.icon}
                    src={iconBox.src}
                    title={iconBox.title}
                    description={iconBox.description}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
