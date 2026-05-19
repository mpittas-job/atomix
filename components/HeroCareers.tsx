"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button as DefButton } from "@/components/ui";
import { FaArrowRight } from "react-icons/fa";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(useGSAP);

/**
 * Offsets from section center (clamp + vw/vh). Each side has three possible
 * positions, but only five avatars are active so one side always has two.
 */
const LEFT_FACE_POSITIONS = [
  {
    sizeClass: "w-[clamp(5.25rem,11vw,8.5rem)]",
    transform:
      "translate(calc(-50% + clamp(-520px, -43vw, -360px)), calc(-50% + clamp(-172px, -16vh, -102px)))",
  },
  {
    sizeClass: "w-[clamp(6.75rem,9vw,8rem)]",
    transform:
      "translate(calc(-50% + clamp(-660px, -52vw, -430px)), calc(-50% + clamp(118px, 15vh, 188px)))",
  },
  {
    sizeClass: "w-[clamp(4.25rem,7.2vw,5.75rem)]",
    transform:
      "translate(calc(-50% + clamp(-360px, -31vw, -255px)), calc(-50% + clamp(112px, 14vh, 172px)))",
  },
] as const;

const RIGHT_FACE_POSITIONS = [
  {
    sizeClass: "w-[clamp(4.25rem,7.5vw,5.75rem)]",
    transform:
      "translate(calc(-50% + clamp(365px, 34vw, 455px)), calc(-50% + clamp(-170px, -16vh, -110px)))",
  },
  {
    sizeClass: "w-[clamp(5.75rem,10vw,8.75rem)]",
    transform:
      "translate(calc(-50% + clamp(340px, 30vw, 500px)), calc(-50% + clamp(102px, 14vh, 170px)))",
  },
  {
    sizeClass: "w-[clamp(4.25rem,7.2vw,5.75rem)]",
    transform:
      "translate(calc(-50% + clamp(570px, 48vw, 690px)), calc(-50% + clamp(112px, 13vh, 176px)))",
  },
] as const;

type FaceSide = "left" | "right";

type FacePlacement = {
  side: FaceSide;
  position: number;
};

const INITIAL_FACE_PLACEMENTS: FacePlacement[] = [
  { side: "left", position: 0 },
  { side: "left", position: 1 },
  { side: "left", position: 2 },
  { side: "right", position: 0 },
  { side: "right", position: 1 },
];

const FACE_SLOT_VISIBILITY = [
  "max-sm:hidden",
  "max-sm:hidden",
  "max-sm:hidden",
  "max-sm:hidden",
  "",
] as const;

const FACE_ASSETS = [
  {
    src: "/people-faces/face-1.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-2.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-3.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-4.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-5.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-6.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-7.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-8.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-9.png",
    alt: "Team member portrait",
  },
  {
    src: "/people-faces/face-10.png",
    alt: "Team member portrait",
  },
] as const;

const FACE_COUNT = INITIAL_FACE_PLACEMENTS.length;
const FACE_ASSET_COUNT = FACE_ASSETS.length;
/** Spread initial avatars across the full face pool (hydration-safe). */
const INITIAL_SLOT_FACES = [0, 2, 4, 6, 8] as const;

function getFacePosition(placement: FacePlacement) {
  const positions =
    placement.side === "left" ? LEFT_FACE_POSITIONS : RIGHT_FACE_POSITIONS;
  return positions[placement.position] ?? positions[0];
}

function countPlacementsOnSide(
  placements: FacePlacement[],
  side: FaceSide,
): number {
  return placements.filter((placement) => placement.side === side).length;
}

function pickOpenPosition(placements: FacePlacement[], side: FaceSide): number {
  const positions =
    side === "left" ? LEFT_FACE_POSITIONS : RIGHT_FACE_POSITIONS;
  const occupied = new Set(
    placements
      .filter((placement) => placement.side === side)
      .map((placement) => placement.position),
  );
  const choices = positions
    .map((_, index) => index)
    .filter((index) => !occupied.has(index));

  return choices[Math.floor(Math.random() * choices.length)] ?? 0;
}

function pickNextPlacement(
  placements: FacePlacement[],
  slot: number,
): FacePlacement {
  const current = placements[slot]!;
  const leftCount = countPlacementsOnSide(placements, "left");

  if (leftCount === 3 && current.side === "left") {
    return { side: "right", position: pickOpenPosition(placements, "right") };
  }

  if (leftCount === 2 && current.side === "right") {
    return { side: "left", position: pickOpenPosition(placements, "left") };
  }

  return current;
}

function pickOtherFaceIndex(current: number): number {
  const choices = Array.from({ length: FACE_ASSET_COUNT }, (_, i) => i).filter(
    (i) => i !== current,
  );
  return choices[Math.floor(Math.random() * choices.length)]!;
}

/** Random px drift — keep smaller so swaps don’t pull avatars into the headline */
function randDrift(magnitude: number) {
  return {
    x: gsap.utils.random(-magnitude, magnitude),
    y: gsap.utils.random(-magnitude, magnitude),
  };
}

function randRestingOffset() {
  return {
    x: gsap.utils.random(-12, 12),
    y: gsap.utils.random(-10, 10),
  };
}

function nextSwapDelay() {
  if (Math.random() < 0.65) {
    return gsap.utils.random(2.2, 4.8);
  }
  return gsap.utils.random(4.8, 8.5);
}

function nextHiddenDelay() {
  if (Math.random() < 0.7) {
    return gsap.utils.random(0.35, 1.1);
  }
  return gsap.utils.random(1.1, 2);
}

function WaveBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[min(55vw,420px)] -translate-y-1/2 opacity-[0.45]"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="heroCareersWaveFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#heroCareersWaveFade)"
        d="M0,160 C180,100 360,220 540,160 C720,100 900,220 1080,160 C1260,100 1350,140 1440,130 L1440,320 L0,320 Z"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.35"
        d="M0,180 C200,120 400,240 600,175 C800,110 1000,230 1200,165 C1320,130 1380,150 1440,145 L1440,320 L0,320 Z"
      />
    </svg>
  );
}

export default function HeroCareers() {
  const copyScopeRef = useRef<HTMLDivElement>(null);
  const facesScopeRef = useRef<HTMLDivElement>(null);
  const faceMotionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slotSwapTimersRef = useRef<(gsap.core.Tween | null)[]>(
    Array.from({ length: FACE_COUNT }, () => null),
  );
  const auxTimersRef = useRef<gsap.core.Tween[]>([]);
  const slotBusyRef = useRef<boolean[]>(
    Array.from({ length: FACE_COUNT }, () => false),
  );

  const [slotFaces, setSlotFaces] = useState<number[]>(() => [
    ...INITIAL_SLOT_FACES,
  ]);
  const [facePlacements, setFacePlacements] = useState<FacePlacement[]>(
    INITIAL_FACE_PLACEMENTS,
  );

  useGSAP(
    () => {
      const copyItems = copyScopeRef.current?.querySelectorAll<HTMLElement>(
        "[data-hero-careers-copy-item]",
      );
      if (!copyItems?.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(copyItems, { autoAlpha: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copyItems, { autoAlpha: 0, y: 32 });
        gsap.to(copyItems, {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.28,
          delay: 0.35,
        });
      });

      return () => mm.revert();
    },
    { scope: copyScopeRef },
  );

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return;
      const safe = contextSafe;

      const faceElements = faceMotionRefs.current.filter(
        (n): n is HTMLDivElement => n !== null,
      );
      if (!faceElements.length) return;

      const clearAllTimers = () => {
        slotSwapTimersRef.current.forEach((t) => t?.kill());
        slotSwapTimersRef.current = Array.from(
          { length: FACE_COUNT },
          () => null,
        );
        auxTimersRef.current.forEach((t) => t.kill());
        auxTimersRef.current = [];
      };

      const pushAux = (t: gsap.core.Tween) => {
        auxTimersRef.current.push(t);
      };

      const scheduleSlotSwap = (slot: number) => {
        slotSwapTimersRef.current[slot]?.kill();
        const delay = nextSwapDelay();
        slotSwapTimersRef.current[slot] = gsap.delayedCall(
          delay,
          safe(() => runSlotSwap(slot)),
        );
      };

      const runSlotSwap = safe((slot: number) => {
        if (slotBusyRef.current[slot]) {
          slotSwapTimersRef.current[slot] = gsap.delayedCall(
            gsap.utils.random(0.25, 0.85),
            safe(() => runSlotSwap(slot)),
          );
          return;
        }

        const el = faceMotionRefs.current[slot];
        if (!el) {
          scheduleSlotSwap(slot);
          return;
        }

        slotBusyRef.current[slot] = true;
        const outDrift = randDrift(18);

        gsap.to(el, {
          scale: 0,
          autoAlpha: 0,
          x: outDrift.x,
          y: outDrift.y,
          duration: 0.88,
          ease: "back.in(1.9)",
          overwrite: "auto",
          onComplete: safe(() => {
            setFacePlacements((prev) => {
              const next = [...prev];
              next[slot] = pickNextPlacement(prev, slot);
              return next;
            });

            setSlotFaces((prev) => {
              const next = [...prev];
              const cur = next[slot]!;
              next[slot] = pickOtherFaceIndex(cur);
              return next;
            });

            const waitPaint = gsap.delayedCall(
              nextHiddenDelay(),
              safe(() => {
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    const elIn = faceMotionRefs.current[slot];
                    if (!elIn) {
                      slotBusyRef.current[slot] = false;
                      scheduleSlotSwap(slot);
                      return;
                    }

                    const fromDrift = randDrift(26);
                    const toDrift = randRestingOffset();

                    gsap.fromTo(
                      elIn,
                      {
                        scale: 0.2,
                        autoAlpha: 0,
                        x: fromDrift.x,
                        y: fromDrift.y,
                      },
                      {
                        scale: 1,
                        autoAlpha: 1,
                        x: toDrift.x,
                        y: toDrift.y,
                        duration: 1.12,
                        ease: "back.out(2.75)",
                        overwrite: "auto",
                        onComplete: safe(() => {
                          slotBusyRef.current[slot] = false;
                          scheduleSlotSwap(slot);
                        }),
                      },
                    );
                  });
                });
              }),
            );
            pushAux(waitPaint);
          }),
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        clearAllTimers();
        slotBusyRef.current = Array.from({ length: FACE_COUNT }, () => false);
        gsap.killTweensOf(faceElements);
        faceElements.forEach((el) => {
          gsap.set(el, {
            transformOrigin: "50% 50%",
            scale: 1,
            autoAlpha: 1,
            x: 0,
            y: 0,
          });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        clearAllTimers();
        slotBusyRef.current = Array.from({ length: FACE_COUNT }, () => false);
        gsap.killTweensOf(faceElements);

        faceElements.forEach((el) => {
          gsap.set(el, {
            transformOrigin: "50% 50%",
            force3D: true,
            scale: 0,
            autoAlpha: 0,
            x: 0,
            y: 0,
          });
        });

        gsap.to(faceElements, {
          scale: 1,
          autoAlpha: 1,
          x: () => randRestingOffset().x,
          y: () => randRestingOffset().y,
          duration: 1.05,
          ease: "back.out(2.5)",
          stagger: { amount: 0.95, from: "random" },
          overwrite: "auto",
          onComplete: safe(() => {
            for (let slot = 0; slot < FACE_COUNT; slot++) {
              const firstDelay =
                gsap.utils.random(1.6, 4) +
                slot * gsap.utils.random(0.15, 0.42);
              slotSwapTimersRef.current[slot]?.kill();
              slotSwapTimersRef.current[slot] = gsap.delayedCall(
                firstDelay,
                safe(() => runSlotSwap(slot)),
              );
            }
          }),
        });
      });

      return () => {
        clearAllTimers();
        slotBusyRef.current = Array.from({ length: FACE_COUNT }, () => false);
        mm.revert();
      };
    },
    { scope: facesScopeRef, dependencies: [] },
  );

  return (
    <section
      aria-label="Careers at Atomix"
      className="relative isolate h-[660px] w-full overflow-visible bg-gradient-to-b from-[#B1D7E5] to-[#D2DEE5]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-7 bottom-7 z-[1] px-6 md:top-9 md:bottom-9 md:px-10">
        <div
          ref={facesScopeRef}
          className="relative mx-auto h-full w-full max-w-[1240px]"
        >
          {facePlacements.map((placement, index) => {
            const slot = getFacePosition(placement);
            const faceIdx = slotFaces[index] ?? index;
            const face = FACE_ASSETS[faceIdx] ?? FACE_ASSETS[index];
            const visibilityClass = FACE_SLOT_VISIBILITY[index] ?? "";
            return (
              <div
                key={`face-slot-${index}`}
                className={`absolute left-1/2 top-1/2 aspect-square ${slot.sizeClass} ${visibilityClass}`}
                style={{ transform: slot.transform }}
              >
                <div
                  ref={(node) => {
                    faceMotionRefs.current[index] = node;
                  }}
                  className="h-full w-full will-change-transform"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      key={faceIdx}
                      src={face.src}
                      alt={face.alt}
                      fill
                      sizes="(max-width: 640px) 30vw, (max-width: 1024px) 18vw, 200px"
                      className="object-cover"
                      priority={index === FACE_COUNT - 1}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
        <div
          ref={copyScopeRef}
          className="pointer-events-auto max-w-[1240px] text-center"
        >
          <p
            data-hero-careers-copy-item
            className="mb-4 text-md font-semibold uppercase text-[#19A1C6]"
          >
            Careers at Atomix
          </p>
          <h1
            data-hero-careers-copy-item
            className="mx-auto max-w-[500px] text-balance font-semibold text-[#212329] text-[52px] leading-[1.25]"
          >
            Be a part of something great
          </h1>
          <div data-hero-careers-copy-item className="mt-9">
            <DefButton
              href="#open-roles"
              size="large"
              className="inline-flex items-center gap-2"
            >
              See open roles
              <FaArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </DefButton>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <SoftAurora
          speed={1.3}
          scale={1.2}
          brightness={0.55}
          color1="#78cfe3"
          color2="#87b9d4"
          noiseFrequency={1}
          noiseAmplitude={3.5}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.12}
          layerOffset={0.5}
          colorSpeed={1}
          enableMouseInteraction={false}
          mouseInfluence={0.2}
        />
      </div>
    </section>
  );
}
