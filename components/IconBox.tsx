"use client";

import React, { memo, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MouseEvent, ReactNode } from "react";

interface IconBoxProps {
  icon?: ReactNode;
  src?: string;
  width?: number;
  title?: string;
  titleClassName?: string;
  description?: ReactNode;
  className?: string;
  imageSize?: "small" | "medium" | "large";
  fullWidthImage?: boolean;
  iconSize?: number;
  align?: "center" | "left";
  hideIcon?: boolean;
  children?: ReactNode;
}

const IconBox = memo(function IconBox({
  icon,
  src = "/icons/gradient/arrows-gradient.svg",
  width = 48,
  title = "Lenders deal with 100+ manual touchpoints per loan",
  titleClassName = "",
  description,
  className = "",
  imageSize = "medium",
  fullWidthImage = false,
  iconSize = 48,
  align = "center",
  hideIcon = false,
  children,
}: IconBoxProps) {
  const baseGlowAngle = "45deg";
  const baseBorderOpacity = 0.28;
  const baseRingOpacity = 0.18;
  const baseBlurOpacity = 0.06;
  const lastGlowAngleRef = useRef(45);
  const rectRef = useRef<DOMRect | null>(null);

  const normalizeGlowAngle = useCallback((nextAngle: number) => {
    const previousAngle = lastGlowAngleRef.current;
    const delta = ((nextAngle - previousAngle + 540) % 360) - 180;
    const normalizedAngle = previousAngle + delta;
    lastGlowAngleRef.current = normalizedAngle;
    return normalizedAngle;
  }, []);

  const updateGlowPosition = useCallback((
    target: HTMLDivElement,
    clientX: number,
    clientY: number,
  ) => {
    if (!rectRef.current) rectRef.current = target.getBoundingClientRect();
    const rect = rectRef.current;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    const normalizedAngle = normalizeGlowAngle(angle);

    const distanceToEdge = Math.min(x, rect.width - x, y, rect.height - y);
    const maxDistance = Math.max(Math.min(rect.width, rect.height) / 2, 1);
    const edgeProximity = 1 - Math.min(Math.max(distanceToEdge / maxDistance, 0), 1);
    
    const borderOpacity = 0.74 + edgeProximity * 0.26;
    const ringGlowOpacity = 0.4 + edgeProximity * 0.5;
    const blurGlowOpacity = 0.12 + edgeProximity * 0.24;
    const outerGlowStrength = 0.08 + edgeProximity * 0.14;

    target.style.setProperty("--glow-angle", `${normalizedAngle.toFixed(2)}deg`);
    target.style.setProperty("--glow-border-opacity", String(borderOpacity));
    target.style.setProperty("--glow-ring-opacity", String(ringGlowOpacity));
    target.style.setProperty("--glow-blur-opacity", String(blurGlowOpacity));
    target.style.setProperty("--glow-border-alpha", String(0.22 + edgeProximity * 0.16));
    target.style.setProperty("--glow-outer-1-alpha", String(outerGlowStrength));
    target.style.setProperty("--glow-outer-2-alpha", String(outerGlowStrength * 0.65));
  }, [normalizeGlowAngle]);

  const handleMouseEnter = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const parent = target.parentElement;
    rectRef.current = target.getBoundingClientRect();
    updateGlowPosition(target, event.clientX, event.clientY);

    gsap.to(target, {
      scale: 1.2,
      force3D: true,
      "--glow-border-opacity": 1,
      "--glow-ring-opacity": 0.96,
      "--glow-blur-opacity": 0.3,
      duration: 0.25,
      ease: "power2.out",
    });

    if (parent) {
      gsap.to(parent, {
        zIndex: 10,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [updateGlowPosition]);

  const handleMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const parent = target.parentElement;

    gsap.to(target, {
      scale: 1,
      force3D: true,
      "--glow-border-opacity": baseBorderOpacity,
      "--glow-ring-opacity": baseRingOpacity,
      "--glow-blur-opacity": baseBlurOpacity,
      "--glow-border-alpha": 0.14,
      "--glow-outer-1-alpha": 0.03,
      "--glow-outer-2-alpha": 0.02,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        rectRef.current = null;
      }
    });

    if (parent) {
      gsap.to(parent, {
        zIndex: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [baseBorderOpacity, baseRingOpacity, baseBlurOpacity]);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    updateGlowPosition(event.currentTarget, event.clientX, event.clientY);
  }, [updateGlowPosition]);

  const sizeMap = useMemo(() => ({
    small: 32,
    medium: 48,
    large: 64,
  }), []);

  const finalWidth = useMemo(() => width !== 48 ? width : sizeMap[imageSize], [width, imageSize, sizeMap]);

  return (
    <div
      className={`relative flex flex-col ${align === "left" ? "items-start text-left" : "items-center text-center"} gap-1 p-7 rounded-2xl h-full bg-[#145060] overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        {
          "--glow-angle": baseGlowAngle,
          "--glow-border-opacity": baseBorderOpacity,
          "--glow-ring-opacity": baseRingOpacity,
          "--glow-blur-opacity": baseBlurOpacity,
          "--glow-border-alpha": 0.14,
          "--glow-outer-1-alpha": 0.03,
          "--glow-outer-2-alpha": 0.02,
          boxShadow:
            "0 0 0 1px rgba(88, 255, 252, var(--glow-border-alpha)), 0 0 14px rgba(88, 255, 252, var(--glow-outer-1-alpha)), 0 0 28px rgba(88, 255, 252, var(--glow-outer-2-alpha))",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
          WebkitFontSmoothing: "subpixel-antialiased",
        } as React.CSSProperties
      }
    >
      {/* Glow border overlays ... same logic as before but with CSS variables */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(88, 255, 252, 0) 0deg, rgba(88, 255, 252, 0) 278deg, rgba(88, 255, 252, 0.5) 300deg, rgba(88, 255, 252, 1) 329deg, rgba(210, 255, 255, 1) 343deg, rgba(88, 255, 252, 0.44) 356deg, rgba(88, 255, 252, 0) 360deg)",
          opacity: "var(--glow-border-opacity)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(88, 255, 252, 0) 0deg, rgba(88, 255, 252, 0) 274deg, rgba(88, 255, 252, 0.22) 300deg, rgba(88, 255, 252, 0.96) 330deg, rgba(160, 255, 255, 0.76) 346deg, rgba(88, 255, 252, 0) 360deg)",
          opacity: "var(--glow-blur-opacity)",
          filter: "blur(6px)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(88, 255, 252, 0) 0deg, rgba(88, 255, 252, 0) 284deg, rgba(88, 255, 252, 0.34) 306deg, rgba(210, 255, 255, 1) 330deg, rgba(88, 255, 252, 0.48) 350deg, rgba(88, 255, 252, 0) 360deg)",
          opacity: "var(--glow-ring-opacity)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "screen",
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -top-5 -right-5 w-[45%] h-[45%] rounded-full bg-white/10  blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[45%] h-[45%] rounded-full bg-white/10  blur-xl" />
      </div>

      <div
        className={`relative flex flex-col gap-1 ${
          fullWidthImage
            ? "w-full items-stretch"
            : align === "left"
              ? "items-start"
              : "items-center"
        }`}
      >
        {children ? (
          children
        ) : (
          <>
            {!hideIcon && icon ? (
              <div
                className={`mb-2 flex items-center ${align === "left" ? "justify-start" : "justify-center"} text-white`}
              >
                {React.isValidElement<{ size?: number }>(icon) &&
                icon.type !== "img"
                  ? React.cloneElement(icon, { size: iconSize })
                  : icon}
              </div>
            ) : (
              !hideIcon && (
                <Image
                  src={src}
                  alt={title}
                  width={fullWidthImage ? 1200 : finalWidth}
                  height={fullWidthImage ? 720 : finalWidth}
                  className={
                    fullWidthImage ? "mb-3 w-full h-auto rounded-lg" : "mb-2"
                  }
                />
              )
            )}
            <div
              className={`text-lg font-semibold leading-[1.3em] text-white ${titleClassName}`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {description && (
              <div className="text-md text-white/80 mt-2">{description}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default IconBox;
