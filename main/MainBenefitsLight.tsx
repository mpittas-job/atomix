"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DefHeading from "@/components/typo/DefHeading";
import { IoShieldCheckmark } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const TAB_ANIMATION = {
  buttonDuration: 0.75,
  buttonStagger: 0.1,
  contentDuration: 1.4,
  contentStagger: 0.22,
  cardDuration: 1.2,
  cardStagger: 0.18,
  imageDelay: 0.5,
  buttonEase: "power1.out",
  contentEase: "power2.out",
  cardEase: "power2.out",
};

interface TabItem {
  icon: string;
  text: string;
}

interface TabData {
  title: string;
  description: string;
  mainImage: string;
  smallImages?: string[];
  smallImage?: string;
  items: TabItem[];
}

const tabsData: TabData[] = [
  {
    title: "Capital Providers",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor",
    mainImage: "/images/dashboard-cp-main.svg",
    smallImages: [
      "/images/dashboard-cp-1.svg",
      "/images/dashboard-cp-2.svg",
      "/images/dashboard-cp-3.svg",
    ],
    smallImage: undefined as string | undefined,
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Every rule enforced automatically at every stage, including regulatory and third-party policy requirements — capital deployed exactly as intended, blind trust replaced by architecture",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Every decision immutably on-chain — fraud impossible to hide, compliance instant and continuous",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "One integration, multiple lenders — per-lender due diligence costs collapse, institutional capital accessible at scale",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Automated portfolio reporting — diversified small-loan positions no more demanding to monitor than concentrated ones",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Tokenised loan participations — static positions become tradeable digital assets, liquidity unlocked",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Unified workspace provides live visibility across every funded loan — all activity accessible in real time, no dependence on lender reporting",
      },
    ],
  },
  {
    title: "Lenders",
    description:
      "Incididunt ut labore et dolore magna aliqua ut enim ad minim veniam",
    mainImage: "/images/dashboard-lenders-main.svg",
    smallImage: "/images/dashboard-lenders-small.svg",
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Full workflow automation, credit policy enforced throughout — underwriter bottleneck broken, volume scales without headcount",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Pay-as-you-go, fees scale with loan size — smaller loans profitable for the first time, fixed processing floor eliminated",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "White-label ready, no rebuild required — any product, any market, without developer dependency",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "No-code configuration — rules and products changed in minutes, not months; zero operational risk",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Open API, modular architecture — connects to any data provider, valuation method or third-party system",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Platform compliance infrastructure levels the playing field — institutional capital accessible regardless of lender size",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Live risk-adjusted pricing — driven by real market data, not manual assessment",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Immutable on-chain decision trail — every lending decision traceable, auditable and defensible; no black box, full regulatory accountability",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Earlier automated decisioning — abort rate economics improve; incomplete applications no longer subsidise completed ones",
      },
    ],
  },
  {
    title: "Borrowers",
    description:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    mainImage: "/images/dashboard-partner-main.svg",
    smallImage: "/images/dashboard-partner-small.svg",
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Data entered once, shared across all parties — re-keying eliminated, errors reduced",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Automated policy enforcement, every outcome on-chain — consistent, verifiable decisions from first interaction to completion, no black box",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Unified workspace — all parties connected in real time, every document and decision in one place",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "End-to-end coordination eliminates fragmentation — legal, valuation and compliance steps managed within the platform, cutting completion times and funding costs",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Real-time loan tracking replaces manual updates — borrowers always know their status and next steps, no chasing required",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Portfolio analytics — full visibility across an entire property portfolio, track and optimise financing in real time",
      },
    ],
  },
];

const getTabButtons = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.querySelectorAll("[data-tab]")) : [];

const getTabContent = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.children) : [];

function formatListItemText(text: string) {
  const dashIndex = text.indexOf(" — ");
  if (dashIndex === -1) return text;

  const lead = text.slice(0, dashIndex);
  const rest = text.slice(dashIndex);

  return (
    <>
      <span className="font-semibold text-[#011F27]">{lead}</span>
      {rest}
    </>
  );
}

export default function MainBenefitsLight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);
  const initialAnimDone = useRef(false);
  const entranceStartedRef = useRef(false);

  // Card animation refs
  const cardBgRef = useRef<HTMLDivElement>(null);
  const cardBlursRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnBlurRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const smallImageRef = useRef<HTMLImageElement>(null);

  const animateActivePanel = () => {
    // Kill any existing tweens on animated elements
    const elementsToAnimate = [
      titleRef.current,
      descRef.current,
      ...(listRef.current?.children
        ? Array.from(listRef.current.children)
        : []),
      mainImageRef.current,
      smallImageRef.current,
    ].filter(Boolean);

    gsap.killTweensOf(elementsToAnimate);

    // Reset initial states
    if (titleRef.current) gsap.set(titleRef.current, { autoAlpha: 0, y: 24 });
    if (descRef.current) gsap.set(descRef.current, { autoAlpha: 0, y: 18 });
    if (listRef.current?.children) {
      gsap.set(listRef.current.children, { autoAlpha: 0, y: 16 });
    }
    if (mainImageRef.current)
      gsap.set(mainImageRef.current, { autoAlpha: 0, x: 60 });
    if (smallImageRef.current)
      gsap.set(smallImageRef.current, { autoAlpha: 0, x: -40 });

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    const contentStart = 0;

    if (mainImageRef.current) {
      tl.to(
        mainImageRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: TAB_ANIMATION.contentDuration,
          ease: TAB_ANIMATION.contentEase,
        },
        contentStart + TAB_ANIMATION.imageDelay,
      );
    }

    if (smallImageRef.current) {
      tl.to(
        smallImageRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: TAB_ANIMATION.contentDuration,
          ease: TAB_ANIMATION.contentEase,
        },
        contentStart + TAB_ANIMATION.imageDelay + 0.12,
      );
    }

    if (titleRef.current) {
      tl.to(
        titleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          ease: TAB_ANIMATION.contentEase,
        },
        contentStart,
      );
    }

    if (descRef.current) {
      tl.to(
        descRef.current,
        {
          autoAlpha: 0.9,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          ease: TAB_ANIMATION.contentEase,
        },
        contentStart + 0.08,
      );
    }

    if (listRef.current?.children.length) {
      tl.to(
        listRef.current.children,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
        contentStart + 0.14,
      );
    }
  };

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

    const tabContent = getTabContent(contentRef);
    if (tabContent.length) gsap.set(tabContent, { autoAlpha: 0 });

    // Card content initial states (use autoAlpha like benefits-tabs)
    if (contentRef.current) {
      gsap.set(contentRef.current, { autoAlpha: 0 });
    }
    if (cardBgRef.current) {
      gsap.set(cardBgRef.current, { autoAlpha: 0, scale: 0.98 });
    }
    if (cardBlursRef.current) {
      gsap.set(cardBlursRef.current, { autoAlpha: 0 });
    }
    if (rightColumnRef.current) {
      gsap.set(rightColumnRef.current, { autoAlpha: 0 });
    }
    if (rightColumnBlurRef.current) {
      gsap.set(rightColumnBlurRef.current, { autoAlpha: 0, scale: 0.8 });
    }
    if (titleRef.current) {
      gsap.set(titleRef.current, { autoAlpha: 0, y: 24 });
    }
    if (descRef.current) {
      gsap.set(descRef.current, { autoAlpha: 0, y: 18 });
    }
    if (listRef.current) {
      gsap.set(listRef.current.children, { autoAlpha: 0, y: 16 });
    }
    if (mainImageRef.current) {
      gsap.set(mainImageRef.current, { autoAlpha: 0, x: 60 });
    }
    if (smallImageRef.current) {
      gsap.set(smallImageRef.current, { autoAlpha: 0, x: -40 });
    }
  });

  // Tab-switch animation — skip on initial render (handled by entrance chain)
  useGSAP(
    () => {
      if (!initialAnimDone.current) return;
      animateActivePanel();
    },
    { dependencies: [activeIndex] },
  );

  // Card content entrance animation - slower like benefits-tabs
  const animateCardContent = useCallback(() => {
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    // Step 1: Fade in card background with blurred circles (slower)
    if (cardBgRef.current) {
      tl.to(cardBgRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: TAB_ANIMATION.cardDuration,
        ease: TAB_ANIMATION.cardEase,
      });
    }
    if (cardBlursRef.current) {
      tl.to(
        cardBlursRef.current,
        {
          autoAlpha: 1,
          duration: TAB_ANIMATION.cardDuration * 0.8,
          ease: TAB_ANIMATION.cardEase,
        },
        "-=0.8",
      );
    }

    // Step 2: Fade in right column (blue bg) with its blur (slower)
    if (rightColumnRef.current) {
      tl.to(
        rightColumnRef.current,
        {
          autoAlpha: 1,
          duration: TAB_ANIMATION.cardDuration,
          ease: TAB_ANIMATION.cardEase,
        },
        "-=0.6",
      );
    }
    if (rightColumnBlurRef.current) {
      tl.to(
        rightColumnBlurRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: TAB_ANIMATION.cardDuration * 1.1,
          ease: "back.out(1.7)",
        },
        "-=0.9",
      );
    }

    // Step 3: Left content first; images follow 1s after title begins
    if (titleRef.current) {
      tl.to(
        titleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.cardDuration,
          ease: TAB_ANIMATION.cardEase,
        },
        "-=0.6",
      );
      tl.addLabel("panelContent", "<");
    }

    if (descRef.current) {
      tl.to(
        descRef.current,
        {
          autoAlpha: 0.9,
          y: 0,
          duration: TAB_ANIMATION.cardDuration,
          ease: TAB_ANIMATION.cardEase,
        },
        "panelContent+=0.08",
      );
    }

    if (listRef.current && listRef.current.children.length) {
      tl.to(
        listRef.current.children,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.cardDuration,
          stagger: TAB_ANIMATION.cardStagger,
          ease: TAB_ANIMATION.cardEase,
        },
        "panelContent+=0.14",
      );
    }

    if (mainImageRef.current) {
      tl.to(
        mainImageRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: TAB_ANIMATION.cardDuration * 1.4,
          ease: TAB_ANIMATION.cardEase,
        },
        `panelContent+=${TAB_ANIMATION.imageDelay}`,
      );
    }

    if (smallImageRef.current) {
      tl.to(
        smallImageRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: TAB_ANIMATION.cardDuration * 1.4,
          ease: TAB_ANIMATION.cardEase,
        },
        `panelContent+=${TAB_ANIMATION.imageDelay + 0.12}`,
      );
    }
  }, []);

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

    // 4. Reveal content wrapper earlier, then animate card content
    if (contentRef.current) {
      tl.set(contentRef.current, { autoAlpha: 1 }, "-=1.25");
      tl.add(animateCardContent, ">");
    }
  }, [animateCardContent]);

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
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-gradient-to-b from-[#ebeef1] to-[#f5f5f5] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="relative z-10 flex flex-col gap-y-12 w-full max-w-[1200px] px-8 py-32">
        <DefHeading
          theme="dark"
          badgeText=""
          title="Benefits"
          description=""
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

          {/* Tab content with card layout */}
          <div ref={contentRef} key={activeIndex} className="">
            <div
              ref={cardBgRef}
              className="group relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md p-2 overflow-hidden transition-all duration-300"
              style={{
                boxShadow:
                  "inset 0 1px 2px rgba(255,255,255,0.6), inset 5px 5px 20px rgba(10, 21, 44, 0.06)",
              }}
            >
              <div
                ref={cardBlursRef}
                className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
              >
                <div className="absolute -top-5 -right-5 w-[45%] h-[45%] rounded-full bg-white/60  blur-xl" />
                <div className="absolute -bottom-5 -left-5 w-[45%] h-[45%] rounded-full bg-white/60  blur-xl" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 relative">
                {/* Left side - Content */}
                <div className="p-8">
                  <h2
                    ref={titleRef}
                    className="text-4xl font-semibold mb-4 text-[#011F27]"
                  >
                    {tabsData[activeIndex].title}
                  </h2>
                  <p ref={descRef} className="text-[#495F64] mb-10">
                    {tabsData[activeIndex].description}
                  </p>
                  <ul ref={listRef} className="space-y-5">
                    {tabsData[activeIndex].items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="">
                          <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                        </div>
                        <span className="text-[#495F64]">
                          {formatListItemText(item.text)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right side - Images */}
                <div
                  ref={rightColumnRef}
                  className="bg-[#499DB8] rounded-2xl relative min-h-[400px] lg:min-h-full overflow-hidden"
                >
                  <div
                    ref={rightColumnBlurRef}
                    className="w-50 h-50 rounded-full blur-[100px] bg-white/50 absolute -top-25 -right-25"
                  ></div>

                  <div>
                    <Image
                      ref={mainImageRef}
                      src={
                        activeIndex === 0
                          ? "/dashboard/benefits-tab-1-img-lg.svg"
                          : "/images/dashboard-lenders-main.svg"
                      }
                      alt=""
                      width={600}
                      height={400}
                      className="absolute top-1/2 -translate-y-1/2 -right-10 object-contain rounded-lg w-[85%] h-auto"
                    />

                    <Image
                      ref={smallImageRef}
                      src={
                        activeIndex === 0
                          ? "/dashboard/benefits-tab-1-img-sm.png"
                          : activeIndex === 1
                            ? "/images/dashboard-lenders-small.svg"
                            : "/images/dashboard-partner-small.svg"
                      }
                      alt=""
                      width={600}
                      height={400}
                      className={`absolute top-1/2 left-20 -translate-y-1/2 object-contain rounded-lg h-auto ${
                        activeIndex === 2 ? "w-[34%]" : "w-[40%]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
