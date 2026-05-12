"use client";

import { useRef } from "react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ADV_SLIDER_MAIN_IMAGE_ATTR } from "@/components/AdvSliderMainImage";

gsap.registerPlugin(useGSAP);

export type AdvSliderTooltipIcon = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string }
>;

export type AdvSliderTooltipProps = {
  /** Any `react-icons` icon component */
  icon: AdvSliderTooltipIcon;
  /** Main message shown next to the icon */
  title: ReactNode;
  className?: string;
  /** Dashed connector height in pixels (default `48`, ~Tailwind `h-12`) */
  lineHeight?: number;
  /**
   * CSS `left` for the dot + dashed line stack above the tooltip.
   * Defaults to `50%` with `translateX(-50%)` so the connector stays centered.
   */
  connectorLeft?: string;
  /** Icon fill color (any CSS color). Defaults to `#499DB8`. */
  iconColor?: string;
};

function findHeroImg(tooltipRoot: HTMLElement): HTMLImageElement | null {
  const parent = tooltipRoot.parentElement;
  if (!parent) return null;
  const host = parent.querySelector<HTMLElement>(
    `[${ADV_SLIDER_MAIN_IMAGE_ATTR}]`,
  );
  return host?.querySelector("img") ?? null;
}

export default function AdvSliderTooltip({
  icon: Icon,
  title,
  className = "",
  lineHeight = 48,
  connectorLeft,
  iconColor = "#499DB8",
}: AdvSliderTooltipProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const dot = dotRef.current;
      const line = lineRef.current;
      const panel = panelRef.current;
      const root = rootRef.current;
      if (!dot || !line || !panel || !root) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.killTweensOf([dot, line, panel]);

      if (prefersReduced) {
        gsap.set(dot, { autoAlpha: 1, scale: 1 });
        gsap.set(line, { scaleY: 1, transformOrigin: "top center" });
        gsap.set(panel, { autoAlpha: 1, y: 0 });
        return;
      }

      const runIntro = () => {
        gsap.killTweensOf([dot, line, panel]);
        gsap.set(dot, { autoAlpha: 0, scale: 0 });
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        gsap.set(panel, { autoAlpha: 0, y: 10 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.to(dot, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.32,
          ease: "back.out(1.7)",
        })
          .to(
            line,
            {
              scaleY: 1,
              duration: 0.42,
              ease: "power2.inOut",
            },
            ">",
          )
          .to(
            panel,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            ">",
          );
      };

      const img = findHeroImg(root);
      if (!img) {
        runIntro();
        return;
      }

      if (img.complete) {
        runIntro();
        return;
      }

      let finished = false;
      const onDone = () => {
        if (finished) return;
        finished = true;
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
        runIntro();
      };

      img.addEventListener("load", onDone);
      img.addEventListener("error", onDone);

      return () => {
        img.removeEventListener("load", onDone);
        img.removeEventListener("error", onDone);
      };
    },
    { dependencies: [lineHeight], scope: rootRef, revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      className={`flex flex-col absolute top-[calc(100%+20px)] left-[50%] translate-x-[-50%] ${className}`}
    >
      <div
        className={
          connectorLeft != null
            ? "absolute bottom-full flex flex-col items-center translate-x-[-50%]"
            : "absolute left-[50%] translate-x-[-50%] bottom-full flex flex-col items-center"
        }
        style={connectorLeft != null ? { left: connectorLeft } : undefined}
        aria-hidden
      >
        <span
          ref={dotRef}
          className="size-2 shrink-0 rounded-full bg-[#6CAFC5] relative -left-[1px] opacity-0"
        />
        <div
          className="shrink-0 self-center overflow-hidden"
          style={{ height: lineHeight }}
        >
          <div
            ref={lineRef}
            className="w-0 shrink-0 border-l border-dashed border-[#6CAFC5]"
            style={{ height: lineHeight }}
          />
        </div>
      </div>
      <div
        ref={panelRef}
        className="flex w-full min-w-[800px] items-start gap-3 rounded-2xl px-4 py-3 text-left bg-[#EAEFF1] p-5 ring-1 ring-[#fff] shadow-[inset_0_1px_20px_rgba(255,255,255,0.65)] backdrop-blur-md relative overflow-hidden opacity-0"
      >
        <Icon
          className="mt-0.5 size-5 shrink-0 relative z-1"
          style={{ color: iconColor }}
          aria-hidden
        />
        <p className="m-0 min-w-0 text-md font-medium text-[#011F27] relative z-1">
          {title}
        </p>

        <div className="pointer-events-none absolute inset-0 rounded-3xl">
          <div className="absolute -top-5 -right-5 w-[35%] h-[35%] rounded-2xl bg-white/100 blur-xl" />
          <div className="absolute -bottom-5 -left-5 w-[35%] h-[35%] rounded-2xl bg-white/100 blur-xl" />
        </div>
      </div>
    </div>
  );
}
