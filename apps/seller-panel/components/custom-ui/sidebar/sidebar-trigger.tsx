"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ChevronsLeft, PanelsTopLeft, PanelLeft } from "lucide-react";
import { useRef } from "react";

export function CustomSidebarTrigger() {
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const { toggleSidebar, isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem onClick={() => triggerRef.current?.click()}>
                <SidebarMenuButton 
                    size={'lg'} 
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                >
                    <aside className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <PanelLeft className="size-4" />
                    </aside>
                    {!isMobile && (
                        <span className="ml-2 text-sm font-medium">Toggle Sidebar</span>
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarTrigger className="hidden" ref={triggerRef} />
        </SidebarMenu>
    );
}