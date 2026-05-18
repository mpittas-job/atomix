import type { Tab } from "@/app/advanced-slider/content/types";
import PreDrawdownConditionsSlide01 from "./steps/01-slide";

export const preDrawdownConditionsTab: Tab = {
  id: "pre-drawdown-conditions",
  label: "Drawdown Process",
  color: "#0f766e",
  slides: [
    {
      id: "ld-pre-drawdown-conditions-1",
      content: <PreDrawdownConditionsSlide01 />,
    },
  ],
};
