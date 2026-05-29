"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
] as const;

type Section = (typeof aboutAtomixSections)[number];

function AboutSectionNavItem({
  section,
  isActive,
  onClick,
}: {
  section: Section;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-nav-item
      onClick={onClick}
      className={`group w-full text-left flex items-center justify-between py-2 transition-all duration-300 ${isActive ? "text-[#1BA8CE]" : "text-[#011F27] hover:text-[#1BA8CE]"
        }`}
    >
      <span
        className="text-lg font-medium transition-colors duration-300"
      >
        {section.title}
      </span>
      <FaArrowRight
        className={`w-4 h-4 transition-all duration-300 ${isActive
          ? "opacity-100 translate-x-0 text-[#1BA8CE] rotate-90"
          : "group-hover:translate-x-0 rotate-0"
          }`}
      />
    </button>
  );
}

function AboutSectionCard({ section }: { section: Section }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="flex flex-col rounded-[2rem] overflow-hidden bg-[#24424B] shadow-lg w-full origin-top border border-white/10"
    >
      {/* Image container with its own overlay */}
      <div className="relative w-full h-[180px] sm:h-[240px]">
        <Image
          src={section.image}
          alt={section.title}
          fill
          className="object-cover"
          priority
        />
        {/* Soft blue-teal multiplier tint specific to image */}
        <div className="absolute inset-0 bg-[#476E78]/5 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15 pointer-events-none" />
      </div>

      {/* Vertical gradient on bottom container starting from #476E78 to #24424B */}
      <div className="p-8 pb-10 flex flex-col justify-center min-h-[140px] sm:min-h-[160px] bg-gradient-to-b from-[#476E78] to-[#24424B]">
        <p
          className="text-white text-lg sm:text-xl font-normal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: section.description }}
        />
      </div>
    </div>
  );
}

export default function MobileAboutAtomix() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="text-[#011F27] w-full" aria-label="About Atomix tabs">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-12 py-14">
        <div className="mx-0 mb-10 md:mb-20 max-w-[1800px]">
          <h2 className="text-[2.25rem] leading-[1.1] font-semibold text-[#212329] md:text-5xl md:leading-[1.2em]">
            About Atomix
          </h2>
          <p className="mt-4 text-[1.05rem] leading-7 text-[#474D5D] md:text-xl md:leading-8">
            Property lending is overdue for a rebuild. Atomix is the rebuild.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {aboutAtomixSections.map((section, index) => (
            <div key={section.id} className="flex flex-col gap-3">
              <AboutSectionNavItem
                section={section}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
              {index === activeIndex && <AboutSectionCard section={section} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

