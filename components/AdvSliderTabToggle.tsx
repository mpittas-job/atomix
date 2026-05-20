"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export type AdvSliderTab = {
  id: string;
  label: string;
};

interface AdvSliderTabToggleProps {
  tabs: AdvSliderTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  ariaLabel?: string;
}

export default function AdvSliderTabToggle({
  tabs,
  activeTabId,
  onTabChange,
  className = "",
  ariaLabel = "Tabs",
}: AdvSliderTabToggleProps) {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabThumbRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstThumbLayoutRef = useRef(true);

  const activeTabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeTabId),
  );
  const derivedActiveTabId = tabs[activeTabIndex]?.id ?? activeTabId;

  useLayoutEffect(() => {
    const list = tabListRef.current;
    const thumb = tabThumbRef.current;
    const activeBtn = tabButtonRefs.current[activeTabIndex];
    if (!list || !thumb || !activeBtn) return;

    const listRect = list.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const x = btnRect.left - listRect.left;
    const width = btnRect.width;

    if (isFirstThumbLayoutRef.current) {
      gsap.set(thumb, { x, width });
      isFirstThumbLayoutRef.current = false;
    } else {
      gsap.to(thumb, {
        x,
        width,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [activeTabIndex, tabs.length]);

  useLayoutEffect(() => {
    const list = tabListRef.current;
    if (!list) return;

    const applyInstantFromLayout = () => {
      const thumb = tabThumbRef.current;
      const activeBtn = tabButtonRefs.current[activeTabIndex];
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
  }, [activeTabIndex]);

  if (tabs.length === 0) return null;

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label={ariaLabel}
      className={[
        "relative mx-auto w-fit mb-5 flex flex-nowrap items-center rounded-full border border-white bg-[#ECF0F2] p-1 text-[14px] shadow-[inset_0px_0px_10px_rgba(15,23,42,0.04)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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
        const showLeftSeparator = tabIndex > 0 && !isActive && !prevIsActive;

        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabButtonRefs.current[tabIndex] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={[
              "relative z-[1] min-w-0 flex-none cursor-pointer overflow-hidden rounded-none bg-transparent px-4 py-2 text-[14px] leading-tight font-semibold sm:px-6",
              showLeftSeparator
                ? "before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:z-10 before:h-[15px] before:w-px before:-translate-y-1/2 before:bg-slate-300/80 before:content-['']"
                : "",
              isActive ? "text-slate-900" : "text-[#617379]",
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
  );
}
