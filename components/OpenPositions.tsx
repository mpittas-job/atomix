"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import AdvSliderTabToggle from "@/components/AdvSliderTabToggle";
import IconBoxLight from "@/components/IconBoxLight";

const POSITION_TABS = [
  { id: "all", label: "All positions" },
  { id: "data-science", label: "Data Science" },
  { id: "engineering", label: "Engineering" },
  { id: "marketing", label: "Marketing" },
] as const;

const LOCATIONS = [
  { id: "all", label: "All locations" },
  { id: "london", label: "London" },
  { id: "remote", label: "Remote" },
] as const;

type Job = {
  id: string;
  title: string;
  location: string;
  locationId: (typeof LOCATIONS)[number]["id"];
  category: Exclude<(typeof POSITION_TABS)[number]["id"], "all">;
};

const JOBS: Job[] = [
  {
    id: "data-science-engineer-1",
    title: "Data Science Engineer",
    location: "Location",
    locationId: "london",
    category: "data-science",
  },
  {
    id: "senior-software-engineer-1",
    title: "Senior Software Engineer",
    location: "Location",
    locationId: "london",
    category: "engineering",
  },
  {
    id: "growth-marketer-1",
    title: "Growth Marketer",
    location: "Location",
    locationId: "remote",
    category: "marketing",
  },
  {
    id: "print-branding-designer",
    title: "Print & Branding Designer",
    location: "Location",
    locationId: "london",
    category: "marketing",
  },
  {
    id: "software-engineer-bi",
    title: "Software Engineer (Business Intelligence and Automation)",
    location: "Location",
    locationId: "remote",
    category: "engineering",
  },
  {
    id: "customer-facing-data-scientist",
    title: "Customer Facing Data Scientist",
    location: "Location",
    locationId: "london",
    category: "data-science",
  },
  {
    id: "growth-marketer-2",
    title: "Growth Marketer",
    location: "Location",
    locationId: "remote",
    category: "marketing",
  },
  {
    id: "data-science-engineer-2",
    title: "Data Science Engineer",
    location: "Location",
    locationId: "london",
    category: "data-science",
  },
  {
    id: "senior-software-engineer-2",
    title: "Senior Software Engineer",
    location: "Location",
    locationId: "remote",
    category: "engineering",
  },
];

function JobPositionCard({
  title,
  location,
}: {
  title: string;
  location: string;
}) {
  return (
    <IconBoxLight className="h-full">
      <h3 className="text-xl sm:text-2xl font-semibold leading-snug text-[#011F27]">
        {title}
      </h3>
      <p className="mt-3 flex items-center gap-2.5 text-md sm:text-lg text-[#4B6066]">
        <HiOutlineLocationMarker
          className="h-5 w-5 shrink-0 text-[#617379]"
          aria-hidden
        />
        <span>{location}</span>
      </p>
    </IconBoxLight>
  );
}

export default function OpenPositions() {
  const [activeTabId, setActiveTabId] = useState<string>(POSITION_TABS[0].id);
  const [activeLocationId, setActiveLocationId] = useState<string>("remote");
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const locationMenuRef = useRef<HTMLDivElement>(null);

  const activeLocationLabel =
    LOCATIONS.find((loc) => loc.id === activeLocationId)?.label ??
    LOCATIONS[0].label;

  useEffect(() => {
    if (!locationMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!locationMenuRef.current?.contains(event.target as Node)) {
        setLocationMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [locationMenuOpen]);

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesCategory =
        activeTabId === "all" || job.category === activeTabId;
      const matchesLocation =
        activeLocationId === "all" || job.locationId === activeLocationId;
      return matchesCategory && matchesLocation;
    });
  }, [activeTabId, activeLocationId]);

  return (
    <section
      id="open-roles"
      aria-label="Open positions"
      className="w-full scroll-mt-28 bg-gradient-to-b from-[#EBEFF2] via-[#EBEFF2] to-[#fff] py-16 md:scroll-mt-32 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="flex flex-wrap items-center justify-center gap-x-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            <span>Open positions in</span>
            <div ref={locationMenuRef} className="relative inline-flex">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={locationMenuOpen}
                onClick={() => setLocationMenuOpen((open) => !open)}
                className="inline-flex items-center gap-1 font-semibold text-[#19A1C6] transition-colors hover:text-[#1491B3]"
              >
                {activeLocationLabel}
                <FiChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform ${locationMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {locationMenuOpen ? (
                <ul
                  role="listbox"
                  aria-label="Filter by location"
                  className="absolute left-1/2 top-full z-20 mt-2 min-w-[130px] -translate-x-1/2 overflow-hidden rounded-lg border border-white/80 bg-white py-0.5 text-left text-[18px] shadow-lg shadow-slate-900/10"
                >
                  {LOCATIONS.map((location) => (
                    <li
                      key={location.id}
                      role="option"
                      aria-selected={activeLocationId === location.id}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLocationId(location.id);
                          setLocationMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-[18px] transition-colors hover:bg-[#F4F9FB] ${
                          activeLocationId === location.id
                            ? "font-semibold text-[#19A1C6]"
                            : "text-gray-700"
                        }`}
                      >
                        {location.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </h2>

          <div className="mt-10 w-full max-w-3xl">
            <AdvSliderTabToggle
              tabs={[...POSITION_TABS]}
              activeTabId={activeTabId}
              onTabChange={setActiveTabId}
              ariaLabel="Filter positions by department"
              className="mb-0"
            />
          </div>
        </div>

        <div
          role="tabpanel"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {filteredJobs.map((job) => (
            <JobPositionCard
              key={job.id}
              title={job.title}
              location={job.location}
            />
          ))}
        </div>

        {filteredJobs.length === 0 ? (
          <p className="mt-10 text-center text-lg text-gray-600">
            No open positions match this filter.
          </p>
        ) : null}
      </div>
    </section>
  );
}
