import type { Tab } from "@/app/platform/content/types";
import CompletedTasksSlide01 from "./steps/01-slide";
import CompletedTasksSlide02 from "./steps/02-slide";

export const completedTasksTab: Tab = {
  id: "completed-tasks",
  label: "Completed tasks",
  color: "#7c3aed",
  slides: [
    { id: "rj-completed-tasks-1", content: <CompletedTasksSlide01 /> },
    { id: "rj-completed-tasks-2", content: <CompletedTasksSlide02 /> },
  ],
};
