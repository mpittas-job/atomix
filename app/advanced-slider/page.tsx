"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NAV_CATEGORIES, SECTIONS } from "./content/nav-categories";

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
  gsap.registerPlugin(useGSAP);

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
      revertOnUpdate: true,
    },
  );

  const tabs = activeSection?.tabs ?? [];
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

  useGSAP(
    () => {
      const list = tabListRef.current;
      const thumb = tabThumbRef.current;
      if (!list || !thumb) return;

      const measure = () => {
        const activeBtn = tabButtonRefs.current[activeTabIndex];
        if (!activeBtn) return null;
        const listRect = list.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        return {
          x: btnRect.left - listRect.left,
          width: btnRect.width,
        };
      };

      const applyInstant = () => {
        const m = measure();
        if (m) gsap.set(thumb, m);
      };

      const prev = prevSectionIdForTabThumbRef.current;
      const sectionChanged = prev !== activeSectionId;
      prevSectionIdForTabThumbRef.current = activeSectionId;

      const m = measure();
      if (!m) return;

      if (sectionChanged || prev === null) {
        gsap.set(thumb, m);
      } else {
        gsap.to(thumb, {
          x: m.x,
          width: m.width,
          duration: 0.32,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      const ro = new ResizeObserver(applyInstant);
      ro.observe(list);
      for (const el of tabButtonRefs.current) {
        if (el) ro.observe(el);
      }
      return () => ro.disconnect();
    },
    {
      dependencies: [activeTabIndex, activeSectionId, tabs.length],
    },
  );

  const isAtVeryStart =
    activeSectionIndex === 0 &&
    activeTabIndex === 0 &&
    derivedActiveSlideIndex === 0;
  const isAtVeryEnd =
    activeSectionIndex === SECTIONS.length - 1 &&
    activeTabIndex === tabs.length - 1 &&
    derivedActiveSlideIndex === Math.max(0, slides.length - 1);

  const goPrev = useCallback(() => {
    if (tabs.length === 0) return;
    if (isAtVeryStart) return;

    if (derivedActiveSlideIndex > 0) {
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
      setActiveSlideIndex(Math.max(0, (prevTab?.slides?.length ?? 1) - 1));
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${prevSection.id}`);
      }
      return;
    }

    setActiveTabId(tabs[activeTabIndex - 1]?.id ?? "");
    setActiveSlideIndex(
      Math.max(0, (tabs[activeTabIndex - 1]?.slides?.length ?? 1) - 1),
    );
  }, [
    activeSectionIndex,
    activeTabIndex,
    derivedActiveSlideIndex,
    isAtVeryStart,
    tabs,
  ]);

  const goNext = useCallback(() => {
    if (tabs.length === 0) return;
    if (isAtVeryEnd) return;

    if (derivedActiveSlideIndex < Math.max(0, slides.length - 1)) {
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
      setActiveSlideIndex(0);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${nextSection.id}`);
      }
      return;
    }

    setActiveTabId(tabs[activeTabIndex + 1]?.id ?? "");
    setActiveSlideIndex(0);
  }, [
    activeSectionIndex,
    activeTabIndex,
    derivedActiveSlideIndex,
    isAtVeryEnd,
    slides.length,
    tabs,
  ]);

  useEffect(() => {
    if (!isPlaying) return;
    if (isAtVeryEnd) return;

    const id = window.setInterval(() => {
      goNext();
    }, 3000);

    return () => window.clearInterval(id);
  }, [goNext, isAtVeryEnd, isPlaying]);

  useEffect(() => {
    if (isAtVeryEnd) setIsPlaying(false);
  }, [isAtVeryEnd]);

  return (
    <main className="bg-[#EBEFF2] min-h-screen">
      <nav
        aria-label="Origination and dashboards"
        className="absolute left-6 top-6 flex max-w-[220px] flex-col gap-5 font-sans text-sm leading-[1.45]"
      >
        {NAV_CATEGORIES.map((category) => {
          const containsActiveSection = category.sections.some(
            (s) => s.id === activeSectionId,
          );
          return (
            <div key={category.id} className="flex flex-col gap-2.5">
              <div
                className={`text-[11px] font-semibold uppercase tracking-wide ${
                  containsActiveSection ? "text-[#011F27]" : "text-[#5F7378]"
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
                          if (typeof window !== "undefined") {
                            window.history.replaceState(
                              null,
                              "",
                              `#${section.id}`,
                            );
                          }
                        }}
                        aria-current={isActive ? "page" : undefined}
                        className={`no-underline ${
                          isActive
                            ? "font-semibold text-[#499DB8]"
                            : "font-medium text-[#5F7378]"
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

      <div className="mx-auto max-w-[1240px] p-6 flex flex-col gap-10">
        <h1 className="text-[40px] font-semibold text-center">
          {activeSection?.title}
        </h1>

        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Tabs"
          className="relative flex flex-wrap items-center rounded-full bg-[#ECF0F2] p-1 border border-white text-[14px] shadow-[inset_0px_0px_10px_rgba(15,23,42,0.04)]"
        >
          <div
            ref={tabThumbRef}
            aria-hidden
            className="pointer-events-none absolute top-1 bottom-1 left-0 z-0 rounded-full bg-white shadow-sm shadow-slate-900/10 will-change-[transform,width]"
          />
          {tabs.map((tab, tabIndex) => {
            const isActive = tab.id === derivedActiveTabId;
            const prevTab = tabIndex > 0 ? tabs[tabIndex - 1] : null;
            const prevIsActive = !!prevTab && prevTab.id === derivedActiveTabId;
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
                onMouseDown={() => setActiveSlideIndex(0)}
                className={[
                  "relative z-[1] cursor-pointer py-2 px-4 leading-tight whitespace-nowrap flex-1 font-semibold text-[14px] bg-transparent",
                  showLeftSeparator
                    ? "before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:z-10 before:h-[15px] before:w-px before:-translate-y-1/2 before:bg-slate-300/80 before:content-['']"
                    : "",
                  isActive ? "text-slate-900" : "rounded-none text-[#617379]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsPlaying((v) => !v)}
            aria-pressed={!isPlaying ? "true" : "false"}
            className="absolute right-2 top-2 z-10"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <CarouselNavArrow
            direction="prev"
            onClick={goPrev}
            disabled={isAtVeryStart}
            positionClassName="right-[calc(100%+22px)]"
          />

          <div
            aria-label="Slide content"
            className="flex min-h-[600px] w-full items-end justify-center rounded-xl bg-[#499DB8] px-20 relative"
          >
            <div ref={slideContentRef} className="w-full">
              {activeSlide?.content ?? null}
            </div>
          </div>

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

          <CarouselNavArrow
            direction="next"
            onClick={goNext}
            disabled={isAtVeryEnd}
            positionClassName="left-[calc(100%+22px)]"
          />
        </div>
      </div>

      <div className="bg-[#EBEFF2] h-[1000px] w-full"></div>
    </main>
  );
}
