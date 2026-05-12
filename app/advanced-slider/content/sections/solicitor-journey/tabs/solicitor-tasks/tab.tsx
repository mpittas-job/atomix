import type { Tab } from "@/app/advanced-slider/content/types";
import SolicitorTasksSlide01 from "./steps/01-slide";
import SolicitorTasksSlide02 from "./steps/02-slide";
import SolicitorTasksSlide03 from "./steps/03-slide";
import SolicitorTasksSlide04 from "./steps/04-slide";

export const solicitorTasksTab: Tab = {
  id: "solicitor-tasks",
  label: "Solicitor Tasks",
  color: "#0d9488",
  slides: [
    { id: "sj-solicitor-tasks-1", content: <SolicitorTasksSlide01 /> },
    { id: "sj-solicitor-tasks-2", content: <SolicitorTasksSlide02 /> },
    { id: "sj-solicitor-tasks-3", content: <SolicitorTasksSlide03 /> },
    { id: "sj-solicitor-tasks-4", content: <SolicitorTasksSlide04 /> },
  ],
};
