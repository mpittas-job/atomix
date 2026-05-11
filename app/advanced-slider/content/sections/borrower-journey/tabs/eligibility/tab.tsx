import type { Tab } from "@/app/advanced-slider/content/types";
import EligibilitySlide01 from "./steps/01-slide";
import EligibilitySlide02 from "./steps/02-slide";

export const eligibilityTab: Tab = {
  id: "eligibility",
  label: "Eligibility",
  color: "#0369a1",
  slides: [
    { id: "bj-eligibility-1", content: <EligibilitySlide01 /> },
    { id: "bj-eligibility-2", content: <EligibilitySlide02 /> },
  ],
};
