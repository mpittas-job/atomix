import type { Tab } from "@/app/advanced-slider/content/types";
import LegalOpinionSlide01 from "./steps/01-slide";
import LegalOpinionSlide02 from "./steps/02-slide";

export const legalOpinionTab: Tab = {
  id: "legal-opinion",
  label: "Legal opinion",
  color: "#7c3aed",
  slides: [
    { id: "rj-legal-opinion-1", content: <LegalOpinionSlide01 /> },
    { id: "rj-legal-opinion-2", content: <LegalOpinionSlide02 /> },
  ],
};
