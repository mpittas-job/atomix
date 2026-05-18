import type { Tab } from "@/app/advanced-slider/content/types";
import ResolveConflictsSlide01 from "./steps/01-slide";

export const resolveConflictsTab: Tab = {
  id: "resolve-conflicts",
  label: "Resolve Conflicts",
  color: "#0d9488",
  slides: [{ id: "sj-resolve-conflicts-1", content: <ResolveConflictsSlide01 /> }],
};
