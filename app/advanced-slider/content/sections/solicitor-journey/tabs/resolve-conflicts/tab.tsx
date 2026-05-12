import type { Tab } from "@/app/advanced-slider/content/types";
import ResolveConflictsSlide01 from "./steps/01-slide";
import ResolveConflictsSlide02 from "./steps/02-slide";
import ResolveConflictsSlide03 from "./steps/03-slide";

export const resolveConflictsTab: Tab = {
  id: "resolve-conflicts",
  label: "Resolve Conflicts",
  color: "#0d9488",
  slides: [
    { id: "sj-resolve-conflicts-1", content: <ResolveConflictsSlide01 /> },
    { id: "sj-resolve-conflicts-2", content: <ResolveConflictsSlide02 /> },
    { id: "sj-resolve-conflicts-3", content: <ResolveConflictsSlide03 /> },
  ],
};
