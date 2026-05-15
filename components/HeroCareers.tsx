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
 * Offsets from section center (clamp + vw/vh).
 * Left: one large top avatar, two smaller ones below side-by-side.
 * Right: small top, large bottom.
 */
const FACE_SLOTS = [
  {
    sizeClass: "w-[clamp(5.25rem,11vw,8.5rem)]",
    transform:
      "translate(calc(-50% + clamp(-480px, -41vw, -330px)), calc(-50% + clamp(-128px, -13vh, -72px)))",
    slotClass: "max-sm:hidden",
  },
  {
    sizeClass: "w-[clamp(8rem,9.5vw,7.25rem)]",
    transform:
      "translate(calc(-50% + clamp(-650px, -49vw, -380px)), calc(-50% + clamp(88px, 12vh, 158px)))",
    slotClass: "max-sm:hidden",
  },
  {
    sizeClass: "w-[clamp(4.5rem,9.5vw,7.25rem)]",
    transform:
      "translate(calc(-50% + clamp(-420px, -36vw, -290px)), calc(-50% + clamp(48px, 7vh, 108px)))",
    slotClass: "max-sm:hidden",
  },
  {
    sizeClass: "w-[clamp(4.25rem,8.5vw,6.5rem)]",
    transform:
      "translate(calc(-50% + clamp(380px, 35vw, 460px)), calc(-50% + clamp(-158px, -15vh, -98px)))",
    slotClass: "max-sm:hidden",
  },
  {
    sizeClass: "w-[clamp(6.25rem,13.5vw,10.75rem)]",
    transform:
      "translate(calc(-50% + clamp(360px, 32vw, 560px)), calc(-50% + clamp(60px, 14vh, 0px)))",
    slotClass: "",
  },
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
] as const;

const FACE_COUNT = FACE_SLOTS.length;

function pickOtherFaceIndex(current: number): number {
  const choices = Array.from({ length: FACE_COUNT }, (_, i) => i).filter(
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
    x: gsap.utils.random(-34, 34),
    y: gsap.utils.random(-24, 24),
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
  const facesScopeRef = useRef<HTMLDivElement>(null);
  const faceMotionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slotSwapTimersRef = useRef<(gsap.core.Tween | null)[]>(
    Array.from({ length: FACE_COUNT }, () => null),
  );
  const auxTimersRef = useRef<gsap.core.Tween[]>([]);
  const slotBusyRef = useRef<boolean[]>(
    Array.from({ length: FACE_COUNT }, () => false),
  );

  const [slotFaces, setSlotFaces] = useState<number[]>(() =>
    Array.from({ length: FACE_COUNT }, (_, i) => i),
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
          {FACE_SLOTS.map((slot, index) => {
            const faceIdx = slotFaces[index] ?? index;
            const face = FACE_ASSETS[faceIdx] ?? FACE_ASSETS[index];
            return (
              <div
                key={`face-slot-${index}`}
                className={`absolute left-1/2 top-1/2 aspect-square ${slot.sizeClass} ${slot.slotClass}`}
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
        <div className="pointer-events-auto max-w-[1240px] text-center">
          <p className="mb-4 text-md font-semibold uppercase text-[#19A1C6]">
            Careers at Atomix
          </p>
          <h1 className="max-w-[500px] text-balance font-semibold text-[#212329] text-[52px] leading-[1.25]">
            Be a part of something great
          </h1>
          <div className="mt-9">
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
