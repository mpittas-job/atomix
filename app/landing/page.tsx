"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import MainHero from "@/main/MainHero";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import MainProblemsTabs from "@/main/MainProblemsTabs";
import MainPyramidWrapper from "@/main/MainPyramidWrapper";
import MainSolutionsAnimation from "@/main/MainSolutionsAnimation";
import MainBenefitsTabs from "@/main/benefits-tabs/";
import MainTheMarket from "@/main/MainTheMarket";
import MainWhyWorkWithUs from "@/main/MainWhyWorkWithUs";
import MainCurrentStatus from "@/components/current-status/MainCurrentStatus";
import MainPropertyLanding from "@/main/MainPropertyLanding";
import MainProblemsTabsLight from "@/main/MainProblemsTabsLight";
import MainBenefitsLight from "@/main/MainBenefitsLight";
import SliderWhyWorkWithUs from "@/components/SliderWhyWorkWithUs";
import MainCurrentStatusLight from "@/main/MainCurrentStatusLight";
import MainMissionVisionCards from "@/main/MainMissionVisionCards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function LandingGradientV1Page() {
  const careersContainerRef = useRef<HTMLDivElement>(null);
  const careersBox1Ref = useRef<HTMLDivElement>(null);
  const careersBox2Ref = useRef<HTMLDivElement>(null);
  const careersBox3Ref = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const flowGraphicRef = useRef<HTMLDivElement>(null);
  const learnMoreBtnRef = useRef<HTMLDivElement>(null);
  const [flowAnimationReady, setFlowAnimationReady] = useState(false);

  const setupHoverEffect = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    const element = ref.current;

    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        scale: 1.2,
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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: careersContainerRef.current,
        start: "top 10%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      careersBox1Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.8, ease: "back.out(1.7)" },
    )
      .fromTo(
        careersBox2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" },
        "-=0.35",
      )
      .fromTo(
        careersBox3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "back.out(1.7)" },
        "-=0.35",
      );

    return () => {
      tl.kill();
    };
  }, []);

  useGSAP(
    () => {
      setupHoverEffect(careersBox1Ref);
      setupHoverEffect(careersBox2Ref);
      setupHoverEffect(careersBox3Ref);
    },
    { scope: careersContainerRef },
  );

  useEffect(() => {
    if (
      !useCasesRef.current ||
      !card1Ref.current ||
      !card2Ref.current ||
      !card3Ref.current
    )
      return;

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: useCasesRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      cards,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.15,
      },
    );

    return () => {
      tl.kill();
    };
  }, []);

  useGSAP(() => {
    if (!flowGraphicRef.current || !learnMoreBtnRef.current) return;
    gsap.set(flowGraphicRef.current, { opacity: 0, y: 60 });
    gsap.set(learnMoreBtnRef.current, { opacity: 0, y: 40 });
  });

  const handleDefHeadingComplete = useCallback(() => {
    if (!flowGraphicRef.current || !learnMoreBtnRef.current) return;

    setFlowAnimationReady(true);

    const tl = gsap.timeline();

    tl.to(flowGraphicRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }).to(
      learnMoreBtnRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "+=4.5",
    );
  }, []);

  return (
    <div className="overflow-x-hidden bg-white">
      <Header />
      <div className="px-12 mb-6 pt-24" id="def-hero-main">
        <MainHero />
      </div>

 <MainMissionVisionCards />
      <div className="px-6 mt-6 mb-12 flex flex-col gap-6">
        {/* <MainPropertyLanding /> */}

       

        <MainProblemsTabsLight />

        {/* <MainProblemsTabs /> */}

        <MainPyramidWrapper />

        <MainSolutionsAnimation />

        {/* <MainBenefitsTabs /> */}
        <MainBenefitsLight />

        <MainTheMarket />

        <MainCurrentStatusLight />

        {/* <MainWhyWorkWithUs /> */}
        <SliderWhyWorkWithUs />
      </div>

      <DefCta title="Build the Future of Asset-Backed Lending" />

      <Footer />
    </div>
  );
}
