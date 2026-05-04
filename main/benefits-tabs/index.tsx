"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button as DefButton } from "@/components/ui";
import DefHeading from "@/components/typo/DefHeading";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { tabsData } from "./data";

gsap.registerPlugin(ScrollTrigger);

const TAB_ANIMATION = {
  buttonDuration: 0.75,
  buttonStagger: 0.1,
  contentDuration: 1.4,
  contentStagger: 0.22,
  buttonEase: "power1.out",
  contentEase: "power2.out",
};

export default function MainBenefitsTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const initialAnimDone = useRef(false);
  const entranceStartedRef = useRef(false);

  const animateActivePanel = () => {
    const panel = contentRef.current?.firstElementChild as HTMLElement | null;
    if (!panel) return;

    const imageItems = panel.querySelectorAll(".wa-image-item");
    const textItems = panel.querySelectorAll("[data-wa-item]");
    const listItems = panel.querySelectorAll("[data-wa-items] > div");

    gsap.killTweensOf([imageItems, textItems, listItems]);

    gsap.set(imageItems, { autoAlpha: 0, y: 24, scale: 0.96 });
    gsap.set(textItems, { autoAlpha: 0, y: 18 });
    gsap.set(listItems, { autoAlpha: 0, y: 16 });

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.to(imageItems, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: TAB_ANIMATION.contentDuration,
      stagger: TAB_ANIMATION.contentStagger,
      ease: TAB_ANIMATION.contentEase,
    })
      .to(
        textItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
        "-=0.35",
      )
      .to(
        listItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
        "-=0.25",
      );
  };

  // Set initial hidden state for tab buttons and content
  useGSAP(() => {
    if (tabButtonsRef.current) {
      gsap.set(Array.from(tabButtonsRef.current.children), {
        opacity: 0,
      });
    }
    if (contentRef.current) {
      gsap.set(contentRef.current, { autoAlpha: 0 });
    }
  });

  // Tab-switch animation — skip on initial render (handled by entrance chain)
  useGSAP(
    () => {
      if (!initialAnimDone.current) return;
      animateActivePanel();
    },
    { dependencies: [activeIndex] },
  );

  // Called when DefHeading finishes its full animation sequence
  const startTabsEntrance = useCallback(() => {
    if (entranceStartedRef.current) return;
    entranceStartedRef.current = true;

    const tl = gsap.timeline({ delay: 1 });

    // 1. Tab buttons fade in up with stagger
    if (tabButtonsRef.current) {
      tl.to(Array.from(tabButtonsRef.current.children), {
        opacity: 1,
        duration: TAB_ANIMATION.buttonDuration,
        stagger: TAB_ANIMATION.buttonStagger,
        ease: TAB_ANIMATION.buttonEase,
      });
    }

    // Mark entrance done so tab-switch animation is unlocked
    tl.add(() => {
      initialAnimDone.current = true;
    });

    // 2. Instantly reveal container, then animate individual elements
    if (contentRef.current) {
      tl.set(contentRef.current, { autoAlpha: 1 }, "+=0.15");
      tl.add(animateActivePanel, ">");
    }
  }, []);

  useGSAP(() => {
    if (!tabButtonsRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: tabButtonsRef.current,
      start: "top 92%",
      once: true,
      onEnter: startTabsEntrance,
    });

    return () => {
      trigger.kill();
    };
  }, [startTabsEntrance]);

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

      <div className="relative z-10 flex flex-col gap-y-12 w-full max-w-[1200px] px-8 py-32">
        <DefHeading
          theme="light"
          badgeText=""
          title="Benefits"
          description=""
          showBadge={false}
          onAnimationComplete={startTabsEntrance}
        />

        <div className="w-full flex flex-col gap-y-6">
          {/* Tab Buttons - Horizontal */}
          <div ref={tabButtonsRef} className="flex gap-4 w-full">
            {tabsData.map((tab, index) => (
              <div
                key={tab.title}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-1 flex flex-col justify-center gap-4 rounded-2xl transition-all duration-500 cursor-pointer p-5 overflow-hidden ${
                  index === activeIndex
                    ? "bg-[#eaeff1] text-black border-transparent"
                    : "border border-[#1491B3] bg-[#003746]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-8 -bottom-8 right-4 w-[15%] rotate-20 bg-[#58fffc]/15 blur-2xl" />
                  <div className="absolute -top-8 -bottom-8 right-65 w-[3%] rotate-20 bg-[#58fffc]/15 blur-xl" />
                </div>
                <h3
                  className={`text-lg font-semibold text-center relative z-10 ${
                    index === activeIndex ? "text-[#0f1b1e]" : "text-white"
                  }`}
                >
                  {tab.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Tab content with two-column layout */}
          <div
            ref={contentRef}
            key={activeIndex}
            className="relative mt-8 md:mt-10"
          >
            {activeIndex === 0 && (
              <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="relative w-full pr-8 pb-8">
                      <div>
                        <Image
                          src={tabsData[0].mainImage}
                          alt=""
                          width={600}
                          height={400}
                          className="wa-image-item object-contain rounded-lg w-full h-auto"
                        />
                      </div>

                      <div className="absolute bottom-0 right-0 w-50 min-h-20 flex flex-col gap-2">
                        {(tabsData[0].smallImages || []).map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            alt=""
                            width={200}
                            height={100}
                            className="wa-image-item object-contain rounded-lg w-full h-auto"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      data-wa-item
                      className="text-3xl font-bold mb-4 text-white"
                    >
                      Capital Providers
                    </h2>
                    <div data-wa-item className="text-lg text-white/80 mb-8">
                      {tabsData[0].description}
                    </div>
                    <div data-wa-items className="grid grid-cols-1 gap-6">
                      {tabsData[0].items.map((item, index) => (
                        <div key={index}>
                          <IconBoxHorizontal src={item.icon}>
                            <div className="">
                              <span className="text-white">{item.text}</span>
                            </div>
                          </IconBoxHorizontal>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeIndex === 1 && (
              <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="order-1">
                    <div className="relative w-full pr-8 pb-8">
                      <div className="relative">
                        <div>
                          <Image
                            src={tabsData[1].mainImage}
                            alt=""
                            width={600}
                            height={400}
                            className="wa-image-item object-contain rounded-lg w-full h-auto"
                          />
                        </div>

                        {tabsData[1].smallImage && (
                          <Image
                            src={tabsData[1].smallImage}
                            alt=""
                            width={360}
                            height={200}
                            className="wa-image-item object-cover rounded-lg absolute -bottom-4 left-1/2 -translate-x-1/2"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      data-wa-item
                      className="text-3xl font-bold mb-4 text-white"
                    >
                      Lenders
                    </h2>
                    <div data-wa-item className="text-lg text-white/80 mb-8">
                      {tabsData[1].description}
                    </div>
                    <div data-wa-items className="flex flex-col gap-y-6">
                      {tabsData[1].items.map((item, index) => (
                        <div key={index}>
                          <IconBoxHorizontal src={item.icon}>
                            <div className="max-w-[500px]">
                              <span className="font-semibold text-white">
                                {item.text}
                              </span>
                            </div>
                          </IconBoxHorizontal>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeIndex === 2 && (
              <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="relative w-full pr-8 pb-8">
                      <div className="relative">
                        <div>
                          <Image
                            src={tabsData[2].mainImage}
                            alt=""
                            width={600}
                            height={400}
                            className="wa-image-item object-contain rounded-lg w-full h-auto"
                          />
                        </div>

                        {tabsData[2].smallImage && (
                          <Image
                            src={tabsData[2].smallImage}
                            alt=""
                            width={200}
                            height={100}
                            className="wa-image-item object-contain absolute bottom-0 right-0 h-auto"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      data-wa-item
                      className="text-3xl font-bold mb-4 text-white"
                    >
                      Borrowers
                    </h2>
                    <div data-wa-item className="text-lg text-white/80 mb-8">
                      {tabsData[2].description}
                    </div>
                    <div data-wa-items className="flex flex-col gap-y-6">
                      {tabsData[2].items.map((item, index) => (
                        <div key={index}>
                          <IconBoxHorizontal src={item.icon}>
                            <div className="max-w-[500px]">
                              <span className="font-semibold text-white">
                                {item.text}
                              </span>
                            </div>
                          </IconBoxHorizontal>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
