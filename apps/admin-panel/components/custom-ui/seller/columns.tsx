"use client";

import { Button } from '@/components/ui/button';
import { SellerTableColumns } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<SellerTableColumns>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Seller Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Seller Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "businessName",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Business Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "businessType",
        header: "Business category"
    },
    {
        accessorKey: "",
        header: "Quick Actions"
    }
]