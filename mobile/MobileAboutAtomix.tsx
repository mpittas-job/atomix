"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

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
      className={`group w-full text-left flex items-center justify-between py-2 transition-all duration-300 ${
        isActive ? "text-[#1BA8CE]" : "text-[#011F27] hover:text-[#1BA8CE]"
      }`}
    >
      <span
        className="text-lg font-medium transition-colors duration-300"
      >
        {section.title}
      </span>
      <FaArrowRight
        className={`w-4 h-4 transition-all duration-300 ${
          isActive
            ? "opacity-100 translate-x-0 text-[#1BA8CE]"
            : "group-hover:translate-x-0"
        }`}
      />
    </button>
  );
}

function AboutSectionCard({ section }: { section: Section }) {
  return (
    <div className="relative h-[340px] md:h-[460px] rounded-2xl overflow-hidden">
      <Image src={section.image} alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 flex items-center p-6 md:p-12">
        <p
          className="text-white text-xl md:text-2xl leading-relaxed max-w-lg"
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

