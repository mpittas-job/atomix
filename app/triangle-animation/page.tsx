"use client";

import React, { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import AtomixPyramidNewDesign from "@/animations/AtomixPyramidNewDesign";
import { FiCheck, FiX } from "react-icons/fi";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

type IconBoxData = {
  icon: string;
  title: string;
  description: string;
  items?: Array<{ icon: React.ReactNode; text: string }>;
};

const iconBoxesData: IconBoxData[] = [
  {
    icon: "/icons/white/shield-check-white.svg",
    title: "Simple SaaS",
    description: "automated and easy to change, but simple products only",
  },
  {
    icon: "/icons/white/target-arrow.svg",
    title: "Bespoke builds",
    description:
      "automated and complex, but £500k+ upfront and expensive to change",
    items: [
      {
        icon: <FiCheck className="text-white/80 w-5 h-5 shrink-0" />,
        text: "Automated",
      },
      {
        icon: <FiCheck className="text-white/80 w-5 h-5 shrink-0" />,
        text: "Complex logic",
      },
      {
        icon: <FiX className="text-white/80 w-5 h-5 shrink-0" />,
        text: "£600k, slow to change",
      },
    ],
  },
  {
    icon: "/icons/white/module-simple.svg",
    title: "Disconnected stacks",
    description:
      "complex and configurable, but humans are the glue; nothing is truly automated",
  },
];

export default function TriangleAnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pyramidSectionRef = useRef<HTMLDivElement>(null);
  const iconBoxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const revealTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedRevealRef = useRef(false);

  useGSAP(() => {
    const section = pyramidSectionRef.current;
    const boxes = iconBoxRefs.current.filter(
      (box): box is HTMLDivElement => box !== null,
    );
    if (!section || boxes.length === 0) return;

    gsap.set(boxes, { autoAlpha: 0, y: 32 });

    revealTimelineRef.current = gsap.timeline({ paused: true }).to(boxes, {
      autoAlpha: 1,
      y: 0,
      duration: 2,
      ease: "power2.out",
      stagger: 0.4,
    });

    const sectionHeight = section.offsetHeight;

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top+=110px",
      end: `+=${sectionHeight * 3}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
    });

    return () => {
      pinTrigger.kill();
      revealTimelineRef.current?.kill();
      revealTimelineRef.current = null;
    };
  }, []);

  const handleInfiniteSpinStart = useCallback(() => {
    if (hasPlayedRevealRef.current) return;
    hasPlayedRevealRef.current = true;
    revealTimelineRef.current?.play(0);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-gray-200">
      <Header />

      <div className="pt-23">
        <div className="p-4 flex flex-col gap-y-4 ">
          <div className="min-h-screen bg-red-500/30 rounded-2xl"></div>
          <div
            ref={pyramidSectionRef}
            className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center"
          >
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
            <div className="max-w-[1200px] min-h-[200px] my-auto flex">
              <div className="flex-1">
                <AtomixPyramidNewDesign
                  onInfiniteSpinStart={handleInfiniteSpinStart}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center gap-12 pl-20 max-w-lg">
                {iconBoxesData.map((box, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      iconBoxRefs.current[index] = el;
                    }}
                    className="flex items-start gap-4"
                  >
                    <img
                      src={box.icon}
                      alt={box.title}
                      className="w-10 h-10 shrink-0 mt-1"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {box.title}
                      </h3>
                      <p
                        className={`text-white/80 text-base leading-relaxed ${
                          box.items ? "mb-4" : ""
                        }`}
                      >
                        {box.description}
                      </p>
                      {box.items && (
                        <ul className="space-y-1">
                          {box.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-center gap-3 text-white/80"
                            >
                              {item.icon} {item.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-h-screen bg-red-500/30 rounded-2xl"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
