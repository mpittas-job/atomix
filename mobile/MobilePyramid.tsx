"use client";

import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TestPyramidNewDesign from "@/mobile/pyramid/TestPyramidNewDesign";
import { FiCheck, FiX } from "react-icons/fi";
import LazySoftAurora from "@/components/backgrounds/LazySoftAurora";
import type { SoftAuroraHandle } from "@/components/backgrounds/LazySoftAurora";
import DefHeading from "@/components/typo/DefHeading";

gsap.registerPlugin(ScrollTrigger);

/* ── Scroll distance multiplier (how much scroll the pinned section needs) ── */
// 3.5× the section height — enough for all 3 sides + a natural exit window
const SCROLL_DISTANCE_MULTIPLIER = 3.5;

const FALLBACK_HEADER_PX = 88;

function getHeaderOffset() {
  if (typeof window === "undefined") return FALLBACK_HEADER_PX;
  const header = document.querySelector("header");
  return header ? Math.ceil(header.getBoundingClientRect().bottom) : FALLBACK_HEADER_PX;
}

/* ── Highlight phases in 0–1 progress range ── */
const PHASE_1_END = 0.33;
const PHASE_2_END = 0.66;

/* ── Pyramid visual config ── */
const PYRAMID_SCALE = 2.75;
const PYRAMID_VERTICAL_OFFSET = -0.18;

type PyramidApi = {
  setSlider: (v: number, instant?: boolean) => void;
  setFinalHighlightOnly: (locked: boolean) => void;
};

type HighlightItem = {
  positive: boolean;
  title: string;
  description: string;
};

type HighlightInfo = {
  title: string;
  description: string;
  items: HighlightItem[];
};

type IconBoxSubItem = {
  text: string;
  positive: boolean;
};

type IconBoxData = {
  icon: string;
  title: string;
  description: string;
  items?: IconBoxSubItem[];
};

const iconBoxesData: IconBoxData[] = [
  {
    icon: "/icons/gradient/shield-blue-gradient.png",
    title: "Lorem ipsum",
    description: "dolor sit amet consectetur adipiscing elit sed do eiusmod",
  },
  {
    icon: "/icons/gradient/target-blue-gradient.png",
    title: "Ut labore",
    description: "ut labore et dolore magna aliqua ut enim ad minim",
    items: [
      { text: "Quis", positive: true },
      { text: "Nostrud exercitation", positive: true },
      { text: "Ullamco laboris nisi ut", positive: false },
    ],
  },
  {
    icon: "/icons/gradient/links-blue-gradient.png",
    title: "Aliquip commodo",
    description: "consequat duis aute irure dolor in reprehenderit voluptate velit esse",
  },
];

const highlightData: HighlightInfo[] = [
  {
    title: "Bespoke builds",
    description:
      "Automated and complex, but £500k+ upfront and expensive to change",
    items: [
      { positive: true, title: "Lorem", description: "Lorem ipsum dolor sit amet" },
      { positive: true, title: "Lorem ipsum", description: "Lorem ipsum dolor sit" },
      { positive: false, title: "Lorem ipsum dolor sit", description: "Lorem ipsum dolor sit amet lorem" },
    ],
  },
  {
    title: "Simple SaaS",
    description: "Automated and easy to change, but simple products only",
    items: [
      { positive: true, title: "Lorem", description: "Lorem ipsum dolor sit amet lorem ipsum" },
      { positive: true, title: "Lorem ipsum dolor", description: "Lorem ipsum dolor sit amet" },
      { positive: false, title: "Lorem ipsum dolor sit", description: "Lorem ipsum dolor sit amet lorem ipsum" },
    ],
  },
  {
    title: "Disconnected stacks",
    description:
      "Complex and configurable, but humans are the glue; nothing is truly automated",
    items: [
      { positive: true, title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet" },
      { positive: true, title: "Lorem ipsum dolor", description: "Lorem ipsum dolor sit" },
      { positive: false, title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet lorem" },
    ],
  },
];

export default function MobilePyramid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pyramidColRef = useRef<HTMLDivElement>(null);
  const highlightBoxRef = useRef<HTMLDivElement>(null);
  const highlightTitleRef = useRef<HTMLHeadingElement>(null);
  const highlightDescRef = useRef<HTMLParagraphElement>(null);
  const highlightItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const newListBoxRef = useRef<HTMLDivElement>(null);
  const pyramidApiRef = useRef<PyramidApi | null>(null);
  const auroraRef = useRef<SoftAuroraHandle>(null);
  const lastHighlightRef = useRef(0);
  const isFirstRenderRef = useRef(true);
  const lastIsPastPyramidSequenceRef = useRef(false);

  const [windowWidth, setWindowWidth] = useState(375);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isPastPyramidSequence, setIsPastPyramidSequence] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pyramidConfig = useMemo(() => {
    const maxWidth = Math.max(280, Math.min(460, windowWidth - 24));
    const canvasHeight = Math.max(265, Math.min(390, (windowWidth - 24) * 0.9));
    const scaleRatio = PYRAMID_SCALE / 2.2;

    return {
      maxWidth,
      canvasHeight,
      pyramidScale: PYRAMID_SCALE,
      verticalOffset: PYRAMID_VERTICAL_OFFSET,
      edgeLabels: {
        fontSize: Math.round(11 * scaleRatio), // slightly tighter labels for mobile layout
        worldHeight: 0.44 * scaleRatio,
        edgeOffset: 0.14 * scaleRatio,
      },
      logo: {
        worldHeight: 0.52 * scaleRatio,
        verticalOffset: 0.44 * scaleRatio,
      },
    };
  }, [windowWidth]);

  const handlePyramidReady = useCallback((api: PyramidApi) => {
    pyramidApiRef.current = api;
    api.setSlider(0);
  }, []);

  /* ── Main scroll-driven animation ── */
  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const pyramidCol = pyramidColRef.current;
      const highlightBox = highlightBoxRef.current;
      if (!section || !content || !pyramidCol || !highlightBox) return;

      gsap.set(content, { autoAlpha: 0, y: 24 });

      const pyramidProgress = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Use the actual rendered header bottom so pinning starts at exactly
          // the right scroll position regardless of header height changes.
          start: () => `top top+=${getHeaderOffset()}px`,
          end: () => `+=${section.offsetHeight * SCROLL_DISTANCE_MULTIPLIER}`,
          pin: true,
          pinSpacing: true,
          // scrub:1 → playhead takes ~1 s to catch up; prevents the pin from
          // feeling sticky and lets natural touch momentum carry past the end.
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => auroraRef.current?.setActive(true),
          onEnterBack: () => auroraRef.current?.setActive(true),
          onLeave: () => auroraRef.current?.setActive(false),
          onLeaveBack: () => auroraRef.current?.setActive(false),
        },
      });

      // 0.0–0.15: fade in
      tl.to(content, {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.15,
      })
        // 0.15–1.15: drive pyramid slider 0 → 1.0 (highlights + full 3D rotation)
        .to(
          pyramidProgress,
          {
            value: 1.0,
            ease: "none",
            duration: 1,
            onUpdate: () => {
              const progress = pyramidProgress.value;
              pyramidApiRef.current?.setSlider(progress);

              // Map progress into which highlight panel to show (only during the first 0.78 range)
              let newIndex = 2;
              if (progress < 0.78) {
                const normalizedProgress = progress / 0.78;
                if (normalizedProgress <= PHASE_1_END) {
                  newIndex = 1; // Simple SaaS
                } else if (normalizedProgress <= PHASE_2_END) {
                  newIndex = 0; // Bespoke builds
                } else {
                  newIndex = 2; // Disconnected stacks
                }
              }

              if (newIndex !== lastHighlightRef.current) {
                lastHighlightRef.current = newIndex;
                setHighlightIndex(newIndex);
              }

              const past = progress >= 0.78;
              if (past !== lastIsPastPyramidSequenceRef.current) {
                lastIsPastPyramidSequenceRef.current = past;
                setIsPastPyramidSequence(past);
              }
            },
          },
          0.15
        )
        // 1.15–1.55: hold — animation is done and fully loaded, user can now scroll away naturally.
        // This dwell window gives the scrub lag time to finish catching up before
        // the pin releases, so scrolling feels clean and intentional.
        .to({}, { duration: 0.4 });
    },
    { scope: sectionRef }
  );

  /* ── Highlight content enter animation ── */
  useEffect(() => {
    const title = highlightTitleRef.current;
    const desc = highlightDescRef.current;
    const items = highlightItemsRef.current.filter(
      (item): item is HTMLLIElement => item !== null
    );

    if (!title) return;

    const ctx = gsap.context(() => {
      gsap.set(title, { opacity: 0, y: 14 });
      if (desc) gsap.set(desc, { opacity: 0, y: 10 });
      gsap.set(items, { opacity: 0, x: -10 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: isFirstRenderRef.current ? 0.7 : 0.5,
      });

      if (desc) {
        tl.to(
          desc,
          { opacity: 1, y: 0, duration: 0.4 },
          isFirstRenderRef.current ? "-=0.3" : "-=0.2"
        );
      }

      tl.to(
        items,
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
        isFirstRenderRef.current ? "-=0.2" : "-=0.15"
      );

      isFirstRenderRef.current = false;
    });

    return () => ctx.revert();
  }, [highlightIndex]);

  /* ── New list box enter animation when transitioning past highlight phase ── */
  useEffect(() => {
    if (isPastPyramidSequence) {
      const boxes = newListBoxRef.current?.children;
      if (boxes && boxes.length > 0) {
        gsap.fromTo(
          boxes,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power2.out" }
        );
      }
    }
  }, [isPastPyramidSequence]);

  const highlightInfo = highlightData[highlightIndex] ?? highlightData[0];

  return (
    <div className="mx-auto w-full max-w-[1920px] p-0">
      <div
        ref={sectionRef}
        className="bg-gradient-to-b from-[#014355] to-[#247691] relative overflow-hidden flex flex-col items-center box-border"
        style={{
          height: "100dvh",
          maxHeight: "100dvh",
          minHeight: 0,
        }}
      >
        {/* Aurora background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <LazySoftAurora
            ref={auroraRef}
            loadStrategy="viewport"
            rootMargin="320px 0px"
            className="absolute inset-0 h-full w-full min-h-full min-w-full"
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

        {/* Content wrapper */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full w-full flex-col items-center px-4 pt-3 pb-3"
        >
          {/* Small DefHeading */}
          <div className="w-full mb-1.5 [&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:leading-snug [&_[data-description]]:text-xs [&_[data-description]]:sm:text-sm [&_[data-description]]:leading-relaxed [&_[data-description]]:mt-1 [&_div]:gap-y-1">
            <DefHeading
              theme="light"
              badgeText=""
              title="The technology trade-off every lender faces"
              description="Every lender needs three things: complex loan logic, self-serve product changes, and full automation. No legacy platform delivers all three."
              showBadge={false}
            />
          </div>

          {/* Pyramid — always on top */}
          <div
            ref={pyramidColRef}
            className="w-full flex items-center justify-center shrink-0"
            style={{
              maxWidth: `${pyramidConfig.maxWidth}px`,
              height: `${pyramidConfig.canvasHeight}px`,
            }}
          >
            <TestPyramidNewDesign
              disableScrollTrigger
              fillHeight
              config={pyramidConfig}
              onReady={handlePyramidReady}
              className="h-full w-full"
            />
          </div>

          {/* Highlight content — below pyramid (Triangle Phase) */}
          {/* No overflow-y-auto here — inner scrollable areas consume touch events
              and prevent the outer ScrollTrigger from advancing, making it feel
              impossible to scroll past the section. */}
          <div
            ref={highlightBoxRef}
            className={`w-full flex-1 min-h-0 overflow-hidden mt-1.5 px-1 ${isPastPyramidSequence ? "hidden pointer-events-none" : "block"}`}
            style={{ maxWidth: 430 }}
          >
            <h3
              ref={highlightTitleRef}
              className="text-white font-semibold text-lg sm:text-xl leading-tight mb-1"
            >
              {highlightInfo.title}
            </h3>
            <p
              ref={highlightDescRef}
              className="text-white/80 text-xs sm:text-sm leading-relaxed mb-2.5 max-w-[380px]"
            >
              {highlightInfo.description}
            </p>
            <ul className="space-y-2">
              {highlightInfo.items.map((item, idx) => (
                <li
                  key={idx}
                  ref={(el) => {
                    highlightItemsRef.current[idx] = el;
                  }}
                  className="flex items-start gap-2.5"
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 border-2 ${
                      item.positive
                        ? "border-white/0 bg-[#015167]"
                        : "border-white/30 bg-transparent"
                    }`}
                  >
                    {item.positive ? (
                      <FiCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#39C6ED]" />
                    ) : (
                      <FiX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm sm:text-base leading-tight">
                      {item.title}
                    </span>
                    <span className="text-white/70 text-xs sm:text-sm leading-relaxed mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* New List content — below pyramid (Pyramid Phase) */}
          <div
            ref={newListBoxRef}
            className={`w-full flex-1 min-h-0 overflow-y-auto mt-1.5 px-1 space-y-3.5 pb-2 ${isPastPyramidSequence ? "block" : "hidden pointer-events-none"}`}
            style={{ maxWidth: 430 }}
          >
            {iconBoxesData.map((box, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 flex justify-center items-center rounded-lg bg-[#015167]">
                  <img src={box.icon} alt={box.title} className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-white font-semibold text-sm sm:text-base leading-tight">
                    {box.title}
                  </h4>
                  <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed mt-0.5 max-w-[360px]">
                    {box.description}
                  </p>
                  {box.items && (
                    <ul className="mt-1.5 space-y-1.5 pl-1">
                      {box.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-center gap-2 text-white/75 text-[11px] sm:text-xs"
                        >
                          {item.positive ? (
                            <FiCheck className="text-[#39C6ED] w-3 h-3 shrink-0" />
                          ) : (
                            <FiX className="text-white/40 w-3 h-3 shrink-0" />
                          )}
                          <span>{item.text}</span>
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
