import type { Tab } from "@/app/advanced-slider/content/types";
import TransferFundsSlide01 from "./steps/01-slide";

export const transferFundsTab: Tab = {
  id: "transfer-funds",
  label: "Transfer Funds",
  color: "#2dd4bf",
  slides: [{ id: "cp-transfer-funds-1", content: <TransferFundsSlide01 /> }],
};
