import type { Tab } from "@/app/advanced-slider/content/types";
import ReferralJourneyMainSlide01 from "./steps/01-slide";
import ReferralJourneyMainSlide02 from "./steps/02-slide";
import ReferralJourneyMainSlide03 from "./steps/03-slide";
import ReferralJourneyMainSlide04 from "./steps/04-slide";

export const referralJourneyMainTab: Tab = {
  id: "referral-journey-main",
  label: "referral-journey-main",
  color: "#7c3aed",
  slides: [
    { id: "rj-main-1", content: <ReferralJourneyMainSlide01 /> },
    { id: "rj-main-2", content: <ReferralJourneyMainSlide02 /> },
    { id: "rj-main-3", content: <ReferralJourneyMainSlide03 /> },
    { id: "rj-main-4", content: <ReferralJourneyMainSlide04 /> },
  ],
};
