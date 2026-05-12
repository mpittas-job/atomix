import type { Tab } from "@/app/advanced-slider/content/types";
import DocumentsSlide01 from "./steps/01-slide";
import DocumentsSlide02 from "./steps/02-slide";
import DocumentsSlide03 from "./steps/03-slide";
import DocumentsSlide04 from "./steps/04-slide";
import DocumentsSlide05 from "./steps/05-slide";
import DocumentsSlide06 from "./steps/06-slide";

export const documentsTab: Tab = {
  id: "documents",
  label: "Documents",
  color: "#115e59",
  slides: [
    { id: "sj-documents-1", content: <DocumentsSlide01 /> },
    { id: "sj-documents-2", content: <DocumentsSlide02 /> },
    { id: "sj-documents-3", content: <DocumentsSlide03 /> },
    { id: "sj-documents-4", content: <DocumentsSlide04 /> },
    { id: "sj-documents-5", content: <DocumentsSlide05 /> },
    { id: "sj-documents-6", content: <DocumentsSlide06 /> },
  ],
};
