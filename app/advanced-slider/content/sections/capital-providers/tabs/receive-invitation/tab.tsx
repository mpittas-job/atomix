import type { Tab } from "@/app/advanced-slider/content/types";
import ReceiveInvitationSlide01 from "./steps/01-slide";

export const receiveInvitationTab: Tab = {
  id: "receive-invitation",
  label: "Receive Invitation",
  color: "#0d9488",
  slides: [
    { id: "cp-receive-invitation-1", content: <ReceiveInvitationSlide01 /> },
  ],
};
