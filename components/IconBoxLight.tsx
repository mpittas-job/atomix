"use client";

import React, { type ReactNode, useId, isValidElement, cloneElement, useRef, memo, useCallback, useMemo, useEffect } from "react";
import { MouseEvent } from "react";
import gsap from "gsap";
import { FaShieldHalved } from "react-icons/fa6";

interface IconBoxLightProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  titleMaxWidth?: string;
  className?: string;
  children?: ReactNode;
}

const IconBoxLight = memo(function IconBoxLight({
  icon,
  title,
  description,
  titleMaxWidth,
  className = "",
  children,
}: IconBoxLightProps) {
  const gradientId = useId().replace(/:/g, "");
  const gradientUrl = useMemo(() => `url(#${gradientId})`, [gradientId]);

  const baseGlowAngle = "45deg";
  const lastGlowAngleRef = useRef(45);
  const rectRef = useRef<DOMRect | null>(null);

  // Performance Optimization Refs
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const hasMovedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    
    target.style.setProperty("--glow-angle", `${normalizedAngle.toFixed(2)}deg`);
    target.style.setProperty("--glow-border-opacity", String(borderOpacity));
    target.style.setProperty("--glow-ring-opacity", String(ringGlowOpacity));
    target.style.setProperty("--glow-blur-opacity", String(blurGlowOpacity));
    target.style.setProperty("--glow-edge-proximity", String(edgeProximity));
  }, [normalizeGlowAngle]);

  const tickGlow = useCallback(() => {
    if (!containerRef.current) {
      rafIdRef.current = null;
      return;
    }
    
    if (hasMovedRef.current) {
      updateGlowPosition(
        containerRef.current,
        mousePosRef.current.x,
        mousePosRef.current.y
      );
      hasMovedRef.current = false;
    }
    
    if (isHoveringRef.current) {
      rafIdRef.current = requestAnimationFrame(tickGlow);
    } else {
      rafIdRef.current = null;
    }
  }, [updateGlowPosition]);

  const handleMouseEnter = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const parent = target.parentElement;
    
    isHoveringRef.current = true;
    rectRef.current = target.getBoundingClientRect();
    
    mousePosRef.current.x = event.clientX;
    mousePosRef.current.y = event.clientY;
    hasMovedRef.current = true;
    
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(tickGlow);
    }
    
    if (parent) {
      parent.style.zIndex = "10";
    }
    
    gsap.killTweensOf(target);
    gsap.to(target, {
      scale: 1.02,
      force3D: true,
      "--hover-progress": 1,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [tickGlow]);

  const handleMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const parent = target.parentElement;
    
    isHoveringRef.current = false;
    
    gsap.killTweensOf(target);
    gsap.to(target, {
      scale: 1,
      force3D: true,
      "--hover-progress": 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        rectRef.current = null;
        if (parent) {
          parent.style.zIndex = "";
        }
      }
    });
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    mousePosRef.current.x = event.clientX;
    mousePosRef.current.y = event.clientY;
    hasMovedRef.current = true;
    
    if (isHoveringRef.current && rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(tickGlow);
    }
  }, [tickGlow]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

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
      ref={containerRef}
      className={`group relative rounded-3xl bg-white/40 backdrop-blur-md p-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        "--glow-angle": baseGlowAngle,
        "--glow-border-opacity": "0",
        "--glow-ring-opacity": "0",
        "--glow-blur-opacity": "0",
        "--glow-edge-proximity": "0",
        "--hover-progress": "0",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.6), inset 5px 5px 20px rgba(10,21,44,0.06)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitFontSmoothing: "subpixel-antialiased",
      } as React.CSSProperties}
    >
      {/* Base static shadow (opacity bound to hover progress) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          boxShadow: "0 0 0 1px rgba(6, 147, 185, 0.22), 0 0 14px rgba(6, 147, 185, 0.08), 0 0 28px rgba(6, 147, 185, 0.052)",
          opacity: "var(--hover-progress)",
          willChange: "opacity",
        }}
      />
      {/* Dynamic extra shadow (opacity bound to edge proximity) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          boxShadow: "0 0 0 1px rgba(6, 147, 185, 0.16), 0 0 14px rgba(6, 147, 185, 0.14), 0 0 28px rgba(6, 147, 185, 0.091)",
          opacity: "calc(var(--glow-edge-proximity) * var(--hover-progress))",
          willChange: "opacity",
        }}
      />

      {/* Conic glow border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-px overflow-hidden"
        style={{
          opacity: "calc(var(--glow-border-opacity) * var(--hover-progress))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          willChange: "opacity",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[250%]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(6, 147, 185, 0) 0deg, rgba(6, 147, 185, 0) 278deg, rgba(6, 147, 185, 0.5) 300deg, rgba(6, 147, 185, 1) 329deg, rgba(57, 198, 237, 1) 343deg, rgba(6, 147, 185, 0.44) 356deg, rgba(6, 147, 185, 0) 360deg)",
            transform: "translate(-50%, -50%) rotate(var(--glow-angle))",
            willChange: "transform",
          }}
        />
      </div>
      {/* Blurred glow ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-px overflow-hidden"
        style={{
          opacity: "calc(var(--glow-blur-opacity) * var(--hover-progress))",
          filter: "blur(6px)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "multiply",
          willChange: "opacity",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[250%]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(6, 147, 185, 0) 0deg, rgba(6, 147, 185, 0) 274deg, rgba(6, 147, 185, 0.22) 300deg, rgba(6, 147, 185, 0.96) 330deg, rgba(57, 198, 237, 0.76) 346deg, rgba(6, 147, 185, 0) 360deg)",
            transform: "translate(-50%, -50%) rotate(var(--glow-angle))",
            willChange: "transform",
          }}
        />
      </div>
      {/* Sharp inner ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-px overflow-hidden"
        style={{
          opacity: "calc(var(--glow-ring-opacity) * var(--hover-progress))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "multiply",
          willChange: "opacity",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[250%]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(6, 147, 185, 0) 0deg, rgba(6, 147, 185, 0) 284deg, rgba(6, 147, 185, 0.34) 306deg, rgba(57, 198, 237, 1) 330deg, rgba(6, 147, 185, 0.48) 350deg, rgba(6, 147, 185, 0) 360deg)",
            transform: "translate(-50%, -50%) rotate(var(--glow-angle))",
            willChange: "transform",
          }}
        />
      </div>
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
            <h3
              className="text-lg font-semibold leading-6 text-[#011F27]"
              style={titleMaxWidth ? { maxWidth: titleMaxWidth } : undefined}
            >
              {title}
            </h3>

            {description ? (
              <p className="text-md leading-relaxed text-[#4B6066]">
                {description}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
});

export default IconBoxLight;
