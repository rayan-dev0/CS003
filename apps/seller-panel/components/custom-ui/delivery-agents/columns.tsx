"use client";

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ScanEye } from 'lucide-react';
import Link from 'next/link';

interface DeliveryAgentsTableColumns {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
}

export const columns: ColumnDef<DeliveryAgentsTableColumns>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Delivery Agent Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Delivery Agent Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        accessorKey: "phoneNumber",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Phone No.
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const deliveryAgent = row.original;

            return (
                <Link href={`/delivery-agent/${deliveryAgent._id}`}>
                    <Button size={'icon'} variant={'ghost'}>
                        <ScanEye className="h-4 w-4" />
                    </Button>
                </Link>
            );
        }
    }
]; 