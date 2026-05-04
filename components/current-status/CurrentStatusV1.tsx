"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import CurrentStatusConnectorsV2 from "@/main/CurrentStatusConnectorsV2";
import DefHeading from "@/components/typo/DefHeading";
import { FaHouse, FaGavel } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { Button as DefButton } from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface StatusCardProps {
  quarter: string;
  title: string;
  description: string;
  marketInfo: string;
  icon?: ReactNode;
}

function StatusCard({
  quarter,
  title,
  description,
  marketInfo,
  icon,
}: StatusCardProps) {
  return (
    <div
      data-cs-top-card
      className="flex-1 relative rounded-3xl border border-[#1491B3] bg-[#003746] p-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 -bottom-8 right-4 w-[15%] rotate-20 bg-[#58fffc]/15 blur-2xl" />
        <div className="absolute -top-8 -bottom-8 right-65 w-[3%] rotate-20 bg-[#58fffc]/15 blur-xl" />
      </div>

      <div className="relative flex flex-col justify-between h-full">
        <div data-cs-top-card-content>
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full px-4 py-1 text-sm font-semibold uppercase text-white bg-linear-to-r from-[#3C6671] to-[#184A57]">
              {quarter}
            </span>
          </div>

          <h3 className="text-3xl leading-6 font-semibold text-white">
            {title}
          </h3>

          <p data-cs-top-card-desc className="mt-4 text-white/80">
            {description}
          </p>
        </div>

        <div
          data-cs-top-card-market
          className="mt-4 rounded-xl bg-white/7 p-2.5 text-sm text-white flex items-center gap-2"
        >
          {icon ? <span className="shrink-0 text-white">{icon}</span> : null}
          <span>{marketInfo}</span>
        </div>
      </div>
    </div>
  );
}

interface StatusFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}

function StatusFeatureCard({
  icon,
  title,
  description,
  active = false,
  onClick,
}: StatusFeatureCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-cs-feature-card
      className={`relative rounded-3xl border bg-[#003746] p-6 overflow-hidden flex flex-col gap-y-3 text-left cursor-pointer transition-[border-color,box-shadow] duration-300 ${
        active
          ? "border-[#58fffc] ring-2 ring-[#58fffc]/60 shadow-[0_0_30px_rgba(88,255,252,0.25)]"
          : "border-[#1491B3] hover:border-[#58fffc]/70"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 -bottom-8 right-4 w-[15%] rotate-20 bg-[#58fffc]/15 blur-2xl" />
        <div className="absolute -top-8 -bottom-8 right-65 w-[3%] rotate-20 bg-[#58fffc]/15 blur-xl" />
      </div>
      <div className="text-white">{icon}</div>
      <h4 className="text-2xl font-semibold text-white">{title}</h4>
      <div className="text-white/80">{description}</div>
    </button>
  );
}

interface TabData {
  title: string;
  description: string;
  mainImage: string;
  smallImages: string[];
}

const TABS: TabData[] = [
  {
    title: "Loan\norigination",
    description:
      "Data entered once, then structured workflow from application to drawdown.",
    mainImage: "/dashboard/current-status-dashboard-1.svg",
    smallImages: ["/dashboard/current-status-dashboard-1-small.svg"],
  },
  {
    title: "Lawyer workflow",
    description: "End-to-end legal, no chasing.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-2-small-1.svg",
      "/dashboard/current-status-dashboard-2-small-2.svg",
    ],
  },
  {
    title: "Loan management",
    description: "Automated lifecycle, start to finish.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-3-small-1.svg",
      "/dashboard/current-status-dashboard-3-small-2.svg",
    ],
  },
  {
    title: "Capital provider dashboards",
    description: "Real-time loan insights, all in one place.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-4-small-1.svg",
      "/dashboard/current-status-dashboard-4-small-2.svg",
      "/dashboard/current-status-dashboard-4-small-3.svg",
    ],
  },
];

export default function CurrentStatusV1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const isFirstTabRender = useRef(true);

  useEffect(() => {
    if (isFirstTabRender.current) {
      isFirstTabRender.current = false;
      return;
    }
    if (!sectionRef.current) return;
    const main = sectionRef.current.querySelector<HTMLElement>(
      "[data-cs-middle-image-main]",
    );
    const smallImages = sectionRef.current.querySelectorAll<HTMLElement>(
      "[data-cs-middle-image-small] > *",
    );
    if (main) {
      gsap.fromTo(
        main,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
    if (smallImages.length) {
      gsap.fromTo(
        smallImages,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          delay: 0.08,
          stagger: 0.18,
          overwrite: "auto",
        },
      );
    }
  }, [activeTab]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const topCards =
        section.querySelectorAll<HTMLElement>("[data-cs-top-card]");
      const topCardsRow = topCards[0]?.parentElement ?? null;
      const topCardDescriptions = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-desc]",
      );
      const topCardMarketInfo = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-market]",
      );
      const middleRow = section.querySelector<HTMLElement>(
        "[data-cs-middle-row]",
      );
      const middleTitle = section.querySelector<HTMLElement>(
        "[data-cs-middle-title]",
      );
      const middleSubtitle = section.querySelector<HTMLElement>(
        "[data-cs-middle-subtitle]",
      );
      const middleImageMain = section.querySelector<HTMLElement>(
        "[data-cs-middle-image-main]",
      );
      const middleImageSmall = section.querySelector<HTMLElement>(
        "[data-cs-middle-image-small]",
      );
      const connector1 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-1]",
      );
      const connector2 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-2]",
      );
      const connector3 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-3]",
      );
      const connector4 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-4]",
      );
      const featureCards = section.querySelectorAll<HTMLElement>(
        "[data-cs-feature-card]",
      );
      const buttons = section.querySelectorAll<HTMLElement>(
        "[data-cs-buttons] > *",
      );
      const connectorSequence = [
        connector1,
        connector2,
        connector3,
        connector4,
      ];

      gsap.set(topCards, { autoAlpha: 0, y: 60 });
      gsap.set([middleRow, middleTitle, middleSubtitle], {
        autoAlpha: 0,
        y: 60,
      });
      gsap.set(middleImageMain, { autoAlpha: 0 });
      gsap.set(middleImageSmall, { autoAlpha: 0, x: 80 });
      gsap.set([topCardDescriptions, topCardMarketInfo], {
        overflow: "hidden",
      });
      gsap.set(featureCards, {
        autoAlpha: 0,
        y: 0,
        scale: 0.9,
        transformOrigin: "center center",
      });
      gsap.set(buttons, { autoAlpha: 0, y: 20 });

      connectorSequence.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "restart reset restart reset",
        },
      });

      tl.to(topCards, {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out",
        stagger: 0.5,
      })
        .to(
          middleRow,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: "power2.out",
          },
          "-=1",
        )
        .to(
          middleTitle,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=0.75",
        )
        .to(
          middleSubtitle,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=0.85",
        )
        .to(
          middleImageMain,
          {
            autoAlpha: 1,
            duration: 2,
            ease: "power1.out",
          },
          "-=0.7",
        )
        .to(
          middleImageSmall,
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=1.2",
        );

      if (topCardsRow) {
        const topCardsCollapseTl = gsap.timeline({
          scrollTrigger: {
            trigger: topCardsRow,
            start: "bottom 60%",
            toggleActions: "play reverse play reverse",
          },
        });

        topCardsCollapseTl
          .to(
            topCardDescriptions,
            {
              autoAlpha: 0,
              y: -10,
              height: 0,
              marginTop: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            topCardMarketInfo,
            {
              autoAlpha: 0,
              y: -10,
              height: 0,
              marginTop: 0,
              paddingTop: 0,
              paddingBottom: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            "<",
          );
      }

      for (let index = 0; index < featureCards.length; index += 1) {
        const path = connectorSequence[index];
        const card = featureCards[index];
        const isFirstStep = index === 0;

        if (path) {
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            isFirstStep ? "-=4" : ">",
          );
        }

        if (card) {
          tl.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 0,
              scale: 0.9,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.35,
              ease: "power2.out",
              immediateRender: false,
            },
            ">",
          );
        }
      }

      tl.to(
        buttons,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=6",
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#004152] via-[#01485C] to-[#004152] relative overflow-hidden flex flex-col justify-center items-center py-28"
    >
      <div className="absolute top-0 left-0 w-full h-[500px]">
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

      <DefHeading
        theme="light"
        badgeText=""
        title="Current Status"
        description="Atomix is live and building — two product launches confirmed for 2026: quick home sale MVP (Q2) and auction finance MVP (Q3)."
        showBadge={false}
      />

      <div className="max-w-[1200px] mx-auto px-8 mt-14 flex flex-col">
        <div className="flex gap-x-6 mb-6">
          <StatusCard
            quarter="Q2 2026"
            title="Quick Home Sale MVP"
            description="Quick home sale providers depend on speed and certainty of funding. Atomix is built for this model — repeat, high-volume bridging with a pre-approved offer generated instantly and a process that removes friction at every step."
            marketInfo="Part of the £350bn UK annual property loan market"
            icon={<FaHouse className="h-4 w-4" />}
          />

          <StatusCard
            quarter="Q3 2026"
            title="Auction Finance MVP"
            description="Pre-approved finance embedded into the auction experience — certainty of funding before the hammer falls, within the 28-day completion window."
            marketInfo="Unlocking £5.5bn stalled by 30-day completion requirements"
            icon={<FaGavel className="h-4 w-4" />}
          />
        </div>

        <div
          data-cs-middle-row
          className="relative rounded-3xl border border-[#1491B3] bg-[#003746] p-10 pb-0 relative"
        >
          <div className="absolute z-1 bottom-0 left-0 right-0 h-[120px] bg-linear-to-b from-[#003746]/0 to-[#003746] rounded-b-3xl"></div>
          <div
            data-cs-middle-title
            className="text-white text-xl font-semibold mb-1"
          >
            Loan origination
          </div>

          <div
            data-cs-middle-subtitle
            className="text-white text-white/80 mb-6"
          >
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet
          </div>

          <div data-cs-middle-image className="relative w-full relative">
            <div data-cs-middle-image-main className="w-full">
              <Image
                key={`main-${activeTab}`}
                src={TABS[activeTab].mainImage}
                alt=""
                width={600}
                height={400}
                className="block w-full h-auto rounded-lg"
              />
            </div>

            <div
              key={`small-${activeTab}`}
              data-cs-middle-image-small
              className="absolute top-4 -right-19 z-2 flex flex-col gap-3"
            >
              {TABS[activeTab].smallImages.map((src, index) => (
                <Image
                  key={`${src}-${index}`}
                  src={src}
                  alt=""
                  width={320}
                  height={200}
                  className="object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        <div data-cs-connectors>
          <CurrentStatusConnectorsV2 />
        </div>

        <div className="-mt-1 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TABS.map((tab, index) => (
            <StatusFeatureCard
              key={tab.title}
              icon={<TbTargetArrow className="h-10 w-10" />}
              title={tab.title}
              description={tab.description}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>

        <div data-cs-buttons className="w-full flex gap-x-4 justify-center">
          <DefButton>Learn more</DefButton>

          <DefButton variant="dark">Watch Videos</DefButton>
        </div>
      </div>
    </div>
  );
}
