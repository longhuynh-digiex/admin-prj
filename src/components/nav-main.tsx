"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/utils/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  console.log({ pathname });

  const router = useRouter();
  const handleNav = (url: string) => {
    router.push(url);
  };
  useEffect(() => {}, [pathname]);
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2 '>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <SidebarMenuButton
              tooltip='Quick Create'
              className='text-primary border border-primary cursor-pointer flex justify-center hover:bg-primary hover:text-primary-foreground hover:duration-500 active:bg-primary/90 active:text-primary-foreground min-w-8 duration-500'
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={cn(
                  "cursor-pointer font-semibold",
                  pathname === item.url
                    ? "hover:bg-primary hover:text-primary-foreground  bg-primary text-primary-foreground"
                    : ""
                )}
                tooltip={item.title}
                onClick={() => handleNav(item.url)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
