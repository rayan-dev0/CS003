"use client";

import React from "react";
import { ChartPie, Handshake, LayoutDashboard, Settings, Truck } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { CustomSidebarTrigger } from "./sidebar-trigger";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {

  user: {
    name: "Muaz Hasan P",
    email: "muazpbt@gmail.com",
    avatar: "MH",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true
    },
    {
      title: "Sellers",
      url: "/seller",
      icon: Handshake,
      isActive: true,
    },
    {
      title: "Delivery Boys",
      url: "/delivery-boys",
      icon: Truck,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartPie,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CustomSidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
