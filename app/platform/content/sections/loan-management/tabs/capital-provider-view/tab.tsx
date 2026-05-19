import type { Tab } from "@/app/platform/content/types";
import CapitalProviderViewSlide01 from "./steps/01-slide";

export const capitalProviderViewTab: Tab = {
  id: "capital-provider-view",
  label: "Capital Provider View",
  color: "#1e293b",
  slides: [
    { id: "lm-capital-provider-view-1", content: <CapitalProviderViewSlide01 /> },
  ],
};
