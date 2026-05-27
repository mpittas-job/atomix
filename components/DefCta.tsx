"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/typo/SplitText";
import { Button as DefButton } from "@/components/ui";
import { useBookDemoModal } from "@/components/BookDemoModalProvider";

gsap.registerPlugin(ScrollTrigger);

interface DefCtaProps {
  title: string;
}

const DefCta: React.FC<DefCtaProps> = ({ title }) => {
  const { openBookDemoModal } = useBookDemoModal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imagesRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      imagesRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="p-6">
      <div
        ref={sectionRef}
        className="flex items-center gap-2 bg-gradient-to-r from-[#004151] to-[#06677E] py-30 relative overflow-hidden rounded-4xl"
      >
        <div className="max-w-[1260px] w-full mx-auto px-4">
          <div className="max-w-xl flex flex-col items-start gap-y-10">
            <SplitText
              text={title}
              tag="h2"
              className="text-5xl font-semibold text-white leading-tight"
              splitType="words"
              delay={30}
              duration={0.6}
              textAlign="left"
            />

            <DefButton onClick={openBookDemoModal}>Register Interest</DefButton>
          </div>
        </div>

        <div ref={imagesRef} className="absolute -bottom-10 right-10 w-[45%] lg:w-[40%]">
          <div className="relative w-full">
            <img
              src="/dashboard/hero-desktop-img.svg"
              alt="Atomix desktop dashboard preview"
              className="w-full select-none"
              style={{
                objectFit: "contain",
                paddingLeft: "12%",
              }}
            />
          </div>

          <div>
            <img
              src="/dashboard/hero-mobile-img.svg"
              alt="Atomix mobile form preview"
              className="absolute left-0 bottom-0 w-[22%] select-none"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefCta;
