"use client";

import Header from "@/components/header";
import HeroAnimatedBg from "@/components/HeroAnimatedBg";
import DefCta from "@/components/DefCta";
import Footer from "@/components/Footer";
import { FiCheckCircle } from "react-icons/fi";

const RESOURCES_ROWS = [
  {
    title: "Lorem Ipsum Dolor Sit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    checklist: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Duis aute irure dolor in reprehenderit in voluptate.",
      "Excepteur sint occaecat cupidatat non proident.",
    ],
    youtubeUrl: "https://www.youtube.com/embed/K4TOrB7at0Y",
  },
  {
    title: "Consectetur Adipiscing Elit",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    checklist: [
      "Sunt in culpa qui officia deserunt mollit anim id est.",
      "Mollis pretium lorem primis senectus habitasse.",
      "Vestibulum suspendisse interdum sollicitudin potenti platea.",
    ],
    youtubeUrl: "https://www.youtube.com/embed/K4TOrB7at0Y",
  },
  {
    title: "Tempor Incididunt Ut Labore",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    checklist: [
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
      "Neque porro quisquam est, qui dolorem ipsum quia.",
      "Quis autem vel eum iure reprehenderit qui in ea.",
    ],
    youtubeUrl: "https://www.youtube.com/embed/K4TOrB7at0Y",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="bg-[#EBEFF2]">
        <div className="pt-34">
          <HeroAnimatedBg
            tileDisplayMode="fixedMosaic"
            heroTitleId="resources-hero-title"
            title="Resources"
            description="Explore our guides, videos, and insights."
            titleClassName="max-w-none whitespace-nowrap"
            descriptionClassName="max-w-none whitespace-nowrap"
            showCta={false}
            fixedMosaicCols={24}
            fixedMosaicRows={4}
            fixedMosaicMatchContainer
          />
        </div>

        <section
          id="resources-list"
          aria-label="Resources Showcase"
          className="mx-auto max-w-[1240px] px-8 py-24 sm:py-32"
        >
          <div className="flex flex-col gap-20 md:gap-36">
            {RESOURCES_ROWS.map((row, index) => {
              const isReversed = index % 2 === 1;

              const contentCol = (
                <div key="content" className="flex flex-col gap-6">
                  <h2 className="text-3xl font-semibold leading-tight text-[#011F27] sm:text-4xl">
                    {row.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-[#4B6066] sm:text-xl">
                    {row.description}
                  </p>
                  <ul className="mt-2 space-y-4">
                    {row.checklist.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3.5">
                        <FiCheckCircle
                          className="mt-1 h-6 w-6 shrink-0 text-[#19A1C6]"
                          aria-hidden
                        />
                        <span className="text-base text-[#4B6066] sm:text-lg">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );

              const videoCol = (
                <div key="video" className="w-full">
                  <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-200/50 bg-[#DFE4E8]/20 shadow-lg shadow-slate-900/5">
                    <iframe
                      className="absolute inset-0 h-full w-full border-0"
                      src={row.youtubeUrl}
                      title={`${row.title} Video Player`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              );

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20"
                >
                  {isReversed ? [videoCol, contentCol] : [contentCol, videoCol]}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <div id="def-cta" className="pt-16">
        <DefCta title="Build the Future of Asset-Backed Lending" />
      </div>
      <Footer />
    </>
  );
}
