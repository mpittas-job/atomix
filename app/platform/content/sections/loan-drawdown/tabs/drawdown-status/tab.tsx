import type { Tab } from "@/app/platform/content/types";
import DrawdownStatusSlide01 from "./steps/01-slide";

export const drawdownStatusTab: Tab = {
  id: "drawdown-status",
  label: "Audit Trail",
  color: "#14b8a6",
  slides: [{ id: "ld-drawdown-status-1", content: <DrawdownStatusSlide01 /> }],
};
