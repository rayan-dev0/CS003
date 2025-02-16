"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronsLeft } from "lucide-react";
import { useRef } from "react";

export function CustomSidebarTrigger() {
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex w-full items-center gap-2 p-2">
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
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}