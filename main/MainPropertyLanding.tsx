"use client";

import Button from "@/components/ui/button";
import IconBoxLight from "@/components/IconBoxLight";
import { FaShieldHalved } from "react-icons/fa6";

const cards = [
  {
    title: "What we are",
    description:
      "a Platform-as-a-Service automating the full lifecycle of property loans, end-to-end; fully configurable and white-label ready",
  },
  {
    title: "What sets us apart",
    description:
      "rules-first architecture, immutable on-chain audit and goal-driven intelligence operating within both; compliance enforced at every level, not bolted on",
  },
  {
    title: "Who we serve",
    description: "lenders, capital providers, brokers and borrowers",
  },
  {
    title: "Where we operate",
    description: "UK-based, with global expansion built into the model",
  },
];

export default function MainPropertyLanding() {
  return (
    <div className="w-full ">
      <div className="rounded-[48px] bg-[#EBEFF2] p-8 md:p-20">
        <div className="flex flex-col gap-12 max-w-[1200px] mx-auto">
          {/* Title Section */}
          <h2 className="max-w-[700px] text-4xl leading-[1.2em] md:text-5xl font-semibold">
            Property lending is overdue for a rebuild. Atomix is it.
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <IconBoxLight
                key={index}
                title={card.title}
                description={card.description}
                icon={<FaShieldHalved className="h-5 w-5" />}
              />
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-center mt-4">
            <Button size="large" className="bg-[#19A1C6] hover:bg-[#1491B3]">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
