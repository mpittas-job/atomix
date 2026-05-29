"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import IconBoxLight from "@/components/IconBoxLight";
import IconBoxSimple from "@/components/IconBoxSimple";
import { JOURNEY_OVERVIEW_ITEMS } from "@/app/platform/content/journey-overview";

export default function PlatformJourneyOverview() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    if (width <= 0) return;
    setActiveSlide(Math.round(el.scrollLeft / width));
  }, []);

  const goToSlide = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    gsap.to(el, {
      scrollLeft: index * width,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const handlePrevSlide = useCallback(() => {
    if (activeSlide > 0) goToSlide(activeSlide - 1);
  }, [activeSlide, goToSlide]);

  const handleNextSlide = useCallback(() => {
    if (activeSlide < JOURNEY_OVERVIEW_ITEMS.length - 1) {
      goToSlide(activeSlide + 1);
    }
  }, [activeSlide, goToSlide]);

  return (
    <section
      id="platform-journey-overview"
      aria-label="Platform journey overview"
      className="w-full scroll-mt-28 md:scroll-mt-32 md:pt-20 pb-0"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="hidden lg:grid lg:grid-cols-4 gap-5 w-full">
          {JOURNEY_OVERVIEW_ITEMS.map((item) => (
            <div key={item.title} className="relative h-full">
              <IconBoxLight
                icon={item.icon}
                title={item.title}
                description={item.description}
                className="h-full"
              />
            </div>
          ))}
        </div>

        <div className="block lg:hidden w-full">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {JOURNEY_OVERVIEW_ITEMS.map((item) => (
              <div
                key={item.title}
                className="w-full shrink-0 snap-center snap-always"
              >
                <IconBoxSimple
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={handlePrevSlide}
              disabled={activeSlide === 0}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE1E4] bg-white text-[#011F27] shadow-sm transition-all active:scale-95 ${
                activeSlide === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="h-4 w-4" aria-hidden />
            </button>

            <div className="flex gap-2">
              {JOURNEY_OVERVIEW_ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeSlide ? "w-6 bg-[#011F27]" : "w-2 bg-[#A0AEB2]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextSlide}
              disabled={activeSlide === JOURNEY_OVERVIEW_ITEMS.length - 1}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE1E4] bg-white text-[#011F27] shadow-sm transition-all active:scale-95 ${
                activeSlide === JOURNEY_OVERVIEW_ITEMS.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              aria-label="Next slide"
            >
              <FaChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
