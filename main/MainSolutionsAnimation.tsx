"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconBox from "@/components/IconBox";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import DefHeading from "@/components/typo/DefHeading";
import { Button as DefButton } from "@/components/ui";
import { CURRENT_STATUS_GLOW_CONFIG } from "@/components/current-status/glowConfig";

gsap.registerPlugin(ScrollTrigger);

const GLOW_CONFIG = {
  ...CURRENT_STATUS_GLOW_CONFIG,
  blur: CURRENT_STATUS_GLOW_CONFIG.blurPx,
};

const CONNECTOR_STROKE = "#7ccbe6";

function IconText({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={icon} alt="" className="w-10 h-10" />
      <p className="text-md font-semibold text-white text-center">{text}</p>
    </div>
  );
}

function SquareBadge({ text }: { text: string }) {
  return (
    <div className="w-full px-3 py-2 border border-white/14 bg-[#165161] rounded-md text-center text-sm text-white font-bold">
      {text}
    </div>
  );
}

export default function MainSolutionsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const iconText1Ref = useRef<HTMLDivElement>(null);
  const iconText2Ref = useRef<HTMLDivElement>(null);
  const iconText3Ref = useRef<HTMLDivElement>(null);

  const connector1PathRef = useRef<SVGPathElement>(null);
  const connector1GlowRef = useRef<SVGPathElement>(null);
  const connector3PathRef = useRef<SVGPathElement>(null);
  const connector3GlowRef = useRef<SVGPathElement>(null);

  const topPath1Ref = useRef<SVGPathElement>(null);
  const topGlow1Ref = useRef<SVGPathElement>(null);
  const topPath2Ref = useRef<SVGPathElement>(null);
  const topGlow2Ref = useRef<SVGPathElement>(null);
  const topPath3Ref = useRef<SVGPathElement>(null);
  const topGlow3Ref = useRef<SVGPathElement>(null);
  const topPath4Ref = useRef<SVGPathElement>(null);
  const topGlow4Ref = useRef<SVGPathElement>(null);
  const topPath5Ref = useRef<SVGPathElement>(null);
  const topGlow5Ref = useRef<SVGPathElement>(null);

  const bottomPath1Ref = useRef<SVGPathElement>(null);
  const bottomGlow1Ref = useRef<SVGPathElement>(null);
  const bottomPath2Ref = useRef<SVGPathElement>(null);
  const bottomGlow2Ref = useRef<SVGPathElement>(null);
  const bottomPath3Ref = useRef<SVGPathElement>(null);
  const bottomGlow3Ref = useRef<SVGPathElement>(null);
  const bottomPath4Ref = useRef<SVGPathElement>(null);
  const bottomGlow4Ref = useRef<SVGPathElement>(null);

  const row2Box1Ref = useRef<HTMLDivElement>(null);
  const row2Box2Ref = useRef<HTMLDivElement>(null);
  const row2Box3Ref = useRef<HTMLDivElement>(null);
  const row2Box4Ref = useRef<HTMLDivElement>(null);
  const row2Box5Ref = useRef<HTMLDivElement>(null);
  const row2Box6Ref = useRef<HTMLDivElement>(null);

  const row3Connector2PathRef = useRef<SVGPathElement>(null);
  const row3Connector2GlowRef = useRef<SVGPathElement>(null);
  const row3Connector3PathRef = useRef<SVGPathElement>(null);
  const row3Connector3GlowRef = useRef<SVGPathElement>(null);

  const row3Badge1Ref = useRef<HTMLDivElement>(null);
  const row3Badge2Ref = useRef<HTMLDivElement>(null);
  const row3Badge3Ref = useRef<HTMLDivElement>(null);

  const glowTimelines = useRef<gsap.core.Timeline[]>([]);

  const setupHoverEffect = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const element = ref.current;

    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        scale: 1.05,
        zIndex: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        scale: 1,
        zIndex: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  useEffect(() => {
    const animatePathAndGlow = (
      pathRef: React.RefObject<SVGPathElement | null>,
      glowRef: React.RefObject<SVGPathElement | null>,
      duration: number,
      drawFromStart: boolean = false,
    ) => {
      const path = pathRef.current;
      const glow = glowRef.current;
      if (!path) return gsap.timeline();

      const len = path.getTotalLength ? path.getTotalLength() : 1000;
      const tl = gsap.timeline();

      if (drawFromStart) {
        gsap.set(path, {
          attr: {
            "stroke-dasharray": `${len} ${len}`,
            "stroke-dashoffset": `${len}`,
          },
        });
        tl.to(path, {
          attr: { "stroke-dashoffset": "0" },
          duration,
          ease: "power2.inOut",
        });
      } else {
        gsap.set(path, {
          attr: {
            "stroke-dasharray": `${len} ${len}`,
            "stroke-dashoffset": `${-len}`,
          },
        });
        tl.to(path, {
          attr: { "stroke-dashoffset": "0" },
          duration,
          ease: "power2.inOut",
        });
      }

      if (glow) {
        const glowLen = Math.min(GLOW_CONFIG.maxLength, len / 2);

        tl.add(() => {
          const durationScale = gsap.utils.random(
            GLOW_CONFIG.minDurationScale,
            GLOW_CONFIG.maxDurationScale,
          );
          const travelScale = gsap.utils.random(
            GLOW_CONFIG.minTravelScale,
            GLOW_CONFIG.maxTravelScale,
          );
          const travelDuration = GLOW_CONFIG.travelDuration * durationScale;
          const fadeInDuration = GLOW_CONFIG.fadeInDuration * durationScale;
          const fadeOutDuration = GLOW_CONFIG.fadeOutDuration * durationScale;
          const peakOpacity =
            GLOW_CONFIG.maxOpacity * GLOW_CONFIG.peakOpacityScale;
          const midOpacity =
            GLOW_CONFIG.maxOpacity * GLOW_CONFIG.midOpacityScale;
          const tailOpacity =
            GLOW_CONFIG.maxOpacity * GLOW_CONFIG.tailOpacityScale;
          const pulseWidth =
            GLOW_CONFIG.strokeWidth * GLOW_CONFIG.pulseWidthScale;
          const startOffset = drawFromStart ? glowLen : -len * travelScale;
          const endOffset = drawFromStart ? -len * travelScale : glowLen;

          const glowTl = gsap.timeline({
            repeat: -1,
            repeatDelay: GLOW_CONFIG.repeatDelay,
            defaults: { overwrite: "auto" },
            repeatRefresh: true,
          });
          glowTimelines.current.push(glowTl);

          glowTl
            .set(glow, {
              attr: {
                "stroke-dasharray": `${glowLen} ${len + 50}`,
                "stroke-dashoffset": `${startOffset}`,
              },
              opacity: 0,
              strokeWidth: GLOW_CONFIG.strokeWidth,
            })
            .to(glow, {
              attr: { "stroke-dashoffset": `${endOffset}` },
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
        }, `<+=${GLOW_CONFIG.startDelay}`);
      }

      return tl;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // First animate: iconText1Ref, connector1Ref, row2Box1Ref, bottomArrow1Ref, row3Badge1Ref
    tl.fromTo(
      iconText1Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
    )
      .add(animatePathAndGlow(connector1PathRef, connector1GlowRef, 0.7, true))
      .fromTo(
        row2Box1Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .add(animatePathAndGlow(bottomPath1Ref, bottomGlow1Ref, 1, true), "-=0.3")
      .fromTo(
        row3Badge1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )

      // Second animate: iconText2Ref, topPath1, row2Box2Ref, bottomArrow2Ref
      .fromTo(
        iconText2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
      )
      .add(animatePathAndGlow(topPath1Ref, topGlow1Ref, 1.5, false))
      .add(animatePathAndGlow(topPath5Ref, topGlow5Ref, 1.5, false), "<")
      .fromTo(
        row2Box2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .add(animatePathAndGlow(bottomPath2Ref, bottomGlow2Ref, 1, true), "-=0.3")
      .add(animatePathAndGlow(topPath2Ref, topGlow2Ref, 1.5, false))
      .fromTo(
        row2Box3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .add(animatePathAndGlow(bottomPath4Ref, bottomGlow4Ref, 1, true), "-=0.3")

      // Fourth animate: topPath3, row2Box4Ref, bottomArrow4Ref
      .add(animatePathAndGlow(topPath4Ref, topGlow4Ref, 1.5, false))
      .fromTo(
        row2Box4Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .add(animatePathAndGlow(bottomPath3Ref, bottomGlow3Ref, 1, true), "-=0.3")

      // Fifth animate: topPath4, row2Box5Ref, row3Connector2Ref, row3Badge2Ref
      .add(animatePathAndGlow(topPath3Ref, topGlow3Ref, 1.5, false))
      .fromTo(
        row2Box5Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .add(
        animatePathAndGlow(
          row3Connector2PathRef,
          row3Connector2GlowRef,
          0.7,
          true,
        ),
      )
      .fromTo(
        row3Badge2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )

      // Sixth animate: iconText3Ref, connector3Ref, row2Box6Ref, row3Connector3Ref, row3Badge3Ref
      .fromTo(
        iconText3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
      )
      .add(animatePathAndGlow(connector3PathRef, connector3GlowRef, 0.7, true))
      .fromTo(
        row2Box6Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .add(
        animatePathAndGlow(
          row3Connector3PathRef,
          row3Connector3GlowRef,
          0.7,
          true,
        ),
      )
      .fromTo(
        row3Badge3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );

    setupHoverEffect(row2Box1Ref);
    setupHoverEffect(row2Box2Ref);
    setupHoverEffect(row2Box3Ref);
    setupHoverEffect(row2Box4Ref);
    setupHoverEffect(row2Box5Ref);
    setupHoverEffect(row2Box6Ref);

    return () => {
      tl.kill();
      glowTimelines.current.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-[500px]">
        <SoftAurora
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
        />
      </div>

      <div className="relative z-10 flex flex-col gap-y-16 w-full max-w-[1200px] px-8 py-32">
        <DefHeading
          theme="light"
          badgeText=""
          title="The Atomix Solution"
          description={
            <>
              Three distinct layers — trust, rules and intelligence. Blockchain
              underpins everything; rules govern every step; intelligence finds
              the most efficient path through, constrained by both.
              <br />
              Atomix delivers all three — complex logic, self-serve
              modifications, fully automated. No compromises.
            </>
          }
          showBadge={false}
          // onAnimationComplete={handleHeadingComplete}
        />

        <div ref={containerRef}>
          {/* Row 1: 1 col / 4 cols / 1 col */}
          <div className="grid grid-cols-6 gap-4">
            {/* COLUMN 1 */}
            <div className="col-span-1 flex flex-col items-center gap-y-3 relative">
              <div ref={iconText1Ref}>
                <IconText
                  icon="https://api.iconify.design/lucide:cpu.svg?color=white"
                  text="AI"
                />
              </div>
              <div className="h-[72px] w-[2px] mx-auto">
                <svg
                  viewBox="0 0 2 72"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    overflow: "visible",
                  }}
                >
                  <path
                    ref={connector1PathRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={CONNECTOR_STROKE}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={connector1GlowRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={GLOW_CONFIG.color}
                    strokeWidth={GLOW_CONFIG.strokeWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                    opacity="0"
                  />
                </svg>
              </div>

              <div className="w-[194px] h-[72px] absolute bottom-0 left-[86px] -bottom-[0px]">
                <svg
                  viewBox="0 0 195 72"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    overflow: "visible",
                  }}
                >
                  <path
                    ref={topPath5Ref}
                    d="M 193 70 L 193 51 Q 193 36 178 36 L 17 36 Q 2 36 2 21 L 2 2"
                    fill="none"
                    stroke={CONNECTOR_STROKE}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={topGlow5Ref}
                    d="M 193 70 L 193 51 Q 193 36 178 36 L 17 36 Q 2 36 2 21 L 2 2"
                    fill="none"
                    stroke={GLOW_CONFIG.color}
                    strokeWidth={GLOW_CONFIG.strokeWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                    opacity="0"
                  />
                </svg>
              </div>
            </div>

            {/* COLUMN 2 */}
            <div className="col-span-4 flex flex-col items-center gap-y-3">
              <div ref={iconText2Ref}>
                <IconText
                  icon="https://api.iconify.design/lucide:brain-circuit.svg?color=white"
                  text="Complex Reasoning"
                />
              </div>

              <div className="w-full min-h-[72px] relative">
                <div className="w-[294px] absolute left-[84px]">
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
                      ref={topPath1Ref}
                      d="M 2 78 L 2 55 Q 2 40 17 40 L 308 40 Q 323 40 323 25 L 323 2"
                      fill="none"
                      stroke={CONNECTOR_STROKE}
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={topGlow1Ref}
                      d="M 2 78 L 2 55 Q 2 40 17 40 L 308 40 Q 323 40 323 25 L 323 2"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div>

                <div className="w-[101px] absolute left-[276px] -bottom-[0px]">
                  <svg
                    viewBox="0 0 111 80"
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
                      ref={topPath2Ref}
                      d="M 2 78 L 2 55 Q 2 40 17 40 L 94 40 Q 109 40 109 25 L 109 2"
                      fill="none"
                      stroke={CONNECTOR_STROKE}
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={topGlow2Ref}
                      d="M 2 78 L 2 55 Q 2 40 17 40 L 94 40 Q 109 40 109 25 L 109 2"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div>

                <div className="w-[294px] absolute right-[83px] opacity-100">
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
                      ref={topPath3Ref}
                      d="M 323 78 L 323 55 Q 323 40 308 40 L 17 40 Q 2 40 2 25 L 2 2"
                      fill="none"
                      stroke={CONNECTOR_STROKE}
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={topGlow3Ref}
                      d="M 323 78 L 323 55 Q 323 40 308 40 L 17 40 Q 2 40 2 25 L 2 2"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div>

                <div className="w-[101px] absolute right-[276px] -bottom-[0px]">
                  <svg
                    viewBox="0 0 111 80"
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
                      ref={topPath4Ref}
                      d="M 109 78 L 109 55 Q 109 40 94 40 L 17 40 Q 2 40 2 25 L 2 2"
                      fill="none"
                      stroke={CONNECTOR_STROKE}
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={topGlow4Ref}
                      d="M 109 78 L 109 55 Q 109 40 94 40 L 17 40 Q 2 40 2 25 L 2 2"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* COLUMN 3 */}
            <div className="col-span-1 flex flex-col items-center gap-y-3">
              <div ref={iconText3Ref}>
                <IconText
                  icon="https://api.iconify.design/lucide:link.svg?color=white"
                  text="Blockchain"
                />
              </div>
              <div className="h-[72px] w-[2px] mx-auto">
                <svg
                  viewBox="0 0 2 72"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    overflow: "visible",
                  }}
                >
                  <path
                    ref={connector3PathRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={CONNECTOR_STROKE}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={connector3GlowRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={GLOW_CONFIG.color}
                    strokeWidth={GLOW_CONFIG.strokeWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                    opacity="0"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 2: 1 col / 1 col / 1 col / 1 col / 1 col / 1 col */}
          <div className="grid grid-cols-6 gap-4 relative z-10">
            <div ref={row2Box1Ref} className="col-span-1 relative">
              <IconBox
                src="https://api.iconify.design/lucide:file-check.svg?color=white"
                imageSize="small"
                title="Rule first architecture"
                description={
                  <div className="flex flex-col gap-y-2">
                    <div>Uses AI to build loan products</div>
                    <div>The system builds optimal workflows automatically</div>
                  </div>
                }
                className="!p-4"
              />
            </div>
            <div ref={row2Box2Ref} className="col-span-1 relative">
              <IconBox
                src="https://api.iconify.design/lucide:target.svg?color=white"
                imageSize="small"
                title="Goal-driven reasoning"
                description="AI Adjusts underwriting strategies in real time, delivering the most efficient route to a viable loan"
                className="!p-4"
              />
            </div>
            <div ref={row2Box3Ref} className="col-span-1 relative">
              <IconBox
                src="https://api.iconify.design/lucide:puzzle.svg?color=white"
                imageSize="small"
                title="Composable logic blocks"
                description="Adapts to any loan type or complexity without developer involvement"
                className="!p-4"
              />
            </div>
            <div ref={row2Box4Ref} className="col-span-1 relative">
              <IconBox
                src="https://api.iconify.design/lucide:shield-check.svg?color=white"
                imageSize="small"
                title="Automated policy enforcement"
                description="Credit rules are reliably automatically enforced, ensuring every loan complies"
                className="!p-4"
              />
            </div>
            <div ref={row2Box5Ref} className="col-span-1 relative">
              <IconBox
                src="https://api.iconify.design/lucide:users.svg?color=white"
                imageSize="small"
                title="Unified workspace"
                description="All stakeholders collaborate in real time with live loan status visible to all"
                className="!p-4"
              />
            </div>
            <div ref={row2Box6Ref} className="col-span-1 relative">
              <IconBox
                src="https://api.iconify.design/lucide:file-search.svg?color=white"
                imageSize="small"
                title="Blockchain audit layer"
                description="Immutable record of every decision for trust-less verification"
                className="!p-4"
              />
            </div>
          </div>

          {/* Row 3: 4 cols / 1 col / 1 col */}
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4 flex flex-col items-center">
              <div className="w-full min-h-[72px] relative">
                {/* Bottom arrow 1 - flipped from topPath1 */}
                <div className="w-[294px] absolute left-[83px] bottom-0">
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
                      ref={bottomPath1Ref}
                      d="M 2 2 L 2 25 Q 2 40 17 40 L 308 40 Q 323 40 323 55 L 323 78"
                      fill="none"
                      stroke={CONNECTOR_STROKE}
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={bottomGlow1Ref}
                      d="M 2 2 L 2 25 Q 2 40 17 40 L 308 40 Q 323 40 323 55 L 323 78"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div>

                {/* Bottom arrow 2 - flipped from topPath2 */}
                {/* <div className="w-[101px] absolute left-[276px] -bottom-[1px] opacity-100">
                  <svg
                    viewBox="0 0 111 80"
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
                      ref={bottomPath2Ref}
                      d="M 2 2 L 2 25 Q 2 40 17 40 L 94 40 Q 109 40 109 55 L 109 78"
                      fill="none"
                      stroke="#90abb3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={bottomGlow2Ref}
                      d="M 2 2 L 2 25 Q 2 40 17 40 L 94 40 Q 109 40 109 55 L 109 78"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div> */}

                {/* Bottom arrow 4 - flipped from topPath3 (right side) */}
                <div className="w-[294px] absolute right-[83px] bottom-0">
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
                      ref={bottomPath3Ref}
                      d="M 323 2 L 323 25 Q 323 40 308 40 L 17 40 Q 2 40 2 55 L 2 78"
                      fill="none"
                      stroke={CONNECTOR_STROKE}
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={bottomGlow3Ref}
                      d="M 323 2 L 323 25 Q 323 40 308 40 L 17 40 Q 2 40 2 55 L 2 78"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div>

                {/* Bottom arrow 3 - flipped from topPath4 (right side) */}
                {/* <div className="w-[101px] absolute right-[276px] -bottom-[1px]">
                  <svg
                    viewBox="0 0 111 80"
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
                      ref={bottomPath4Ref}
                      d="M 109 2 L 109 25 Q 109 40 94 40 L 17 40 Q 2 40 2 55 L 2 78"
                      fill="none"
                      stroke="#90abb3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={bottomGlow4Ref}
                      d="M 109 2 L 109 25 Q 109 40 94 40 L 17 40 Q 2 40 2 55 L 2 78"
                      fill="none"
                      stroke={GLOW_CONFIG.color}
                      strokeWidth={GLOW_CONFIG.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                      opacity="0"
                    />
                  </svg>
                </div> */}
              </div>

              <div ref={row3Badge1Ref} className="w-full">
                <SquareBadge text="Full automation end-to-end" />
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center">
              <div className="h-[72px] w-[2px] mx-auto">
                <svg
                  viewBox="0 0 2 72"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    overflow: "visible",
                  }}
                >
                  <path
                    ref={row3Connector2PathRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={CONNECTOR_STROKE}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={row3Connector2GlowRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={GLOW_CONFIG.color}
                    strokeWidth={GLOW_CONFIG.strokeWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                    opacity="0"
                  />
                </svg>
              </div>
              <div ref={row3Badge2Ref} className="w-full">
                <SquareBadge text="Collaboration" />
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center">
              <div className="h-[72px] w-[2px] mx-auto">
                <svg
                  viewBox="0 0 2 72"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    overflow: "visible",
                  }}
                >
                  <path
                    ref={row3Connector3PathRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={CONNECTOR_STROKE}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={row3Connector3GlowRef}
                    d="M 1 0 L 1 72"
                    fill="none"
                    stroke={GLOW_CONFIG.color}
                    strokeWidth={GLOW_CONFIG.strokeWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: `blur(${GLOW_CONFIG.blur}px)` }}
                    opacity="0"
                  />
                </svg>
              </div>
              <div ref={row3Badge3Ref} className="w-full">
                <SquareBadge text="Trust" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <DefButton>Learn more</DefButton>
        </div>
      </div>
    </div>
  );
}
