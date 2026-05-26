"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import Image from "next/image";
import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
import type { SplitTextHandle } from "@/components/typo/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import InkSpill from "@/components/backgrounds/InkSpill";
import type { InkSpillHandle } from "@/components/backgrounds/InkSpill";
import { FaArrowRight } from "react-icons/fa";
import { useCallback, useState } from "react";
import DefHeading from "@/components/typo/DefHeading";
import { useBookDemoModal } from "@/components/BookDemoModalProvider";

gsap.registerPlugin(ScrollTrigger);

const aboutAtomixSections = [
  {
    id: "what-we-are",
    title: "What we are",
    description:
      "A Platform-as-a-Service automating the full lifecycle of property loans, end-to-end; <br/>fully configurable and white-label ready",
    image: "/about/about-us-img-1.jpg",
  },
  {
    id: "what-sets-us-apart",
    title: "What sets us apart",
    description:
      "Rules-first architecture, immutable on-chain audit and goal-driven intelligence; compliance enforced at every level, not bolted on",
    image: "/about/about-us-img-2.jpg",
  },
  {
    id: "who-we-serve",
    title: "Who are our users",
    description: "Lenders, capital providers, brokers, lawyers and borrowers",
    image: "/about/about-us-img-3.jpg",
  },
  {
    id: "where-we-operate",
    title: "Where we operate",
    description: "UK-based, with global expansion built into the model",
    image: "/about/about-us-img-4.jpg",
  },
];

interface AboutSectionCardProps {
  cardRef:
    | ((el: HTMLDivElement | null) => void)
    | RefObject<HTMLDivElement | null>;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  index: number;
}

function AboutSectionCard({
  cardRef,
  description,
  image,
  isActive,
  index,
}: AboutSectionCardProps) {
  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      data-section-index={index}
      className={`absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-500 ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
    >
      <Image src={image} alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 flex items-center p-8 md:p-12">
        <p
          className="text-white text-xl md:text-2xl lg:text-2xl leading-relaxed max-w-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

interface AboutSectionNavItemProps {
  section: (typeof aboutAtomixSections)[0];
  isActive: boolean;
  onClick: () => void;
  itemRef:
    | ((el: HTMLButtonElement | null) => void)
    | RefObject<HTMLButtonElement | null>;
}

function AboutSectionNavItem({
  section,
  isActive,
  onClick,
  itemRef,
}: AboutSectionNavItemProps) {
  return (
    <button
      ref={itemRef as React.RefObject<HTMLButtonElement>}
      data-nav-item
      onClick={onClick}
      className={`group w-full text-left flex items-center justify-between py-4 transition-all duration-300 ${
        isActive ? "text-[#1BA8CE]" : "text-[#011F27] hover:text-[#1BA8CE]"
      }`}
    >
      <span
        className={`text-2xl font-medium transition-all duration-300 ${
          isActive ? "translate-x-2" : "group-hover:translate-x-1"
        }`}
      >
        {section.title}
      </span>
      <FaArrowRight
        className={`w-5 h-5 transition-all duration-300 ${
          isActive
            ? "opacity-100 translate-x-0 text-[#1BA8CE]"
            : "group-hover:translate-x-0"
        }`}
      />
    </button>
  );
}

export default function MainHero() {
  const { openBookDemoModal } = useBookDemoModal();
  const title1SplitRef = useRef<SplitTextHandle>(null);
  const inkSpillRef = useRef<InkSpillHandle>(null);
  const aboutCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const aboutNavRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const clickTargetSectionRef = useRef<number | null>(null);

  useGSAP(() => {
    // --- PAGE LOAD ANIMATION ---
    const loadTl = gsap.timeline({ delay: 0.15 });

    loadTl
      .fromTo(
        "#def-hero-logo",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
      .set("#def-hero-split-text", { autoAlpha: 1 }, 0.3)
      .add(() => title1SplitRef.current?.play(), 0.3)
      .fromTo(
        "#def-hero-load-btn",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.8,
      )
      .fromTo(
        "#def-hero-images",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.6,
      );

    // --- Set initial hidden states for scroll-animated elements ---
    const inkProgress = { value: 0 };
    gsap.set("#def-hero-title-2-bg", { autoAlpha: 1 });
    gsap.set("#def-hero-title-2-bg-shader", { opacity: 1 });
    gsap.set("#def-hero-title-2-bg-aurora", { autoAlpha: 0 });
    gsap.set("#def-hero-title-2", { autoAlpha: 0 });
    gsap.set("#def-hero-about-sections", { autoAlpha: 0 });
    gsap.set("#def-hero-images", { xPercent: -50, yPercent: 0, force3D: true });
    gsap.set(["#def-hero-image-mobile", "#def-hero-image-desktop"], {
      xPercent: 0,
      force3D: true,
    });

    // About cards use React isActive + CSS only (no scroll-driven GSAP opacity on cards).

    // --- SCROLL TIMELINE (scrub, no snap) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=4200",
        scrub: 2.5,
        pin: true,
        onLeave: () => {
          clickTargetSectionRef.current = null;
        },
        onLeaveBack: () => {
          clickTargetSectionRef.current = null;
        },
      },
    });
    tlRef.current = tl;

    // Stage 1: Title 1 exits upward, images rise to center
    tl.to("#def-hero-title-1", { top: "-20%", opacity: 0, duration: 1 }, 0).to(
      "#def-hero-images",
      { top: "50%", yPercent: -50, duration: 1 },
      0,
    );

    // Stage 2: Images split, title 2 scales in
    tl.addLabel("centerReached", 1)
      .to(
        "#def-hero-image-mobile",
        { xPercent: -300, duration: 1.35, ease: "power2.inOut" },
        "centerReached",
      )
      .to(
        "#def-hero-image-desktop",
        { xPercent: 170, duration: 1.35, ease: "power2.inOut" },
        "centerReached",
      )
      .to(
        inkProgress,
        {
          value: 1,
          duration: 3.6,
          ease: "power2.out",
          onUpdate: () => inkSpillRef.current?.setProgress(inkProgress.value),
        },
        "centerReached",
      )
      .to(
        "#def-hero-title-2",
        { autoAlpha: 1, duration: 1.35, ease: "power1.out" },
        "centerReached",
      )
      .to(
        "#def-hero-title-2-bg-aurora",
        { autoAlpha: 1, duration: 1.2, ease: "power2.out" },
        "centerReached",
      );

    // Stage 3: About sections fade in (white shader stays visible)
    tl.addLabel("aboutVisible", "centerReached+=1.1")
      .to(
        "#def-hero-about-sections",
        { autoAlpha: 1, duration: 0.8, ease: "power2.out" },
        "aboutVisible",
      )
      // Keep white shader visible - don't fade it out since we scroll to next section after
      // Section 1 active
      .addLabel("section1", "aboutVisible+=0.8")
      .call(
        () => {
          if (clickTargetSectionRef.current == null) setActiveSection(0);
        },
        undefined,
        "section1",
      )
      .addLabel("aboutComplete", "section1+=0.15")
      .to({}, { duration: 1.2 }, "aboutComplete");
  }, []);

  const handleAboutSectionClick = useCallback((index: number) => {
    clickTargetSectionRef.current = index;
    setActiveSection(index);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1920px] px-12">
      <section
        className="flex flex-col h-[calc(100vh-var(--header-height,5.5rem)-(var(--hero-y-gap,1rem)*2))] bg-gradient-to-b from-[#014355] to-[#247691] rounded-3xl overflow-hidden relative"
        id="atomix-playground-v1"
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-h-full min-w-full">
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

        {/* FIRST TITLE - page load animation */}
        <div
          className="text-white px-6 flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 -translate-x-1/2 top-[10%] max-w-[600px] w-full"
          id="def-hero-title-1"
        >
          <Image
            src="/logo/atomix-logo-big-white.svg"
            alt="Atomix Logo"
            width={200}
            height={60}
            className="w-[150px] md:w-[200px] h-auto"
            id="def-hero-logo"
            style={{ visibility: "hidden" }}
            priority
          />
          <div id="def-hero-split-text" style={{ visibility: "hidden" }}>
            <SplitText
              ref={title1SplitRef}
              startPaused
              text="Platform-as-a-Service [[accent:Automating Lending End-to-End]]"
              accentColor="#5BC7E4"
            />
          </div>
          <div id="def-hero-load-btn" style={{ visibility: "hidden" }}>
            <DefButton size="large" onClick={openBookDemoModal}>
              Contact Us
            </DefButton>
          </div>
        </div>

        {/* IMAGES - page load animation */}
        <div
          className="absolute top-[70%] left-1/2 w-[65%]"
          id="def-hero-images"
          style={{ visibility: "hidden" }}
        >
          <div className="relative w-full" id="def-hero-image-desktop">
            <Image
              src="/dashboard/hero-desktop-img.svg"
              alt="Atomix desktop dashboard preview"
              width={1200}
              height={800}
              className="w-full select-none object-contain pl-[12%]"
              priority
            />
          </div>

          <div id="def-hero-image-mobile">
            <Image
              src="/dashboard/hero-mobile-img.svg"
              alt="Atomix mobile form preview"
              width={300}
              height={600}
              className="absolute left-0 bottom-6 w-[22%] select-none object-contain"
              priority
            />
          </div>
        </div>

        {/* SECOND TITLE BACKGROUND - scroll-driven animation */}
        <div
          className="absolute top-0 left-0 w-full h-full min-w-full min-h-full overflow-hidden pointer-events-none"
          id="def-hero-title-2-bg"
        >
          <div
            id="def-hero-title-2-bg-shader"
            className="absolute inset-0 pointer-events-none"
          >
            <InkSpill
              ref={inkSpillRef}
              color="#EBEFF2"
              speed={0.9}
              scale={1.8}
              edgeSoftness={0.22}
            />
            <div
              id="def-hero-title-2-bg-aurora"
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{ visibility: "hidden" }}
            >
              <SoftAurora
                speed={1.3}
                scale={1.2}
                brightness={0.65}
                color1="#effaffff"
                color2="#d7f6faff"
                noiseFrequency={1}
                noiseAmplitude={3.5}
                bandHeight={0.4}
                bandSpread={1}
                octaveDecay={0.12}
                layerOffset={0.5}
                colorSpeed={1}
                enableMouseInteraction={false}
                mouseInfluence={0.2}
              />
            </div>
          </div>
        </div>

        {/* SECOND TITLE CONTENT - scroll-driven animation */}
        <div
          className="text-[#011F27] flex flex-col justify-center items-start text-left absolute top-0 left-0 w-full h-full min-w-full min-h-full p-8 md:py-12 md:px-24"
          id="def-hero-title-2"
          style={{ visibility: "hidden" }}
        >
          <div
            id="def-hero-about-sections"
            className="w-full h-full"
            style={{ visibility: "hidden" }}
          >
            <div className="flex flex-col  justify-center h-full max-w-[1900px] mx-auto">
              {/* Top heading row */}
              <DefHeading
                theme="dark"
                badgeText=""
                title="About Atomix"
                description="Property lending is overdue for a rebuild. Atomix is the rebuild."
                showBadge={false}
                className="mx-0 mb-20 max-w-[1800px]"
                align="left"
              />

              {/* Bottom two-column row */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-36 items-center">
                {/* Left side - Section navigation */}
                <div className="lg:col-span-2 flex flex-col justify-center">
                  <div className="space-y-1">
                    {aboutAtomixSections.map((section, index) => (
                      <AboutSectionNavItem
                        key={section.id}
                        section={section}
                        isActive={activeSection === index}
                        onClick={() => handleAboutSectionClick(index)}
                        itemRef={(el) => {
                          aboutNavRefs.current[index] = el;
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right side - Image cards */}
                <div className="lg:col-span-3 relative h-[340px] md:h-[460px]">
                  {aboutAtomixSections.map((section, index) => (
                    <AboutSectionCard
                      key={section.id}
                      cardRef={(el) => {
                        aboutCardRefs.current[index] = el;
                      }}
                      title={section.title}
                      description={section.description}
                      image={section.image}
                      isActive={activeSection === index}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
