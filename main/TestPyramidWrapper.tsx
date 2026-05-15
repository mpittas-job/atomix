"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TestPyramidNewDesign from "@/animations/TestPyramidNewDesign";
import { FiCheck, FiX } from "react-icons/fi";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import DefHeading from "@/components/typo/DefHeading";

gsap.registerPlugin(ScrollTrigger);

const PYRAMID_SECTION_SCROLL_DISTANCE_MULTIPLIER = 6;

type IconBoxData = {
  icon: string;
  title: string;
  description: string;
  items?: Array<{ icon: React.ReactNode; text: string }>;
};

type HighlightInfo = {
  title: string;
  description: string;
  items: Array<{ positive: boolean; title: string; description: string }>;
};

const iconBoxesData: IconBoxData[] = [
  {
    icon: "/icons/white/shield-check-white.svg",
    title: "Simple SaaS",
    description: "automated and easy to change, but simple products only",
  },
  {
    icon: "/icons/white/target-arrow.svg",
    title: "Bespoke builds",
    description:
      "automated and complex, but £500k+ upfront and expensive to change",
    items: [
      {
        icon: <FiCheck className="text-white/70 w-5 h-5 shrink-0" />,
        text: "Automated",
      },
      {
        icon: <FiCheck className="text-white/70 w-5 h-5 shrink-0" />,
        text: "Complex logic",
      },
      {
        icon: <FiX className="text-white/70 w-5 h-5 shrink-0" />,
        text: "£600k, slow to change",
      },
    ],
  },
  {
    icon: "/icons/white/module-simple.svg",
    title: "Disconnected stacks",
    description:
      "complex and configurable, but humans are the glue; nothing is truly automated",
  },
];

const highlightSequenceData: HighlightInfo[] = [
  {
    title: "Bespoke builds",
    description:
      "automated and complex, but £500k+ upfront and expensive to change",
    items: [
      {
        positive: true,
        title: "Automated",
        description: "End-to-end processing without manual intervention",
      },
      {
        positive: true,
        title: "Complex logic",
        description: "Handles sophisticated lending scenarios",
      },
      {
        positive: false,
        title: "£600k+, slow to change",
        description: "Expensive upfront and costly to maintain",
      },
    ],
  },
  {
    title: "Simple SaaS",
    description: "automated and easy to change, but simple products only",
    items: [
      {
        positive: true,
        title: "Automated",
        description: "Lorem ipsum dolor sit amet lorem ipsum",
      },
      {
        positive: true,
        title: "Cheap to build",
        description: "Lorem ipsum dolor sit amet",
      },
      {
        positive: false,
        title: "Simple products only",
        description: "Lorem ipsum dolor sit amet lorem ipsum ",
      },
    ],
  },
  {
    title: "Disconnected stacks",
    description:
      "complex and configurable, but humans are the glue; nothing is truly automated",
    items: [
      {
        positive: true,
        title: "Complex logic",
        description: "Flexible for various product types",
      },
      {
        positive: true,
        title: "Cheap to build",
        description: "Lower initial investment required",
      },
      {
        positive: false,
        title: "Not automated",
        description: "Humans required to connect the gaps",
      },
    ],
  },
];

const HIGHLIGHT_SEQUENCE_END = 0.78;
const HIGHLIGHT_PHASE_1_END = 0.3;
const HIGHLIGHT_PHASE_2_END = 0.6;

const PYRAMID_TABS = [
  {
    id: "simple-saas",
    label: "Simple SaaS",
    highlightIndex: 1,
    sectionIndex: 0,
  },
  {
    id: "bespoke-builds",
    label: "Bespoke builds",
    highlightIndex: 0,
    sectionIndex: 1,
  },
  {
    id: "disconnected-stacks",
    label: "Disconnected stacks",
    highlightIndex: 2,
    sectionIndex: 2,
  },
] as const;

type PyramidApi = {
  setSlider: (v: number) => void;
  setFinalHighlightOnly: (locked: boolean) => void;
};

export default function TestPyramidWrapper() {
  const pyramidSectionRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const animationWrapRef = useRef<HTMLDivElement>(null);
  const pyramidColRef = useRef<HTMLDivElement>(null);
  const iconBoxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pyramidApiRef = useRef<PyramidApi | null>(null);
  const highlightBoxRef = useRef<HTMLDivElement>(null);
  const highlightContentRef = useRef<HTMLDivElement>(null);
  const highlightTitleRef = useRef<HTMLHeadingElement>(null);
  const highlightDescRef = useRef<HTMLParagraphElement>(null);
  const highlightItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const lastHighlightIndexRef = useRef(0);
  const isFirstRenderRef = useRef(true);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabThumbRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstTabThumbRef = useRef(true);
  const hasScrolledPastPyramidRef = useRef(false);
  const isFinalHighlightLockedRef = useRef(false);
  const activeTabIndexRef = useRef(activeTabIndex);
  activeTabIndexRef.current = activeTabIndex;

  useGSAP(() => {
    const section = pyramidSectionRef.current;
    const headingWrap = headingWrapRef.current;
    const animationWrap = animationWrapRef.current;
    const pyramidCol = pyramidColRef.current;
    const boxes = iconBoxRefs.current.filter(
      (box): box is HTMLDivElement => box !== null,
    );
    if (
      !section ||
      !headingWrap ||
      !animationWrap ||
      !pyramidCol ||
      boxes.length === 0
    )
      return;

    const setFinalHighlightLock = (locked: boolean) => {
      if (isFinalHighlightLockedRef.current === locked) return;
      isFinalHighlightLockedRef.current = locked;
      pyramidApiRef.current?.setFinalHighlightOnly(locked);

      if (locked) {
        lastHighlightIndexRef.current = 2;
        setHighlightIndex(2);
      }
    };

    // Initial state: pyramid on the right side of the wrapper,
    // icon boxes hidden, highlight box visible with first content.
    gsap.set(headingWrap, { autoAlpha: 0, y: 32 });
    gsap.set(animationWrap, { autoAlpha: 0, y: 28 });
    gsap.set(pyramidCol, { xPercent: 85 });
    gsap.set(boxes, { autoAlpha: 0, y: 32 });
    gsap.set(highlightBoxRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top+=110px",
        end: () =>
          `+=${section.offsetHeight * PYRAMID_SECTION_SCROLL_DISTANCE_MULTIPLIER}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          setFinalHighlightLock(false);
        },
        onLeave: () => {
          hasScrolledPastPyramidRef.current = true;
          setFinalHighlightLock(false);
        },
        onEnterBack: () => {
          if (hasScrolledPastPyramidRef.current) {
            setFinalHighlightLock(true);
          }
        },
        onUpdate: (self) => {
          if (self.direction > 0) {
            setFinalHighlightLock(false);
          }
        },
        onLeaveBack: () => {
          setFinalHighlightLock(false);
          hasScrolledPastPyramidRef.current = false;
        },
      },
    });
    const pyramidProgress = { value: 0 };

    // Upstream sections (e.g. MainProblemsTabs) change height when their
    // tabs switch between 3- and 4-column layouts. Window resize alone
    // won't catch that, so observe the document height and refresh
    // ScrollTrigger whenever it changes — otherwise the pin start/end
    // stay stale and the pyramid section jumps mid-scroll.
    let rafId = 0;
    let lastHeight = document.body.scrollHeight;
    const refreshST = () => {
      rafId = 0;
      const h = document.body.scrollHeight;
      if (h === lastHeight) return;
      lastHeight = h;
      ScrollTrigger.refresh();
    };
    const resizeObserver = new ResizeObserver(() => {
      if (rafId) return;
      rafId = requestAnimationFrame(refreshST);
    });
    resizeObserver.observe(document.body);

    tl.to(headingWrap, {
      autoAlpha: 1,
      y: 0,
      ease: "power2.out",
      duration: 0.22,
    })
      .to(
        animationWrap,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.18,
        },
        0.18,
      )
      .to(
        pyramidProgress,
        {
          value: 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            const progress = pyramidProgress.value;
            pyramidApiRef.current?.setSlider(progress);

            if (isFinalHighlightLockedRef.current) return;

            // Update highlight box content based on pyramid highlight phase
            let newIndex = lastHighlightIndexRef.current;
            if (progress < HIGHLIGHT_SEQUENCE_END) {
              const introT = Math.min(1, progress / HIGHLIGHT_SEQUENCE_END);
              if (introT <= HIGHLIGHT_PHASE_1_END) {
                newIndex = 1; // Both left & right highlighted -> Simple SaaS (side 2)
              } else if (introT <= HIGHLIGHT_PHASE_2_END) {
                newIndex = 0; // Transitioning to bottom -> Bespoke builds (side 1)
              } else {
                newIndex = 2; // Bottom highlighted -> Disconnected stacks (side 3)
              }
            }

            if (newIndex !== lastHighlightIndexRef.current) {
              lastHighlightIndexRef.current = newIndex;
              setHighlightIndex(newIndex);
            }
          },
        },
        0.32,
      )
      .to(
        pyramidCol,
        { xPercent: 0, ease: "none", duration: 0.22 },
        0.32 + HIGHLIGHT_SEQUENCE_END,
      )
      .to(
        highlightBoxRef.current,
        { autoAlpha: 0, ease: "power2.out", duration: 0.15 },
        0.32 + HIGHLIGHT_SEQUENCE_END,
      )
      .to(
        boxes,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.25,
          stagger: 0.08,
        },
        1.12,
      );

    return () => {
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tabIndex = PYRAMID_TABS.findIndex(
      (tab) => tab.highlightIndex === highlightIndex,
    );
    if (tabIndex >= 0) setActiveTabIndex(tabIndex);
  }, [highlightIndex]);

  useLayoutEffect(() => {
    const list = tabListRef.current;
    const thumb = tabThumbRef.current;
    const activeBtn = tabButtonRefs.current[activeTabIndex];
    if (!list || !thumb || !activeBtn) return;

    const listRect = list.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const x = btnRect.left - listRect.left;
    const width = btnRect.width;

    if (isFirstTabThumbRef.current) {
      gsap.set(thumb, { x, width });
      isFirstTabThumbRef.current = false;
    } else {
      gsap.to(thumb, {
        x,
        width,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [activeTabIndex]);

  useLayoutEffect(() => {
    const list = tabListRef.current;
    if (!list) return;

    const applyInstantFromLayout = () => {
      const thumb = tabThumbRef.current;
      const idx = activeTabIndexRef.current;
      const activeBtn = tabButtonRefs.current[idx];
      if (!thumb || !activeBtn) return;
      const listRect = list.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      gsap.set(thumb, {
        x: btnRect.left - listRect.left,
        width: btnRect.width,
      });
    };

    const ro = new ResizeObserver(applyInstantFromLayout);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  const handleTabClick = (tabIndex: number) => {
    const tab = PYRAMID_TABS[tabIndex];
    if (!tab) return;

    setActiveTabIndex(tabIndex);
    setHighlightIndex(tab.highlightIndex);
    iconBoxRefs.current[tab.sectionIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Animate highlight content when highlightIndex changes
  useEffect(() => {
    const content = highlightContentRef.current;
    const title = highlightTitleRef.current;
    const desc = highlightDescRef.current;
    const items = highlightItemsRef.current.filter(
      (item): item is HTMLLIElement => item !== null,
    );

    if (!content || !title) return;

    const ctx = gsap.context(() => {
      // Set initial state for animation
      gsap.set(title, { opacity: 0, y: 16 });
      if (desc) gsap.set(desc, { opacity: 0, y: 12 });
      gsap.set(items, { opacity: 0, x: -12 });

      // Create entrance animation timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // Animate title first, then description, then items staggered
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: isFirstRenderRef.current ? 0.8 : 0.7,
      });

      if (desc) {
        tl.to(
          desc,
          {
            opacity: 1,
            y: 0,
            duration: isFirstRenderRef.current ? 0.6 : 0.5,
          },
          isFirstRenderRef.current ? "-=0.4" : "-=0.3",
        );
      }

      tl.to(
        items,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        isFirstRenderRef.current ? "-=0.3" : "-=0.2",
      );

      isFirstRenderRef.current = false;
    }, content);

    return () => ctx.revert();
  }, [highlightIndex]);

  const highlightInfo =
    highlightSequenceData[highlightIndex] ?? highlightSequenceData[0];

  return (
    <div
      ref={pyramidSectionRef}
      className="h-[calc(100vh-130px)] rounded-3xl bg-gradient-to-b from-[#014355] to-[#247691] relative overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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

      <div className="relative z-10 my-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-4 px-6">
        <div ref={headingWrapRef} className="w-full mt-20">
          <DefHeading
            theme="light"
            badgeText=""
            title="The Existing Problems"
            description="Property lending is manual, opaque and structurally exposed to fraud — not by intent, but by design. Legacy infrastructure was never built to handle the volume, complexity or transparency this market demands."
            showBadge={false}
          />
        </div>

        <div ref={animationWrapRef} className="w-full flex relative -mt-16">
          {/* Left highlight info box - absolutely positioned on left during pyramid highlight sequence */}
          <div
            ref={highlightBoxRef}
            className="absolute left-34 top-1/2 -translate-y-1/2 w-[440px] opacity-0"
          >
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Pyramid categories"
              className="relative mb-10 flex flex-wrap items-center rounded-full border border-white/30 bg-white/15 p-1 text-[14px] shadow-[inset_0px_0px_10px_rgba(15,23,42,0.04)]"
            >
              <div
                ref={tabThumbRef}
                aria-hidden
                className="pointer-events-none absolute top-1 bottom-1 left-0 z-0 rounded-full bg-white shadow-sm shadow-slate-900/10 will-change-[transform,width]"
              />
              {PYRAMID_TABS.map((tab, tabIndex) => {
                const isActive = tabIndex === activeTabIndex;
                const prevTab =
                  tabIndex > 0 ? PYRAMID_TABS[tabIndex - 1] : null;
                const prevIsActive =
                  !!prevTab && tabIndex - 1 === activeTabIndex;
                const showLeftSeparator =
                  tabIndex > 0 && !isActive && !prevIsActive;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabButtonRefs.current[tabIndex] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabClick(tabIndex)}
                    className={[
                      "relative z-[1] flex-1 cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-[14px] leading-tight font-semibold",
                      showLeftSeparator
                        ? "before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:z-10 before:h-[15px] before:w-px before:-translate-y-1/2 before:bg-slate-300/80 before:content-['']"
                        : "",
                      isActive
                        ? "text-slate-900"
                        : "rounded-none text-white/80",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              ref={highlightContentRef}
              className="highlight-content rounded-2xl"
            >
              <h3
                ref={highlightTitleRef}
                className="text-white font-semibold text-3xl mb-3"
              >
                {highlightInfo.title}
              </h3>
              <p
                ref={highlightDescRef}
                className="text-white/70 text-md leading-relaxed mb-9"
              >
                {highlightInfo.description}
              </p>
              <ul className="space-y-6">
                {highlightInfo.items.map((item, idx) => (
                  <li
                    key={idx}
                    ref={(el) => {
                      highlightItemsRef.current[idx] = el;
                    }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`w-13 h-13 rounded-xl flex items-center justify-center shrink-0 border-2 ${
                        item.positive
                          ? "border-white/0 bg-[#2b7187]"
                          : "border-white/30 bg-transparent"
                      }`}
                    >
                      {item.positive ? (
                        <FiCheck className="w-6 h-6 text-white" />
                      ) : (
                        <FiX className="w-6 h-6 text-white/60" />
                      )}
                    </div>
                    <div className="flex flex-col pt-0.5">
                      <span className="text-white font-semibold text-base leading-tight">
                        {item.title}
                      </span>
                      <span className="text-white/70 text-md leading-relaxed mt-0.5">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={pyramidColRef} className="flex-1">
            <TestPyramidNewDesign
              disableScrollTrigger
              onReady={(api) => {
                pyramidApiRef.current = api;
                api.setSlider(0);
              }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8 pl-20 max-w-lg">
            {iconBoxesData.map((box, index) => {
              const sectionId =
                PYRAMID_TABS.find((tab) => tab.sectionIndex === index)?.id ??
                `pyramid-section-${index}`;
              return (
                <div
                  key={index}
                  id={sectionId}
                  ref={(el) => {
                    iconBoxRefs.current[index] = el;
                  }}
                  className="flex scroll-mt-28 items-start gap-6 md:scroll-mt-32"
                >
                  <div className="w-13 h-13 shrink-0 flex justify-center items-center rounded-xl bg-[#2b7187]">
                    <img src={box.icon} alt={box.title} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {box.title}
                    </h3>
                    <p
                      className={`text-white/70 text-base leading-relaxed ${
                        box.items ? "mb-4" : ""
                      }`}
                    >
                      {box.description}
                    </p>
                    {box.items && (
                      <ul className="space-y-1">
                        {box.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-3 text-white/70"
                          >
                            {item.icon} {item.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
