"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";

gsap.registerPlugin(useGSAP);

/**
 * Quick controls for the hero tile mosaic (edit this object only).
 *
 * - **columns** — grid column count; tiles are square, so tile edge ≈ `100% / columns`.
 * - **rows** — number of tile rows (top → bottom).
 * - **gradient.from / .to** — `linear-gradient` endpoints on every tile.
 *
 * Angle motion uses **one** `gsap.ticker` callback for the whole grid (not one tween
 * per tile), so very large `columns` × `rows` counts stay smooth. Each cell’s motion is
 * derived only from **(column, row)**, so the look stays consistent when you change size.
 */
export const HERO_TILE_OPTIONS = {
  columns: 20,
  rows: 20,
  gradient: {
    from: "#0C4A5A",
    to: "#2988A1",
  },
} as const;

const tileCols = HERO_TILE_OPTIONS.columns;
const tileRows = HERO_TILE_OPTIONS.rows;
const TILE_COUNT = tileCols * tileRows;
const TILE_COLOR_A = HERO_TILE_OPTIONS.gradient.from;
const TILE_COLOR_B = HERO_TILE_OPTIONS.gradient.to;

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
    /** Peak ± swing in degrees around `base` */
    ampDeg: 28 + (norm % 68),
    speed: 0.045 + ((norm * 13) % 70) * 0.00165,
    phase: ((norm * 17) % 628) * 0.01,
  };
}

export default function HeroAnimatedBg() {
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const tilesLayerRef = useRef<HTMLDivElement | null>(null);
  const heroAnimScopeRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroDescRef = useRef<HTMLParagraphElement | null>(null);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = tilesLayerRef.current;
      if (!root) return;

      const tiles = root.querySelectorAll<HTMLElement>("[data-hero-tile]");
      if (!tiles.length) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const cols = tileCols;

      tiles.forEach((tile, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        if (prefersReduced) {
          const base = tileAngleBaseDeg(col, row);
          tile.style.background = `linear-gradient(${base}deg, ${TILE_COLOR_A}, ${TILE_COLOR_B})`;
        }
      });

      if (prefersReduced) return;

      const tilesArr = Array.from(tiles) as HTMLElement[];
      const motion = tilesArr.map((_, i) =>
        tileMotionParams(i % cols, Math.floor(i / cols)),
      );

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
          className="pointer-events-none absolute inset-0 z-0 grid min-h-full w-full auto-rows-auto content-start"
          style={{
            gridTemplateColumns: `repeat(${tileCols}, minmax(0, 1fr))`,
          }}
          aria-hidden
        >
          {Array.from({ length: TILE_COUNT }).map((_, i) => (
            <div
              key={i}
              data-hero-tile
              className="aspect-square w-full min-w-0"
              style={
                {
                  "--tile-angle": "0deg",
                  background: `linear-gradient(var(--tile-angle), ${TILE_COLOR_A}, ${TILE_COLOR_B})`,
                } as React.CSSProperties
              }
            />
          ))}
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
