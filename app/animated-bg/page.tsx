import HeroAnimatedBg from "@/components/HeroAnimatedBg";

export default function AnimatedBgPage() {
  return (
    <main className="mx-auto flex w-full flex-col gap-16 px-10 py-10">
      <section
        className="flex flex-col gap-6"
        aria-labelledby="animated-bg-drift-heading"
      >
        <h2
          id="animated-bg-drift-heading"
          className="m-0 text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
        >
          Infinite tile drift
        </h2>
        <p className="mb-3 max-w-4xl text-sm text-neutral-600 dark:text-neutral-400">
          The mosaic scrolls horizontally on a loop (two panels). Each tile
          keeps a fixed gradient angle.
        </p>
        <HeroAnimatedBg
          heroTitleId="animated-bg-hero-drift"
          tileDisplayMode="drift"
        />
      </section>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="animated-bg-gradient-heading"
      >
        <h2
          id="animated-bg-gradient-heading"
          className="m-0 text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
        >
          Rotating tile gradients
        </h2>
        <p className="mb-3 max-w-4xl text-sm text-neutral-600 dark:text-neutral-400">
          The grid stays still and each tile&apos;s linear-gradient rotates
          continuously.
        </p>
        <HeroAnimatedBg
          heroTitleId="animated-bg-hero-gradient"
          tileDisplayMode="gradient"
        />
      </section>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="animated-bg-fixed-mosaic-heading"
      >
        <h2
          id="animated-bg-fixed-mosaic-heading"
          className="m-0 text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
        >
          Fixed teal mosaic
        </h2>
        <p className="mb-3 max-w-4xl text-sm text-neutral-600 dark:text-neutral-400">
          A 12×4 grid of solid tiles (48 cells). Tile count stays fixed at every
          breakpoint.
        </p>
        <HeroAnimatedBg
          heroTitleId="animated-bg-hero-fixed-mosaic"
          tileDisplayMode="fixedMosaic"
        />
      </section>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="animated-bg-grid-distortion-heading"
      >
        <h2
          id="animated-bg-grid-distortion-heading"
          className="m-0 text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
        >
          WebGL grid distortion
        </h2>
        <p className="mb-3 max-w-4xl text-sm text-neutral-600 dark:text-neutral-400">
          The card background is a Three.js shader. a grid samples and warps the
          image as you move the pointer.
        </p>
        <HeroAnimatedBg
          heroTitleId="animated-bg-hero-grid-distortion"
          tileDisplayMode="static"
          heroCardBackgroundImage="/global/akif-waseem-sTF5sS0YvgA-unsplash-2.jpg"
          heroCardGridDistortion
        />
      </section>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="animated-bg-dot-grid-heading"
      >
        <h2
          id="animated-bg-dot-grid-heading"
          className="m-0 text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
        >
          Interactive dot grid
        </h2>
        <p className="mb-3 max-w-4xl text-sm text-neutral-600 dark:text-neutral-400">
          The card background is a canvas dot field with GSAP Inertia on pointer
          motion and click shocks.
        </p>
        <HeroAnimatedBg
          heroTitleId="animated-bg-hero-dot-grid"
          tileDisplayMode="static"
          heroCardDotGrid
          heroCardDotGridProps={{
            baseColor: "#0a5568",
            activeColor: "#7dd3fc",
            dotSize: 20,
            gap: 20,
          }}
        />
      </section>
    </main>
  );
}
