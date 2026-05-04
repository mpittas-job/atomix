"use client";

import { forwardRef, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button as DefButton } from "@/components/ui";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

const MISSION_VISION_SCROLL_DISTANCE_MULTIPLIER = 1.4;

function renderTypewriterTitle(title: string) {
  const lines = ["Our", title];
  return lines.map((line, lineIdx) => (
    <span key={lineIdx} className="block leading-[1.05]">
      {Array.from(line).map((ch, i) => (
        <span
          key={`${lineIdx}-${i}`}
          data-mv-type-char
          className="inline-block opacity-0"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  ));
}

interface MissionVisionBlockProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const MissionVisionBlock = forwardRef<HTMLDivElement, MissionVisionBlockProps>(
  function MissionVisionBlock(
    { title, description, buttonText, buttonLink },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-mv-block
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-start gap-y-8 w-xl"
      >
        <h2
          data-mv-title
          className="text-[80px] font-normal font-bold uppercase leading-[1.05em]"
        >
          {renderTypewriterTitle(title)}
        </h2>
        <div data-mv-item className="w-full h-[1px] bg-white/16"></div>
        <div data-mv-item className="text-xl">
          {description}
        </div>
        <div data-mv-item>
          <DefButton href={buttonLink}>{buttonText}</DefButton>
        </div>
      </div>
    );
  },
);

export default function MainMissionVision() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useGSAP(
    () => {
      if (
        !wrapperRef.current ||
        !innerRef.current ||
        !missionRef.current ||
        !visionRef.current
      )
        return;

      const missionEl = missionRef.current;
      const visionEl = visionRef.current;
      const blocks = [missionEl, visionEl];
      const section = innerRef.current;

      // Initial hidden state for both blocks
      blocks.forEach((block) => {
        const typeChars = block.querySelectorAll<HTMLElement>(
          "[data-mv-type-char]",
        );
        const items = block.querySelectorAll<HTMLElement>("[data-mv-item]");
        gsap.set(block, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(typeChars, {
          opacity: 0,
        });
        gsap.set(items, { y: 40, opacity: 0 });
      });

      const animateBlockIn = (block: HTMLElement) => {
        const typeChars = block.querySelectorAll<HTMLElement>(
          "[data-mv-type-char]",
        );
        const items = block.querySelectorAll<HTMLElement>("[data-mv-item]");
        const tl = gsap.timeline();
        tl.set(block, { autoAlpha: 1, pointerEvents: "auto" });
        tl.to(typeChars, {
          opacity: 1,
          duration: 0.04,
          ease: "none",
          stagger: 0.075,
        });
        tl.to(
          items,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.18,
          },
          "-=0.15",
        );
        return tl;
      };

      const animateBlockOut = (block: HTMLElement) => {
        const typeChars = block.querySelectorAll<HTMLElement>(
          "[data-mv-type-char]",
        );
        const items = block.querySelectorAll<HTMLElement>("[data-mv-item]");
        const tl = gsap.timeline();
        tl.to(items, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.05,
        });
        tl.to(
          typeChars,
          {
            opacity: 0,
            duration: 0.03,
            ease: "none",
            stagger: { each: 0.018, from: "end" },
          },
          "-=0.2",
        );
        tl.set(block, { autoAlpha: 0, pointerEvents: "none" });
        return tl;
      };

      animateBlockIn(missionEl);

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=110px",
          end: () =>
            `+=${section.offsetHeight * MISSION_VISION_SCROLL_DISTANCE_MULTIPLIER}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      pinTimeline.to({}, { duration: 1, ease: "none" });

      let rafId = 0;
      let lastHeight = document.body.scrollHeight;
      const refreshST = () => {
        rafId = 0;
        const h = document.body.scrollHeight;
        if (h === lastHeight) return;
        lastHeight = h;
        ScrollTrigger.refresh();
      };
      const resizeObserver = new ResizeObserver(() => {
        if (rafId) return;
        rafId = requestAnimationFrame(refreshST);
      });
      resizeObserver.observe(document.body);

      const host = section;
      const onWheel = (event: WheelEvent) => {
        if (!pinTimeline.scrollTrigger?.isActive) return;
        if (isAnimatingRef.current) return;

        const direction = Math.sign(event.deltaY);
        if (direction === 0) return;

        if (direction > 0 && activeIndexRef.current === 0) {
          event.preventDefault();
          isAnimatingRef.current = true;
          gsap
            .timeline({
              onComplete: () => {
                activeIndexRef.current = 1;
                isAnimatingRef.current = false;
              },
            })
            .add(animateBlockOut(missionEl), 0)
            .add(animateBlockIn(visionEl), "+=0.06");
        }

        if (direction < 0 && activeIndexRef.current === 1) {
          event.preventDefault();
          isAnimatingRef.current = true;
          gsap
            .timeline({
              onComplete: () => {
                activeIndexRef.current = 0;
                isAnimatingRef.current = false;
              },
            })
            .add(animateBlockOut(visionEl), 0)
            .add(animateBlockIn(missionEl), "+=0.06");
        }
      };

      host.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        host.removeEventListener("wheel", onWheel);
        resizeObserver.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
        pinTimeline.scrollTrigger?.kill();
        pinTimeline.kill();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef}>
      <div
        ref={innerRef}
        className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center"
      >
        <div className="absolute top-0 left-0 w-full h-[500px]">
          <SoftAurora
            speed={1.3}
            scale={1.2}
            brightness={0.65}
            color1="#78cfe3"
            color2="#87b9d4"
            noiseFrequency={1}
            noiseAmplitude={3.5}
            bandHeight={0.85}
            bandSpread={1}
            octaveDecay={0.12}
            layerOffset={0.5}
            colorSpeed={1}
            enableMouseInteraction={false}
            mouseInfluence={0.2}
          />
        </div>

        <div className="relative w-full h-[calc(100vh-126px)]">
          <MissionVisionBlock
            ref={missionRef}
            title="Mission"
            description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
            buttonText="Learn More"
            buttonLink="#"
          />

          <MissionVisionBlock
            ref={visionRef}
            title="Vision"
            description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
            buttonText="Learn More"
            buttonLink="#"
          />
        </div>
      </div>
    </div>
  );
}
