import type { Tab } from "@/app/platform/content/types";
import RefineOfferSlide01 from "./steps/01-slide";
import RefineOfferSlide02 from "./steps/02-slide";

export const refineOfferTab: Tab = {
  id: "refine-offer",
  label: "Refine Offer",
  color: "#1e40af",
  slides: [
    { id: "bj-refine-offer-1", content: <RefineOfferSlide01 /> },
    { id: "bj-refine-offer-2", content: <RefineOfferSlide02 /> },
  ],
};
