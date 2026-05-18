"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
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
import {
  ADV_SLIDER_TOOLTIP_ENTER_LAST,
  useAdvSliderTooltipNav,
  type AdvSliderTooltipNavigateOptions,
} from "@/components/advSliderTooltipNavContext";
import { ADV_SLIDER_TOOLTIP_ATTR } from "@/components/AdvSliderTooltip";

gsap.registerPlugin(useGSAP);

const HERO_OVERLAY_EXTRA_DELAY = 0.6;
const HERO_OVERLAY_FADE_DURATION = 0.8;
const HERO_OVERLAY_GAP = 0.55;

const OVERLAY_IMAGE_DURATION = 1.35;
const OVERLAY_IMAGE_GAP = 0.65;

const BEFORE_TOOLTIP_GAP = 0.75;
const BETWEEN_TOOLTIPS_GAP = 5;

const TOOLTIP_DOT_DURATION = 0.45;
const TOOLTIP_LINE_DURATION = 0.6;
const TOOLTIP_PANEL_DURATION = 0.6;
const TOOLTIP_EXIT_DURATION = 0.35;

export type AdvSliderTooltipSequenceIcon = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string }
>;

export type AdvSliderTooltipSequenceStep = {
  icon: AdvSliderTooltipSequenceIcon;
  title: ReactNode;
  lineHeight?: number;
  connectorLeft?: string;
  iconColor?: string;
};

export type AdvSliderTooltipSequenceProps = {
  steps: AdvSliderTooltipSequenceStep[];
  className?: string;
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

function dispatchStepStart(slideId: string, durationMs: number) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(ADV_SLIDER_STEP_ANIMATION_START_EVENT, {
      detail: { slideId, durationMs },
    }),
  );
}

function dispatchStepComplete(slideId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(ADV_SLIDER_STEP_ANIMATION_COMPLETE_EVENT, {
      detail: { slideId },
    }),
  );
}

type StepElements = {
  dot: HTMLSpanElement;
  line: HTMLDivElement;
  panel: HTMLDivElement;
};

function appendSceneIntro(
  tl: gsap.core.Timeline,
  heroOverlays: HTMLElement[],
  overlayImages: HTMLElement[],
) {
  if (heroOverlays.length) {
    for (const [idx, el] of heroOverlays.entries()) {
      const position =
        idx === 0
          ? ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION + HERO_OVERLAY_EXTRA_DELAY
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
          : ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION + HERO_OVERLAY_EXTRA_DELAY;
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
}

function appendTooltipIntro(
  tl: gsap.core.Timeline,
  { dot, line, panel }: StepElements,
  position: string | number,
) {
  tl.to(
    dot,
    {
      autoAlpha: 1,
      scale: 1,
      duration: TOOLTIP_DOT_DURATION,
      ease: "back.out(1.7)",
    },
    position,
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
}

function appendTooltipOut(
  tl: gsap.core.Timeline,
  { dot, line, panel }: StepElements,
) {
  tl.to(
    [dot, line, panel],
    {
      autoAlpha: 0,
      duration: TOOLTIP_EXIT_DURATION,
      ease: "power2.in",
    },
    `>+${BETWEEN_TOOLTIPS_GAP}`,
  );
  tl.set(dot, { scale: 0 }, ">");
  tl.set(line, { scaleY: 0, transformOrigin: "top center" }, "<");
  tl.set(panel, { y: 10 }, "<");
}

export default function AdvSliderTooltipSequence({
  steps,
  className = "",
}: AdvSliderTooltipSequenceProps) {
  const {
    pendingEnterTooltipIndex,
    registerSlideApi,
    setActiveTooltipIndex,
    setPendingEnterTooltipIndex,
  } = useAdvSliderTooltipNav();
  const rootRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(StepElements | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pendingEnterTooltipIndexRef = useRef(pendingEnterTooltipIndex);

  useEffect(() => {
    pendingEnterTooltipIndexRef.current = pendingEnterTooltipIndex;
  }, [pendingEnterTooltipIndex]);

  const getSceneElements = useCallback(() => {
    const root = rootRef.current;
    const slideRoot = root ? findSlideRoot(root) : null;
    const heroOverlays = slideRoot
      ? Array.from(slideRoot.querySelectorAll<HTMLElement>(".main-img-overlay"))
      : [];
    const overlayImages = slideRoot
      ? Array.from(
          slideRoot.querySelectorAll<HTMLElement>(
            `[${ADV_SLIDER_OVERLAY_IMAGE_ATTR}]`,
          ),
        )
      : [];

    return { heroOverlays, overlayImages };
  }, []);

  const showSceneInstant = useCallback(() => {
    const { heroOverlays, overlayImages } = getSceneElements();
    if (heroOverlays.length) gsap.set(heroOverlays, { autoAlpha: 1 });
    if (overlayImages.length) {
      gsap.set(overlayImages, { autoAlpha: 1 });
      for (const el of overlayImages) {
        const img = el.querySelector("img");
        if (img) gsap.set(img, { scale: 1 });
      }
    }
  }, [getSceneElements]);

  const hideAllTooltips = useCallback((stepEls: StepElements[]) => {
    for (const s of stepEls) {
      gsap.set(s.dot, { autoAlpha: 0, scale: 0 });
      gsap.set(s.line, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(s.panel, { autoAlpha: 0, y: 10 });
    }
  }, []);

  const navigateTo = useCallback(
    (index: number, options?: AdvSliderTooltipNavigateOptions) => {
      const root = rootRef.current;
      if (!root || steps.length === 0) return;

      const stepEls = stepRefs.current.filter(
        (s): s is StepElements => s != null,
      );
      if (stepEls.length !== steps.length) return;

      const clampedIndex = Math.max(0, Math.min(steps.length - 1, index));
      const slideId = findActiveSlideId(root);
      const { heroOverlays, overlayImages } = getSceneElements();
      const allTargets = [
        ...stepEls.flatMap((s) => [s.dot, s.line, s.panel]),
        ...heroOverlays,
        ...overlayImages,
      ];

      timelineRef.current?.kill();
      gsap.killTweensOf(allTargets);

      if (options?.skipSceneIntro) {
        showSceneInstant();
      } else {
        if (heroOverlays.length) gsap.set(heroOverlays, { autoAlpha: 0 });
        if (overlayImages.length) {
          gsap.set(overlayImages, { autoAlpha: 0 });
          for (const el of overlayImages) {
            const img = el.querySelector("img");
            if (img) {
              gsap.set(img, { scale: 0.92, transformOrigin: "50% 50%" });
            }
          }
        }
      }

      hideAllTooltips(stepEls);
      setActiveTooltipIndex(clampedIndex);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      timelineRef.current = tl;

      if (!options?.skipSceneIntro) {
        appendSceneIntro(tl, heroOverlays, overlayImages);
      }
      appendTooltipIntro(
        tl,
        stepEls[clampedIndex]!,
        options?.skipSceneIntro ? 0 : `>+${BEFORE_TOOLTIP_GAP}`,
      );

      if (slideId) {
        dispatchStepStart(slideId, Math.round(tl.duration() * 1000));
      }

      tl.eventCallback("onComplete", () => {
        if (slideId) dispatchStepComplete(slideId);
      });
    },
    [
      getSceneElements,
      hideAllTooltips,
      setActiveTooltipIndex,
      showSceneInstant,
      steps.length,
    ],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const slideId = findActiveSlideId(root);
    if (!slideId) return;

    return registerSlideApi(slideId, {
      count: steps.length,
      navigateTo,
    });
  }, [navigateTo, registerSlideApi, steps.length]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || steps.length === 0) return;

      const stepEls = stepRefs.current.filter(
        (s): s is StepElements => s != null,
      );
      if (stepEls.length !== steps.length) return;

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

      const allTargets = [
        ...stepEls.flatMap((s) => [s.dot, s.line, s.panel]),
        ...heroOverlays,
        ...overlayImages,
      ];

      timelineRef.current?.kill();
      gsap.killTweensOf(allTargets);

      if (prefersReduced) {
        if (heroOverlays.length) gsap.set(heroOverlays, { autoAlpha: 1 });
        if (overlayImages.length) {
          gsap.set(overlayImages, { autoAlpha: 1 });
          for (const el of overlayImages) {
            const img = el.querySelector("img");
            if (img) gsap.set(img, { scale: 1 });
          }
        }
        for (const s of stepEls) {
          gsap.set(s.dot, { autoAlpha: 1, scale: 1 });
          gsap.set(s.line, { scaleY: 1, transformOrigin: "top center" });
          gsap.set(s.panel, { autoAlpha: 1, y: 0 });
        }
        return;
      }

      const runIntro = () => {
        gsap.killTweensOf(allTargets);

        if (heroOverlays.length) gsap.set(heroOverlays, { autoAlpha: 0 });
        if (overlayImages.length) {
          gsap.set(overlayImages, { autoAlpha: 0 });
          for (const el of overlayImages) {
            const img = el.querySelector("img");
            if (img) gsap.set(img, { scale: 0.92, transformOrigin: "50% 50%" });
          }
        }

        for (const s of stepEls) {
          gsap.set(s.dot, { autoAlpha: 0, scale: 0 });
          gsap.set(s.line, { scaleY: 0, transformOrigin: "top center" });
          gsap.set(s.panel, { autoAlpha: 0, y: 10 });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        timelineRef.current = tl;

        appendSceneIntro(tl, heroOverlays, overlayImages);

        const pendingIndex = pendingEnterTooltipIndexRef.current;
        const startAtLastTooltip =
          pendingIndex === ADV_SLIDER_TOOLTIP_ENTER_LAST;
        const initialTooltipIndex = startAtLastTooltip ? stepEls.length - 1 : 0;

        setActiveTooltipIndex(initialTooltipIndex);
        if (pendingIndex != null) {
          setPendingEnterTooltipIndex(null);
        }

        appendTooltipIntro(
          tl,
          stepEls[initialTooltipIndex]!,
          `>+${BEFORE_TOOLTIP_GAP}`,
        );

        if (!startAtLastTooltip) {
          for (let i = 1; i < stepEls.length; i++) {
            appendTooltipOut(tl, stepEls[i - 1]!);
            tl.call(() => setActiveTooltipIndex(i), undefined, ">");
            appendTooltipIntro(tl, stepEls[i]!, ">");
          }
        }

        const slideIdForStart = findActiveSlideId(root);
        if (slideIdForStart) {
          dispatchStepStart(slideIdForStart, Math.round(tl.duration() * 1000));
        }

        tl.eventCallback("onComplete", () => {
          const slideId = findActiveSlideId(root);
          if (!slideId) return;
          dispatchStepComplete(slideId);
        });
      };

      const img = findHeroImg(root);
      if (!img || img.complete) {
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
    { dependencies: [steps], scope: rootRef, revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      className={`absolute top-[calc(100%+20px)] left-[50%] translate-x-[-50%] w-full ${className}`}
      {...{ [ADV_SLIDER_TOOLTIP_ATTR]: "" }}
    >
      {steps.map((step, index) => {
        const Icon = step.icon;
        const lineHeight = step.lineHeight ?? 48;
        const iconColor = step.iconColor ?? "#499DB8";

        return (
          <div
            key={index}
            className={
              index === 0
                ? "relative flex w-full flex-col"
                : "pointer-events-none absolute inset-x-0 top-0 flex flex-col"
            }
            aria-hidden={index > 0 ? true : undefined}
          >
            <div
              className={
                step.connectorLeft != null
                  ? "absolute bottom-full flex flex-col items-center translate-x-[-50%]"
                  : "absolute left-[50%] translate-x-[-50%] bottom-full flex flex-col items-center"
              }
              style={
                step.connectorLeft != null
                  ? { left: step.connectorLeft }
                  : undefined
              }
              aria-hidden
            >
              <span
                ref={(el) => {
                  if (!el) return;
                  if (!stepRefs.current[index]) {
                    stepRefs.current[index] = {
                      dot: null!,
                      line: null!,
                      panel: null!,
                    };
                  }
                  stepRefs.current[index]!.dot = el;
                }}
                className="size-2 shrink-0 rounded-full bg-[#6CAFC5] relative -left-[1px] opacity-0"
              />
              <div
                className="shrink-0 self-center overflow-hidden"
                style={{ height: lineHeight }}
              >
                <div
                  ref={(el) => {
                    if (!el) return;
                    if (!stepRefs.current[index]) {
                      stepRefs.current[index] = {
                        dot: null!,
                        line: null!,
                        panel: null!,
                      };
                    }
                    stepRefs.current[index]!.line = el;
                  }}
                  className="w-0 shrink-0 border-l border-dashed border-[#6CAFC5]"
                  style={{ height: lineHeight }}
                />
              </div>
            </div>
            <div
              ref={(el) => {
                if (!el) return;
                if (!stepRefs.current[index]) {
                  stepRefs.current[index] = {
                    dot: null!,
                    line: null!,
                    panel: null!,
                  };
                }
                stepRefs.current[index]!.panel = el;
              }}
              className="flex w-full min-w-[800px] items-start gap-3 rounded-2xl px-4 py-3 text-left bg-[#EAEFF1]/20 p-5 ring-1 ring-[#fff] shadow-[inset_0_1px_20px_rgba(255,255,255,0.65)] backdrop-blur-md relative overflow-hidden opacity-0"
            >
              <Icon
                className="mt-0.5 size-5 shrink-0 relative z-1"
                style={{ color: iconColor }}
                aria-hidden
              />
              <p className="m-0 min-w-0 text-md font-medium text-[#011F27] relative z-1">
                {step.title}
              </p>

              <div className="pointer-events-none absolute inset-0 rounded-3xl">
                <div className="absolute -top-5 -right-5 w-[35%] h-[35%] rounded-2xl bg-white/100 blur-xl" />
                <div className="absolute -bottom-5 -left-5 w-[35%] h-[35%] rounded-2xl bg-white/100 blur-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
