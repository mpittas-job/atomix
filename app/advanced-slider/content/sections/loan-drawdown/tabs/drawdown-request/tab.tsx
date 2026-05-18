import type { Tab } from "@/app/advanced-slider/content/types";
import DrawdownRequestSlide01 from "./steps/01-slide";

export const drawdownRequestTab: Tab = {
  id: "drawdown-request",
  label: "Request Drawdown",
  color: "#0d9488",
  slides: [{ id: "ld-drawdown-request-1", content: <DrawdownRequestSlide01 /> }],
};
