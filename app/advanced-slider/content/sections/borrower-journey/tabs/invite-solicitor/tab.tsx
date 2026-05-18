import type { Tab } from "@/app/advanced-slider/content/types";
import InviteSolicitorSlide01 from "./steps/01-slide";

export const inviteSolicitorTab: Tab = {
  id: "invite-solicitor",
  label: "Invite Solicitor",
  color: "#0f766e",
  slides: [{ id: "bj-invite-solicitor-1", content: <InviteSolicitorSlide01 /> }],
};
