"use client";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ThemeToggle from "./theme-toggle";
import { useAuthStore } from "@/store";
import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import { ROLES } from "@/constant/roles.constant";
import {
  ADMIN_SIDEBAR_ITEMS,
  MODERATOR_SIDEBAR_ITEMS,
} from "@/constant/sidebar-items.constant";
import { Icon, IconProps } from "@tabler/icons-react";
type TNavItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

type TNavItems = {
  navMain: TNavItem[];
  navSecondary?: TNavItem[];
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const userRole: TNavItems | undefined = useMemo(() => {
    if (!user?.role) return;

    switch (user.role) {
      case ROLES.Admin:
        return ADMIN_SIDEBAR_ITEMS;
      case ROLES.Moderator:
        return MODERATOR_SIDEBAR_ITEMS;

      default:
        return;
    }
  }, [user]);
  console.log({ userRole });

  return (
    <Sidebar
      collapsible='offcanvas'
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='h-fit'
            >
              <div className='w-full flex justify-between items-center'>
                <a
                  className='flex items-center shrink-0'
                  href='/'
                >
                  <span className='text-base font-semibold'>
                    Admin Dashboard
                  </span>
                </a>
                <ThemeToggle />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={userRole?.navMain!} />
        <NavSecondary
          items={userRole?.navSecondary!}
          className='mt-auto'
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
