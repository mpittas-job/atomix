import type { Tab } from "@/app/advanced-slider/content/types";
import SolicitorViewSlide01 from "./steps/01-slide";

export const solicitorViewTab: Tab = {
  id: "solicitor-view",
  label: "Solicitor View",
  color: "#0f172a",
  slides: [{ id: "lm-solicitor-view-1", content: <SolicitorViewSlide01 /> }],
};
