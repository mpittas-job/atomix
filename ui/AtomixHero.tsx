"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button as DefButton } from "@/components/ui";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";
import IconBox from "@/components/IconBox";

const aboutAtomixItems = [
  {
    icon: "/icons/white/users-group.svg",
    title: "What we are",
    subtitle:
      "A white-label, fully configurable Platform-as-a-Service automating the full lifecycle of property loans, end-to-end",
  },
  {
    icon: "/icons/white/rocket-launch-white.svg",
    title: "Who we serve",
    subtitle: "Lenders, capital providers, brokers and borrowers",
  },
  {
    icon: "/icons/white/atomix-icon.svg",
    title: "What sets us apart",
    subtitle:
      "Rules-first compliance enforcement, AI-assisted workflow construction and immutable on-chain audit in a single platform",
  },
  {
    icon: "/icons/white/globe.svg",
    title: "Where we operate",
    subtitle: "UK-based, with global expansion built into the model",
  },
];

function BrandedBox({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex-1">
      <div className="relative flex flex-col items-center gap-3 p-7 rounded-2xl text-center h-full border border-dashed bg-[#124652] border-[#82b0ba] overflow-hidden will-change-transform">
        <div className="relative z-10 flex flex-col items-center gap-3">
          <BadgeHeadingPill color="dark">{label}</BadgeHeadingPill>
          <div className="text-2xl font-semibold leading-[1.3em] text-white">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AtomixHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        "#hero-logo",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          "#hero-text",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.3,
        )
        .fromTo(
          "#hero-btn",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.8,
        )
        .fromTo(
          "#hero-images",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.6,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex flex-col h-full bg-[#004054] rounded-3xl overflow-hidden relative"
    >
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

      <div className="text-white px-6 flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 -translate-x-1/2 top-[10%] max-w-[1000px] w-full">
        <Image
          src="/logo/atomix-logo-big-white.svg"
          alt="Atomix Logo"
          width={200}
          height={60}
          className="w-[150px] md:w-[200px] h-auto"
          id="hero-logo"
          style={{ visibility: "hidden" }}
        />
        <div
          id="hero-text"
          style={{ visibility: "hidden" }}
          className="text-4xl md:text-5xl font-semibold leading-[1.2em]"
        >
          Atomix offers a toolkit to structure loan and investment products
          which are fast, flexible, and secure.
        </div>
        <div id="hero-btn" style={{ visibility: "hidden" }}>
          <DefButton size="large">Contact Us</DefButton>
        </div>
      </div>

      <div
        className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[65%]"
        id="hero-images"
        style={{ visibility: "hidden" }}
      >
        <div className="relative w-full">
          <img
            src="/dashboard/hero-desktop-img.svg"
            alt="Atomix desktop dashboard preview"
            className="w-full select-none object-contain pl-[12%]"
          />
        </div>
        <div>
          <img
            src="/dashboard/hero-mobile-img.svg"
            alt="Atomix mobile form preview"
            className="absolute left-0 bottom-0 w-[22%] select-none object-contain"
          />
        </div>
      </div>

      {/* SECOND SECTION (Static/Hidden) */}
      <div
        className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none"
        id="hero-title-2"
      >
        <BadgeHeadingPill>About Atomix</BadgeHeadingPill>

        <h2 className="text-4xl md:text-5xl font-semibold leading-[1.2em]">
          Property lending is overdue for a rebuild. Atomix is it.
        </h2>

        <div
          id="hero-title-2-list"
          className="w-full max-w-[860px] grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        >
          {aboutAtomixItems.map((item) => (
            <div key={item.title} className="relative">
              <IconBox
                src={item.icon}
                title={item.title}
                description={item.subtitle}
                imageSize="small"
                titleClassName="text-md"
                className="hero-list-item"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MISSION & VISION BOXES (Static/Hidden) */}
      <div
        className="text-white max-w-[1200px] mx-auto flex flex-col gap-y-12 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none"
        id="hero-icon-boxes"
      >
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <BrandedBox
            label="Mission"
            text="Fix UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild"
          />
          <BrandedBox
            label="Vision"
            text="Four interconnected marketplaces. Every stakeholder connected. Property lending reimagined — starting in the UK, built for global scale."
          />
        </div>

        <div className="mt-8">
          <DefButton size="large">Learn more</DefButton>
        </div>
      </div>
    </section>
  );
}
