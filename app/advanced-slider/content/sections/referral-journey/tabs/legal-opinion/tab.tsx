import type { Tab } from "@/app/advanced-slider/content/types";
import LegalOpinionSlide01 from "./steps/01-slide";
import LegalOpinionSlide02 from "./steps/02-slide";
import LegalOpinionSlide03 from "./steps/03-slide";
import LegalOpinionSlide04 from "./steps/04-slide";
import LegalOpinionSlide05 from "./steps/05-slide";

export const legalOpinionTab: Tab = {
  id: "legal-opinion",
  label: "Legal opinion",
  color: "#7c3aed",
  slides: [
    { id: "rj-legal-opinion-1", content: <LegalOpinionSlide01 /> },
    { id: "rj-legal-opinion-2", content: <LegalOpinionSlide02 /> },
    { id: "rj-legal-opinion-3", content: <LegalOpinionSlide03 /> },
    { id: "rj-legal-opinion-4", content: <LegalOpinionSlide04 /> },
    { id: "rj-legal-opinion-5", content: <LegalOpinionSlide05 /> },
  ],
};
