import HeroAnimatedBg from "@/components/HeroAnimatedBg";

export default function AnimatedBgPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-4 py-10">
      <section
        className="flex flex-col gap-3"
        aria-labelledby="animated-bg-drift-heading"
      >
        <h2
          id="animated-bg-drift-heading"
          className="m-0 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
        >
          Infinite tile drift
        </h2>
        <p className="m-0 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
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
          className="m-0 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
        >
          Rotating tile gradients
        </h2>
        <p className="m-0 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
          The grid stays still; each tile&apos;s linear-gradient rotates
          continuously.
        </p>
        <HeroAnimatedBg
          heroTitleId="animated-bg-hero-gradient"
          tileDisplayMode="gradient"
        />
      </section>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="animated-bg-grid-distortion-heading"
      >
        <h2
          id="animated-bg-grid-distortion-heading"
          className="m-0 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
        >
          WebGL grid distortion
        </h2>
        <p className="m-0 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
          Same hero layout and GSAP intro as above. The card background is a
          Three.js shader: a grid samples and warps the image as you move the
          pointer—no mosaic tile layer.
        </p>
        <HeroAnimatedBg
          heroTitleId="animated-bg-hero-static"
          tileDisplayMode="static"
          heroCardBackgroundImage="/global/akif-waseem-sTF5sS0YvgA-unsplash-2.jpg"
          heroCardGridDistortion
        />
      </section>
    </main>
  );
}
