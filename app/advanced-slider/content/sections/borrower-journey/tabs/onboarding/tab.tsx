import type { Tab } from "@/app/advanced-slider/content/types";
import OnboardingSlide01 from "./steps/01-slide";
import OnboardingSlide02 from "./steps/02-slide";
import OnboardingSlide03 from "./steps/03-slide";

export const onboardingTab: Tab = {
  id: "onboarding",
  label: "Onboarding",
  color: "#0e7490",
  slides: [
    { id: "bj-onboarding-1", content: <OnboardingSlide01 /> },
    { id: "bj-onboarding-2", content: <OnboardingSlide02 /> },
    { id: "bj-onboarding-3", content: <OnboardingSlide03 /> },
  ],
};
