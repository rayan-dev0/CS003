"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsType {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

export const NavMain: React.FC<NavItemsType> = ({ items }) => {
  const pathname = usePathname(); 
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;
          return (
            <SidebarMenuItem key={item.url}>
              <Link href={item.url}>
                <SidebarMenuButton
                  size="lg"
                  className={`group flex items-center justify-between w-full px-4 py-2 rounded-md transition-all 
                  ${isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex aspect-square size-7 items-center justify-center rounded-lg">
                      {item.icon && <item.icon />}
                    </div>
                    <h5 className="text-md">{item.title}</h5>
                  </div>
                  {isActive && <ChevronRight className="size-5" />}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
