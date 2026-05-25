"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
import type { SplitTextHandle } from "@/components/typo/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger);

const aboutAtomixItems = [
  {
    icon: "/icons/white/users-group.svg",
    title: "What we are",
    subtitle:
      "A Platform-as-a-Service automating the full lifecycle of property loans, end to-end",
  },
  {
    icon: "/icons/white/rocket-launch-white.svg",
    title: "Who are our users",
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

export default function MainHeroV3() {
  const title1SplitRef = useRef<SplitTextHandle>(null);
  const title2SplitRef = useRef<SplitTextHandle>(null);

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
    gsap.set("#def-hero-title-2", { autoAlpha: 0, scale: 0 });
    gsap.set("#def-hero-title-2-list .hero-list-item", {
      autoAlpha: 0,
      y: 40,
    });

    // --- SCROLL TIMELINE (scrub, no snap) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=10000",
        scrub: 2.5,
        pin: true,
      },
    });

    // Stage 1: Title 1 exits upward, images rise to center
    tl.to("#def-hero-title-1", { top: "-20%", opacity: 0, duration: 1 }, 0).to(
      "#def-hero-images",
      { top: "50%", y: "-50%", duration: 1 },
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
        "#def-hero-title-2",
        { autoAlpha: 1, scale: 1, duration: 1.35, ease: "power1.out" },
        "centerReached",
      )
      .call(() => title2SplitRef.current?.play(), [], "centerReached+=0.6");

    // Stage 3: List items and button
    tl.addLabel("title2Visible")
      .to(
        "#def-hero-title-2-list .hero-list-item",
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          stagger: 0.72,
        },
        "title2Visible+=0.9",
      )
      .addLabel("listVisible");
  }, []);

  return (
    <div id="def-hero-main">
      <div className="bg-white px-3 mb-6 pt-27">
        <section
          className="flex flex-col h-[calc(100vh-120px)] bg-[#004054]/100 rounded-3xl overflow-hidden relative"
          id="atomix-playground-v1"
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

          {/* FIRST TITLE - page load animation */}
          <div
            className="text-white px-6 flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 -translate-x-1/2 top-[10%] max-w-[1000px] w-full"
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
            />
            <div id="def-hero-split-text" style={{ visibility: "hidden" }}>
              <SplitText
                ref={title1SplitRef}
                startPaused
                text="Atomix offers a toolkit to structure loan and investment products which are fast, flexible, and secure."
              />
            </div>
            <div id="def-hero-load-btn" style={{ visibility: "hidden" }}>
              <DefButton size="large">Contact Us</DefButton>
            </div>
          </div>

          {/* IMAGES - page load animation */}
          <div
            className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[65%]"
            id="def-hero-images"
            style={{ visibility: "hidden" }}
          >
            <div className="relative w-full" id="def-hero-image-desktop">
              <img
                src="/dashboard/hero-desktop-img.svg"
                alt="Atomix desktop dashboard preview"
                className="w-full select-none object-contain pl-[12%]"
              />
            </div>

            <div id="def-hero-image-mobile">
              <img
                src="/dashboard/hero-mobile-img.svg"
                alt="Atomix mobile form preview"
                className="absolute left-0 bottom-0 w-[22%] select-none object-contain"
              />
            </div>
          </div>

          {/* SECOND TITLE - scroll-driven animation */}
          <div
            className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            id="def-hero-title-2"
            style={{ visibility: "hidden" }}
          >
            <BadgeHeadingPill>About Atomix</BadgeHeadingPill>

            <SplitText
              ref={title2SplitRef}
              startPaused
              text="Property lending is overdue for a rebuild. Atomix is it."
            />

            <div
              id="def-hero-title-2-list"
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
        </section>
      </div>
    </div>
  );
}
