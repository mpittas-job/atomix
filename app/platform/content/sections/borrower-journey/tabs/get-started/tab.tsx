import type { Tab } from "@/app/platform/content/types";
import GetStartedSlide01 from "./steps/01-slide";
import GetStartedSlide02 from "./steps/02-slide";

export const getStartedTab: Tab = {
  id: "get-started",
  label: "Get Started",
  color: "#2563eb",
  slides: [
    { id: "bj-get-started-1", content: <GetStartedSlide01 /> },
    { id: "bj-get-started-2", content: <GetStartedSlide02 /> },
  ],
};
