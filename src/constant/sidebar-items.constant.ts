import {
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const ADMIN_SIDEBAR_ITEMS = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      url: "/dashboard/admin/analytics",
      icon: IconChartBar,
    },
    {
      title: "Team",
      url: "/dashboard/admin/team",
      icon: IconUsers,
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
};
export const MODERATOR_SIDEBAR_ITEMS = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/moderator",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      url: "/dashboard/moderator/analytics",
      icon: IconChartBar,
    },
    {
      title: "Team",
      url: "/dashboard/moderator/team",
      icon: IconUsers,
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
};
