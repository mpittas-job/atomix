"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";

gsap.registerPlugin(useGSAP);

/**
 * Quick controls for the hero tile mosaic (edit this object only).
 *
 * - **columns / rows** — grid size; tiles stay square. Angle motion uses one ticker.
 * - **gradient** — `linear-gradient` endpoints (angle still animates).
 * - **drift** — seamless infinite scroll of the whole mosaic in one direction (two
 *   identical panels side-by-side or stacked). Uses a single GSAP tween (no per-tile drift).
 */
export const HERO_TILE_OPTIONS = {
  columns: 24,
  rows: 24,
  gradient: {
    from: "#0C4A5A",
    to: "#2988A1",
  },
  drift: {
    enabled: true,
    /** Seconds for one full loop (one panel width / height). */
    durationSec: 52,
    /** Seamless infinite direction for the tile field. */
    direction: "left" as "left" | "right" | "up" | "down",
  },
} as const;

const tileCols = HERO_TILE_OPTIONS.columns;
const tileRows = HERO_TILE_OPTIONS.rows;
const TILE_COUNT = tileCols * tileRows;
const TILE_COLOR_A = HERO_TILE_OPTIONS.gradient.from;
const TILE_COLOR_B = HERO_TILE_OPTIONS.gradient.to;

const driftIsVertical =
  HERO_TILE_OPTIONS.drift.direction === "up" ||
  HERO_TILE_OPTIONS.drift.direction === "down";

/** Stable base angle for grid cell (col, row) — same cell always same hue layout. */
function tileAngleBaseDeg(col: number, row: number) {
  const v = col * 137.508 + row * 91.17 + ((col * 17 + row * 23) % 7) * 49.21;
  return ((v % 360) + 360) % 360;
}

/** Oscillation params from (col, row) only — deterministic, no per-tile tweens. */
function tileMotionParams(col: number, row: number) {
  const seed = col * 928371 + row * 482711;
  const norm = seed % 10000;
  return {
    base: tileAngleBaseDeg(col, row),
    ampDeg: 28 + (norm % 68),
    speed: 0.045 + ((norm * 13) % 70) * 0.00165,
    phase: ((norm * 17) % 628) * 0.01,
  };
}

function TileCell({ index }: { index: number }) {
  const col = index % tileCols;
  const row = Math.floor(index / tileCols);
  return (
    <div
      data-hero-tile
      data-tile-col={col}
      data-tile-row={row}
      className="aspect-square w-full min-w-0"
      style={
        {
          "--tile-angle": "0deg",
          background: `linear-gradient(var(--tile-angle), ${TILE_COLOR_A}, ${TILE_COLOR_B})`,
        } as React.CSSProperties
      }
    />
  );
}

function TilePanel({ panelKey }: { panelKey: string }) {
  return (
    <div
      className={
        driftIsVertical
          ? "grid h-1/2 min-h-0 w-full shrink-0 auto-rows-auto content-start"
          : "grid h-full min-w-0 w-1/2 shrink-0 auto-rows-auto content-start"
      }
      style={{
        gridTemplateColumns: `repeat(${tileCols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: TILE_COUNT }).map((_, i) => (
        <TileCell key={`${panelKey}-${i}`} index={i} />
      ))}
    </div>
  );
}

export default function HeroAnimatedBg() {
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const tilesLayerRef = useRef<HTMLDivElement | null>(null);
  const tilesTrackRef = useRef<HTMLDivElement | null>(null);
  const heroAnimScopeRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroDescRef = useRef<HTMLParagraphElement | null>(null);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = tilesLayerRef.current;
      const track = tilesTrackRef.current;
      if (!root || !track) return;

      const tiles = root.querySelectorAll<HTMLElement>("[data-hero-tile]");
      if (!tiles.length) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const cols = tileCols;

      tiles.forEach((tile, i) => {
        const local = i % TILE_COUNT;
        const col = local % cols;
        const row = Math.floor(local / cols);
        if (prefersReduced) {
          const base = tileAngleBaseDeg(col, row);
          tile.style.background = `linear-gradient(${base}deg, ${TILE_COLOR_A}, ${TILE_COLOR_B})`;
        }
      });

      let driftTween: gsap.core.Tween | null = null;
      if (!prefersReduced && HERO_TILE_OPTIONS.drift.enabled) {
        gsap.killTweensOf(track);
        const dur = HERO_TILE_OPTIONS.drift.durationSec;
        const dir = HERO_TILE_OPTIONS.drift.direction;

        if (dir === "left") {
          driftTween = gsap.fromTo(
            track,
            { xPercent: 0, yPercent: 0 },
            {
              xPercent: -50,
              yPercent: 0,
              duration: dur,
              ease: "none",
              repeat: -1,
            },
          );
        } else if (dir === "right") {
          driftTween = gsap.fromTo(
            track,
            { xPercent: -50, yPercent: 0 },
            {
              xPercent: 0,
              yPercent: 0,
              duration: dur,
              ease: "none",
              repeat: -1,
            },
          );
        } else if (dir === "up") {
          driftTween = gsap.fromTo(
            track,
            { xPercent: 0, yPercent: 0 },
            {
              xPercent: 0,
              yPercent: -50,
              duration: dur,
              ease: "none",
              repeat: -1,
            },
          );
        } else {
          driftTween = gsap.fromTo(
            track,
            { xPercent: 0, yPercent: -50 },
            {
              xPercent: 0,
              yPercent: 0,
              duration: dur,
              ease: "none",
              repeat: -1,
            },
          );
        }
      }

      if (prefersReduced) {
        return () => {
          driftTween?.kill();
        };
      }

      const tilesArr = Array.from(tiles) as HTMLElement[];
      const motion = tilesArr.map((_, i) => {
        const local = i % TILE_COUNT;
        return tileMotionParams(local % cols, Math.floor(local / cols));
      });

      const tick = () => {
        const t = performance.now() / 1000;
        for (let i = 0; i < tilesArr.length; i++) {
          const el = tilesArr[i]!;
          const p = motion[i]!;
          const deg =
            p.base + Math.sin(t * p.speed + p.phase) * (p.ampDeg * 0.5);
          el.style.setProperty("--tile-angle", `${deg}deg`);
        }
      };

      tick();
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        driftTween?.kill();
      };
    },
    { scope: heroCardRef, dependencies: [] },
  );

  useGSAP(
    () => {
      const title = heroTitleRef.current;
      const desc = heroDescRef.current;
      const cta = heroCtaRef.current;
      if (!title || !desc || !cta) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.killTweensOf([title, desc, cta]);

      if (prefersReduced) {
        gsap.set([title, desc, cta], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set([title, desc, cta], { autoAlpha: 0, y: -28 });

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(title, { autoAlpha: 1, y: 0, duration: 0.88 })
        .to(desc, { autoAlpha: 1, y: 0, duration: 0.75 }, ">+=0.22")
        .to(cta, { autoAlpha: 1, y: 0, duration: 0.68 }, ">+=0.22");
    },
    { scope: heroAnimScopeRef, revertOnUpdate: true },
  );

  return (
    <div className="p-6">
      <div
        ref={heroCardRef}
        aria-labelledby="advanced-slider-hero-title"
        className="relative overflow-hidden rounded-4xl bg-[#004152] py-24 text-white"
      >
        <div
          ref={tilesLayerRef}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div
            ref={tilesTrackRef}
            className={
              driftIsVertical
                ? "flex h-[200%] w-full min-w-0 flex-col will-change-transform"
                : "flex h-full w-[200%] min-w-0 flex-row will-change-transform"
            }
          >
            <TilePanel panelKey="a" />
            <TilePanel panelKey="b" />
          </div>
        </div>

        <div
          ref={heroAnimScopeRef}
          className="relative z-[1] mx-auto flex w-full max-w-[1240px] flex-col items-center gap-6 text-center"
        >
          <h1
            ref={heroTitleRef}
            id="advanced-slider-hero-title"
            className="m-0 w-full max-w-[500px] text-balance text-[52px] leading-16 font-semibold"
          >
            Atomix Loan Operating System
          </h1>
          <p
            ref={heroDescRef}
            className="m-0 w-full max-w-[36rem] text-[24px] font-normal text-white/70"
          >
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
            dolor sit amet lorem ipsum.
          </p>
          <div ref={heroCtaRef}>
            <Button variant="primary" type="button">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
