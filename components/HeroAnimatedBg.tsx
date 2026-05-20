"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";
import GridDistortion from "@/react-bits/GridDistortion";
import DotGrid, { type DotGridProps } from "@/react-bits/DotGrid";
import {
  HERO_FIXED_TILE_MOSAIC,
  normalizeTileHex,
  shiftFixedTileColor,
} from "@/components/heroFixedTileMosaic";

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
const GRADIENT_MOTION_SPEED = HERO_TILE_OPTIONS.gradientMotion.speedMultiplier;

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

const fixedTileCols = HERO_FIXED_TILE_MOSAIC.columns;
const fixedTileRows = HERO_FIXED_TILE_MOSAIC.rows;

function FixedTilePanel() {
  return (
    <div
      className="grid h-full min-h-0 w-full min-w-0"
      style={{
        gridTemplateColumns: `repeat(${fixedTileCols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${fixedTileRows}, minmax(0, 1fr))`,
      }}
    >
      {HERO_FIXED_TILE_MOSAIC.colors.map((row, rowIndex) =>
        row.map((color, colIndex) => {
          const base = normalizeTileHex(color);
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              data-fixed-tile
              data-tile-color={base}
              className="min-h-0 min-w-0"
              style={{ backgroundColor: base }}
              aria-hidden
            />
          );
        }),
      )}
    </div>
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

export type HeroAnimatedBgTileDisplayMode =
  | "drift"
  | "gradient"
  | "static"
  | "fixedMosaic";

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
   * `static` — solid card background only; no tile layer or background motion.
   * `fixedMosaic` — 12×4 solid-color tiles (see `HERO_FIXED_TILE_MOSAIC`); count stays fixed at all widths.
   */
  tileDisplayMode?: HeroAnimatedBgTileDisplayMode;
  /**
   * Optional URL for the rounded hero card only (not the outer `p-6` wrapper).
   * Renders as `background-size: cover` over the fallback `bg-[#004152]`, unless
   * `heroCardGridDistortion` is true (then this URL is passed to `GridDistortion`).
   */
  heroCardBackgroundImage?: string;
  /**
   * When true with `tileDisplayMode="static"` and `heroCardBackgroundImage`, the
   * card uses `GridDistortion` as a full-bleed background instead of a CSS image.
   * Ignored if `heroCardDotGrid` is true.
   */
  heroCardGridDistortion?: boolean;
  /**
   * When true with `tileDisplayMode="static"`, the card uses the canvas `DotGrid`
   * as a full-bleed background (no mosaic tiles). Takes precedence over
   * `heroCardGridDistortion` / CSS `heroCardBackgroundImage`.
   */
  heroCardDotGrid?: boolean;
  /** Optional props forwarded to `DotGrid` when `heroCardDotGrid` is true. */
  heroCardDotGridProps?: Partial<DotGridProps>;
  /** Hero heading copy. */
  title?: string;
  /** Hero supporting copy. */
  description?: string;
  /** Optional classes for the hero title element. */
  titleClassName?: string;
  /** Optional classes for the hero description element. */
  descriptionClassName?: string;
  /**
   * `stacked` — centered title above description (platform default).
   * `row` — title and description on one row with a shorter hero height.
   */
  contentLayout?: "stacked" | "row";
  /** When false, hides the hero CTA button. */
  showCta?: boolean;
};

const DEFAULT_HERO_TITLE_ID = "advanced-slider-hero-title";

const DEFAULT_HERO_TITLE = "Atomix Loan Operating System";
const DEFAULT_HERO_DESCRIPTION =
  "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum.";

export default function HeroAnimatedBg({
  heroTitleId = DEFAULT_HERO_TITLE_ID,
  tileDisplayMode = "gradient",
  heroCardBackgroundImage,
  heroCardGridDistortion = false,
  heroCardDotGrid = false,
  heroCardDotGridProps,
  title = DEFAULT_HERO_TITLE,
  description = DEFAULT_HERO_DESCRIPTION,
  titleClassName = "",
  descriptionClassName = "",
  contentLayout = "stacked",
  showCta = true,
}: HeroAnimatedBgProps = {}) {
  const staticBg = tileDisplayMode === "static";
  const fixedMosaicBg = tileDisplayMode === "fixedMosaic";
  const dotGridBg = staticBg && heroCardDotGrid;
  const hasHeroCardImage =
    heroCardBackgroundImage != null && heroCardBackgroundImage !== "";
  const gridDistortionBg =
    staticBg && !dotGridBg && heroCardGridDistortion && hasHeroCardImage;
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
    if (staticBg || fixedMosaicBg) return;

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
  }, [driftActive, fixedMosaicBg, staticBg]);

  useGSAP(
    () => {
      if (!fixedMosaicBg) return;

      const root = tilesLayerRef.current;
      if (!root) return;

      const tiles = root.querySelectorAll<HTMLElement>("[data-fixed-tile]");
      if (!tiles.length) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const { motion } = HERO_FIXED_TILE_MOSAIC;
      const { min: durMin, max: durMax } = motion.durationSec;
      const durSpan = durMax - durMin;

      tiles.forEach((tile, index) => {
        const base = tile.dataset.tileColor;
        if (!base) return;

        const col = index % fixedTileCols;
        const row = Math.floor(index / fixedTileCols);
        const seed = col * 928371 + row * 482711 + index * 131;
        const norm = ((seed % 10000) + 10000) % 10000;
        const direction: 1 | -1 = norm % 2 === 0 ? 1 : -1;
        const target = shiftFixedTileColor(base, direction);
        const duration = durMin + (norm / 10000) * durSpan;
        const delay = (norm * 0.00031) % motion.delaySpreadSec;

        gsap.fromTo(
          tile,
          { backgroundColor: base },
          {
            backgroundColor: target,
            duration,
            delay,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          },
        );
      });
    },
    {
      scope: tilesLayerRef,
      dependencies: [fixedMosaicBg],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      const titleEl = heroTitleRef.current;
      const desc = heroDescRef.current;
      const cta = heroCtaRef.current;
      if (!titleEl || !desc) return;

      const animatedTargets =
        showCta && cta ? [titleEl, desc, cta] : [titleEl, desc];

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.killTweensOf(animatedTargets);

      if (prefersReduced) {
        gsap.set(animatedTargets, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(animatedTargets, { autoAlpha: 0, y: -28 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(titleEl, { autoAlpha: 1, y: 0, duration: 0.88 }).to(
        desc,
        { autoAlpha: 1, y: 0, duration: 0.75 },
        ">+=0.22",
      );

      if (showCta && cta) {
        tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.68 }, ">+=0.22");
      }
    },
    { scope: heroAnimScopeRef, revertOnUpdate: true, dependencies: [showCta] },
  );

  const heroCardStyle =
    hasHeroCardImage && !gridDistortionBg && !dotGridBg
      ? {
          backgroundColor: "#004152",
          backgroundImage: `url("${heroCardBackgroundImage}")`,
          backgroundSize: "cover" as const,
          backgroundPosition: "center" as const,
          backgroundRepeat: "no-repeat" as const,
        }
      : gridDistortionBg || dotGridBg
        ? { backgroundColor: "#004152" }
        : undefined;

  const heroCardHasCustomBg = hasHeroCardImage || gridDistortionBg || dotGridBg;
  const isRowLayout = contentLayout === "row";
  const heroCardPaddingClass = isRowLayout ? "py-14 md:py-16" : "py-24";

  return (
    <div>
      <div
        ref={heroCardRef}
        aria-labelledby={heroTitleId}
        className={
          heroCardHasCustomBg
            ? `relative overflow-hidden rounded-4xl ${heroCardPaddingClass} text-white`
            : `relative overflow-hidden rounded-4xl bg-[#004152] ${heroCardPaddingClass} text-white`
        }
        style={heroCardStyle}
      >
        {dotGridBg ? (
          <div className="absolute inset-0 z-0 min-h-0 min-w-0" aria-hidden>
            <DotGrid
              {...(heroCardDotGridProps ?? {})}
              className={`!p-0 min-h-0 min-w-0 ${heroCardDotGridProps?.className ?? ""}`}
            />
          </div>
        ) : null}

        {gridDistortionBg ? (
          <div className="absolute inset-0 z-0 min-h-0 min-w-0" aria-hidden>
            <GridDistortion
              imageSrc={heroCardBackgroundImage}
              className="min-h-0 min-w-0"
              strength={0.3}
              grid={30}
            />
          </div>
        ) : null}

        {!staticBg ? (
          <div
            ref={tilesLayerRef}
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden
          >
            {fixedMosaicBg ? (
              <FixedTilePanel />
            ) : (
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
            )}
          </div>
        ) : null}

        <div
          ref={heroAnimScopeRef}
          className={
            isRowLayout
              ? "relative z-[1] mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-8 md:px-12"
              : gridDistortionBg
                ? "pointer-events-none relative z-[1] mx-auto flex w-full max-w-[1240px] flex-col items-center gap-6 text-center"
                : "relative z-[1] mx-auto flex w-full max-w-[1240px] flex-col items-center gap-6 text-center"
          }
        >
          {isRowLayout ? (
            <div className="flex w-full flex-row items-end justify-between gap-6 lg:gap-16">
              <h1
                ref={heroTitleRef}
                id={heroTitleId}
                className="m-0 min-w-0 shrink-0 text-left text-[32px] leading-[1.1] font-semibold sm:text-[40px] md:max-w-[42%] md:text-[52px]"
              >
                {title}
              </h1>
              <p
                ref={heroDescRef}
                className="m-0 min-w-0 text-left text-[16px] font-normal text-white/70 sm:text-[20px] md:max-w-[52%] md:text-[24px]"
              >
                {description}
              </p>
            </div>
          ) : (
            <>
              <h1
                ref={heroTitleRef}
                id={heroTitleId}
                className={`m-0 w-full max-w-[800px] text-balance text-[52px] leading-16 font-semibold ${titleClassName}`}
              >
                {title}
              </h1>
              <p
                ref={heroDescRef}
                className={`m-0 w-full max-w-[1200px] text-[24px] font-normal text-white/70 ${descriptionClassName}`}
              >
                {description}
              </p>
            </>
          )}
          {showCta ? (
            <div
              ref={heroCtaRef}
              className={
                isRowLayout
                  ? undefined
                  : gridDistortionBg
                    ? "pointer-events-auto"
                    : undefined
              }
            >
              <Button variant="primary" type="button">
                Contact us
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
