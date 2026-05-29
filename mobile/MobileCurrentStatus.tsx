"use client";

import { useRef } from "react";
import { PiTargetBold } from "react-icons/pi";
import IconBoxSimple from "@/components/IconBoxSimple";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button as DefButton } from "@/components/ui";

const PLATFORM_MODULES = [
  {
    title: "Loan origination",
    description:
      "Data entered once, eligibility checked instantly, indicative offer returned in real time — fully configurable by stakeholders, no developer involvement.",
  },
  {
    title: "Lawyer workflow",
    description:
      "Every legal step managed on-platform — from instruction to execution, no manual chasing, no fragmented communication.",
  },
  {
    title: "Loan management",
    description:
      "Automated lifecycle management from drawdown to exit — breach detection, payment distributions and borrower self-service, every action on blockchain.",
  },
  {
    title: "Capital provider dashboards",
    description:
      "Real-time visibility across every funded loan — performance, distributions and compliance in a single dedicated dashboard.",
  },
] as const;

export default function MobileCurrentStatus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const items = trackRef.current.querySelectorAll(
        ".snap-start, .snap-center, .snap-end, svg"
      );

      gsap.fromTo(
        items,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: trackRef }
  );

  return (
    <div
      ref={trackRef}
      className="w-full bg-gradient-to-b from-white via-[#EBEFF2] via-[10%] to-[#EBEFF2] rounded-none py-12 px-6 overflow-hidden flex flex-col"
    >
      {/* Mobile heading — matches The Existing Problems typography */}
      <div className="mx-0 mb-6 max-w-[1800px]">
        <h2 className="text-[2.25rem] leading-[1.1] font-semibold text-[#212329]">
          Current Status
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="flex items-center gap-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Column 1: Staggered Q2/Q3 cards */}
        <div className="snap-start shrink-0 w-[340px] h-[516px] flex flex-col justify-center">
          <div className="flex flex-col h-[428px] justify-between gap-y-4">
            <div className="h-[206px]">
              <IconBoxSimple className="h-full !p-5">
                <div className="relative flex flex-col justify-center h-full">
                  <div>
                    <div className="mb-2 flex items-center">
                      <span className="rounded-full px-3 py-0.5 text-xs font-semibold uppercase text-[#0B97BE] bg-linear-to-r from-[#D4E7EE] to-[#ECF1F5]">
                        Q2 2026
                      </span>
                    </div>

                    <h3 className="text-xl leading-6 font-semibold text-[#011F27]">
                      Quick Home Sale MVP
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-[#4B6066]">
                      Quick home sale providers depend on speed and certainty.
                      Atomix enables this — pre-approved offer generated
                      instantly, friction removed at every step.
                    </p>
                  </div>
                </div>
              </IconBoxSimple>
            </div>

            <div className="h-[206px]">
              <IconBoxSimple className="h-full !p-5">
                <div className="relative flex flex-col justify-center h-full">
                  <div>
                    <div className="mb-2 flex items-center">
                      <span className="rounded-full px-3 py-0.5 text-xs font-semibold uppercase text-[#0B97BE] bg-linear-to-r from-[#D4E7EE] to-[#ECF1F5]">
                        Q3 2026
                      </span>
                    </div>

                    <h3 className="text-xl leading-6 font-semibold text-[#011F27]">
                      Auction Finance MVP
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-[#4B6066]">
                      Pre-approved lender finance embedded into the auction
                      experience — certainty of funding before the hammer falls,
                      within the 28-day completion window.
                    </p>
                  </div>
                </div>
              </IconBoxSimple>
            </div>
          </div>
        </div>

        {/* Connector SVG 1: Columns 1 to 2 */}
        <div className="shrink-0 w-[50px] h-[516px] flex items-center justify-center">
          <svg
            width="50"
            height="516"
            viewBox="0 0 50 516"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 147 L 15 147 Q 30 147 30 167 L 30 238 Q 30 258 50 258"
              stroke="#CDD2D7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 0 369 L 15 369 Q 30 369 30 349 L 30 278 Q 30 258 50 258"
              stroke="#CDD2D7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Column 2: First central statement */}
        <div className="snap-center shrink-0 w-[340px] h-[516px] flex items-center justify-center px-2">
          <IconBoxSimple className="w-full h-[428px] !p-8 flex flex-col justify-center">
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-[21px] font-semibold text-[#011F27] text-center leading-snug">
                Atomix is live and building — two product launches confirmed for
                2026. <br />
                Quick Home Sale MVP (Q2) and Auction Finance MVP (Q3).
              </p>
            </div>
          </IconBoxSimple>
        </div>

        {/* Connector SVG 2: Columns 2 to 3 */}
        <div className="shrink-0 w-[35px] h-[516px] flex items-center justify-center">
          <svg
            width="35"
            height="20"
            viewBox="0 0 35 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="10"
              x2="35"
              y2="10"
              stroke="#CDD2D7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Column 3: Second central statement */}
        <div className="snap-center shrink-0 w-[340px] h-[516px] flex items-center justify-center px-2">
          <IconBoxSimple className="w-full h-[428px] !p-8 flex flex-col justify-center">
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-[21px] font-semibold text-[#011F27] text-center leading-snug">
                Atomix is built on the following platform modules, available across all products:
              </p>
            </div>
          </IconBoxSimple>
        </div>

        {/* Connector SVG 3: Columns 3 to 4 */}
        <div className="shrink-0 w-[50px] h-[516px] flex items-center justify-center">
          <svg
            width="50"
            height="428"
            viewBox="0 0 50 428"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 214 L 12 214 Q 25 214 25 194 L 25 66 Q 25 46 50 46"
              stroke="#CDD2D7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 0 214 L 12 214 Q 25 214 25 204 L 25 178 Q 25 158 50 158"
              stroke="#CDD2D7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 0 214 L 12 214 Q 25 214 25 224 L 25 250 Q 25 270 50 270"
              stroke="#CDD2D7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 0 214 L 12 214 Q 25 214 25 234 L 25 362 Q 25 382 50 382"
              stroke="#CDD2D7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Column 4: Platform Modules */}
        <div className="snap-end shrink-0 w-[340px] flex flex-col justify-center py-4">
          <div className="flex flex-col gap-y-3">
            {PLATFORM_MODULES.map((module) => (
              <div key={module.title} className="w-full flex">
                <IconBoxSimple className="h-full w-full !py-3 !px-4">
                  <div className="flex items-start gap-x-3 text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D8E9EE]">
                      <PiTargetBold className="h-5 w-5 text-[#0B97BE]" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#011F27] leading-tight mb-1">
                        {module.title}
                      </h3>
                      <p className="text-[14px] text-[#4B6066] leading-snug">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </IconBoxSimple>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer at the end of horizontal track for right padding safety */}
        <div className="shrink-0 w-6 h-1" />
      </div>

      {/* Swipe Indicator for Mobile */}
      <div className="flex justify-center gap-x-2 mt-2">
        <span className="text-[11px] text-[#4B6066]/80 font-medium tracking-wide flex items-center gap-1 animate-pulse uppercase">
          Swipe right to view full status flow →
        </span>
      </div>

      {/* Learn More Button */}
      <div className="flex justify-center mt-4">
        <DefButton href="/about-us">Learn more</DefButton>
      </div>
    </div>
  );
}
