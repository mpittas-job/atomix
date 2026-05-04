"use client";

import { useRef } from "react";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import CurrentStatusConnectorsV2 from "@/main/CurrentStatusConnectorsV2";
import DefHeading from "@/components/typo/DefHeading";
import { FaHouse, FaGavel } from "react-icons/fa6";
import { PiTargetBold } from "react-icons/pi";

import { Button as DefButton } from "@/components/ui";
import IconBoxLight from "@/components/IconBoxLight";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CURRENT_STATUS_GLOW_CONFIG,
  CURRENT_STATUS_GLOW_PATH_PROPS,
} from "@/components/current-status/glowConfig";

gsap.registerPlugin(ScrollTrigger);

const CONNECTOR_STROKE = "#CDD2D7";

interface TabData {
  title: string;
  description: string;
  mainImage: string;
  smallImages: string[];
}

const TABS: TabData[] = [
  {
    title: "Loan\norigination",
    description:
      "Data entered once, then structured workflow from application to drawdown.",
    mainImage: "/dashboard/current-status-dashboard-1.svg",
    smallImages: ["/dashboard/current-status-dashboard-1-small.svg"],
  },
  {
    title: "Lawyer workflow",
    description: "End-to-end legal, no chasing.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-2-small-1.svg",
      "/dashboard/current-status-dashboard-2-small-2.svg",
    ],
  },
  {
    title: "Loan management",
    description: "Automated lifecycle, start to finish.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-3-small-1.svg",
      "/dashboard/current-status-dashboard-3-small-2.svg",
    ],
  },
  {
    title: "Capital provider dashboards",
    description: "Real-time loan insights, all in one place.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-4-small-1.svg",
      "/dashboard/current-status-dashboard-4-small-2.svg",
      "/dashboard/current-status-dashboard-4-small-3.svg",
    ],
  },
];

export default function MainCurrentStatusLight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowTimelinesRef = useRef<gsap.core.Timeline[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const topCards =
        section.querySelectorAll<HTMLElement>("[data-cs-top-card]");
      const topCardsRow = topCards[0]?.parentElement ?? null;
      const topCardDescriptions = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-desc]",
      );
      const topCardMarketInfo = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-market]",
      );
      const inlineConnector1 = section.querySelector<SVGPathElement>(
        "[data-cs-inline-connector-1]",
      );
      const inlineConnector2 = section.querySelector<SVGPathElement>(
        "[data-cs-inline-connector-2]",
      );
      const inlineConnectorGlow1 = section.querySelector<SVGPathElement>(
        "[data-cs-inline-connector-glow-1]",
      );
      const inlineConnectorGlow2 = section.querySelector<SVGPathElement>(
        "[data-cs-inline-connector-glow-2]",
      );
      const connector1 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-1]",
      );
      const connector2 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-2]",
      );
      const connector3 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-3]",
      );
      const connector4 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-4]",
      );
      const statement1 = section.querySelector<HTMLElement>(
        "[data-cs-statement-1]",
      );
      const verticalLine = section.querySelector<SVGPathElement>(
        "[data-cs-vertical-line]",
      );
      const verticalLineGlow = section.querySelector<SVGPathElement>(
        "[data-cs-vertical-line-glow]",
      );
      const statement2 = section.querySelector<HTMLElement>(
        "[data-cs-statement-2]",
      );
      const featureCards = section.querySelectorAll<HTMLElement>(
        "[data-cs-feature-card]",
      );
      const buttons = section.querySelectorAll<HTMLElement>(
        "[data-cs-buttons] > *",
      );
      const bottomConnectorSequence = [
        connector1,
        connector2,
        connector3,
        connector4,
      ];
      const connectorGlow1 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-glow-1]",
      );
      const connectorGlow2 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-glow-2]",
      );
      const connectorGlow3 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-glow-3]",
      );
      const connectorGlow4 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-glow-4]",
      );
      const bottomConnectorGlowSequence = [
        connectorGlow1,
        connectorGlow2,
        connectorGlow3,
        connectorGlow4,
      ];
      const allGlowPaths = [
        inlineConnectorGlow1,
        inlineConnectorGlow2,
        verticalLineGlow,
        ...bottomConnectorGlowSequence,
      ].filter((glow): glow is SVGPathElement => Boolean(glow));
      const ANIMATION_DURATION_SCALE = 1.6;
      const ANIMATION_STAGGER_SCALE = 1.4;
      const BOTTOM_SEQUENCE_DURATION_SCALE = 1;
      const scaleDuration = (duration: number) =>
        duration * ANIMATION_DURATION_SCALE;
      const scaleStagger = (stagger: number) =>
        stagger * ANIMATION_STAGGER_SCALE;
      const scaleBottomDuration = (duration: number) =>
        duration * BOTTOM_SEQUENCE_DURATION_SCALE;

      const stopGlowLoops = () => {
        glowTimelinesRef.current.forEach((timeline) => timeline?.kill());
        glowTimelinesRef.current = [];
        gsap.set(allGlowPaths, { opacity: 0 });
      };

      const startGlowLoop = (
        path: SVGPathElement,
        glow: SVGPathElement | null,
        glowIndex: number,
      ) => {
        if (!glow) return;

        const len = path.getTotalLength ? path.getTotalLength() : 1000;
        const glowLen = Math.min(CURRENT_STATUS_GLOW_CONFIG.maxLength, len / 2);
        const previousTimeline = glowTimelinesRef.current[glowIndex];
        previousTimeline?.kill();

        const glowTl = gsap.timeline({
          repeat: -1,
          repeatDelay: CURRENT_STATUS_GLOW_CONFIG.repeatDelay,
          defaults: { overwrite: "auto" },
          repeatRefresh: true,
        });
        glowTimelinesRef.current[glowIndex] = glowTl;

        const durationScale = gsap.utils.random(
          CURRENT_STATUS_GLOW_CONFIG.minDurationScale,
          CURRENT_STATUS_GLOW_CONFIG.maxDurationScale,
        );
        const travelScale = gsap.utils.random(
          CURRENT_STATUS_GLOW_CONFIG.minTravelScale,
          CURRENT_STATUS_GLOW_CONFIG.maxTravelScale,
        );
        const travelDuration =
          CURRENT_STATUS_GLOW_CONFIG.travelDuration * durationScale;
        const fadeInDuration =
          CURRENT_STATUS_GLOW_CONFIG.fadeInDuration * durationScale;
        const fadeOutDuration =
          CURRENT_STATUS_GLOW_CONFIG.fadeOutDuration * durationScale;
        const peakOpacity =
          CURRENT_STATUS_GLOW_CONFIG.maxOpacity *
          CURRENT_STATUS_GLOW_CONFIG.peakOpacityScale;
        const midOpacity =
          CURRENT_STATUS_GLOW_CONFIG.maxOpacity *
          CURRENT_STATUS_GLOW_CONFIG.midOpacityScale;
        const tailOpacity =
          CURRENT_STATUS_GLOW_CONFIG.maxOpacity *
          CURRENT_STATUS_GLOW_CONFIG.tailOpacityScale;
        const pulseWidth =
          CURRENT_STATUS_GLOW_CONFIG.strokeWidth *
          CURRENT_STATUS_GLOW_CONFIG.pulseWidthScale;

        glowTl
          .set(glow, {
            attr: {
              "stroke-dasharray": `${glowLen} ${len + 50}`,
              "stroke-dashoffset": `${glowLen}`,
            },
            opacity: 0,
            strokeWidth: CURRENT_STATUS_GLOW_CONFIG.strokeWidth,
          })
          .to(glow, {
            attr: { "stroke-dashoffset": `${-len * travelScale}` },
            duration: travelDuration,
            ease: "sine.inOut",
          })
          .to(
            glow,
            {
              opacity: peakOpacity,
              duration: fadeInDuration,
              ease: "sine.out",
            },
            "<",
          )
          .to(
            glow,
            {
              opacity: midOpacity,
              duration: Math.max(0.18, travelDuration * 0.32),
              ease: "sine.inOut",
            },
            `<+${Math.max(0.06, travelDuration * 0.18)}`,
          )
          .to(
            glow,
            {
              opacity: tailOpacity,
              duration: Math.max(0.2, travelDuration * 0.34),
              ease: "sine.inOut",
            },
            `<+${Math.max(0.08, travelDuration * 0.22)}`,
          )
          .to(
            glow,
            {
              strokeWidth: pulseWidth,
              duration: Math.max(0.2, travelDuration * 0.28),
              ease: "sine.out",
              yoyo: true,
              repeat: 1,
            },
            `<+${Math.max(0.04, travelDuration * 0.14)}`,
          )
          .to(
            glow,
            {
              opacity: 0,
              duration: fadeOutDuration,
              ease: "sine.in",
            },
            `-=${Math.max(0.1, fadeOutDuration * 0.75)}`,
          );
      };

      const animatePathAndGlow = (
        path: SVGPathElement,
        glow: SVGPathElement | null,
        duration: number,
        glowIndex: number,
      ) => {
        const len = path.getTotalLength ? path.getTotalLength() : 1000;
        const pathTl = gsap.timeline();

        pathTl.to(path, {
          strokeDashoffset: 0,
          duration,
          ease: "power2.inOut",
        });

        if (glow) {
          pathTl.add(
            () => startGlowLoop(path, glow, glowIndex),
            `<+=${CURRENT_STATUS_GLOW_CONFIG.startDelay}`,
          );
        }

        return pathTl;
      };

      gsap.set(topCards, { autoAlpha: 0, y: 60 });
      gsap.set([statement1, statement2], {
        autoAlpha: 0,
        y: 60,
      });
      gsap.set(verticalLine, {
        scaleY: 0,
        transformOrigin: "top center",
      });
      gsap.set([topCardDescriptions, topCardMarketInfo], {
        overflow: "hidden",
      });
      gsap.set(featureCards, {
        autoAlpha: 0,
        y: 0,
        scale: 0.9,
        transformOrigin: "center center",
      });
      gsap.set(buttons, { autoAlpha: 0, y: 20 });

      if (inlineConnector1) {
        const length = inlineConnector1.getTotalLength();
        gsap.set(inlineConnector1, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      }
      if (inlineConnector2) {
        const length = inlineConnector2.getTotalLength();
        gsap.set(inlineConnector2, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      }
      const inlineConnectorSequence = [inlineConnector1, inlineConnector2];
      const inlineConnectorGlowSequence = [
        inlineConnectorGlow1,
        inlineConnectorGlow2,
      ];
      inlineConnectorGlowSequence.forEach((glow, index) => {
        const path = inlineConnectorSequence[index];
        if (!glow || !path) return;
        const length = path.getTotalLength();
        gsap.set(glow, {
          attr: {
            "stroke-dasharray": `${Math.min(CURRENT_STATUS_GLOW_CONFIG.maxLength, length / 2)} ${length + 50}`,
            "stroke-dashoffset": `${Math.min(CURRENT_STATUS_GLOW_CONFIG.maxLength, length / 2)}`,
          },
          opacity: 0,
        });
      });
      if (verticalLineGlow && verticalLine) {
        const length = verticalLine.getTotalLength();
        gsap.set(verticalLineGlow, {
          attr: {
            "stroke-dasharray": `${Math.min(CURRENT_STATUS_GLOW_CONFIG.maxLength, length / 2)} ${length + 50}`,
            "stroke-dashoffset": `${Math.min(CURRENT_STATUS_GLOW_CONFIG.maxLength, length / 2)}`,
          },
          opacity: 0,
        });
      }

      bottomConnectorSequence.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      });
      bottomConnectorGlowSequence.forEach((glow, index) => {
        const path = bottomConnectorSequence[index];
        if (!glow || !path) return;
        const length = path.getTotalLength();
        gsap.set(glow, {
          attr: {
            "stroke-dasharray": `${Math.min(CURRENT_STATUS_GLOW_CONFIG.maxLength, length / 2)} ${length + 50}`,
            "stroke-dashoffset": `${Math.min(CURRENT_STATUS_GLOW_CONFIG.maxLength, length / 2)}`,
          },
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        delay: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "restart reset restart reset",
          onLeave: stopGlowLoops,
          onLeaveBack: stopGlowLoops,
        },
      });

      tl.to(topCards, {
        autoAlpha: 1,
        y: 0,
        duration: scaleDuration(1.6),
        ease: "power2.out",
        stagger: scaleStagger(0.5),
      })
        .to(inlineConnector1, {
          strokeDashoffset: 0,
          duration: scaleDuration(1),
          ease: "power2.inOut",
          onComplete: () => {
            if (!inlineConnector1) return;
            startGlowLoop(inlineConnector1, inlineConnectorGlow1, 4);
          },
        })
        .to(inlineConnector2, {
          strokeDashoffset: 0,
          duration: scaleDuration(1),
          ease: "power2.inOut",
          onComplete: () => {
            if (!inlineConnector2) return;
            startGlowLoop(inlineConnector2, inlineConnectorGlow2, 5);
          },
        })
        .to(
          statement1,
          {
            autoAlpha: 1,
            y: 0,
            duration: scaleDuration(1.6),
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          verticalLine,
          {
            scaleY: 1,
            duration: scaleDuration(0.8),
            ease: "power2.out",
            onComplete: () => {
              if (!verticalLine) return;
              startGlowLoop(verticalLine, verticalLineGlow, 6);
            },
          },
          "-=0.5",
        )
        .to(
          statement2,
          {
            autoAlpha: 1,
            y: 0,
            duration: scaleDuration(1.6),
            ease: "power2.out",
          },
          "-=0.5",
        );

      for (let index = 0; index < bottomConnectorSequence.length; index += 1) {
        const path = bottomConnectorSequence[index];
        const card = featureCards[index];
        const isFirstStep = index === 0;

        if (path) {
          tl.add(
            animatePathAndGlow(
              path,
              bottomConnectorGlowSequence[index],
              scaleBottomDuration(1),
              index,
            ),
            isFirstStep ? "-=1" : ">",
          );
        }

        if (card) {
          tl.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 0,
              scale: 0.9,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: scaleBottomDuration(1.35),
              ease: "power2.out",
              immediateRender: false,
            },
            ">",
          );
        }
      }

      tl.to(
        buttons,
        {
          autoAlpha: 1,
          y: 0,
          duration: scaleDuration(1),
          ease: "power4.inOut",
        },
        "-=6",
      );

      if (topCardsRow) {
        const topCardsCollapseTl = gsap.timeline({
          scrollTrigger: {
            trigger: topCardsRow,
            start: "bottom 55%",
            toggleActions: "play play play reverse",
          },
        });

        topCardsCollapseTl
          .to(
            topCardDescriptions,
            {
              autoAlpha: 0,
              y: -6,
              height: 0,
              marginTop: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            0,
          )
          .to(
            topCardMarketInfo,
            {
              autoAlpha: 0,
              y: -6,
              height: 0,
              marginTop: 0,
              paddingTop: 0,
              paddingBottom: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "<",
          );
      }

      return () => {
        stopGlowLoops();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-[calc(100vh-126px)] rounded-3xl bg-[#EBEFF2] relative overflow-hidden flex flex-col justify-center items-center py-28"
    >
      <div className="absolute top-0 left-0 w-full h-[500px]">
        {/* <SoftAurora
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
        /> */}
      </div>

      <DefHeading
        theme="dark"
        badgeText=""
        title="Current Status"
        // description="Atomix is live and building — two product launches confirmed for 2026: quick home sale MVP (Q2) and auction finance MVP (Q3)."
        description=""
        className="!w-full !items-start"
        showBadge={false}
      />

      <div className="max-w-[1200px] mx-auto mt-6 flex flex-col">
        <div className="flex gap-x-6">
          <div
            data-cs-top-card
            className="flex-1 relative h-full will-change-transform"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.2,
                zIndex: 50,
                duration: 0.25,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                zIndex: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
          >
            <IconBoxLight className="h-full">
              <div className="relative flex flex-col justify-between h-full">
                <div data-cs-top-card-content>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full px-4 py-1 text-sm font-semibold uppercase text-[#0B97BE] bg-linear-to-r from-[#D4E7EE] to-[#ECF1F5]">
                      Q2 2026
                    </span>
                  </div>

                  <h3 className="text-3xl leading-6 font-semibold text-[#011F27]">
                    Quick Home Sale MVP
                  </h3>

                  <p data-cs-top-card-desc className="mt-4 text-[#4B6066]">
                    Quick home sale providers depend on speed and certainty of
                    funding. Atomix is built for this model — repeat,
                    high-volume bridging with a pre-approved offer generated
                    instantly and a process that removes friction at every step.
                  </p>
                </div>

                <div
                  data-cs-top-card-market
                  className="mt-4 rounded-xl bg-gradient-to-r from-[#d6e8ef] to-[#eceeee] p-2.5 text-lg leading-6 text-[#011F27] flex items-center gap-2"
                >
                  <span className="shrink-0 text-[#011F27] mr-1">
                    <FaHouse className="h-6 w-6" />
                  </span>
                  <span>Part of the £350bn UK annual property loan market</span>
                </div>
              </div>
            </IconBoxLight>
          </div>

          <div
            data-cs-top-card
            className="flex-1 relative h-full will-change-transform"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.2,
                zIndex: 50,
                duration: 0.25,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                zIndex: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }}
          >
            <IconBoxLight className="h-full">
              <div className="relative flex flex-col justify-between h-full">
                <div data-cs-top-card-content>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full px-4 py-1 text-sm font-semibold uppercase text-[#0B97BE] bg-linear-to-r from-[#D4E7EE] to-[#ECF1F5]">
                      Q3 2026
                    </span>
                  </div>

                  <h3 className="text-3xl leading-6 font-semibold text-[#011F27]">
                    Auction Finance MVP
                  </h3>

                  <p data-cs-top-card-desc className="mt-4 text-[#4B6066]">
                    Pre-approved finance embedded into the auction experience —
                    certainty of funding before the hammer falls, within the
                    28-day completion window.
                  </p>
                </div>

                <div
                  data-cs-top-card-market
                  className="mt-4 rounded-xl bg-gradient-to-r from-[#d6e8ef] to-[#eceeee] p-2.5 text-lg leading-6 text-[#011F27] flex items-center gap-2"
                >
                  <span className="shrink-0 text-[#011F27] mr-1">
                    <FaGavel className="h-6 w-6" />
                  </span>
                  <span>
                    Unlocking £5.5bn stalled by 30-day completion requirements
                  </span>
                </div>
              </div>
            </IconBoxLight>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[440px] -mr-[2px]">
            <svg
              viewBox="0 0 325 80"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                overflow: "visible",
              }}
            >
              <path
                data-cs-inline-connector-1
                className="status-connector-path"
                d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
                fill="none"
                stroke={CONNECTOR_STROKE}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                data-cs-inline-connector-glow-1
                className="status-connector-glow"
                d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
                {...CURRENT_STATUS_GLOW_PATH_PROPS}
              />
            </svg>
          </div>

          <div className="w-[440px] -ml-[2px]">
            <svg
              viewBox="0 0 325 80"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                overflow: "visible",
              }}
            >
              <path
                data-cs-inline-connector-2
                className="status-connector-path"
                d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
                fill="none"
                stroke={CONNECTOR_STROKE}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                data-cs-inline-connector-glow-2
                className="status-connector-glow"
                d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
                {...CURRENT_STATUS_GLOW_PATH_PROPS}
              />
            </svg>
          </div>
        </div>

        <div
          data-cs-statement-1
          className="text-3xl text-[#011F27] text-center font-semibold py-4"
        >
          Atomix is live and building — two product launches confirmed for 2026:
          quick home sale MVP (Q2) and auction finance MVP (Q3).
        </div>

        <div className="flex justify-center ">
          <svg
            className="h-12 w-[3px]"
            viewBox="0 0 3 48"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <path
              data-cs-vertical-line
              d="M1.5 1 V47"
              fill="none"
              stroke={CONNECTOR_STROKE}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              data-cs-vertical-line-glow
              className="status-connector-glow"
              d="M1.5 1 V47"
              {...CURRENT_STATUS_GLOW_PATH_PROPS}
            />
          </svg>
        </div>

        <div
          data-cs-statement-2
          className="text-3xl text-[#011F27] text-center font-semibold py-4"
        >
          Statement 2 comes here
        </div>

        <div data-cs-connectors>
          {/* ds */}
          <CurrentStatusConnectorsV2 />
        </div>

        <div className="-mt-1 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TABS.map((tab) => (
            <div
              key={tab.title}
              data-cs-feature-card
              className="h-full relative will-change-transform"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.2,
                  zIndex: 50,
                  duration: 0.25,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  zIndex: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              <IconBoxLight
                icon={<PiTargetBold className="h-10 w-10" />}
                title={tab.title}
                description={tab.description}
                className="h-full"
              />
            </div>
          ))}
        </div>

        <div data-cs-buttons className="w-full flex gap-x-4 justify-center">
          <DefButton>Learn more</DefButton>

          <DefButton variant="outline">Watch Videos</DefButton>
        </div>
      </div>
    </div>
  );
}
