"use client";

import {
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import AdvSliderTabToggle from "@/components/AdvSliderTabToggle";
import IconBoxLight from "@/components/IconBoxLight";
import IconBoxSimple from "@/components/IconBoxSimple";

gsap.registerPlugin(ScrollTrigger);

interface TabData {
  title: string;
  items: string[];
  iconBoxColumns?: 2 | 3 | 4;
  iconBoxes: {
    src?: string;
    icon?: ReactNode;
    title: string;
    description: string;
    titleMaxWidth?: string;
  }[];
}

const getIconBoxGridClass = (tab: TabData) => {
  const columns = tab.iconBoxColumns ?? (tab.iconBoxes.length === 4 ? 4 : 3);

  // Mobile: 1 column · Tablet: 2 columns · Desktop: tab-specific layout
  if (columns === 2) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
  if (columns === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

const TAB_ANIMATION = {
  buttonDuration: 0.75,
  buttonStagger: 0.1,
  contentDuration: 1.4,
  contentStagger: 0.22,
  buttonEase: "power1.out",
  contentEase: "power2.out",
};

const getTabButtons = (ref: React.RefObject<HTMLDivElement | null>) => {
  if (!ref.current) return [];

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (isDesktop) {
    return Array.from(ref.current.querySelectorAll<HTMLElement>("[data-tab]"));
  }

  return Array.from(
    ref.current.querySelectorAll<HTMLElement>('button[role="tab"]'),
  );
};

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
          "Lenders cannot be held to account in real time; oversight only after the fact",
      },
      {
        icon: icons.noCompliance,
        title: "Must trust lenders to follow stated policies",
        titleMaxWidth: "240px",
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
          "Incumbents lack the blockchain layer and regulatory architecture needed to unlock secondary liquidity; no early exit mechanism exists",
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
        titleMaxWidth: "240px",
        description:
          "Task-level automation leaves underwriters reviewing everything; costs stay high, scaling still requires hiring",
      },
      {
        icon: icons.noAccess,
        title: "Smaller lenders shut out of institutional capital",
        titleMaxWidth: "300px",
        description:
          "No existing platform enforces capital provider criteria end-to-end; lenders cannot demonstrate compliance, due diligence costs are prohibitive, and institutional funding remains out of reach regardless of loan book quality",
      },
      {
        icon: icons.uneconomic,
        title:
          "High fixed processing costs make smaller, most in-demand loans uneconomic",
        description:
          "Legacy systems were never designed to handle volume at near-zero marginal cost",
      },
      {
        icon: icons.costly,
        title: "Existing systems rigid and expensive to adapt",
        titleMaxWidth: "280px",
        description:
          "New products, rule changes and workflow modifications require developers, long lead times and significant cost; no legacy platform simultaneously delivers complex logic, self-serve changes and full automation",
      },
      {
        icon: icons.slow,
        title: "40-60% of applications never complete",
        titleMaxWidth: "240px",
        description:
          "Full processing costs absorbed by completed loans, further eroding margins",
      },
      {
        icon: icons.opaque,
        title:
          "AI cannot guarantee compliance, meaning a 1% error rate produces thousands of non-compliant loans with no audit trail. Black-box reasoning fails audit requirements",
        titleMaxWidth: "320px",
        description:
          "No traceable logic, no decision trail, no accountability; existing systems cannot demonstrate how or why a lending decision was made",
      },
    ],
  },
  {
    title: "Borrowers",
    iconBoxColumns: 2,
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
        description:
          "No shared infrastructure; data cannot follow the borrower across the market",
      },
      {
        icon: icons.opaque,
        title: "No certainty of outcome until the final moment",
        description:
          "No process orchestration means the right parties cannot be guaranteed to verify the right documents at the right time; process lacks transparency, consistency and certainty",
      },
      {
        icon: icons.delays,
        title: "Opaque, slow process",
        description:
          "Completions exceed 35 days, initial underwriting alone takes up to a week; fragmented systems leave legal, valuation and compliance steps entirely disconnected",
      },
      {
        icon: icons.noVisibility,
        title: "No visibility into status or next steps",
        description:
          "Entirely dependent on manual updates; no existing system provides live, automated tracking throughout the process",
      },
    ],
  },
];

const problemTabs = tabsData.map((tab, index) => ({
  id: String(index),
  label: tab.title,
}));

export default function MainProblemsTabsLight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const iconBoxContainerRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);
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

    // 2. Active pill scales in (desktop only)
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

  // Keep the active tab visible inside the horizontal scroll area (mobile/tablet).
  useLayoutEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    const scrollEl = tabScrollRef.current;
    const root = tabButtonsRef.current;
    if (!scrollEl || !root) return;

    const activeBtn = root.querySelector<HTMLElement>(
      'button[role="tab"][aria-selected="true"]',
    );
    if (!activeBtn) return;

    const scrollRect = scrollEl.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const padding = 16;
    const targetLeft =
      scrollEl.scrollLeft +
      (btnRect.left - scrollRect.left) -
      padding;
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;

    scrollEl.scrollTo({
      left: Math.max(0, Math.min(targetLeft, maxScroll)),
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <div className="min-h-[calc(100vh-126px)] w-full rounded-[2rem] bg-[#EBEFF2] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="relative z-7 flex flex-col gap-y-12 max-w-[1400px] w-full px-6 py-14 lg:py-32">
        {/* Mobile/tablet heading — matches MobileAboutAtomix typography */}
        <div className="mx-0 max-w-[1800px] lg:hidden">
          <h2 className="text-[2.25rem] leading-[1.1] font-semibold text-[#212329] md:text-5xl md:leading-[1.2em]">
            The Existing Problems
          </h2>
          <p
            className="mt-4 text-[1.05rem] leading-7 text-[#474D5D] md:text-xl md:leading-8"
            dangerouslySetInnerHTML={{
              __html:
                "Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. <br/>Legacy infrastructure was never built to handle the volume, complexity or transparency this market demands.",
            }}
          />
        </div>

        <div className="hidden lg:block">
          <DefHeading
            theme="dark"
            badgeText=""
            title="The Existing Problems"
            description="Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. <br/>Legacy infrastructure was never built to handle the volume, complexity or transparency this market demands."
            showBadge={false}
            align="left"
            onAnimationComplete={startTabsEntrance}
          />
        </div>

        <div className="w-full flex flex-col gap-y-6">
          {/* Tab toggles */}
          <div ref={tabButtonsRef} className="w-full">
            {/* Mobile/tablet — AdvSlider style, horizontally scrollable */}
            <div className="lg:hidden">
              <div
                ref={tabScrollRef}
                className="-mx-6 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="inline-flex w-max min-w-full justify-start">
                  <AdvSliderTabToggle
                    tabs={problemTabs}
                    activeTabId={String(activeIndex)}
                    onTabChange={(tabId) => setActiveIndex(Number(tabId))}
                    ariaLabel="Problem categories"
                    className="!mx-0 mb-0 shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Desktop — original full-width segmented tabs */}
            <div className="relative hidden w-full rounded-2xl bg-[#DFE4E8] p-1.5 lg:flex">
              <div
                ref={activePillRef}
                className="pointer-events-none absolute top-1.5 bottom-1.5 rounded-2xl bg-white shadow-sm transition-all duration-300 ease-out"
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
                  className={`relative z-10 flex flex-1 cursor-pointer items-center justify-center rounded-xl p-5 transition-colors duration-300 ${
                    index === activeIndex
                      ? "font-semibold text-[#011F27]"
                      : "font-medium text-[#5B6F75] hover:text-[#3a4a4e]"
                  }`}
                >
                  <span className="text-base">{tab.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* IconBox content with fade-in animation */}
          <div
            ref={iconBoxContainerRef}
            key={activeIndex}
            className={`grid ${getIconBoxGridClass(tabsData[activeIndex])} gap-5 w-full`}
          >
            {tabsData[activeIndex].iconBoxes.map((iconBox, index) => (
              <div
                key={`${activeIndex}-${index}`}
                className="relative h-full"
              >
                <div className="hidden h-full lg:block">
                  <IconBoxLight
                    icon={iconBox.icon}
                    title={iconBox.title}
                    description={iconBox.description}
                    titleMaxWidth={iconBox.titleMaxWidth}
                    className="h-full"
                  />
                </div>
                <div className="h-full lg:hidden">
                  <IconBoxSimple
                    icon={iconBox.icon}
                    title={iconBox.title}
                    description={iconBox.description}
                    titleMaxWidth={iconBox.titleMaxWidth}
                    className="h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={learnMoreRef} className="w-full flex justify-center">
          <DefButton href="/about-us">Learn more</DefButton>
        </div>
      </div>
    </div>
  );
}
