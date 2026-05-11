"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_CATEGORIES, SECTIONS } from "./content/nav-categories";

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
    <main>
      <nav
        aria-label="Origination and dashboards"
        className="absolute left-6 top-6 flex max-w-[220px] flex-col gap-5 font-sans text-sm leading-[1.45]"
      >
        {NAV_CATEGORIES.map((category) => {
          const isDashboards = category.id === "dashboards";
          return (
            <div key={category.id} className="flex flex-col gap-2.5">
              <div
                className={`text-[11px] font-bold uppercase tracking-wide ${
                  isDashboards ? "text-slate-500" : "text-slate-900"
                }`}
              >
                {category.label}
              </div>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {category.sections.map((section) => {
                  const isActive = section.id === activeSectionId;
                  return (
                    <li key={section.id}>
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
                            ? "font-semibold text-blue-600"
                            : "font-normal text-slate-500"
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

      <div className="mx-auto max-w-[1240px] p-6">
        <h1>{activeSection?.title}</h1>

        <div
          role="tablist"
          aria-label="Tabs"
          className="flex flex-wrap items-center gap-0 rounded-xl bg-[#eceff1] px-1 py-1.5 font-sans text-[13px]"
        >
          {(activeSection?.tabs ?? []).map((tab, tabIndex) => {
            const isActive = tab.id === derivedActiveTabId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                onMouseDown={() => setActiveSlideIndex(0)}
                className={[
                  "cursor-pointer border-0 px-3.5 py-2 leading-tight whitespace-nowrap",
                  tabIndex > 0 ? "border-l border-[#cfd3d8]" : "",
                  isActive
                    ? "rounded-full bg-white font-semibold text-slate-900 shadow-sm shadow-slate-900/10"
                    : "rounded-none bg-transparent font-medium text-slate-500",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative mt-4">
          <button
            type="button"
            onClick={() => setIsPlaying((v) => !v)}
            aria-pressed={!isPlaying ? "true" : "false"}
            className="absolute right-2 top-2 z-10"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            disabled={isAtVeryStart}
            className={`absolute top-1/2 -left-12 -translate-y-1/2 ${
              isAtVeryStart
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer opacity-100"
            }`}
          >
            ←
          </button>

          <div
            aria-label="Slide content"
            className="flex min-h-[600px] w-full items-center justify-center rounded-xl border border-slate-900/10 bg-[#eceff1] px-7 py-6 text-[15px] leading-[1.55] text-slate-900"
          >
            <div
              ref={slideContentRef}
              className="w-full max-w-[920px] text-left"
            >
              {activeSlide?.content ?? null}
            </div>
          </div>

          <div aria-label="Tab counter" className="mt-2">
            {(() => {
              const totalTabs = tabs.length;
              const currentTab = totalTabs === 0 ? 0 : activeTabIndex + 1;
              return `${currentTab}/${totalTabs}`;
            })()}
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            disabled={isAtVeryEnd}
            className={`absolute top-1/2 -right-12 -translate-y-1/2 ${
              isAtVeryEnd
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer opacity-100"
            }`}
          >
            →
          </button>
        </div>
      </div>
    </main>
  );
}
