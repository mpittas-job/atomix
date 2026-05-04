"use client";

import { useRef } from "react";
import IconBox from "@/components/IconBox";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";
import { Button as DefButton } from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

export default function MissionVisionV2() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !innerRef.current) return;

      const section = innerRef.current;
      const iconItems = section.querySelectorAll<HTMLElement>(
        "[data-mv2-icon-item]",
      );
      const buttonItem = section.querySelector<HTMLElement>(
        "[data-mv2-button-item]",
      );
      const cardStack = section.querySelector<HTMLElement>(
        "[data-mv2-card-stack]",
      );

      const syncCardStackHeight = () => {
        if (!cardStack || iconItems.length === 0) return 0;
        const maxHeight = Math.max(
          ...Array.from(iconItems).map(
            (item) => item.getBoundingClientRect().height,
          ),
        );
        gsap.set(cardStack, { height: maxHeight || "auto" });
        return maxHeight;
      };

      let lastStackHeight = syncCardStackHeight();

      gsap.set(iconItems[0], { autoAlpha: 0, scale: 0.94 });
      if (iconItems[1]) {
        gsap.set(iconItems[1], { autoAlpha: 0, scale: 0.94 });
      }
      if (buttonItem) {
        gsap.set(buttonItem, { autoAlpha: 0, scale: 0.92, y: 40 });
      }

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=110px",
          end: () => `+=${section.offsetHeight * 5}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (iconItems[0] && iconItems[1]) {
        master
          .to(iconItems[0], {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          })
          .to(iconItems[0], {
            autoAlpha: 0,
            scale: 0.96,
            duration: 1,
            ease: "power2.inOut",
          })
          .to(
            iconItems[1],
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            ">+=0.2",
          );
      }

      if (buttonItem) {
        master.to(buttonItem, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        });
      }

      let rafId = 0;
      let lastHeight = document.body.scrollHeight;
      const refreshST = () => {
        rafId = 0;
        const stackHeight = syncCardStackHeight();
        const h = document.body.scrollHeight;
        if (h === lastHeight && stackHeight === lastStackHeight) return;
        lastHeight = h;
        lastStackHeight = stackHeight;
        ScrollTrigger.refresh();
      };

      const resizeObserver = new ResizeObserver(() => {
        if (rafId) return;
        rafId = requestAnimationFrame(refreshST);
      });
      resizeObserver.observe(document.body);

      return () => {
        resizeObserver.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
        master.scrollTrigger?.kill();
        master.kill();
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
        <div className="relative w-full max-w-[860px] px-4 flex flex-col items-center">
          <div data-mv2-card-stack className="relative w-full">
            <div
              data-mv2-icon-item
              className="absolute left-0 top-1/2 w-full -translate-y-1/2 flex justify-center"
            >
              <IconBox
                icon={<BadgeHeadingPill color="dark">Mission</BadgeHeadingPill>}
                description=""
                title="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
                titleClassName="!text-2xl"
              />
            </div>
            <div
              data-mv2-icon-item
              className="absolute left-0 top-1/2 w-full -translate-y-1/2 flex justify-center"
            >
              <IconBox
                icon={<BadgeHeadingPill color="dark">Vision</BadgeHeadingPill>}
                description=""
                title="Interconnected marketplaces — borrowers, lenders, capital providers and investors, each connected within a single ecosystem. Distribution partners deploy their own discrete, white-labelled environments within the same infrastructure. Property lending reimagined — starting in the UK, built for global scale."
                titleClassName="!text-2xl"
              />
            </div>
          </div>
          <div data-mv2-button-item className="mt-6">
            <DefButton>Learn more</DefButton>
          </div>
        </div>
      </div>
    </div>
  );
}
