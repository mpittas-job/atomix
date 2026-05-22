"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import MainHero from "@/main/MainHero";
import DefHeading from "@/components/typo/DefHeading";
import FlowGraphicLight from "@/components/FlowGraphicLight";
import FlowCardsHor from "@/components/FlowCardsHor";
import { Button as DefButton } from "@/components/ui";
import MainSolutionsAnimation from "@/main/MainSolutionsAnimation";
import InfoRow from "@/components/InfoRow";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import IconBox from "@/components/IconBox";
import CustomerStoryCard from "@/components/CustomerStoryCard";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import BenefitsLayout from "@/components/BenefitsLayout";
import ScrollableTabsv2 from "@/components/ScrollableTabsv2";
import TechLimitations from "@/components/TechLimitations";
import ScrollableHeading from "@/components/ScrollableHeading";
import WhyAtomix from "@/components/WhyAtomix";
import TheMarket from "@/components/TheMarket";
import WhyWorkWithUs from "@/components/WhyWorkWithUs";

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
    <div className="overflow-x-hidden">
      <div className="bg-white mb-6" id="def-hero-main">
        <Header />
        <MainHero />
      </div>

      {/* <DefCta
        title="Build the Future of
Asset-Backed Lending"
      /> */}

      <Footer />
    </div>
  );
}
