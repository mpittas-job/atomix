"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import Image from "next/image";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import HeroAnimatedBg from "@/components/HeroAnimatedBg";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import DefHeading from "@/components/typo/DefHeading";

import { NAV_CATEGORIES, SECTIONS } from "./content/nav-categories";
import {
  ADV_SLIDER_STEP_ANIMATION_COMPLETE_EVENT,
  ADV_SLIDER_STEP_ANIMATION_START_EVENT,
} from "@/components/AdvSliderTooltip";
import {
  ADV_SLIDER_TOOLTIP_ENTER_LAST,
  AdvSliderTooltipNavProvider,
  useAdvSliderTooltipNav,
} from "@/components/advSliderTooltipNavContext";

function CarouselNavArrow({
  direction,
  disabled,
  onClick,
  positionClassName,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  positionClassName: string;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      disabled={disabled}
      className={[
        "absolute top-1/2 z-10 flex size-15 -translate-y-1/2 items-center justify-center rounded-full border border-[#D3DADD] bg-transparent transition-colors duration-200 hover:bg-[#D3DADD] text-[#011F27] disabled:pointer-events-none",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer opacity-100",
        positionClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {direction === "prev" ? (
        <FiChevronLeft className="size-6 shrink-0" aria-hidden />
      ) : (
        <FiChevronRight className="size-6 shrink-0" aria-hidden />
      )}
    </button>
  );
}

export default function AdvancedSliderPage() {
  return (
    <AdvSliderTooltipNavProvider>
      <AdvancedSliderPageContent />
    </AdvSliderTooltipNavProvider>
  );
}

function AdvancedSliderPageContent() {
  gsap.registerPlugin(useGSAP);

  const {
    activeTooltipIndex,
    setActiveTooltipIndex,
    setPendingEnterTooltipIndex,
    getSlideApi,
  } = useAdvSliderTooltipNav();

  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(true);

  // Initialize from URL hash (e.g. /advanced-slider#borrower-journey)
  useEffect(() => {
    const hashId =
      typeof window !== "undefined"
        ? window.location.hash.replace(/^#/, "")
        : "";

    if (hashId && SECTIONS.some((s) => s.id === hashId)) {
      setActiveSectionId(hashId);
    }
  }, []);

  const activeSection = useMemo(() => {
    return SECTIONS.find((s) => s.id === activeSectionId) ?? SECTIONS[0];
  }, [activeSectionId]);

  const [activeTabId, setActiveTabId] = useState<string>(
    activeSection?.tabs[0]?.id ?? "",
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const derivedActiveTabId = activeSection?.tabs.some(
    (t) => t.id === activeTabId,
  )
    ? activeTabId
    : (activeSection?.tabs[0]?.id ?? "");

  const activeTab = useMemo(() => {
    return activeSection?.tabs.find((t) => t.id === derivedActiveTabId);
  }, [activeSection, derivedActiveTabId]);

  const slides = activeTab?.slides ?? [];
  const derivedActiveSlideIndex =
    activeSlideIndex >= 0 && activeSlideIndex < slides.length
      ? activeSlideIndex
      : 0;
  const activeSlide = slides[derivedActiveSlideIndex];

  const slideContentRef = useRef<HTMLDivElement | null>(null);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabThumbRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prevSectionIdForTabThumbRef = useRef<string | null>(null);
  const activeSlideId = activeSlide?.id ?? "";
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const playProgressCircleRef = useRef<SVGCircleElement | null>(null);
  const playProgressTweenRef = useRef<gsap.core.Tween | null>(null);
  const playProgressTotalMsRef = useRef<number | null>(null);
  const activeTooltipIndexRef = useRef(activeTooltipIndex);
  activeTooltipIndexRef.current = activeTooltipIndex;

  const setActiveTooltipIndexSynced = useCallback(
    (index: number) => {
      activeTooltipIndexRef.current = index;
      setActiveTooltipIndex(index);
    },
    [setActiveTooltipIndex],
  );

  const PLAY_PROGRESS_AUTOPLAY_WAIT_MS = 3000;
  const PLAY_PROGRESS_RADIUS = 18;
  const PLAY_PROGRESS_CIRC = 2 * Math.PI * PLAY_PROGRESS_RADIUS;
  const PLAY_PROGRESS_STROKE_WIDTH = 2;

  useGSAP(
    () => {
      const el = slideContentRef.current;
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.22, ease: "power1.out" },
      );
    },
    {
      dependencies: [activeSlideId],
      revertOnUpdate: false,
    },
  );

  const tabs = activeSection?.tabs ?? [];
  /** Single-tab sections hide in-page tab chrome (see Referral Journey). */
  const showSectionTabChrome = activeSectionId !== "loan-completion";
  const activeSectionIndex = useMemo(() => {
    return Math.max(
      0,
      SECTIONS.findIndex((s) => s.id === activeSectionId),
    );
  }, [activeSectionId]);
  const activeTabIndex = useMemo(() => {
    return Math.max(
      0,
      tabs.findIndex((t) => t.id === derivedActiveTabId),
    );
  }, [tabs, derivedActiveTabId]);

  const activeTabIndexRef = useRef(activeTabIndex);
  activeTabIndexRef.current = activeTabIndex;

  useLayoutEffect(() => {
    const list = tabListRef.current;
    const thumb = tabThumbRef.current;
    const activeBtn = tabButtonRefs.current[activeTabIndex];
    if (!list || !thumb || !activeBtn) return;

    const listRect = list.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const x = btnRect.left - listRect.left;
    const width = btnRect.width;

    const prev = prevSectionIdForTabThumbRef.current;
    const sectionChanged = prev !== activeSectionId;
    prevSectionIdForTabThumbRef.current = activeSectionId;

    if (sectionChanged || prev === null) {
      gsap.set(thumb, { x, width });
    } else {
      gsap.to(thumb, {
        x,
        width,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [activeTabIndex, activeSectionId, tabs.length]);

  useLayoutEffect(() => {
    if (!showSectionTabChrome) return;
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
  }, [showSectionTabChrome]);

  const activeSlideTooltipApi = getSlideApi(activeSlideId);
  const activeSlideTooltipCount = activeSlideTooltipApi?.count ?? 1;
  const currentTooltipIndex = Math.max(
    0,
    Math.min(activeTooltipIndex, activeSlideTooltipCount - 1),
  );
  const isAtFirstTooltip = currentTooltipIndex <= 0;
  const isAtLastTooltip = currentTooltipIndex >= activeSlideTooltipCount - 1;

  const isAtVeryStart =
    activeSectionIndex === 0 &&
    activeTabIndex === 0 &&
    derivedActiveSlideIndex === 0 &&
    isAtFirstTooltip;
  const isAtVeryEnd =
    activeSectionIndex === SECTIONS.length - 1 &&
    activeTabIndex === tabs.length - 1 &&
    derivedActiveSlideIndex === Math.max(0, slides.length - 1) &&
    isAtLastTooltip;

  const goPrev = useCallback(() => {
    if (tabs.length === 0) return;
    if (isAtVeryStart) return;

    const tooltipIndex = activeTooltipIndexRef.current;
    const clampedTooltipIndex = Math.max(
      0,
      Math.min(tooltipIndex, activeSlideTooltipCount - 1),
    );

    if (activeSlideTooltipApi && clampedTooltipIndex > 0) {
      const prev = clampedTooltipIndex - 1;
      setActiveTooltipIndexSynced(prev);
      activeSlideTooltipApi.navigateTo(prev, { skipSceneIntro: true });
      setIsAnimationComplete(false);
      return;
    }

    if (derivedActiveSlideIndex > 0) {
      setPendingEnterTooltipIndex(ADV_SLIDER_TOOLTIP_ENTER_LAST);
      setActiveSlideIndex((v) => Math.max(0, v - 1));
      return;
    }

    if (activeTabIndex === 0) {
      const prevSectionIndex = Math.max(0, activeSectionIndex - 1);
      const prevSection = SECTIONS[prevSectionIndex];
      if (!prevSection) return;

      setActiveSectionId(prevSection.id);
      setActiveTabId(prevSection.tabs[prevSection.tabs.length - 1]?.id ?? "");
      const prevTab = prevSection.tabs[prevSection.tabs.length - 1];
      setPendingEnterTooltipIndex(ADV_SLIDER_TOOLTIP_ENTER_LAST);
      setActiveSlideIndex(Math.max(0, (prevTab?.slides?.length ?? 1) - 1));
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${prevSection.id}`);
      }
      return;
    }

    setActiveTabId(tabs[activeTabIndex - 1]?.id ?? "");
    setPendingEnterTooltipIndex(ADV_SLIDER_TOOLTIP_ENTER_LAST);
    setActiveSlideIndex(
      Math.max(0, (tabs[activeTabIndex - 1]?.slides?.length ?? 1) - 1),
    );
  }, [
    activeSectionIndex,
    activeSlideTooltipApi,
    activeSlideTooltipCount,
    activeTabIndex,
    derivedActiveSlideIndex,
    isAtFirstTooltip,
    isAtVeryStart,
    setActiveTooltipIndexSynced,
    setPendingEnterTooltipIndex,
    tabs,
  ]);

  const goNext = useCallback(() => {
    if (tabs.length === 0) return;
    if (isAtVeryEnd) return;

    const tooltipIndex = activeTooltipIndexRef.current;
    const clampedTooltipIndex = Math.max(
      0,
      Math.min(tooltipIndex, activeSlideTooltipCount - 1),
    );

    if (
      activeSlideTooltipApi &&
      clampedTooltipIndex < activeSlideTooltipCount - 1
    ) {
      const next = clampedTooltipIndex + 1;
      setActiveTooltipIndexSynced(next);
      activeSlideTooltipApi.navigateTo(next, { skipSceneIntro: true });
      setIsAnimationComplete(false);
      return;
    }

    if (derivedActiveSlideIndex < Math.max(0, slides.length - 1)) {
      setActiveTooltipIndexSynced(0);
      setActiveSlideIndex((v) =>
        Math.min(Math.max(0, slides.length - 1), v + 1),
      );
      return;
    }

    if (activeTabIndex === tabs.length - 1) {
      const nextSectionIndex = Math.min(
        SECTIONS.length - 1,
        activeSectionIndex + 1,
      );
      const nextSection = SECTIONS[nextSectionIndex];
      if (!nextSection) return;

      setActiveSectionId(nextSection.id);
      setActiveTabId(nextSection.tabs[0]?.id ?? "");
      setActiveTooltipIndexSynced(0);
      setActiveSlideIndex(0);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${nextSection.id}`);
      }
      return;
    }

    setActiveTabId(tabs[activeTabIndex + 1]?.id ?? "");
    setActiveTooltipIndexSynced(0);
    setActiveSlideIndex(0);
  }, [
    activeSectionIndex,
    activeSlideTooltipApi,
    activeSlideTooltipCount,
    activeTabIndex,
    derivedActiveSlideIndex,
    isAtLastTooltip,
    isAtVeryEnd,
    setActiveTooltipIndexSynced,
    slides.length,
    tabs,
  ]);

  useEffect(() => {
    setIsAnimationComplete(false);
  }, [activeSlideId]);

  useEffect(() => {
    const circle = playProgressCircleRef.current;
    if (!circle) return;
    playProgressTweenRef.current?.kill();
    playProgressTweenRef.current = null;
    playProgressTotalMsRef.current = null;
    // Use direct SVG presentation attributes for widest compatibility.
    gsap.set(circle, {
      strokeDasharray: PLAY_PROGRESS_CIRC,
      strokeDashoffset: PLAY_PROGRESS_CIRC,
    });
  }, [activeSlideId, PLAY_PROGRESS_CIRC]);

  useEffect(() => {
    const onDone = (e: Event) => {
      const ev = e as CustomEvent<{ slideId?: string }>;
      const slideIdFromEvent = ev?.detail?.slideId;
      if (!slideIdFromEvent) return;
      if (slideIdFromEvent !== activeSlideId) return;
      setIsAnimationComplete(true);
    };

    window.addEventListener(ADV_SLIDER_STEP_ANIMATION_COMPLETE_EVENT, onDone);
    return () =>
      window.removeEventListener(
        ADV_SLIDER_STEP_ANIMATION_COMPLETE_EVENT,
        onDone,
      );
  }, [activeSlideId]);

  useEffect(() => {
    const onStart = (e: Event) => {
      const ev = e as CustomEvent<{ slideId?: string; durationMs?: number }>;
      const slideIdFromEvent = ev?.detail?.slideId;
      const durationMs = ev?.detail?.durationMs;
      if (!slideIdFromEvent || durationMs == null) return;
      if (slideIdFromEvent !== activeSlideId) return;

      const circle = playProgressCircleRef.current;
      if (!circle) return;

      const totalMs = Math.max(0, durationMs + PLAY_PROGRESS_AUTOPLAY_WAIT_MS);
      playProgressTotalMsRef.current = totalMs;

      playProgressTweenRef.current?.kill();
      gsap.set(circle, {
        strokeDasharray: PLAY_PROGRESS_CIRC,
        strokeDashoffset: PLAY_PROGRESS_CIRC,
      });

      const tween = gsap.to(circle, {
        strokeDashoffset: 0,
        duration: totalMs / 1000,
        ease: "none",
        overwrite: "auto",
      });

      if (!isPlaying) tween.pause();
      playProgressTweenRef.current = tween;
    };

    window.addEventListener(ADV_SLIDER_STEP_ANIMATION_START_EVENT, onStart);
    return () =>
      window.removeEventListener(
        ADV_SLIDER_STEP_ANIMATION_START_EVENT,
        onStart,
      );
  }, [activeSlideId, isPlaying, PLAY_PROGRESS_CIRC]);

  useEffect(() => {
    const tween = playProgressTweenRef.current;
    if (!tween) return;
    if (isPlaying) tween.resume();
    else tween.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    if (isAtVeryEnd) return;
    if (!isAnimationComplete) return;

    const id = window.setTimeout(() => {
      goNext();
    }, 3000);

    return () => window.clearTimeout(id);
  }, [goNext, isAtVeryEnd, isPlaying, activeSlideId, isAnimationComplete]);

  useEffect(() => {
    if (isAtVeryEnd) setIsPlaying(false);
  }, [isAtVeryEnd]);

  return (
    <main className="bg-[#EBEFF2] min-h-screen">
      <Header />

      {/* Fixed header does not consume layout height — reserve its space so hero sits below it */}
      <div className="pt-26.5">
        <HeroAnimatedBg tileDisplayMode="fixedMosaic" />
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 top-10 bottom-15 left-10 z-30 w-[220px] max-w-[min(220px,calc(100vw-3rem))]">
          <div className="pointer-events-auto sticky top-28 lg:top-32">
            <nav
              aria-label="Origination and dashboards"
              className="flex w-full flex-col gap-5 font-sans text-sm leading-[1.45]"
            >
              <a
                href="#atomix-journey-flow"
                className="no-underline text-sm font-medium text-[#5F7378] transition-colors duration-150 hover:text-[#011F27]"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("atomix-journey-flow")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  if (typeof window !== "undefined") {
                    window.history.replaceState(
                      null,
                      "",
                      "#atomix-journey-flow",
                    );
                  }
                }}
              >
                The Atomix Journey
              </a>
              {NAV_CATEGORIES.map((category) => {
                const containsActiveSection = category.sections.some(
                  (s) => s.id === activeSectionId,
                );
                return (
                  <div key={category.id} className="flex flex-col gap-2.5">
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-wide ${
                        containsActiveSection
                          ? "text-[#011F27]"
                          : "text-[#5F7378]"
                      }`}
                    >
                      {category.label}
                    </div>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {category.sections.map((section) => {
                        const isActive = section.id === activeSectionId;
                        return (
                          <li key={section.id} className="text-sm">
                            <a
                              href={`#${section.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveSectionId(section.id);
                                setActiveTabId(section.tabs[0]?.id ?? "");
                                setActiveSlideIndex(0);
                                setActiveTooltipIndexSynced(0);
                                setPendingEnterTooltipIndex(null);
                                document
                                  .getElementById("advanced-slider")
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                  });
                                if (typeof window !== "undefined") {
                                  window.history.replaceState(
                                    null,
                                    "",
                                    `#${section.id}`,
                                  );
                                }
                              }}
                              aria-current={isActive ? "page" : undefined}
                              className={`no-underline transition-colors duration-150 ${
                                isActive
                                  ? "font-semibold text-[#499DB8]"
                                  : "font-medium text-[#5F7378] hover:text-[#011F27]"
                              }`}
                            >
                              {section.navLabel}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        <section
          id="atomix-journey-flow"
          aria-label="The Atomix Journey"
          className="w-full scroll-mt-28 py-16 md:scroll-mt-32 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1240px] px-6">
            <DefHeading
              showBadge={false}
              badgeText=""
              title="The Atomix Journey"
              description={
                <>
                  Real-time data captured at every stage — powering faster
                  decisions, structured collaboration, and continuous loan
                  management beyond completion.
                </>
              }
              theme="dark"
              className="max-w-5xl"
            />
            <div className="mt-12 flex justify-center md:mt-16">
              <Image
                src="/advanced-slider/flow-chart.png"
                alt="The Atomix Journey"
                width={1200}
                height={527}
                sizes="(max-width: 1280px) min(100vw - 48px, 1152px), 1152px"
                className="h-auto w-full max-w-6xl rounded-2xl object-contain"
                quality={100}
                priority
                unoptimized
              />
            </div>
          </div>
        </section>

        <section
          id="advanced-slider"
          aria-label="Loan journey slider"
          className="relative min-h-screen w-full scroll-mt-28 overflow-x-clip md:scroll-mt-32"
        >
          <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-screen -translate-x-1/2">
            <SoftAurora
              speed={1.3}
              scale={1.2}
              brightness={0.55}
              color1="#2d7a94ff"
              color2="#499db8ff"
              noiseFrequency={1}
              noiseAmplitude={3.5}
              bandHeight={0.2}
              bandSpread={1}
              octaveDecay={0.12}
              layerOffset={0.5}
              colorSpeed={1}
              enableMouseInteraction={false}
              mouseInfluence={0.2}
            />
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-6 pb-24 pt-2">
            <h1 className="text-[40px] font-semibold text-center">
              {activeSection?.title}
            </h1>

            {showSectionTabChrome ? (
              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Tabs"
                className="relative flex flex-nowrap items-center rounded-full bg-[#ECF0F2] p-1 mb-5 border border-white text-[14px] shadow-[inset_0px_0px_10px_rgba(15,23,42,0.04)]"
              >
                <div
                  ref={tabThumbRef}
                  aria-hidden
                  className="pointer-events-none absolute top-1 bottom-1 left-0 z-0 rounded-full bg-white shadow-sm shadow-slate-900/10 will-change-[transform,width]"
                />
                {tabs.map((tab, tabIndex) => {
                  const isActive = tab.id === derivedActiveTabId;
                  const prevTab = tabIndex > 0 ? tabs[tabIndex - 1] : null;
                  const prevIsActive =
                    !!prevTab && prevTab.id === derivedActiveTabId;
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
                      onClick={() => setActiveTabId(tab.id)}
                      onMouseDown={() => {
                        setActiveSlideIndex(0);
                        setActiveTooltipIndexSynced(0);
                        setPendingEnterTooltipIndex(null);
                      }}
                      className={[
                        "relative z-[1] min-w-0 flex-1 cursor-pointer overflow-hidden py-2 px-2 leading-tight font-semibold text-[14px] bg-transparent sm:px-3",
                        showLeftSeparator
                          ? "before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:z-10 before:h-[15px] before:w-px before:-translate-y-1/2 before:bg-slate-300/80 before:content-['']"
                          : "",
                        isActive
                          ? "text-slate-900"
                          : "rounded-none text-[#617379]",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className="block truncate" title={tab.label}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPlaying((v) => !v)}
                aria-pressed={!isPlaying ? "true" : "false"}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="absolute right-2 top-2 z-10 grid size-11 place-items-center rounded-full bg-white text-[#011F27] shadow-sm shadow-slate-900/15 ring-1 ring-black/5 transition-transform active:scale-[0.98]"
              >
                <svg
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{ opacity: isPlaying ? 1 : 0 }}
                  viewBox="0 0 44 44"
                  aria-hidden
                >
                  <circle
                    cx="22"
                    cy="22"
                    r={PLAY_PROGRESS_RADIUS}
                    fill="none"
                    stroke="rgba(1,31,39,0.12)"
                    strokeWidth={PLAY_PROGRESS_STROKE_WIDTH}
                  />
                  <circle
                    ref={playProgressCircleRef}
                    cx="22"
                    cy="22"
                    r={PLAY_PROGRESS_RADIUS}
                    fill="none"
                    stroke="#499DB8"
                    strokeWidth={PLAY_PROGRESS_STROKE_WIDTH}
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                    style={{ willChange: "stroke-dashoffset" }}
                  />
                </svg>
                {isPlaying ? (
                  <IoIosPause className="size-6" aria-hidden />
                ) : (
                  <IoIosPlay className="size-6 translate-x-[1px]" aria-hidden />
                )}
              </button>

              <CarouselNavArrow
                direction="prev"
                onClick={goPrev}
                disabled={isAtVeryStart}
                positionClassName="right-[calc(100%+22px)]"
              />

              <div
                aria-label="Slide content"
                className="flex min-h-[600px] w-full items-end justify-center rounded-xl bg-[#499DB8] px-22 relative"
              >
                <div
                  ref={slideContentRef}
                  className="w-full"
                  data-adv-slide-id={activeSlideId}
                >
                  {activeSlide?.content ?? null}
                </div>
              </div>

              {showSectionTabChrome ? (
                <div
                  aria-label="Tab counter"
                  className="mt-2 text-[10px] opacity-50 flex  mt-5"
                >
                  {(() => {
                    const totalTabs = tabs.length;
                    const currentTab = totalTabs === 0 ? 0 : activeTabIndex + 1;
                    return `${currentTab}/${totalTabs}`;
                  })()}
                </div>
              ) : null}

              <CarouselNavArrow
                direction="next"
                onClick={goNext}
                disabled={isAtVeryEnd}
                positionClassName="left-[calc(100%+22px)]"
              />
            </div>
          </div>
        </section>
      </div>

      <DefCta title="Build the Future of Asset-Backed Lending" />

      <Footer />
    </main>
  );
}
