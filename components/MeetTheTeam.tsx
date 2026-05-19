import Image from "next/image";
import { FiCheck } from "react-icons/fi";

const IDEAL_CANDIDATES = [
  {
    lead: "Enjoy working in small, ",
    emphasis: "high-impact teams",
  },
  {
    lead: "Are comfortable ",
    emphasis: "owning systems end-to-end",
  },
  {
    lead: "Are interested in ",
    emphasis: "fintech, AI and automation",
  },
  {
    lead: "Value ",
    emphasis: "clear thinking, transparency and collaboration",
  },
] as const;

export default function MeetTheTeam() {
  return (
    <section
      aria-label="Meet the team"
      className="w-full bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Meet the team
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
              We look for people who enjoy solving complex problems and building
              systems that operate at scale.
            </p>

            <p className="mt-10 text-lg font-semibold text-gray-900">
              Ideal candidates:
            </p>

            <ul className="mt-5 flex flex-col gap-4">
              {IDEAL_CANDIDATES.map((item) => (
                <li key={item.emphasis} className="flex gap-3">
                  <FiCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-gray-900"
                    aria-hidden
                  />
                  <span className="text-lg leading-relaxed text-gray-600">
                    {item.lead}
                    <span className="font-semibold text-gray-900">
                      {item.emphasis}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <Image
              src="/careers/careers-team-img.jpg"
              alt="Atomix team collaborating in the office"
              width={568}
              height={340}
              quality={100}
              sizes="(max-width: 1024px) 100vw, 568px"
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
