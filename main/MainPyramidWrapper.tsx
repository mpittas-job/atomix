"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AtomixPyramidNewDesign from "@/animations/AtomixPyramidNewDesign";
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
    icon: "/icons/gradient/shield-blue-gradient.png",
    title: "Simple SaaS",
    description: "automated and easy to change, but simple products only",
  },
  {
    icon: "/icons/gradient/target-blue-gradient.png",
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
    icon: "/icons/gradient/links-blue-gradient.png",
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

export default function MainPyramidWrapper() {
  const pyramidSectionRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const animationWrapRef = useRef<HTMLDivElement>(null);
  const pyramidColRef = useRef<HTMLDivElement>(null);
  const iconBoxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pyramidApiRef = useRef<{ setSlider: (v: number) => void } | null>(null);
  const highlightBoxRef = useRef<HTMLDivElement>(null);
  const highlightContentRef = useRef<HTMLDivElement>(null);
  const highlightTitleRef = useRef<HTMLHeadingElement>(null);
  const highlightDescRef = useRef<HTMLParagraphElement>(null);
  const highlightItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const lastHighlightIndexRef = useRef(0);
  const isFirstRenderRef = useRef(true);

  useGSAP(() => {
    const section = pyramidSectionRef.current;
    const headingWrap = headingWrapRef.current;
    const animationWrap = animationWrapRef.current;
    const pyramidCol = pyramidColRef.current;
    const boxes = iconBoxRefs.current.filter(
      (box): box is HTMLDivElement => box !== null,
    );
    if (!section || !headingWrap || !animationWrap || !pyramidCol || boxes.length === 0) return;

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
      .to(pyramidProgress, {
      value: 1,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        const progress = pyramidProgress.value;
        pyramidApiRef.current?.setSlider(progress);

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
    }, 0.32)
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

  return (
    <div
      ref={pyramidSectionRef}
      className="h-[calc(100vh-130px)] rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center"
    >
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
          {(() => {
            const info =
              highlightSequenceData[highlightIndex] || highlightSequenceData[0];
            return (
              <div
                ref={highlightContentRef}
                className="highlight-content rounded-2xl"
              >
                <h3
                  ref={highlightTitleRef}
                  className="text-white font-semibold text-3xl mb-3"
                >
                  {info.title}
                </h3>
                <p
                  ref={highlightDescRef}
                  className="text-white/70 text-md leading-relaxed mb-9"
                >
                  {info.description}
                </p>
                <ul className="space-y-6">
                  {info.items.map((item, idx) => (
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
                            ? "border-white/0 bg-[#0C596E]"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {item.positive ? (
                          <FiCheck className="w-6 h-6 text-[#39C6ED]" />
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
            );
          })()}
        </div>

        <div ref={pyramidColRef} className="flex-1">
          <AtomixPyramidNewDesign
            disableScrollTrigger
            onReady={(api) => {
              pyramidApiRef.current = api;
              api.setSlider(0);
            }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-8 pl-20 max-w-lg">
          {iconBoxesData.map((box, index) => (
            <div
              key={index}
              ref={(el) => {
                iconBoxRefs.current[index] = el;
              }}
              className="flex items-start gap-6"
            >
              <div className="w-13 h-13 shrink-0 flex justify-center items-center rounded-xl bg-[#015167]">
                <img
                  src={box.icon}
                  alt={box.title}
                  className="w-8 h-8"
                />
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
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
