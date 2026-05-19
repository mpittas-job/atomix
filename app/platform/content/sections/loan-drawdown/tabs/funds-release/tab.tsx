import type { Tab } from "@/app/platform/content/types";
import FundsReleaseSlide01 from "./steps/01-slide";

export const fundsReleaseTab: Tab = {
  id: "funds-release",
  label: "Transfer Funds",
  color: "#2dd4bf",
  slides: [{ id: "ld-funds-release-1", content: <FundsReleaseSlide01 /> }],
};
