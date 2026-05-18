import type { Tab } from "@/app/advanced-slider/content/types";
import FundingConfirmedSlide01 from "./steps/01-slide";

export const fundingConfirmedTab: Tab = {
  id: "funding-confirmed",
  label: "Funding Confirmed",
  color: "#10b981",
  slides: [
    { id: "cp-funding-confirmed-1", content: <FundingConfirmedSlide01 /> },
  ],
};
