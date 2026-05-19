import type { Tab } from "@/app/platform/content/types";
import OfferConfirmedSlide01 from "./steps/01-slide";

export const offerConfirmedTab: Tab = {
  id: "offer-confirmed",
  label: "Offer Confirmed",
  color: "#15803d",
  slides: [
    { id: "bj-offer-confirmed-1", content: <OfferConfirmedSlide01 /> },
  ],
};
