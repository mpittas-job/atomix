"use client";

import React, { type ReactNode, useId, isValidElement, cloneElement, useRef, memo, useCallback, useMemo } from "react";
import { MouseEvent } from "react";
import gsap from "gsap";
import { FaShieldHalved } from "react-icons/fa6";

interface IconBoxLightProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

const IconBoxLight = memo(function IconBoxLight({
  icon,
  title,
  description,
  className = "",
  children,
}: IconBoxLightProps) {
  const gradientId = useId().replace(/:/g, "");
  const gradientUrl = useMemo(() => `url(#${gradientId})`, [gradientId]);

  const baseGlowAngle = "45deg";
  const baseBorderOpacity = 0;
  const baseRingOpacity = 0;
  const baseBlurOpacity = 0;
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
      scale: 1.02,
      force3D: true,
      "--glow-border-opacity": 1,
      "--glow-ring-opacity": 0.96,
      "--glow-blur-opacity": 0.3,
      duration: 0.25,
      ease: "power2.out",
    });
    if (parent) gsap.to(parent, { zIndex: 10, duration: 0.25, ease: "power2.out" });
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
      "--glow-border-alpha": 0,
      "--glow-outer-1-alpha": 0,
      "--glow-outer-2-alpha": 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        rectRef.current = null;
      }
    });
    if (parent) gsap.to(parent, { zIndex: 1, duration: 0.3, ease: "power2.out" });
  }, [baseBorderOpacity, baseRingOpacity, baseBlurOpacity]);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    updateGlowPosition(event.currentTarget, event.clientX, event.clientY);
  }, [updateGlowPosition]);

  const renderIcon = useCallback(() => {
    if (icon && isValidElement(icon)) {
      const el = icon as React.ReactElement<{
        style?: React.CSSProperties;
        className?: string;
      }>;
      return cloneElement(el, {
        className: el.props.className || "",
        style: { ...el.props.style, fill: gradientUrl },
      });
    }
    return <FaShieldHalved className="h-7 w-7" style={{ fill: gradientUrl }} />;
  }, [icon, gradientUrl]);

  return (
    <div
      className={`group relative rounded-3xl bg-white/40 backdrop-blur-md p-6 overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        "--glow-angle": baseGlowAngle,
        "--glow-border-opacity": baseBorderOpacity,
        "--glow-ring-opacity": baseRingOpacity,
        "--glow-blur-opacity": baseBlurOpacity,
        "--glow-border-alpha": 0,
        "--glow-outer-1-alpha": 0,
        "--glow-outer-2-alpha": 0,
        boxShadow:
          "inset 0 1px 2px rgba(255,255,255,0.6), inset 5px 5px 20px rgba(10,21,44,0.06), 0 0 0 1px rgba(6, 147, 185, var(--glow-border-alpha)), 0 0 14px rgba(6, 147, 185, var(--glow-outer-1-alpha)), 0 0 28px rgba(6, 147, 185, var(--glow-outer-2-alpha))",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
        WebkitFontSmoothing: "subpixel-antialiased",
      } as React.CSSProperties}
    >
      {/* Conic glow border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(6, 147, 185, 0) 0deg, rgba(6, 147, 185, 0) 278deg, rgba(6, 147, 185, 0.5) 300deg, rgba(6, 147, 185, 1) 329deg, rgba(57, 198, 237, 1) 343deg, rgba(6, 147, 185, 0.44) 356deg, rgba(6, 147, 185, 0) 360deg)",
          opacity: "var(--glow-border-opacity)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Blurred glow ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(6, 147, 185, 0) 0deg, rgba(6, 147, 185, 0) 274deg, rgba(6, 147, 185, 0.22) 300deg, rgba(6, 147, 185, 0.96) 330deg, rgba(57, 198, 237, 0.76) 346deg, rgba(6, 147, 185, 0) 360deg)",
          opacity: "var(--glow-blur-opacity)",
          filter: "blur(6px)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "multiply",
        }}
      />
      {/* Sharp inner ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(6, 147, 185, 0) 0deg, rgba(6, 147, 185, 0) 284deg, rgba(6, 147, 185, 0.34) 306deg, rgba(57, 198, 237, 1) 330deg, rgba(6, 147, 185, 0.48) 350deg, rgba(6, 147, 185, 0) 360deg)",
          opacity: "var(--glow-ring-opacity)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "multiply",
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute -top-5 -right-5 w-[35%] h-[35%] rounded-full bg-white/60 blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[35%] h-[35%] rounded-full bg-white/60 blur-xl" />
      </div>

      <div className="relative flex flex-col gap-3 items-start text-left h-full">
        {/* Gradient definition */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0693B9" />
              <stop offset="100%" stopColor="#39C6ED" />
            </linearGradient>
          </defs>
        </svg>

        {children ? (
          children
        ) : (
          <>
            {/* Icon badge */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D8E9EE]">
              {renderIcon()}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold leading-6 text-[#011F27]">
              {title}
            </h3>

            {/* Description */}
            <p className="text-md leading-relaxed text-[#4B6066]">
              {description}
            </p>
          </>
        )}
      </div>
    </div>
  );
});

export default IconBoxLight;
