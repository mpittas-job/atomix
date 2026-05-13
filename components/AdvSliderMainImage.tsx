"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** GSAP entrance `duration` (seconds) for the hero image. */
export const ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION = 1.2;

/** Global delay before a step’s entrance animation starts (seconds). */
export const ADV_SLIDER_STEP_ENTER_DELAY = 0;

/**
 * Default delay before overlay entrance when both mount together (seconds).
 * Slightly before the hero finishes so the gap between hero and overlay feels tight.
 */
export const ADV_SLIDER_DEFAULT_OVERLAY_AFTER_MAIN_AT =
  ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION * 0.55;

/** Present on the hero wrapper so `AdvSliderTooltip` can wait for the underlying `<img>` load. */
export const ADV_SLIDER_MAIN_IMAGE_ATTR = "data-adv-slider-main-image";

const DEFAULT_IMG_CLASS =
  "block h-auto w-full max-w-none object-contain rounded-t-2xl";

function srcDependencyKey(src: ImageProps["src"]): string {
  if (typeof src === "string") return src;
  if (typeof src === "object" && src !== null) {
    if ("src" in src && typeof (src as { src: string }).src === "string") {
      return (src as { src: string }).src;
    }
    if ("default" in src) {
      const d = (src as { default: { src?: string } }).default;
      if (d && typeof d.src === "string") return d.src;
    }
  }
  return "";
}

export type AdvSliderMainImageProps = {
  src: ImageProps["src"];
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  priority?: boolean;
};

/**
 * Hero image for advanced-slider steps. Entrance animation is defined once here
 * so individual slide files stay declarative.
 */
export default function AdvSliderMainImage({
  src,
  alt,
  width = 1200,
  height = 600,
  className = DEFAULT_IMG_CLASS,
  quality = 100,
  priority = true,
}: AdvSliderMainImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const srcKey = srcDependencyKey(src);

  useGSAP(
    () => {
      const el = wrapRef.current;
      if (!el) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.killTweensOf(el);

      if (prefersReduced) {
        gsap.set(el, { autoAlpha: 1, scale: 1 });
        return;
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, scale: 0.96 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: ADV_SLIDER_MAIN_IMAGE_ENTER_DURATION,
          ease: "power2.out",
          delay: ADV_SLIDER_STEP_ENTER_DELAY,
        },
      );
    },
    { dependencies: [srcKey], scope: wrapRef, revertOnUpdate: true },
  );

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      {...{ [ADV_SLIDER_MAIN_IMAGE_ATTR]: "" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        quality={quality}
        priority={priority}
      />
    </div>
  );
}
