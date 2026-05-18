import type { Tab } from "@/app/advanced-slider/content/types";
import LenderViewSlide01 from "./steps/01-slide";

export const lenderViewTab: Tab = {
  id: "lender-view",
  label: "Lender View",
  color: "#334155",
  slides: [{ id: "lm-lender-view-1", content: <LenderViewSlide01 /> }],
};
