"use client";

import { useRef, useState } from "react";
import { FaUsers, FaGlobe, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import IconBoxSimple from "@/components/IconBoxSimple";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom AI Cpu Microchip Icon SVG
const AiCpuIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Microchip Outer Body */}
    <rect x="5" y="5" width="14" height="14" rx="2" strokeWidth="2" />

    {/* AI Text In Center */}
    <text
      x="12"
      y="14.5"
      fontSize="6"
      fontWeight="900"
      fontFamily="sans-serif"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
    >
      AI
    </text>

    {/* Microchip Pins */}
    <path d="M9 2v3" strokeWidth="2" />
    <path d="M12 2v3" strokeWidth="2" />
    <path d="M15 2v3" strokeWidth="2" />

    <path d="M9 19v3" strokeWidth="2" />
    <path d="M12 19v3" strokeWidth="2" />
    <path d="M15 19v3" strokeWidth="2" />

    <path d="M2 9h3" strokeWidth="2" />
    <path d="M2 12h3" strokeWidth="2" />
    <path d="M2 16h3" strokeWidth="2" />

    <path d="M19 9h3" strokeWidth="2" />
    <path d="M19 12h3" strokeWidth="2" />
    <path d="M19 16h3" strokeWidth="2" />
  </svg>
);

export default function MobileTeamOpportunities() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Carousel refs & states
  const teamCarouselRef = useRef<HTMLDivElement>(null);
  const oppCarouselRef = useRef<HTMLDivElement>(null);
  const [teamActiveSlide, setTeamActiveSlide] = useState(0);
  const [oppActiveSlide, setOppActiveSlide] = useState(0);

  const handleTeamCarouselScroll = () => {
    const el = teamCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    if (width <= 0) return;
    const index = Math.round(el.scrollLeft / width);
    setTeamActiveSlide(index);
  };

  const handleOppCarouselScroll = () => {
    const el = oppCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    if (width <= 0) return;
    const index = Math.round(el.scrollLeft / width);
    setOppActiveSlide(index);
  };

  const goToTeamSlide = (index: number) => {
    const el = teamCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    gsap.to(el, {
      scrollLeft: index * width,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const goToOppSlide = (index: number) => {
    const el = oppCarouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    gsap.to(el, {
      scrollLeft: index * width,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handlePrevTeamSlide = () => {
    if (teamActiveSlide > 0) goToTeamSlide(teamActiveSlide - 1);
  };

  const handleNextTeamSlide = () => {
    if (teamActiveSlide < 2) goToTeamSlide(teamActiveSlide + 1);
  };

  const handlePrevOppSlide = () => {
    if (oppActiveSlide > 0) goToOppSlide(oppActiveSlide - 1);
  };

  const handleNextOppSlide = () => {
    if (oppActiveSlide < 2) goToOppSlide(oppActiveSlide + 1);
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const columns = containerRef.current.querySelectorAll(".col-container");

      columns.forEach((col) => {
        const title = col.querySelector(".col-title");
        const desc = col.querySelector(".col-desc");
        const cards = col.querySelectorAll(".col-card");
        const btn = col.querySelector(".col-btn");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: col,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        tl.fromTo(
          title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
          .fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            cards,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(
            btn,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.2"
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[1920px] px-0 md:px-12 flex flex-col overflow-hidden"
    >
      {/* 1. TEAM SECTION */}
      <div className="col-container team-col w-full bg-[#3E99B7] rounded-none md:rounded-[2rem] px-5 py-14 flex flex-col items-center text-center border border-white/10">
        <h2 className="col-title text-3xl font-semibold text-white uppercase mb-4">
          Team
        </h2>
        <p className="col-desc text-white/80 text-md leading-relaxed max-w-[340px] mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius lorem eget leo vehicula consectetur.
        </p>

        {/* Swipeable Carousel Layout */}
        <div className="w-full mb-8">
          <div
            ref={teamCarouselRef}
            onScroll={handleTeamCarouselScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Card 1: Small Team, Big Impact */}
            <div className="col-card w-full shrink-0 snap-center snap-always">
              <IconBoxSimple
                bgCircleClassName="bg-white/10"
                className="!bg-white/10 !border-white/20 !shadow-none !backdrop-blur-none text-white w-full !p-5"
              >
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                    <FaUsers className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg leading-6 font-semibold text-white">
                    Small Team, Big Impact
                  </h3>
                  <p className="text-md leading-relaxed text-white/75">
                    Join a focused team where every contribution directly shapes the product, technology, and company.
                  </p>
                </div>
              </IconBoxSimple>
            </div>

            {/* Card 2: Cutting-Edge Technology */}
            <div className="col-card w-full shrink-0 snap-center snap-always">
              <IconBoxSimple
                bgCircleClassName="bg-white/10"
                className="!bg-white/10 !border-white/20 !shadow-none !backdrop-blur-none text-white w-full !p-5"
              >
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                    <AiCpuIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg leading-6 font-semibold text-white">
                    Cutting-Edge Technology
                  </h3>
                  <p className="text-md leading-relaxed text-white/75">
                    Work across AI, automation, data systems, and blockchain-backed infrastructure.
                  </p>
                </div>
              </IconBoxSimple>
            </div>

            {/* Card 3: Real-World Financial Infrastructure */}
            <div className="col-card w-full shrink-0 snap-center snap-always">
              <IconBoxSimple
                bgCircleClassName="bg-white/10"
                className="!bg-white/10 !border-white/20 !shadow-none !backdrop-blur-none text-white w-full !p-5"
              >
                <div className="flex flex-col gap-3 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                    <FaGlobe className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg leading-6 font-semibold text-white">
                    Real-World Financial Infrastructure
                  </h3>
                  <p className="text-md leading-relaxed text-white/75">
                    Build technology that powers real lending markets and impacts billions in asset-backed finance.
                  </p>
                </div>
              </IconBoxSimple>
            </div>
          </div>

          {/* Carousel navigation controls (arrows + indicators) */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={handlePrevTeamSlide}
              disabled={teamActiveSlide === 0}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm transition-all active:scale-95 ${teamActiveSlide === 0 ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-pointer"
                }`}
              aria-label="Previous team slide"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => goToTeamSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === teamActiveSlide ? "w-6 bg-white" : "w-2 bg-white/40"
                    }`}
                  aria-label={`Go to team slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextTeamSlide}
              disabled={teamActiveSlide === 2}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-sm transition-all active:scale-95 ${teamActiveSlide === 2 ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-pointer"
                }`}
              aria-label="Next team slide"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* See Team Button */}
        <button className="col-btn w-auto border border-white rounded-full text-white bg-transparent px-8 py-2.5 text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors">
          See Team
        </button>
      </div>

      {/* 2. OPPORTUNITIES SECTION */}
      <div className="col-container opp-col w-full bg-[#F1F4F6] rounded-none md:rounded-[2rem] px-5 py-14 flex flex-col items-center text-center">
        <h2 className="col-title text-3xl font-semibold text-[#011F27] uppercase mb-4">
          Opportunities
        </h2>
        <p className="col-desc text-[#4B6066] text-md leading-relaxed max-w-[340px] mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius lorem eget leo vehicula consectetur.
        </p>

        {/* Swipeable Carousel Layout */}
        <div className="w-full mb-8">
          <div
            ref={oppCarouselRef}
            onScroll={handleOppCarouselScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Card 1: Small Team, Big Impact */}
            <div className="col-card w-full shrink-0 snap-center snap-always">
              <IconBoxSimple
                icon={<FaUsers className="h-6 w-6" />}
                title="Small Team, Big Impact"
                description="Join a focused team where every contribution directly shapes the product, technology, and company."
                className="w-full !p-5"
              />
            </div>

            {/* Card 2: Cutting-Edge Technology */}
            <div className="col-card w-full shrink-0 snap-center snap-always">
              <IconBoxSimple
                icon={<AiCpuIcon className="h-6 w-6" />}
                title="Cutting-Edge Technology"
                description="Work across AI, automation, data systems, and blockchain-backed infrastructure."
                className="w-full !p-5"
              />
            </div>

            {/* Card 3: Real-World Financial Infrastructure */}
            <div className="col-card w-full shrink-0 snap-center snap-always">
              <IconBoxSimple
                icon={<FaGlobe className="h-6 w-6" />}
                title="Real-World Financial Infrastructure"
                description="Build technology that powers real lending markets and impacts billions in asset-backed finance."
                className="w-full !p-5"
              />
            </div>
          </div>

          {/* Carousel navigation controls (arrows + indicators) */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={handlePrevOppSlide}
              disabled={oppActiveSlide === 0}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE1E4] bg-white text-[#011F27] shadow-sm transition-all active:scale-95 ${oppActiveSlide === 0 ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-pointer"
                }`}
              aria-label="Previous opportunities slide"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => goToOppSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === oppActiveSlide ? "w-6 bg-[#011F27]" : "w-2 bg-[#A0AEB2]"
                    }`}
                  aria-label={`Go to opportunities slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextOppSlide}
              disabled={oppActiveSlide === 2}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE1E4] bg-white text-[#011F27] shadow-sm transition-all active:scale-95 ${oppActiveSlide === 2 ? "opacity-40 cursor-not-allowed" : "opacity-100 cursor-pointer"
                }`}
              aria-label="Next opportunities slide"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* See Opportunities Button */}
        <button className="col-btn w-auto border border-[#DCE1E4] rounded-full text-[#011F27] bg-transparent px-8 py-2.5 text-sm font-semibold tracking-wide hover:bg-[#011F27]/5 transition-colors">
          See Opportunities
        </button>
      </div>
    </div>
  );
}
