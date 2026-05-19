import type { Tab } from "@/app/platform/content/types";
import DocumentsSlide01 from "./steps/01-slide";
import DocumentsSlide02 from "./steps/02-slide";

export const documentsTab: Tab = {
  id: "documents",
  label: "Documents",
  color: "#115e59",
  slides: [
    { id: "sj-documents-1", content: <DocumentsSlide01 /> },
    { id: "sj-documents-2", content: <DocumentsSlide02 /> },
  ],
};
