"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";

gsap.registerPlugin(useGSAP);

/**
 * Quick controls for the hero tile mosaic (edit this object only).
 *
 * - **columns / rows** — grid size; tiles stay square. Rotation uses one GSAP ticker.
 * - **gradient** — `linear-gradient` endpoints; each tile’s angle spins continuously.
 * - **gradientMotion** — global multiplier for rotation speed.
 * - **drift** — duration/direction for the infinite mosaic tween when a hero uses
 *   `tileDisplayMode="drift"` (see component props).
 */
export const HERO_TILE_OPTIONS = {
  columns: 24,
  rows: 24,
  gradient: {
    from: "#0C4A5A",
    to: "#2988A1",
  },
  gradientMotion: {
    /** Multiplies each tile’s degrees-per-second (1 = default). */
    speedMultiplier: 1,
  },
  drift: {
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
const GRADIENT_MOTION_SPEED =
  HERO_TILE_OPTIONS.gradientMotion.speedMultiplier;

function tileGradientCss(deg: number) {
  return `linear-gradient(${deg}deg, ${TILE_COLOR_A}, ${TILE_COLOR_B})`;
}

/**
 * Infinite seamless scroll of the mosaic track (two `TilePanel`s required in JSX).
 */
function startHeroTileDriftTween(track: HTMLElement): gsap.core.Tween | null {
  const { durationSec, direction } = HERO_TILE_OPTIONS.drift;

  gsap.killTweensOf(track);
  const dur = durationSec;
  const dir = direction;

  if (dir === "left") {
    return gsap.fromTo(
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
  }
  if (dir === "right") {
    return gsap.fromTo(
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
  }
  if (dir === "up") {
    return gsap.fromTo(
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
  }
  return gsap.fromTo(
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

/** Stable base angle for grid cell (col, row) — same cell always same hue layout. */
function tileAngleBaseDeg(col: number, row: number) {
  const v = col * 137.508 + row * 91.17 + ((col * 17 + row * 23) % 7) * 49.21;
  return ((v % 360) + 360) % 360;
}

/** Per-tile continuous rotation (deg/s), direction, and phase — deterministic. */
function tileRotationParams(col: number, row: number) {
  const seed = col * 928371 + row * 482711;
  const norm = ((seed % 10000) + 10000) % 10000;
  const base = tileAngleBaseDeg(col, row);
  const degPerSecRaw = 22 + (norm % 38);
  const direction = norm % 2 === 0 ? 1 : -1;
  const degPerSec = degPerSecRaw * direction * GRADIENT_MOTION_SPEED;
  const phaseDeg = (norm * 0.137) % 360;
  return { base, degPerSec, phaseDeg };
}

function TileCell({ index }: { index: number }) {
  const col = index % tileCols;
  const row = Math.floor(index / tileCols);
  return (
    <div
      data-hero-tile
      data-tile-col={col}
      data-tile-row={row}
      className="aspect-square w-full min-w-0 bg-[#0C4A5A]"
    />
  );
}

function TilePanel({
  panelKey,
  driftActive,
  driftIsVertical,
}: {
  panelKey: string;
  driftActive: boolean;
  driftIsVertical: boolean;
}) {
  const panelLayoutClass = driftActive
    ? driftIsVertical
      ? "grid h-1/2 min-h-0 w-full shrink-0 auto-rows-auto content-start"
      : "grid h-full min-w-0 w-1/2 shrink-0 auto-rows-auto content-start"
    : "grid h-full min-h-0 w-full min-w-0 shrink-0 auto-rows-auto content-start";

  return (
    <div
      className={panelLayoutClass}
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

export type HeroAnimatedBgTileDisplayMode = "drift" | "gradient";

export type HeroAnimatedBgProps = {
  /**
   * Id for the hero `<h1>`; the card uses `aria-labelledby` pointing at this id.
   * Use a unique value when multiple heroes appear on one page.
   */
  heroTitleId?: string;
  /**
   * `drift` — infinite mosaic scroll sideways (or per `HERO_TILE_OPTIONS.drift.direction`);
   * tile gradients stay fixed per cell.
   * `gradient` — rotating linear-gradient per tile; no mosaic drift.
   */
  tileDisplayMode?: HeroAnimatedBgTileDisplayMode;
};

const DEFAULT_HERO_TITLE_ID = "advanced-slider-hero-title";

export default function HeroAnimatedBg({
  heroTitleId = DEFAULT_HERO_TITLE_ID,
  tileDisplayMode = "gradient",
}: HeroAnimatedBgProps = {}) {
  const driftActive = tileDisplayMode === "drift";
  const driftIsVertical =
    driftActive &&
    (HERO_TILE_OPTIONS.drift.direction === "up" ||
      HERO_TILE_OPTIONS.drift.direction === "down");
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const tilesLayerRef = useRef<HTMLDivElement | null>(null);
  const tilesTrackRef = useRef<HTMLDivElement | null>(null);
  const heroAnimScopeRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroDescRef = useRef<HTMLParagraphElement | null>(null);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  // Tile gradients are driven only from this effect (not React `style`), so parent
  // re-renders cannot reset `--tile-angle` / background each frame.
  useLayoutEffect(() => {
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
      const base = tileAngleBaseDeg(col, row);
      tile.style.background = tileGradientCss(base);
    });

    let driftTween: gsap.core.Tween | null = null;
    if (!prefersReduced && driftActive) {
      driftTween = startHeroTileDriftTween(track);
    }

    if (prefersReduced) {
      return () => {
        driftTween?.kill();
      };
    }

    if (driftActive) {
      return () => {
        driftTween?.kill();
      };
    }

    const tilesArr = Array.from(tiles) as HTMLElement[];
    const motion = tilesArr.map((_, i) => {
      const local = i % TILE_COUNT;
      return tileRotationParams(local % cols, Math.floor(local / cols));
    });

    const tick = () => {
      const t = performance.now() / 1000;
      for (let i = 0; i < tilesArr.length; i++) {
        const el = tilesArr[i]!;
        const p = motion[i]!;
        const deg = p.base + p.phaseDeg + t * p.degPerSec;
        const wrapped = ((deg % 360) + 360) % 360;
        el.style.background = tileGradientCss(wrapped);
      }
    };

    tick();
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      driftTween?.kill();
    };
  }, [driftActive]);

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
        aria-labelledby={heroTitleId}
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
              driftActive
                ? driftIsVertical
                  ? "flex h-[200%] w-full min-w-0 flex-col will-change-transform"
                  : "flex h-full w-[200%] min-w-0 flex-row will-change-transform"
                : "flex h-full w-full min-w-0 flex-row"
            }
          >
            <TilePanel
              panelKey="a"
              driftActive={driftActive}
              driftIsVertical={driftIsVertical}
            />
            {driftActive ? (
              <TilePanel
                panelKey="b"
                driftActive={driftActive}
                driftIsVertical={driftIsVertical}
              />
            ) : null}
          </div>
        </div>

        <div
          ref={heroAnimScopeRef}
          className="relative z-[1] mx-auto flex w-full max-w-[1240px] flex-col items-center gap-6 text-center"
        >
          <h1
            ref={heroTitleRef}
            id={heroTitleId}
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
