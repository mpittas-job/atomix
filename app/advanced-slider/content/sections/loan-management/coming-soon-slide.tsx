import type { Slide } from "@/app/advanced-slider/content/types";

export function loanManagementComingSoonSlide(id: string): Slide {
  return {
    id,
    content: (
      <div className="flex min-h-[min(70vh,560px)] w-full flex-col items-center justify-center px-6 text-center">
        <p className="text-2xl font-semibold tracking-tight text-[#011F27] sm:text-3xl">
          Coming soon
        </p>
        <p className="mt-3 max-w-md text-base text-[#011F27]/70">
          This walkthrough is not available yet.
        </p>
      </div>
    ),
  };
}
