"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

export default function MissionVisionV3() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !innerRef.current) return;

      const section = innerRef.current;
      const missionGlow = section.querySelector<HTMLElement>(
        "[data-mv3-mission-glow]",
      );
      const missionContent = section.querySelector<HTMLElement>(
        "[data-mv3-mission-content]",
      );
      const missionItems = section.querySelectorAll<HTMLElement>(
        "[data-mv3-mission-item]",
      );

      const visionGlow = section.querySelector<HTMLElement>(
        "[data-mv3-vision-glow]",
      );
      const visionContent = section.querySelector<HTMLElement>(
        "[data-mv3-vision-content]",
      );
      const visionItems = section.querySelectorAll<HTMLElement>(
        "[data-mv3-vision-item]",
      );

      if (missionGlow) {
        gsap.set(missionGlow, { autoAlpha: 0, x: -80, scale: 0.96 });
      }
      if (missionContent) {
        gsap.set(missionContent, { autoAlpha: 0, y: 28 });
      }
      gsap.set(missionItems, { autoAlpha: 0, y: 30 });

      if (visionGlow) {
        gsap.set(visionGlow, { autoAlpha: 0, x: 80, scale: 0.96 });
      }
      if (visionContent) {
        gsap.set(visionContent, { autoAlpha: 0, y: 28 });
      }
      gsap.set(visionItems, { autoAlpha: 0, y: 30 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=110px",
          end: () => `+=${section.offsetHeight * 5.5}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (missionGlow) {
        master.to(missionGlow, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      if (missionContent) {
        master.to(missionContent, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      }
      if (missionItems.length > 0) {
        master.to(
          missionItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.18,
          },
          "-=0.2",
        );
      }

      if (visionGlow) {
        master.to(visionGlow, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      if (visionContent) {
        master.to(visionContent, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      }
      if (visionItems.length > 0) {
        master.to(
          visionItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.18,
          },
          "-=0.2",
        );
      }

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
        className="h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex items-center justify-center"
      >
        {/* <div className="absolute top-0 left-0 w-full h-[500px] user-select-none pointer-events-none">
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
        </div> */}

        <div className="max-w-[1240px] h-full mx-auto text-white flex w-full bg-orange-500/0 overflow-hidden">
          <div className="relative w-full flex justify-start px-12 items-center bg-red-500/0">
            <div
              data-mv3-mission-content
              className="max-w-md flex flex-col gap-y-6 bg-white/0 relative"
            >
              <h3
                data-mv3-mission-item
                className="text-4xl font-medium uppercase"
              >
                Mission
              </h3>
              <p data-mv3-mission-item className="text-base leading-relaxed">
                Rebuild UK property lending. Start with bridging. Extend into
                SME CRE term loans — same infrastructure, no rebuild.
              </p>
              <div data-mv3-mission-item className="flex justify-start pt-12">
                <Image
                  src="/icons/white/eye-open-white.svg"
                  alt="Mission eye icon"
                  width={84}
                  height={84}
                  className="w-24 h-24"
                />
              </div>
            </div>

            <svg
              data-mv3-mission-glow
              xmlns="http://www.w3.org/2000/svg"
              width="881"
              height="688"
              fill="none"
              className="absolute left-0 top-[calc(50%-80px)] -translate-y-1/2 select-none pointer-events-none"
            >
              <path
                fill="url(#a)"
                fillOpacity=".5"
                d="M844.871 130.431c47.055 27.092 47.055 94.993 0 122.085l-739.29 425.643C58.624 705.195 0 671.301 0 617.117V-234.17c0-54.184 58.624-88.078 105.581-61.042z"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="79.241"
                  x2="224.001"
                  y1="704.07"
                  y2="209.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative w-full flex justify-end px-12 items-center bg-green-500/0">
            <div
              data-mv3-vision-content
              className="max-w-md flex flex-col gap-y-6 bg-white/0 relative"
            >
              <div data-mv3-vision-item className="flex justify-end pb-12">
                <Image
                  src="/icons/white/target-icon-white.svg"
                  alt="Vision target icon"
                  width={84}
                  height={84}
                  className="w-24 h-24"
                />
              </div>

              <h3
                data-mv3-vision-item
                className="text-4xl font-medium uppercase"
              >
                Vision
              </h3>

              <p data-mv3-vision-item className="text-base leading-relaxed">
                Rebuild UK property lending. Start with bridging. Extend into
                SME CRE term loans — same infrastructure, no rebuild.
              </p>
            </div>
            <svg
              data-mv3-vision-glow
              width="880"
              height="758"
              viewBox="0 0 880 758"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-[calc(50%+80px)] -translate-y-1/2 select-none pointer-events-none"
            >
              <path
                d="M773.407 9.5849C820.398 -17.6204 879.201 16.3296 879.135 70.627L878.109 923.692C878.043 977.876 819.379 1011.7 772.454 984.607L35.2184 558.964C-11.7067 531.872 -11.7476 464.155 35.1448 437.006L773.407 9.5849Z"
                fill="url(#paint0_linear_7_2)"
                fillOpacity="0.3"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_7_2"
                  x1="879.283"
                  y1="-51.7124"
                  x2="747.409"
                  y2="554.972"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
