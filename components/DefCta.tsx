"use client";

import React, { useRef, useEffect, useState } from "react";
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
  const [titleAlign, setTitleAlign] = useState<"left" | "center">("center");

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const updateAlign = () => setTitleAlign(mql.matches ? "left" : "center");
    updateAlign();
    mql.addEventListener("change", updateAlign);
    return () => mql.removeEventListener("change", updateAlign);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !imagesRef.current) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      imagesRef.current,
      { opacity: 0, x: isDesktop ? 100 : 0, y: isDesktop ? 0 : 40 },
      { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power2.out" },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="p-4 lg:p-0">
      <div
        ref={sectionRef}
        className="flex flex-col items-center bg-gradient-to-r from-[#004151] to-[#06677E] pt-12 pb-0 lg:flex-row lg:items-center lg:gap-2 lg:py-30 lg:pb-30 relative overflow-hidden rounded-2xl lg:rounded-4xl"
      >
        <div className="max-w-[1260px] w-full mx-auto px-4 relative z-10">
          <div className="max-w-xl flex flex-col items-center gap-y-6 mx-auto text-center lg:items-start lg:gap-y-10 lg:mx-0 lg:text-left">
            <SplitText
              text={title}
              tag="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight"
              splitType="words"
              delay={30}
              duration={0.6}
              textAlign={titleAlign}
            />

            <DefButton onClick={openBookDemoModal}>Register Interest</DefButton>
          </div>
        </div>

        <div
          ref={imagesRef}
          className="relative z-0 w-full px-3 mt-10 translate-y-8 origin-bottom sm:px-4 max-lg:flex max-lg:justify-center lg:px-0 lg:translate-y-0 lg:absolute -bottom-5 lg:-bottom-10 lg:right-10 lg:w-[40%] lg:mt-0"
        >
          <div className="relative w-[92%] mx-auto lg:w-full">
            <img
              src="/dashboard/hero-desktop-img.svg"
              alt="Atomix desktop dashboard preview"
              className="w-full select-none object-contain pl-[12%]"
            />

            <img
              src="/dashboard/hero-mobile-img.svg"
              alt="Atomix mobile form preview"
              className="absolute left-[6%] -bottom-6 lg:bottom-0 w-[28%] select-none object-contain lg:w-[22%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefCta;
