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
  FaChevronLeft,
  FaChevronRight,
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

const getIconBoxes = (
  desktopRef: React.RefObject<HTMLDivElement | null>,
  mobileRef: React.RefObject<HTMLDivElement | null>,
) => {
  const desktopBoxes = desktopRef.current ? Array.from(desktopRef.current.children) : [];
  return desktopBoxes;
};

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
          "No visibility into loan performance, policy adherence or portfolio analytics — oversight only after the fact, lenders unaccountable in real time",
      },
      {
        icon: icons.noCompliance,
        title:
          "Must trust lenders to follow stated policies — no mechanism to verify compliance until it is too late",
      },
      {
        icon: icons.fraud,
        title:
          "Lending rules can be broken with no detection mechanism — fraud and misrepresentation risks are structural, not incidental",
      },
      {
        icon: icons.scattered,
        title:
          "Capital locked for the full term — no secondary liquidity, no early exit; incumbents lack the blockchain layer needed to unlock it",
      },
      {
        icon: icons.fragmented,
        title:
          "Diversified small-loan portfolios are administratively punishing — pushing capital toward larger, more concentrated positions",
      },
      {
        icon: icons.costly,
        title:
          "Bolt-on compliance controls have become a permanent overhead — costs that exist because the underlying infrastructure cannot be trusted",
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
        title:
          "100+ manual touchpoints per loan — task-level automation changes nothing; underwriters still review everything, costs stay high",
      },
      {
        icon: icons.noAccess,
        title:
          "Smaller lenders shut out of institutional capital — no platform enforces capital provider criteria end-to-end; compliance undemonstrable, funding out of reach",
      },
      {
        icon: icons.uneconomic,
        title:
          "High fixed processing costs make smaller loans uneconomic — legacy systems were never designed for near-zero marginal cost",
      },
      {
        icon: icons.costly,
        title:
          "Existing systems rigid and expensive to adapt — new products and rule changes require developers, long lead times and significant cost",
      },
      {
        icon: icons.slow,
        title:
          "Manual processes don't scale — they require headcount, and headcount has a ceiling; 40–60% of applications never complete, absorbing full processing costs on every aborted deal",
      },
      {
        icon: icons.opaque,
        title:
          "AI cannot guarantee compliance — a 1% error rate means thousands of non-compliant loans; black-box reasoning leaves no audit trail",
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
          "Re-enter the same data for every lender and service provider — no shared infrastructure; data cannot follow the borrower across the market",
      },
      {
        icon: icons.opaque,
        title:
          "No certainty of outcome — no process orchestration; the right parties cannot be guaranteed to verify the right documents at the right time",
      },
      {
        icon: icons.delays,
        title:
          "Opaque, slow process — completions exceed 35 days, initial underwriting alone takes up to a week",
      },
      {
        icon: icons.noVisibility,
        title:
          "No visibility into status or next steps — entirely dependent on manual updates; no system provides live automated tracking",
      },
      {
        icon: icons.fragmented,
        title:
          "Fragmented systems leave legal, valuation and compliance steps entirely disconnected — no single platform coordinates them end-to-end",
      },
      {
        icon: icons.noData,
        title:
          "No portfolio visibility — no single view of financing positions or options across a property portfolio",
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
  const [activeSlide, setActiveSlide] = useState(0);
  const iconBoxContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
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

    const iconBoxes = getIconBoxes(iconBoxContainerRef, carouselRef);
    if (iconBoxes.length) gsap.set(iconBoxes, { opacity: 0, y: 30 });

    if (learnMoreRef.current) {
      gsap.set(learnMoreRef.current, { opacity: 0, y: 20 });
    }
  });

  // Tab-switch animation — skip on initial render (handled by entrance chain)
  useGSAP(
    () => {
      if (!initialAnimDone.current) return;
      const boxes = getIconBoxes(iconBoxContainerRef, carouselRef);
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
    const iconBoxes = getIconBoxes(iconBoxContainerRef, carouselRef);
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

  // Reset carousel slide and scroll position when the active category changes
  useLayoutEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
      setActiveSlide(0);
    }
  }, [activeIndex]);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    if (width <= 0) return;
    const index = Math.round(el.scrollLeft / width);
    setActiveSlide(index);
  };

  const goToSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    gsap.to(el, {
      scrollLeft: index * width,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handlePrevSlide = () => {
    const current = activeSlide;
    if (current > 0) goToSlide(current - 1);
  };

  const handleNextSlide = () => {
    const total = tabsData[activeIndex].iconBoxes.length;
    const current = activeSlide;
    if (current < total - 1) goToSlide(current + 1);
  };

  return (
    <div className="min-h-[calc(100vh-126px)] w-full rounded-none md:rounded-[2rem] bg-[#EBEFF2] relative overflow-hidden flex flex-col justify-center items-center">
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
                "Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. <br/>Legacy infrastructure was never built for this market.",
            }}
          />
        </div>

        <div className="hidden lg:block">
          <DefHeading
            theme="dark"
            badgeText=""
            title="The Existing Problems"
            description="Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. <br/>Legacy infrastructure was never built for this market."
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
                    className="!mx-0 !mb-0 shrink-0"
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

          {/* Desktop — IconBox content with grid layout */}
          <div
            ref={iconBoxContainerRef}
            key={`desktop-${activeIndex}`}
            className={`hidden lg:grid ${getIconBoxGridClass(tabsData[activeIndex])} gap-5 w-full`}
          >
            {tabsData[activeIndex].iconBoxes.map((iconBox, index) => (
              <div
                key={`desktop-${activeIndex}-${index}`}
                className="relative h-full"
              >
                <IconBoxLight
                  icon={iconBox.icon}
                  title={iconBox.title}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Mobile/Tablet — IconBox content with responsive carousel layout */}
          <div key={`mobile-${activeIndex}`} className="block lg:hidden w-full">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {tabsData[activeIndex].iconBoxes.map((iconBox, index) => (
                <div
                  key={`mobile-${activeIndex}-${index}`}
                  className="w-full shrink-0 snap-center snap-always"
                >
                  <IconBoxSimple
                    icon={iconBox.icon}
                    title={iconBox.title}
                    className="h-full"
                  />
                </div>
              ))}
            </div>

            {/* Carousel navigation controls (arrows + indicators) */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={handlePrevSlide}
                disabled={activeSlide === 0}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE1E4] bg-white text-[#011F27] shadow-sm transition-all active:scale-95 ${
                  activeSlide === 0 ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-pointer"
                }`}
                aria-label="Previous slide"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2">
                {tabsData[activeIndex].iconBoxes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeSlide ? "w-6 bg-[#011F27]" : "w-2 bg-[#A0AEB2]"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                disabled={activeSlide === tabsData[activeIndex].iconBoxes.length - 1}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE1E4] bg-white text-[#011F27] shadow-sm transition-all active:scale-95 ${
                  activeSlide === tabsData[activeIndex].iconBoxes.length - 1
                    ? "opacity-40 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                }`}
                aria-label="Next slide"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div ref={learnMoreRef} className="w-full flex justify-center">
          <DefButton href="/about-us">Learn more</DefButton>
        </div>
      </div>
    </div>
  );
}
