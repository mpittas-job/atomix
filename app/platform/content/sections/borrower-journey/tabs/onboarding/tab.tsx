import type { Tab } from "@/app/platform/content/types";
import OnboardingSlide01 from "./steps/01-slide";

export const onboardingTab: Tab = {
  id: "onboarding",
  label: "Onboarding",
  color: "#0e7490",
  slides: [{ id: "bj-onboarding-1", content: <OnboardingSlide01 /> }],
};
