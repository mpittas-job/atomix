"use client";

import { useRef } from "react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ADV_SLIDER_MAIN_IMAGE_ATTR,
  ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION,
} from "@/components/AdvSliderMainImage";
import { ADV_SLIDER_OVERLAY_IMAGE_ATTR } from "@/components/AdvSliderOverlayImage";
import {
  ADV_SLIDER_STEP_ANIMATION_COMPLETE_EVENT,
  ADV_SLIDER_STEP_ANIMATION_START_EVENT,
} from "@/components/advSliderStepAnimationEvents";

gsap.registerPlugin(useGSAP);

const HERO_OVERLAY_EXTRA_DELAY = 0.6;
const HERO_OVERLAY_FADE_DURATION = 0.8;
const HERO_OVERLAY_GAP = 0.55;

const OVERLAY_IMAGE_DURATION = 1.35;
const OVERLAY_IMAGE_GAP = 0.65;

const BEFORE_TOOLTIP_GAP = 0.75;

const TOOLTIP_DOT_DURATION = 0.45;
const TOOLTIP_LINE_DURATION = 0.6;
const TOOLTIP_PANEL_DURATION = 0.6;

export {
  ADV_SLIDER_STEP_ANIMATION_COMPLETE_EVENT,
  ADV_SLIDER_STEP_ANIMATION_START_EVENT,
} from "@/components/advSliderStepAnimationEvents";

export const ADV_SLIDER_TOOLTIP_ATTR = "data-adv-slider-tooltip";

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

function findSlideRoot(tooltipRoot: HTMLElement): HTMLElement | null {
  return tooltipRoot.parentElement ?? null;
}

function findActiveSlideId(tooltipRoot: HTMLElement): string | null {
  const host = tooltipRoot.closest<HTMLElement>("[data-adv-slide-id]");
  return host?.getAttribute("data-adv-slide-id") ?? null;
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

      const slideRoot = findSlideRoot(root);
      const heroOverlays = slideRoot
        ? Array.from(
            slideRoot.querySelectorAll<HTMLElement>(".main-img-overlay"),
          )
        : [];
      const overlayImages = slideRoot
        ? Array.from(
            slideRoot.querySelectorAll<HTMLElement>(
              `[${ADV_SLIDER_OVERLAY_IMAGE_ATTR}]`,
            ),
          )
        : [];

      gsap.killTweensOf(
        [dot, line, panel, ...heroOverlays, ...overlayImages].filter(Boolean),
      );

      if (prefersReduced) {
        if (heroOverlays.length) gsap.set(heroOverlays, { autoAlpha: 1 });
        if (overlayImages.length) {
          gsap.set(overlayImages, { autoAlpha: 1 });
          for (const el of overlayImages) {
            const img = el.querySelector("img");
            if (img) gsap.set(img, { scale: 1 });
          }
        }
        gsap.set(dot, { autoAlpha: 1, scale: 1 });
        gsap.set(line, { scaleY: 1, transformOrigin: "top center" });
        gsap.set(panel, { autoAlpha: 1, y: 0 });
        return;
      }

      const runIntro = () => {
        gsap.killTweensOf(
          [dot, line, panel, ...heroOverlays, ...overlayImages].filter(Boolean),
        );
        if (heroOverlays.length) gsap.set(heroOverlays, { autoAlpha: 0 });
        if (overlayImages.length) {
          gsap.set(overlayImages, { autoAlpha: 0 });
          for (const el of overlayImages) {
            const img = el.querySelector("img");
            if (img) gsap.set(img, { scale: 0.92, transformOrigin: "50% 50%" });
          }
        }
        gsap.set(dot, { autoAlpha: 0, scale: 0 });
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        gsap.set(panel, { autoAlpha: 0, y: 10 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (heroOverlays.length) {
          for (const [idx, el] of heroOverlays.entries()) {
            const position =
              idx === 0
                ? ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION +
                  HERO_OVERLAY_EXTRA_DELAY
                : `>+${HERO_OVERLAY_GAP}`;
            tl.to(
              el,
              {
                autoAlpha: 1,
                duration: HERO_OVERLAY_FADE_DURATION,
                ease: "power3.out",
              },
              position,
            );
          }
        }

        if (overlayImages.length) {
          for (const [idx, el] of overlayImages.entries()) {
            let position: string | number;
            if (idx === 0) {
              position = heroOverlays.length
                ? `>+${OVERLAY_IMAGE_GAP}`
                : ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION +
                  HERO_OVERLAY_EXTRA_DELAY;
            } else {
              position = `>+${OVERLAY_IMAGE_GAP}`;
            }
            tl.to(
              el,
              {
                autoAlpha: 1,
                duration: OVERLAY_IMAGE_DURATION,
                ease: "power3.out",
              },
              position,
            );

            const img = el.querySelector("img");
            if (img) {
              tl.to(
                img,
                {
                  scale: 1,
                  duration: OVERLAY_IMAGE_DURATION,
                  ease: "back.out(1.6)",
                },
                "<",
              );
            }
          }
        }

        tl.to(
          dot,
          {
            autoAlpha: 1,
            scale: 1,
            duration: TOOLTIP_DOT_DURATION,
            ease: "back.out(1.7)",
          },
          `>+${BEFORE_TOOLTIP_GAP}`,
        )
          .to(
            line,
            {
              scaleY: 1,
              duration: TOOLTIP_LINE_DURATION,
              ease: "power3.inOut",
            },
            ">",
          )
          .to(
            panel,
            {
              autoAlpha: 1,
              y: 0,
              duration: TOOLTIP_PANEL_DURATION,
              ease: "power3.out",
            },
            ">",
          );

        // Let the parent slider know how long this step’s animation takes
        // (so it can sync UI like the play/pause progress ring).
        const slideIdForStart = findActiveSlideId(root);
        if (slideIdForStart && typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent(ADV_SLIDER_STEP_ANIMATION_START_EVENT, {
              detail: {
                slideId: slideIdForStart,
                durationMs: Math.round(tl.duration() * 1000),
              },
            }),
          );
        }

        tl.eventCallback("onComplete", () => {
          const slideId = findActiveSlideId(root);
          if (!slideId || typeof window === "undefined") return;
          window.dispatchEvent(
            new CustomEvent(ADV_SLIDER_STEP_ANIMATION_COMPLETE_EVENT, {
              detail: { slideId },
            }),
          );
        });
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
      {...{ [ADV_SLIDER_TOOLTIP_ATTR]: "" }}
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
        className="flex w-full min-w-[800px] items-start gap-3 rounded-2xl px-4 py-3 text-left bg-[#EAEFF1]/20 p-5 ring-1 ring-[#fff] shadow-[inset_0_1px_20px_rgba(255,255,255,0.65)] backdrop-blur-md relative overflow-hidden opacity-0"
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
