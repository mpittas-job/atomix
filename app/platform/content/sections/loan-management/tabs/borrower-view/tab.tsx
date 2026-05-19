import type { Tab } from "@/app/platform/content/types";
import BorrowerViewSlide01 from "./steps/01-slide";

export const borrowerViewTab: Tab = {
  id: "borrower-view",
  label: "Borrower View",
  color: "#475569",
  slides: [{ id: "lm-borrower-view-1", content: <BorrowerViewSlide01 /> }],
};
