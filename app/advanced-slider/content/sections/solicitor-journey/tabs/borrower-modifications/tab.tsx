import type { Tab } from "@/app/advanced-slider/content/types";
import BorrowerModificationsSlide01 from "./steps/01-slide";

export const borrowerModificationsTab: Tab = {
  id: "borrower-modifications",
  label: "Borrower Modifications",
  color: "#115e59",
  slides: [
    { id: "sj-borrower-modifications-1", content: <BorrowerModificationsSlide01 /> },
  ],
};
