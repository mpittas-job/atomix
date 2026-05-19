import type { Tab } from "@/app/platform/content/types";
import FundsAllocationSlide01 from "./steps/01-slide";

export const fundsAllocationTab: Tab = {
  id: "funds-allocation",
  label: "Funds Allocation",
  color: "#047857",
  slides: [{ id: "cp-funds-allocation-1", content: <FundsAllocationSlide01 /> }],
};
