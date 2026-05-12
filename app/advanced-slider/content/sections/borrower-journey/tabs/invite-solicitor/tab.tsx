import type { Tab } from "@/app/advanced-slider/content/types";
import InviteSolicitorSlide01 from "./steps/01-slide";
import InviteSolicitorSlide02 from "./steps/02-slide";
import InviteSolicitorSlide03 from "./steps/03-slide";

export const inviteSolicitorTab: Tab = {
  id: "invite-solicitor",
  label: "Invite Solicitor",
  color: "#0f766e",
  slides: [
    { id: "bj-invite-solicitor-1", content: <InviteSolicitorSlide01 /> },
    { id: "bj-invite-solicitor-2", content: <InviteSolicitorSlide02 /> },
    { id: "bj-invite-solicitor-3", content: <InviteSolicitorSlide03 /> },
  ],
};
