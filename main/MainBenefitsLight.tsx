"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button as DefButton } from "@/components/ui";
import DefHeading from "@/components/typo/DefHeading";
import { FiCheck } from "react-icons/fi";
import { IoShieldCheckmark } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const TAB_ANIMATION = {
  buttonDuration: 0.75,
  buttonStagger: 0.1,
  contentDuration: 1.4,
  contentStagger: 0.22,
  cardDuration: 1.2,
  cardStagger: 0.18,
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
      "Invest with full transparency, automated compliance, and access to diversified lending opportunities.",
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
        text: "Blind trust replaced — with real-time transparency and verifiable audit trails",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Fraud eliminated at source — by design, not as an afterthought",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Due diligence costs slashed — through automated compliance checks",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Liquidity unlocked — via on-chain asset tokenization",
      },
      {
        icon: "/icons/white/path-arrows.svg",
        text: "Granularity penalty eliminated — enabling fractional investment",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Bolt-on compliance controls replaced by architecture — every decision is auditable",
      },
    ],
  },
  {
    title: "Lenders",
    description:
      "Automate lending workflows, access capital faster, and scale operations without increasing headcount.",
    mainImage: "/images/dashboard-lenders-main.svg",
    smallImage: "/images/dashboard-lenders-small.svg",
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Underwriter bottleneck broken — goal-driven workflow automation processes loans at scale; human touchpoints only where chosen",
      },
      {
        icon: "/icons/white/user-minus.svg",
        text: "Smaller loans profitable — usage-based fees scale with loan size, no fixed processing floor",
      },
      {
        icon: "/icons/white/scales.svg",
        text: "Capital access opened — platform compliance and audit infrastructure attracts institutional and private investors directly",
      },
      {
        icon: "/icons/white/module-simple.svg",
        text: "Rule changes in minutes — no-code configuration means no developer dependency, no delays, no operational risk",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Faster completion cuts funding costs directly — every day removed from the cycle reduces the cost of capital per loan",
      },
      {
        icon: "/icons/white/electricity-simple.svg",
        text: "Earlier automated decisioning reduces abort rates — costs no longer absorbed across completed loans, improving per-loan economics across the book",
      },
    ],
  },
  {
    title: "Borrowers",
    description:
      "Borrowers move from enquiry to drawdown in a structured, transparent journey.",
    mainImage: "/images/dashboard-partner-main.svg",
    smallImage: "/images/dashboard-partner-small.svg",
    items: [
      {
        icon: "/icons/white/electricity-simple.svg",
        text: "One application, every lender — data entered once, used across the entire journey via unified workspace",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Certainty from the start — instant indicative offer refined automatically as more information is provided",
      },
      {
        icon: "/icons/white/path-arrows.svg",
        text: "Live loan status throughout — consistent outcomes, no chasing, no dependence on underwriter discretion",
      },
      {
        icon: "/icons/white/module-simple.svg",
        text: "Faster process — underwriting instant; legal and valuation steps coordinated within the platform, not left to fragment",
      },
    ],
  },
];

const getTabButtons = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.querySelectorAll("[data-tab]")) : [];

const getTabContent = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.children) : [];

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

    // Animate left side content
    if (titleRef.current) {
      tl.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: TAB_ANIMATION.contentDuration,
        ease: TAB_ANIMATION.contentEase,
      });
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
        "-=0.6",
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
        "-=0.5",
      );
    }

    // Animate right side images
    if (mainImageRef.current) {
      tl.to(
        mainImageRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: TAB_ANIMATION.contentDuration,
          ease: TAB_ANIMATION.contentEase,
        },
        "-=0.8",
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
        "-=0.9",
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

    // Step 3: Animate left side elements - title, description, list items (slower with more stagger)
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
        "-=0.85",
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
        "-=0.75",
      );
    }

    // Step 4: Animate main image from right - STARTS EARLIER (overlaps with list items)
    if (mainImageRef.current) {
      tl.to(
        mainImageRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: TAB_ANIMATION.cardDuration * 1.4,
          ease: TAB_ANIMATION.cardEase,
        },
        "-=2.2",
      );
    }

    // Step 5: Animate small image from right - STARTS EARLIER (overlaps with list items)
    if (smallImageRef.current) {
      tl.to(
        smallImageRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: TAB_ANIMATION.cardDuration * 1.4,
          ease: TAB_ANIMATION.cardEase,
        },
        "-=2.4",
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
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-[#EBEFF2] relative overflow-hidden flex flex-col justify-center items-center">
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
                <div className="p-14">
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
                    {activeIndex === 0 ? (
                      tabsData[activeIndex].items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">{item.text}</span>
                        </li>
                      ))
                    ) : activeIndex === 1 ? (
                      <>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim.
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia
                            consequuntur.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Neque porro quisquam est, qui dolorem ipsum quia
                            dolor sit amet, consectetur, adipisci velit.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="">
                            <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                          </div>
                          <span className="text-[#495F64]">
                            Quis autem vel eum iure reprehenderit qui in ea
                            voluptate velit esse quam nihil molestiae.
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Right side - Images */}
                <div
                  ref={rightColumnRef}
                  className="bg-[#004152] rounded-2xl relative min-h-[400px] lg:min-h-full overflow-hidden"
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
                      className="absolute top-1/2 left-20 -translate-y-1/2 object-contain rounded-lg w-[40%] h-auto"
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
