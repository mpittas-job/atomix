"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ADV_SLIDER_DEFAULT_OVERLAY_AFTER_MAIN_AT } from "@/components/AdvSliderMainImage";

gsap.registerPlugin(useGSAP);

const DEFAULT_BLUR_BACKDROP =
  "pointer-events-none absolute -inset-2.5 rounded-3xl bg-white/20 backdrop-blur-md";

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

export type AdvSliderOverlayImageProps = {
  src: ImageProps["src"];
  alt: string;
  width: number;
  height: number;
  /** Root wrapper (positioning, opacity, etc.). */
  className?: string;
  /**
   * Full class string for the frosted panel behind the image.
   * Omit to use the default white blur pill.
   */
  blurBackdropClassName?: string;
  /** Passed to Next/Image `className` (max-width, border, rounding, etc.). */
  imageClassName: string;
  quality?: number;
  priority?: boolean;
  /**
   * Extra delay after `afterMainDuration` (seconds).
   * Use for a second/third overlay on the same slide (stagger).
   */
  enterDelay?: number;
  /**
   * Seconds to wait before the overlay tween starts (default overlaps the tail of the hero).
   * Set to `0` if there is no `AdvSliderMainImage` or overlays should run in parallel.
   */
  afterMainDuration?: number;
};

/**
 * Blurred backdrop + overlay screenshot/card for advanced-slider steps.
 * Does not replace `main-img-overlay` hero layers — use only for inset overlay images.
 */
export default function AdvSliderOverlayImage({
  src,
  alt,
  width,
  height,
  className,
  blurBackdropClassName = DEFAULT_BLUR_BACKDROP,
  imageClassName,
  quality = 100,
  priority = true,
  enterDelay = 0,
  afterMainDuration = ADV_SLIDER_DEFAULT_OVERLAY_AFTER_MAIN_AT,
}: AdvSliderOverlayImageProps) {
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
        gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      const delay = afterMainDuration + enterDelay;

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 14, scale: 0.99 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          delay,
        },
      );
    },
    {
      dependencies: [srcKey, enterDelay, afterMainDuration],
      scope: wrapRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={wrapRef} className={className}>
      <div className={blurBackdropClassName} aria-hidden />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClassName}
        quality={quality}
        priority={priority}
      />
    </div>
  );
}
