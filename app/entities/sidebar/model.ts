import { IconUsersPlus, IconLayoutDashboard, IconMail } from "@tabler/icons-react";
import { sidebarLanguage } from "@shared/i18n/locales/fa";
export const data = [
  {
    Icon: IconLayoutDashboard,
    link: "/panel/dashboard",
    label: sidebarLanguage.dashboard
  },
  {
    Icon: IconUsersPlus,
    label: sidebarLanguage.subscribe.label,
    initiallyOpened: true,
    subMenus: [{ label: sidebarLanguage.subscribe.management, link: "/panel/subscriber/management" }]
  },
  {
    Icon: IconMail,
    label: sidebarLanguage.sms.label,
    initiallyOpened: true,
    subMenus: [
      { label: sidebarLanguage.sms.single, link: "/panel/sms/single" },
      { label: sidebarLanguage.sms.bulk, link: "/panel/sms/bulk" }
    ]
  }
];
