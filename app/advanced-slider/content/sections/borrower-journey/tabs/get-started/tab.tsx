import type { Tab } from "@/app/advanced-slider/content/types";
import GetStartedSlide01 from "./steps/01-slide";
import GetStartedSlide02 from "./steps/02-slide";
import GetStartedSlide03 from "./steps/03-slide";
import GetStartedSlide04 from "./steps/04-slide";

export const getStartedTab: Tab = {
  id: "get-started",
  label: "Get Started",
  color: "#2563eb",
  slides: [
    { id: "bj-get-started-1", content: <GetStartedSlide01 /> },
    { id: "bj-get-started-2", content: <GetStartedSlide02 /> },
    { id: "bj-get-started-3", content: <GetStartedSlide03 /> },
    { id: "bj-get-started-4", content: <GetStartedSlide04 /> },
  ],
};
