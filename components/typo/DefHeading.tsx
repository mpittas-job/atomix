"use client";

import React, { useRef } from "react";
import { BadgeHeadingPill } from "../ui/BadgeHeadingPill";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText, { SplitTextHandle } from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export interface DefHeadingProps {
  badgeText: string;
  badgeColor?: "dark";
  title: string;
  description: React.ReactNode;
  className?: string;
  badgeClassName?: string;
  theme?: "dark" | "light";
  showBadge?: boolean;
  align?: "center" | "left";
  onAnimationComplete?: () => void;
}

const DefHeading: React.FC<DefHeadingProps> = ({
  badgeText,
  badgeColor = "dark",
  title,
  description,
  className = "",
  badgeClassName = "",
  theme = "dark",
  showBadge = true,
  align = "center",
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<SplitTextHandle>(null);

  const titleColor = theme === "dark" ? "text-[#212329]" : "text-white";
  const descriptionColor =
    theme === "dark" ? "text-[#474D5D]" : "text-white/80";

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (showBadge && badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: 20 });
      }
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 20 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        onComplete: () => {
          onAnimationComplete?.();
        },
      });

      if (showBadge && badgeRef.current) {
        tl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }

      tl.add(
        () => {
          splitTextRef.current?.play();
        },
        showBadge ? "+=0.4" : 0,
      );

      if (descRef.current) {
        tl.to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "+=0.6",
        );
      }
    },
    { scope: containerRef },
  );

  const alignmentClasses =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-y-6 max-w-6xl mx-auto ${alignmentClasses} ${className}`}
    >
      {showBadge && (
        <div ref={badgeRef} data-badge>
          <BadgeHeadingPill color={badgeColor} className={badgeClassName}>
            {badgeText}
          </BadgeHeadingPill>
        </div>
      )}

      <SplitText
        ref={splitTextRef}
        startPaused
        text={title}
        tag="h2"
        className={`text-5xl leading-[1.2em] font-semibold ${titleColor}`}
        duration={0.8}
        textAlign={align}
        onLetterAnimationComplete={undefined}
      />

      <div
        ref={descRef}
        data-description
        className={`${descriptionColor} text-lg`}
      >
        {description}
      </div>
    </div>
  );
};

export default DefHeading;
