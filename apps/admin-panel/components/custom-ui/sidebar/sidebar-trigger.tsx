"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronsLeft } from "lucide-react";
import { useRef } from "react";

export function CustomSidebarTrigger() {

    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <SidebarMenu>
            <SidebarMenuItem onClick={() => triggerRef.current?.click()}>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <SidebarTrigger ref={triggerRef} />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Menu
                        </span>
                        <span className="truncate text-xs">
                            Cognivos
                        </span>
                    </div>
                    <ChevronsLeft className="ml-auto" />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}