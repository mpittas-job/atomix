import type { Tab } from "@/app/advanced-slider/content/types";
import FetchAutomationDataSlide01 from "./steps/01-slide";

export const fetchAutomationDataTab: Tab = {
  id: "fetch-automation-data",
  label: "Fetch Automation Data",
  color: "#4338ca",
  slides: [
    {
      id: "bj-fetch-automation-data-1",
      content: <FetchAutomationDataSlide01 />,
    },
  ],
};
