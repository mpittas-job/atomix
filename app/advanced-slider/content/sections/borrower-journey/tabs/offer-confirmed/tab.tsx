import type { Tab } from "@/app/advanced-slider/content/types";
import OfferConfirmedSlide01 from "./steps/01-slide";
import OfferConfirmedSlide02 from "./steps/02-slide";

export const offerConfirmedTab: Tab = {
  id: "offer-confirmed",
  label: "Offer Confirmed",
  color: "#15803d",
  slides: [
    { id: "bj-offer-confirmed-1", content: <OfferConfirmedSlide01 /> },
    { id: "bj-offer-confirmed-2", content: <OfferConfirmedSlide02 /> },
  ],
};
