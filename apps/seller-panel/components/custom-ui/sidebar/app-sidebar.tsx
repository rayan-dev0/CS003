"use client";

import React from "react";
import { ExternalLink, LayoutDashboard, PackageOpen, Settings, TrendingUp, Truck, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { CustomSidebarTrigger } from "./sidebar-trigger";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ExternalLink,
      isActive: true,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: PackageOpen,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
    },
    {
      title: "Delivery Agents",
      url: "/delivery-agents",
      icon: Truck,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: TrendingUp,
      isActive: true,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: true,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CustomSidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser username={session.data?.user?.name as string} email={session.data?.user?.email as string} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
