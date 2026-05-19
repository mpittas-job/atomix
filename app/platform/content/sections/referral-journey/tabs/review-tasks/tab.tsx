import type { Tab } from "@/app/platform/content/types";
import ReviewTasksSlide01 from "./steps/01-slide";

export const reviewTasksTab: Tab = {
  id: "review-tasks",
  label: "Review tasks",
  color: "#7c3aed",
  slides: [{ id: "rj-review-tasks-1", content: <ReviewTasksSlide01 /> }],
};
