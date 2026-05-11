"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Slide = {
  id: string;
  text: string;
};

type Tab = {
  id: string;
  label: string;
  color: string;
  slides: Slide[];
};

type Section = {
  id: string;
  navLabel: string;
  title: string;
  tabs: Tab[];
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    navLabel: "Overview",
    title: "Overview section",
    tabs: [
      {
        id: "tab-a",
        label: "Tab A",
        color: "#ef4444",
        slides: [
          { id: "a-1", text: "Overview / Tab A / Slide 1" },
          { id: "a-2", text: "Overview / Tab A / Slide 2" },
        ],
      },
      {
        id: "tab-b",
        label: "Tab B",
        color: "#22c55e",
        slides: [
          { id: "b-1", text: "Overview / Tab B / Slide 1" },
          { id: "b-2", text: "Overview / Tab B / Slide 2" },
        ],
      },
      {
        id: "tab-c",
        label: "Tab C",
        color: "#3b82f6",
        slides: [
          { id: "c-1", text: "Overview / Tab C / Slide 1" },
          { id: "c-2", text: "Overview / Tab C / Slide 2" },
        ],
      },
    ],
  },
  {
    id: "features",
    navLabel: "Features",
    title: "Features section",
    tabs: [
      {
        id: "tab-1",
        label: "Tab 1",
        color: "#a855f7",
        slides: [
          { id: "1-1", text: "Features / Tab 1 / Slide 1" },
          { id: "1-2", text: "Features / Tab 1 / Slide 2" },
        ],
      },
      {
        id: "tab-2",
        label: "Tab 2",
        color: "#f59e0b",
        slides: [
          { id: "2-1", text: "Features / Tab 2 / Slide 1" },
          { id: "2-2", text: "Features / Tab 2 / Slide 2" },
        ],
      },
      {
        id: "tab-3",
        label: "Tab 3",
        color: "#14b8a6",
        slides: [
          { id: "3-1", text: "Features / Tab 3 / Slide 1" },
          { id: "3-2", text: "Features / Tab 3 / Slide 2" },
        ],
      },
    ],
  },
  {
    id: "pricing",
    navLabel: "Pricing",
    title: "Pricing section",
    tabs: [
      {
        id: "basic",
        label: "Basic",
        color: "#64748b",
        slides: [
          { id: "basic-1", text: "Pricing / Basic / Slide 1" },
          { id: "basic-2", text: "Pricing / Basic / Slide 2" },
        ],
      },
      {
        id: "pro",
        label: "Pro",
        color: "#111827",
        slides: [
          { id: "pro-1", text: "Pricing / Pro / Slide 1" },
          { id: "pro-2", text: "Pricing / Pro / Slide 2" },
        ],
      },
      {
        id: "enterprise",
        label: "Enterprise",
        color: "#0ea5e9",
        slides: [
          { id: "ent-1", text: "Pricing / Enterprise / Slide 1" },
          { id: "ent-2", text: "Pricing / Enterprise / Slide 2" },
        ],
      },
    ],
  },
];

export default function AdvancedSliderPage() {
  gsap.registerPlugin(useGSAP);

  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(true);

  // Initialize from URL hash (e.g. /advanced-slider#features)
  useEffect(() => {
    const hashId =
      typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";

    if (hashId && SECTIONS.some((s) => s.id === hashId)) {
      setActiveSectionId(hashId);
    }
  }, []);

  const activeSection = useMemo(() => {
    return SECTIONS.find((s) => s.id === activeSectionId) ?? SECTIONS[0];
  }, [activeSectionId]);

  const [activeTabId, setActiveTabId] = useState<string>(
    activeSection?.tabs[0]?.id ?? ""
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // When the section changes, reset the tab to that section's first tab.
  // (We do this inside render via derived state to keep it simple and predictable.)
  const derivedActiveTabId =
    activeSection?.tabs.some((t) => t.id === activeTabId)
      ? activeTabId
      : activeSection?.tabs[0]?.id ?? "";

  const activeTab = useMemo(() => {
    return activeSection?.tabs.find((t) => t.id === derivedActiveTabId);
  }, [activeSection, derivedActiveTabId]);

  const slides = activeTab?.slides ?? [];
  const derivedActiveSlideIndex =
    activeSlideIndex >= 0 && activeSlideIndex < slides.length ? activeSlideIndex : 0;
  const activeSlide = slides[derivedActiveSlideIndex];

  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const [displayColor, setDisplayColor] = useState<string>(
    activeTab?.color ?? "#e5e7eb"
  );

  useEffect(() => {
    setDisplayColor(activeTab?.color ?? "#e5e7eb");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const el = placeholderRef.current;
      if (!el) return;

      const nextColor = activeTab?.color ?? "#e5e7eb";

      gsap.killTweensOf(el);
      const tl = gsap.timeline();
      tl.to(el, { autoAlpha: 0, duration: 0.15, ease: "power1.out" });
      tl.add(() => setDisplayColor(nextColor));
      tl.to(el, { autoAlpha: 1, duration: 0.2, ease: "power1.out" });
    },
    {
      dependencies: [activeSectionId, derivedActiveTabId, derivedActiveSlideIndex],
      revertOnUpdate: true,
    }
  );

  const tabs = activeSection?.tabs ?? [];
  const activeSectionIndex = useMemo(() => {
    return Math.max(
      0,
      SECTIONS.findIndex((s) => s.id === activeSectionId)
    );
  }, [activeSectionId]);
  const activeTabIndex = useMemo(() => {
    return Math.max(
      0,
      tabs.findIndex((t) => t.id === derivedActiveTabId)
    );
  }, [tabs, derivedActiveTabId]);

  const isAtVeryStart =
    activeSectionIndex === 0 && activeTabIndex === 0 && derivedActiveSlideIndex === 0;
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
    setActiveSlideIndex(Math.max(0, (tabs[activeTabIndex - 1]?.slides?.length ?? 1) - 1));
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
      setActiveSlideIndex((v) => Math.min(Math.max(0, slides.length - 1), v + 1));
      return;
    }

    if (activeTabIndex === tabs.length - 1) {
      const nextSectionIndex = Math.min(SECTIONS.length - 1, activeSectionIndex + 1);
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
        aria-label="Sections"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {SECTIONS.map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSectionId(section.id);
                setActiveTabId(section.tabs[0]?.id ?? "");
                if (typeof window !== "undefined") {
                  window.history.replaceState(null, "", `#${section.id}`);
                }
              }}
              aria-current={isActive ? "page" : undefined}
              style={{
                fontWeight: isActive ? 700 : 400,
                textDecoration: isActive ? "underline" : "none",
              }}
            >
              {section.navLabel}
            </a>
          );
        })}
      </nav>

      <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 24,
        }}
      >
        <h1>{activeSection?.title}</h1>

        <div role="tablist" aria-label="Tabs" style={{ display: "flex", gap: 8 }}>
          {(activeSection?.tabs ?? []).map((tab) => {
            const isActive = tab.id === derivedActiveTabId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
              onMouseDown={() => setActiveSlideIndex(0)}
                style={{
                  fontWeight: isActive ? 700 : 400,
                  textDecoration: isActive ? "underline" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 16, position: "relative" }}>
          <button
            type="button"
            onClick={() => setIsPlaying((v) => !v)}
            aria-pressed={!isPlaying ? "true" : "false"}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            disabled={isAtVeryStart}
            style={{
              position: "absolute",
              left: -48,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: isAtVeryStart ? 0.4 : 1,
              cursor: isAtVeryStart ? "not-allowed" : "pointer",
            }}
          >
            ←
          </button>

          <div
            ref={placeholderRef}
            aria-label="Placeholder image"
            style={{
              height: 280,
              width: "100%",
              background: displayColor,
              opacity: 1,
              display: "grid",
              placeItems: "center",
            }}
          >
            <div>{activeSlide?.text ?? ""}</div>
          </div>

          <div aria-label="Tab counter" style={{ marginTop: 8 }}>
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
            style={{
              position: "absolute",
              right: -48,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: isAtVeryEnd ? 0.4 : 1,
              cursor: isAtVeryEnd ? "not-allowed" : "pointer",
            }}
          >
            →
          </button>
        </div>
      </div>
    </main>
  );
}

