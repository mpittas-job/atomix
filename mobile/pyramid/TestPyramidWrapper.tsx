"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import TestPyramidNewDesign from "@/mobile/pyramid/TestPyramidNewDesign";
import { FiCheck, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import LazySoftAurora from "@/components/backgrounds/LazySoftAurora";
import type { SoftAuroraHandle } from "@/components/backgrounds/LazySoftAurora";
import DefHeading from "@/components/typo/DefHeading";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PYRAMID_SECTION_SCROLL_DISTANCE_MULTIPLIER = 6;
const FALLBACK_HEADER_OFFSET_PX = 88;

type PinnedSectionLayout = {
  pinTop: number;
  sectionHeight: number;
};

function getOuterVerticalGapPx(outerContainer: HTMLElement | null) {
  if (!outerContainer) {
    return { top: 16, bottom: 16 };
  }

  const style = getComputedStyle(outerContainer);
  return {
    top: Math.ceil(parseFloat(style.paddingTop) || 0),
    bottom: Math.ceil(parseFloat(style.paddingBottom) || 0),
  };
}

function getPinnedSectionLayout(
  outerContainer?: HTMLElement | null,
): PinnedSectionLayout {
  if (typeof window === "undefined") {
    return {
      pinTop: FALLBACK_HEADER_OFFSET_PX,
      sectionHeight: 700,
    };
  }

  const header = document.querySelector("header");
  const headerBottom = header
    ? Math.ceil(header.getBoundingClientRect().bottom)
    : FALLBACK_HEADER_OFFSET_PX;

  const { top: gapTop, bottom: gapBottom } =
    getOuterVerticalGapPx(outerContainer ?? null);
  const pinTop = headerBottom + gapTop;

  const visualViewport = window.visualViewport;
  const viewportBottom = visualViewport
    ? visualViewport.offsetTop + visualViewport.height
    : document.documentElement.clientHeight;

  const sectionHeight = Math.max(
    0,
    Math.floor(viewportBottom - pinTop - gapBottom),
  );

  return { pinTop, sectionHeight };
}

function applyPinnedSectionLayout(
  section: HTMLElement | null,
  outerContainer?: HTMLElement | null,
) {
  if (!section) return getPinnedSectionLayout(outerContainer);

  const layout = getPinnedSectionLayout(outerContainer);
  section.style.boxSizing = "border-box";
  section.style.height = `${layout.sectionHeight}px`;
  section.style.maxHeight = `${layout.sectionHeight}px`;
  section.style.minHeight = "0";

  return layout;
}

// --- CONFIGURABLE PYRAMID SCALE ---
// Change this single number to scale the entire pyramid (and its labels, logo, and spacing) proportionally!
const PYRAMID_SCALE = 2.5;

// --- CONFIGURABLE PYRAMID VERTICAL OFFSET ---
// Change this number to shift the 3D pyramid up or down inside its canvas (positive values shift UP, negative values shift DOWN)
const PYRAMID_VERTICAL_OFFSET = 0.5;

// --- CONFIGURABLE PYRAMID LEFT-SIDE VERTICAL SHIFT ---
// Shift the pyramid container down when it transitions to the left side (only in the final icon-boxes phase, not during the triangle highlight phase)
const PYRAMID_LEFT_SIDE_Y_SHIFT = 60; // in pixels (higher = more down)

// --- MOBILE LAYOUT (edit this block to tune phone/tablet positioning) ---
const MOBILE_LAYOUT = {
  /** Shared by highlight list (triangle phase) + icon list (pyramid phase) */
  list: {
    /** px from animation-area top ΓÇö base clearance below DefHeading */
    topOffset: 180,
    /** px extra space above the final icon list (above pyramid phase only) */
    finalListExtraTop: 40,
    /** px inset from left/right edges ΓÇö same for both lists */
    horizontalInset: 40,
    /** px gap between pyramid zone and list zone */
    zoneGap: 8,
    /** px max width for both mobile lists (0 = full width minus insets) */
    maxWidth: 430,
  },

  /** Triangle intro ΓÇö 3 sides, pyramid on top, highlight list below */
  triangle: {
    /** px ΓÇö container top within animation area */
    topOffset: 70,
    /** px ΓÇö extra Y nudge on the pyramid container */
    yOffset: 0,
    /** % of animation area height for the pyramid container */
    heightPercent: 52,
    /** 3D scale inside the canvas */
    scale: 2.35,
    /** 3D vertical offset inside canvas (+ up, ΓêÆ down) */
    verticalOffset: -0.25,
    /** px max width cap (0 = auto from viewport) */
    maxWidth: 0,
  },

  /** Final pyramid ΓÇö list on top, pyramid parked at bottom */
  pyramid: {
    /** px ΓÇö inset from animation-area bottom */
    bottomInset: 20,
    /** px ΓÇö extra Y nudge when parked at bottom */
    yOffset: 0,
    /** % of animation area height for the pyramid container */
    heightPercent: 52,
    /** 3D scale inside the canvas */
    scale: 2.35,
    /** 3D vertical offset inside canvas (+ up, ΓêÆ down) */
    verticalOffset: -0.25,
    /** px max width cap (0 = auto from viewport) */
    maxWidth: 0,
  },
} as const;

function getMobileHighlightListTop(animationAreaHeight: number) {
  const { triangle, list } = MOBILE_LAYOUT;
  return (
    triangle.topOffset +
    (animationAreaHeight * triangle.heightPercent) / 100 +
    list.zoneGap
  );
}

function getMobileFinalIconListTop() {
  const { list } = MOBILE_LAYOUT;
  return list.topOffset + list.finalListExtraTop;
}

function getMobileListMaxHeight(
  animationAreaHeight: number,
  pyramidContainerHeight: number,
) {
  const { list } = MOBILE_LAYOUT;
  const listTop = getMobileFinalIconListTop();
  return Math.max(
    140,
    Math.round(
      animationAreaHeight -
        listTop -
        pyramidContainerHeight -
        list.zoneGap,
    ),
  );
}

function getMobilePyramidSwapY(
  animationAreaHeight: number,
  pyramidContainerHeight: number,
) {
  const { pyramid } = MOBILE_LAYOUT;
  return Math.max(
    0,
    Math.round(
      animationAreaHeight -
        pyramidContainerHeight -
        pyramid.bottomInset +
        pyramid.yOffset,
    ),
  );
}

function getMobileListBoxLayout(animationAreaWidth: number) {
  const { list } = MOBILE_LAYOUT;
  const available = Math.max(0, animationAreaWidth - list.horizontalInset * 2);
  const width =
    list.maxWidth > 0 ? Math.min(list.maxWidth, available) : available;

  return {
    left: "50%",
    xPercent: -50,
    width,
  };
}

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
    title: "Lorem ipsum",
    description: "dolor sit amet consectetur adipiscing elit sed do eiusmod",
  },
  {
    icon: "/icons/gradient/target-blue-gradient.png",
    title: "Ut labore",
    description: "ut labore et dolore magna aliqua ut enim ad minim",
    items: [
      {
        icon: <FiCheck className="text-white/70 w-5 h-5 shrink-0" />,
        text: "Quis",
      },
      {
        icon: <FiCheck className="text-white/70 w-5 h-5 shrink-0" />,
        text: "Nostrud exercitation",
      },
      {
        icon: <FiX className="text-white/70 w-5 h-5 shrink-0" />,
        text: "Ullamco laboris nisi ut",
      },
    ],
  },
  {
    icon: "/icons/gradient/links-blue-gradient.png",
    title: "Aliquip commodo",
    description:
      "consequat duis aute irure dolor in reprehenderit voluptate velit esse",
  },
];

const highlightSequenceData: HighlightInfo[] = [
  {
    title: "Bespoke builds",
    description:
      "Automated and complex, but ┬ú500k+ upfront and expensive to change",
    items: [
      {
        positive: true,
        title: "Lorem",
        description: "Lorem ipsum dolor sit amet",
      },
      {
        positive: true,
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit",
      },
      {
        positive: false,
        title: "Lorem ipsum dolor sit",
        description: "Lorem ipsum dolor sit amet lorem",
      },
    ],
  },
  {
    title: "Simple SaaS",
    description: "Automated and easy to change, but simple products only",
    items: [
      {
        positive: true,
        title: "Lorem",
        description: "Lorem ipsum dolor sit amet lorem ipsum",
      },
      {
        positive: true,
        title: "Lorem ipsum dolor",
        description: "Lorem ipsum dolor sit amet",
      },
      {
        positive: false,
        title: "Lorem ipsum dolor sit",
        description: "Lorem ipsum dolor sit amet lorem ipsum ",
      },
    ],
  },
  {
    title: "Disconnected stacks",
    description:
      "Complex and configurable, but humans are the glue; nothing is truly automated",
    items: [
      {
        positive: true,
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet",
      },
      {
        positive: true,
        title: "Lorem ipsum dolor",
        description: "Lorem ipsum dolor sit",
      },
      {
        positive: false,
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet lorem",
      },
    ],
  },
];

const HIGHLIGHT_SEQUENCE_END = 0.78;
const HIGHLIGHT_PHASE_1_END = 0.3;
const HIGHLIGHT_PHASE_2_END = 0.6;

/**
 * Position of the `pyramidProgress` sub-tween inside the master timeline.
 * Keep in sync with the `.to(pyramidProgress, ...)` call below.
 */
const PYRAMID_PROGRESS_TWEEN_START = 0.32;

/**
 * The three triangle sides in the order they appear as the user scrolls
 * (and that the left/right arrows step through).
 *
 * `introT` is the midpoint of the side's highlight phase, expressed in the
 * 0ΓÇô1 range of the highlight intro sequence. We convert this to a target
 * scroll position so the timeline lands exactly on that side.
 */
const PYRAMID_SIDES = [
  {
    id: "simple-saas",
    highlightIndex: 1,
    sectionIndex: 0,
    introT: HIGHLIGHT_PHASE_1_END * 0.5,
  },
  {
    id: "bespoke-builds",
    highlightIndex: 0,
    sectionIndex: 1,
    introT: (HIGHLIGHT_PHASE_1_END + HIGHLIGHT_PHASE_2_END) * 0.5,
  },
  {
    id: "disconnected-stacks",
    highlightIndex: 2,
    sectionIndex: 2,
    introT: (HIGHLIGHT_PHASE_2_END + 1) * 0.5,
  },
] as const;

function PyramidNavArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous side" : "Next side"}
      onClick={onClick}
      disabled={disabled}
      className={[
        "absolute top-[40%] sm:top-[45%] lg:top-1/2 z-20 flex size-10 lg:size-15 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white text-[#014355] shadow-lg shadow-slate-900/15 transition-all duration-200 hover:bg-white/90 active:scale-[0.98]",
        direction === "prev" ? "left-2 sm:left-4 lg:left-6" : "right-2 sm:right-4 lg:right-6",
        disabled
          ? "cursor-not-allowed opacity-40 bg-white/20 border-white/20 text-white/50"
          : "cursor-pointer opacity-100",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {direction === "prev" ? (
        <FiChevronLeft className="size-5 lg:size-6 shrink-0" aria-hidden />
      ) : (
        <FiChevronRight className="size-5 lg:size-6 shrink-0" aria-hidden />
      )}
    </button>
  );
}

type PyramidApi = {
  setSlider: (v: number, instant?: boolean) => void;
  setFinalHighlightOnly: (locked: boolean) => void;
};

export default function TestPyramidWrapper() {
  // Keep SSR and the first client render identical; measure viewport after mount.
  const [windowWidth, setWindowWidth] = useState(1200);
  const [sectionHeightPx, setSectionHeightPx] = useState<number | null>(null);
  const pinnedLayoutRef = useRef<PinnedSectionLayout>({
    pinTop: FALLBACK_HEADER_OFFSET_PX,
    sectionHeight: 700,
  });
  const pyramidSectionRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const syncViewport = () => {
      const layout = applyPinnedSectionLayout(
        pyramidSectionRef.current,
        outerContainerRef.current,
      );
      pinnedLayoutRef.current = layout;
      setWindowWidth(window.innerWidth);
      setSectionHeightPx(layout.sectionHeight);
      ScrollTrigger.refresh();
    };

    syncViewport();

    const syncAfterLayout = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(syncViewport);
      });
    };

    window.addEventListener("resize", syncAfterLayout);
    window.visualViewport?.addEventListener("resize", syncAfterLayout);
    window.visualViewport?.addEventListener("scroll", syncAfterLayout);

    return () => {
      window.removeEventListener("resize", syncAfterLayout);
      window.visualViewport?.removeEventListener("resize", syncAfterLayout);
      window.visualViewport?.removeEventListener("scroll", syncAfterLayout);
    };
  }, []);

  const isMobile = windowWidth < 1024;
  const [isPastPyramidSequence, setIsPastPyramidSequence] = useState(false);

  const pyramidConfig = useMemo(() => {
    let scale = PYRAMID_SCALE;
    let maxWidth = 700;
    let canvasHeight = 570;
    let verticalOffset = PYRAMID_VERTICAL_OFFSET;

    if (isMobile) {
      const phase = isPastPyramidSequence
        ? MOBILE_LAYOUT.pyramid
        : MOBILE_LAYOUT.triangle;

      scale = phase.scale;
      verticalOffset = phase.verticalOffset;
      maxWidth =
        phase.maxWidth > 0
          ? phase.maxWidth
          : Math.max(320, Math.min(460, windowWidth - 40));
      canvasHeight = Math.max(280, Math.min(420, (windowWidth - 40) * 0.9));
    }

    // Proportional scaling factor relative to the base scale (2.2)
    const scaleRatio = scale / 2.2;

    return {
      maxWidth: isMobile ? maxWidth : Math.round(maxWidth * scaleRatio),
      canvasHeight: isMobile ? canvasHeight : Math.round(canvasHeight * scaleRatio),
      pyramidScale: scale,
      verticalOffset: isMobile ? verticalOffset : PYRAMID_VERTICAL_OFFSET,
      edgeLabels: {
        fontSize: Math.round((isMobile ? 12 : 14) * scaleRatio),
        worldHeight: 0.44 * scaleRatio,
        edgeOffset: 0.14 * scaleRatio,
      },
      logo: {
        worldHeight: 0.52 * scaleRatio,
        verticalOffset: 0.44 * scaleRatio,
      },
    };
  }, [isMobile, isPastPyramidSequence, windowWidth]);

  const headingWrapRef = useRef<HTMLDivElement>(null);
  const animationWrapRef = useRef<HTMLDivElement>(null);
  const pyramidColRef = useRef<HTMLDivElement>(null);
  const iconListColRef = useRef<HTMLDivElement>(null);
  const iconBoxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const handlePyramidReady = useCallback((api: PyramidApi) => {
    pyramidApiRef.current = api;
    api.setSlider(0);
  }, []);
  const pyramidApiRef = useRef<PyramidApi | null>(null);
  const auroraRef = useRef<SoftAuroraHandle>(null);
  const highlightBoxRef = useRef<HTMLDivElement>(null);
  const highlightContentRef = useRef<HTMLDivElement>(null);
  const highlightTitleRef = useRef<HTMLHeadingElement>(null);
  const highlightDescRef = useRef<HTMLParagraphElement>(null);
  const highlightItemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const lastHighlightIndexRef = useRef(0);
  const lastIsPastPyramidSequenceRef = useRef(false);
  const isFirstRenderRef = useRef(true);
  // Backward-skip state: once the user has scrolled past the highlight
  // sequence (into the icon-box phase), the next time they scroll
  // upward past Disconnected stacks we snap them straight out of the
  // section so they don't traverse Bespoke builds + Simple SaaS in
  // reverse. The scroll back from icon-box -> Disconnected itself is
  // left alone so the pyramid translates at the user's natural pace.
  const hasReachedIconBoxRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const isExitSnappingRef = useRef(false);

  useGSAP(() => {
    const section = pyramidSectionRef.current;
    const headingWrap = headingWrapRef.current;
    const animationWrap = animationWrapRef.current;
    const pyramidCol = pyramidColRef.current;
    const iconListCol = iconListColRef.current;
    const boxes = iconBoxRefs.current.filter(
      (box): box is HTMLDivElement => box !== null,
    );
    if (
      !section ||
      !headingWrap ||
      !animationWrap ||
      !pyramidCol ||
      !iconListCol ||
      boxes.length === 0
    )
      return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions!;

        gsap.set(headingWrap, { autoAlpha: 0, y: 32 });
        gsap.set(animationWrap, { autoAlpha: 0, y: 28 });
        gsap.set(boxes, { autoAlpha: 0, y: isDesktop ? 16 : 0 });
        gsap.set(highlightBoxRef.current, { autoAlpha: 1 });

        if (isDesktop) {
          gsap.set(pyramidCol, { xPercent: 85, y: 0 });
          gsap.set(iconListCol, { autoAlpha: 0, clearProps: "maxHeight" });
        } else {
          const { triangle, list, pyramid: pyramidPhase } = MOBILE_LAYOUT;
          const listLayout = getMobileListBoxLayout(animationWrap.offsetWidth);
          const wrapH = animationWrap.offsetHeight;

          gsap.set(pyramidCol, {
            position: "absolute",
            top: triangle.topOffset,
            left: 0,
            right: 0,
            xPercent: 0,
            y: triangle.yOffset,
            height: `${triangle.heightPercent}%`,
            maxHeight: `${triangle.heightPercent}%`,
          });
          gsap.set(iconListCol, {
            position: "absolute",
            top: getMobileFinalIconListTop(),
            ...listLayout,
            autoAlpha: 0,
            x: 0,
            y: 0,
            maxHeight: getMobileListMaxHeight(wrapH, pyramidCol.offsetHeight),
            overflow: "hidden",
            pointerEvents: "none",
          });
          gsap.set(highlightBoxRef.current, {
            position: "absolute",
            top: getMobileHighlightListTop(wrapH),
            ...listLayout,
            bottom: pyramidPhase.bottomInset,
            autoAlpha: 1,
            overflow: "auto",
          });
        }

        const syncPinnedSection = () => {
          const layout = applyPinnedSectionLayout(
            section,
            outerContainerRef.current,
          );
          pinnedLayoutRef.current = layout;
          return layout;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${syncPinnedSection().pinTop}px`,
            end: () =>
              `+=${section.offsetHeight * PYRAMID_SECTION_SCROLL_DISTANCE_MULTIPLIER}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: syncPinnedSection,
            onEnter: () => {
              syncPinnedSection();
              auroraRef.current?.setActive(true);
            },
            onEnterBack: () => {
              syncPinnedSection();
              auroraRef.current?.setActive(true);
            },
            onLeave: () => auroraRef.current?.setActive(false),
            onLeaveBack: () => auroraRef.current?.setActive(false),
            onUpdate: (self) => {
              if (isProgrammaticScrollRef.current) return;
              if (self.direction !== -1) return;
              if (!hasReachedIconBoxRef.current) return;

              const tlDur = tl.duration();
              if (tlDur === 0) return;

              const bespokeThresholdPyramidProgress =
                HIGHLIGHT_PHASE_2_END * HIGHLIGHT_SEQUENCE_END;
              const bespokeThresholdTime =
                PYRAMID_PROGRESS_TWEEN_START + bespokeThresholdPyramidProgress;
              const scrollLen = self.end - self.start;
              const bespokeThresholdScrollY =
                self.start + scrollLen * (bespokeThresholdTime / tlDur);

              if (self.scroll() >= bespokeThresholdScrollY) return;

              hasReachedIconBoxRef.current = false;
              isExitSnappingRef.current = true;
              pyramidApiRef.current?.setFinalHighlightOnly(true);
              if (lastHighlightIndexRef.current !== 2) {
                lastHighlightIndexRef.current = 2;
                setHighlightIndex(2);
              }
              isProgrammaticScrollRef.current = true;
              const firstSide = PYRAMID_SIDES[0];
              const releaseExitLock = () => {
                isProgrammaticScrollRef.current = false;
                isExitSnappingRef.current = false;
                pyramidApiRef.current?.setSlider(0, true);
                pyramidApiRef.current?.setFinalHighlightOnly(false);
                if (lastHighlightIndexRef.current !== firstSide.highlightIndex) {
                  lastHighlightIndexRef.current = firstSide.highlightIndex;
                  setHighlightIndex(firstSide.highlightIndex);
                }
                if (lastIsPastPyramidSequenceRef.current) {
                  lastIsPastPyramidSequenceRef.current = false;
                  setIsPastPyramidSequence(false);
                }
              };
              gsap.to(window, {
                scrollTo: {
                  y: Math.max(0, self.start - 1),
                  autoKill: false,
                },
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
                onComplete: releaseExitLock,
                onInterrupt: releaseExitLock,
              });
            },
          },
        });
        timelineRef.current = tl;
        const pyramidProgress = { value: 0 };

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

                let newIndex = lastHighlightIndexRef.current;
                if (isExitSnappingRef.current) {
                  newIndex = 2;
                } else if (progress < HIGHLIGHT_SEQUENCE_END) {
                  const introT = Math.min(1, progress / HIGHLIGHT_SEQUENCE_END);
                  if (introT <= HIGHLIGHT_PHASE_1_END) {
                    newIndex = 1;
                  } else if (introT <= HIGHLIGHT_PHASE_2_END) {
                    newIndex = 0;
                  } else {
                    newIndex = 2;
                  }
                }

                if (newIndex !== lastHighlightIndexRef.current) {
                  lastHighlightIndexRef.current = newIndex;
                  setHighlightIndex(newIndex);
                }

                const past = progress >= HIGHLIGHT_SEQUENCE_END;
                if (past !== lastIsPastPyramidSequenceRef.current) {
                  lastIsPastPyramidSequenceRef.current = past;
                  setIsPastPyramidSequence(past);
                }
                if (past) {
                  hasReachedIconBoxRef.current = true;
                }
              },
            },
            PYRAMID_PROGRESS_TWEEN_START,
          );

        if (isDesktop) {
          tl.to(
            pyramidCol,
            {
              xPercent: 0,
              y: PYRAMID_LEFT_SIDE_Y_SHIFT,
              ease: "none",
              duration: 0.22,
            },
            PYRAMID_PROGRESS_TWEEN_START + HIGHLIGHT_SEQUENCE_END,
          )
            .to(
              highlightBoxRef.current,
              { autoAlpha: 0, ease: "power2.out", duration: 0.15 },
              PYRAMID_PROGRESS_TWEEN_START + HIGHLIGHT_SEQUENCE_END,
            )
            .to(
              iconListCol,
              { autoAlpha: 1, ease: "power2.out", duration: 0.01 },
              1.12,
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
        } else {
          const { pyramid: pyramidPhase } = MOBILE_LAYOUT;

          const swapStart =
            PYRAMID_PROGRESS_TWEEN_START + HIGHLIGHT_SEQUENCE_END;

          tl.to(
            highlightBoxRef.current,
            {
              autoAlpha: 0,
              ease: "power2.in",
              duration: 0.18,
            },
            swapStart,
          )
            .to(
              iconListCol,
              {
                autoAlpha: 1,
                overflow: "auto",
                pointerEvents: "auto",
                ease: "power2.out",
                duration: 0.22,
              },
              swapStart + 0.04,
            )
            .to(
              pyramidCol,
              {
                y: () =>
                  getMobilePyramidSwapY(
                    animationWrap.offsetHeight,
                    pyramidCol.offsetHeight,
                  ),
                height: `${pyramidPhase.heightPercent}%`,
                maxHeight: `${pyramidPhase.heightPercent}%`,
                ease: "power2.inOut",
                duration: 0.34,
              },
              swapStart,
            )
            .to(
              boxes,
              {
                autoAlpha: 1,
                ease: "power2.out",
                duration: 0.22,
                stagger: 0.06,
              },
              swapStart + 0.1,
            );

          tl.eventCallback("onUpdate", () => {
            if (tl.time() < swapStart) return;
            const listLayout = getMobileListBoxLayout(animationWrap.offsetWidth);
            gsap.set(animationWrap, { y: 0 });
            gsap.set(iconListCol, {
              top: getMobileFinalIconListTop(),
              ...listLayout,
              x: 0,
              y: 0,
              maxHeight: getMobileListMaxHeight(
                animationWrap.offsetHeight,
                pyramidCol.offsetHeight,
              ),
            });
            gsap.set(boxes, { y: 0, x: 0 });
          });
        }
      }
    );

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

    return () => {
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      mm.revert();
      timelineRef.current = null;
    };
  }, []);

  /**
   * Step the timeline to a target side by tweening the page scroll position.
   * The pyramid timeline is scrubbed by ScrollTrigger, so smoothly moving
   * window.scrollY drives every animation (slider, highlight content,
   * pyramid translation) in lockstep ΓÇö no parallel state, no jank.
   */
  const goToSide = (sideIndex: number) => {
    const tl = timelineRef.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return;

    const side = PYRAMID_SIDES[sideIndex];
    if (!side) return;

    const targetPyramidProgress = side.introT * HIGHLIGHT_SEQUENCE_END;
    const targetTimelineTime =
      PYRAMID_PROGRESS_TWEEN_START + targetPyramidProgress;
    const targetTimelineProgress = Math.min(
      1,
      Math.max(0, targetTimelineTime / tl.duration()),
    );
    const targetScroll =
      st.start + (st.end - st.start) * targetTimelineProgress;

    // Manual arrow navigation overrides the backward-skip state ΓÇö the
    // user explicitly picked a side, so further scrolling should behave
    // like a fresh interaction.
    hasReachedIconBoxRef.current = false;
    isProgrammaticScrollRef.current = true;
    gsap.to(window, {
      duration: 0.6,
      scrollTo: { y: targetScroll, autoKill: false },
      ease: "power2.inOut",
      overwrite: true,
      onComplete: () => {
        isProgrammaticScrollRef.current = false;
      },
      onInterrupt: () => {
        isProgrammaticScrollRef.current = false;
      },
    });
  };

  // Once the user has scrolled past the highlight sequence (the icon-box
  // phase), treat the "current" position as beyond the last side so the
  // left arrow brings them back to side 2 (Disconnected stacks) ΓÇö the last
  // visible side ΓÇö instead of stepping back to whatever `highlightIndex`
  // happens to be sticky at.
  const activeSideIndex = isPastPyramidSequence
    ? PYRAMID_SIDES.length
    : Math.max(
        0,
        PYRAMID_SIDES.findIndex(
          (side) => side.highlightIndex === highlightIndex,
        ),
      );

  const handlePrevSide = () => goToSide(Math.max(0, activeSideIndex - 1));
  const handleNextSide = () =>
    goToSide(Math.min(PYRAMID_SIDES.length - 1, activeSideIndex + 1));

  const prevDisabled = activeSideIndex === 0;
  const nextDisabled = activeSideIndex >= PYRAMID_SIDES.length - 1;

  useEffect(() => {
    const content = highlightContentRef.current;
    const title = highlightTitleRef.current;
    const desc = highlightDescRef.current;
    const items = highlightItemsRef.current.filter(
      (item): item is HTMLLIElement => item !== null,
    );

    if (!content || !title) return;

    const ctx = gsap.context(() => {
      gsap.set(title, { opacity: 0, y: 16 });
      if (desc) gsap.set(desc, { opacity: 0, y: 12 });
      gsap.set(items, { opacity: 0, x: -12 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

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
      ref={outerContainerRef}
      className="mx-auto w-full max-w-[1920px] p-4 md:p-12"
    >
      <div
        ref={pyramidSectionRef}
        className="rounded-3xl bg-gradient-to-b from-[#014355] to-[#247691] relative overflow-hidden flex flex-col justify-start items-center box-border shrink-0"
        style={{
          height:
            sectionHeightPx ??
            "calc(100dvh - var(--header-height, 5.5rem) - 2rem)",
          maxHeight:
            sectionHeightPx ??
            "calc(100dvh - var(--header-height, 5.5rem) - 2rem)",
          minHeight: 0,
        }}
      >
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

      <PyramidNavArrow
        direction="prev"
        disabled={prevDisabled}
        onClick={handlePrevSide}
      />
      <PyramidNavArrow
        direction="next"
        disabled={nextDisabled}
        onClick={handleNextSide}
      />

      <div className="relative z-10 flex h-full w-full max-w-[1600px] min-h-0 flex-col items-center">
        <div ref={headingWrapRef} className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-6 sm:pt-8 lg:pt-10 md:px-8 [&_h2]:text-2xl [&_h2]:sm:text-4xl [&_h2]:lg:text-6xl [&_h2]:leading-snug [&_[data-description]]:text-sm [&_[data-description]]:sm:text-base [&_[data-description]]:lg:text-2xl [&_[data-description]]:leading-relaxed [&_[data-description]]:mt-2 [&_div]:gap-y-2 lg:[&_div]:gap-y-4 lg:px-0">
          <DefHeading
            theme="light"
            badgeText=""
            title="The technology trade-off every lender faces"
            description="Every lender needs three things: complex loan logic, self-serve product changes, and full automation. <br/>No legacy platform delivers all three."
            showBadge={false}
          />
        </div>

        <div
          ref={animationWrapRef}
          className="relative flex h-full min-h-0 w-full flex-col items-stretch gap-0 overflow-hidden px-4 pt-2 lg:flex-row lg:items-center lg:justify-center lg:pt-0"
        >
          {/* Mobile: list slot at top (phase 2). Desktop: right column. */}
          <div
            ref={iconListColRef}
            data-lenis-prevent
            className="z-10 mx-auto flex w-full max-w-[430px] flex-col gap-3 overflow-y-auto overscroll-contain sm:gap-4 lg:relative lg:order-3 lg:mx-0 lg:flex lg:h-full lg:w-1/2 lg:max-w-[550px] lg:justify-center lg:gap-8 lg:overflow-visible lg:-left-10"
          >
            {iconBoxesData.map((box, index) => {
              const sectionId =
                PYRAMID_SIDES.find((side) => side.sectionIndex === index)?.id ??
                `pyramid-section-${index}`;
              return (
                <div
                  key={index}
                  id={sectionId}
                  ref={(el) => {
                    iconBoxRefs.current[index] = el;
                  }}
                  className="flex scroll-mt-28 items-start gap-3 sm:gap-4 lg:gap-6 md:scroll-mt-32"
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 shrink-0 flex justify-center items-center rounded-lg lg:rounded-xl bg-[#015167]">
                    <img src={box.icon} alt={box.title} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-9 lg:h-9" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base sm:text-lg lg:text-2xl mb-1 lg:mb-2">
                      {box.title}
                    </h3>
                    <p
                      className={`text-white/75 text-xs sm:text-sm lg:text-lg leading-relaxed ${
                        box.items ? "mb-2 lg:mb-4" : ""
                      }`}
                    >
                      {box.description}
                    </p>
                    {box.items && (
                      <ul className="space-y-1 lg:space-y-1.5">
                        {box.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-2 lg:gap-3 text-white/75 text-xs sm:text-sm lg:text-lg"
                          >
                            <span className="[&_svg]:w-3.5 [&_svg]:h-3.5 lg:[&_svg]:w-5 lg:[&_svg]:h-5">{item.icon}</span> {item.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            ref={pyramidColRef}
            className="z-0 mx-auto flex w-full items-center justify-center lg:relative lg:order-2 lg:mx-0 lg:h-full lg:w-1/2 lg:max-h-none"
            style={{
              maxWidth: `${pyramidConfig.maxWidth}px`,
              willChange: "transform",
              contain: "layout style paint",
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

          {/* Mobile: highlight list below pyramid (phase 1). Desktop: left overlay. */}
          <div
            ref={highlightBoxRef}
            data-lenis-prevent
            className="z-10 w-full overflow-y-auto px-1 lg:absolute lg:left-34 lg:top-1/2 lg:w-[520px] lg:max-w-none lg:-translate-y-1/2 lg:overflow-visible lg:px-0"
          >
            <div
              ref={highlightContentRef}
              className="highlight-content rounded-2xl relative lg:left-30"
            >
              <h3
                ref={highlightTitleRef}
                className="text-white font-semibold text-xl sm:text-2xl lg:text-4xl leading-tight mb-2 lg:mb-4"
              >
                {highlightInfo.title}
              </h3>
              <p
                ref={highlightDescRef}
                className="text-white/80 text-sm sm:text-base lg:text-xl leading-relaxed mb-4 lg:mb-9 max-w-[400px]"
              >
                {highlightInfo.description}
              </p>
              <ul className="space-y-3 lg:space-y-6">
                {highlightInfo.items.map((item, idx) => (
                  <li
                    key={idx}
                    ref={(el) => {
                      highlightItemsRef.current[idx] = el;
                    }}
                    className="flex items-start gap-3 lg:gap-4"
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-14 lg:h-14 rounded-lg lg:rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                        item.positive
                          ? "border-white/0 bg-[#015167]"
                          : "border-white/30 bg-transparent"
                      }`}
                    >
                      {item.positive ? (
                        <FiCheck className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 lg:w-8 lg:h-8 text-[#39C6ED]" />
                      ) : (
                        <FiX className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 lg:w-8 lg:h-8 text-white/60" />
                      )}
                    </div>
                    <div className="flex flex-col pt-0 lg:pt-0.5">
                      <span className="text-white font-semibold text-sm sm:text-base lg:text-2xl leading-tight">
                        {item.title}
                      </span>
                      <span className="text-white/70 text-xs sm:text-sm lg:text-lg leading-relaxed mt-0.5">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
