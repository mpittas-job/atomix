import type { Tab } from "@/app/advanced-slider/content/types";
import SolicitorTasksSlide01 from "./steps/01-slide";
import SolicitorTasksSlide02 from "./steps/02-slide";

export const solicitorTasksTab: Tab = {
  id: "solicitor-tasks",
  label: "Solicitor Tasks",
  color: "#0d9488",
  slides: [
    { id: "sj-solicitor-tasks-1", content: <SolicitorTasksSlide01 /> },
    { id: "sj-solicitor-tasks-2", content: <SolicitorTasksSlide02 /> },
  ],
};
