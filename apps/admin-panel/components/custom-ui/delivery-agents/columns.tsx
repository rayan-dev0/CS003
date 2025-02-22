"use client";

import { Button } from '@/components/ui/button';
import { DeliveryAgentsTableColumns } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ScanEye } from "lucide-react";
import Link from 'next/link';
import DeleteDialog from './delete-dialog';
import UpdateDeliveryAgentDialog from './update-agent-dialog';

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
        id: "quickActions",
        header: "Quick Actions",
        cell: ({ row }) => {
            const deliveryAgent = row.original;

            return (
                <article className='flex items-center gap-1'>
                    <Link href={`/delivery-agent/${deliveryAgent._id}`}>
                        <Button size={'icon'} variant={'ghost'}>
                            <ScanEye />
                        </Button>
                    </Link>
                    <UpdateDeliveryAgentDialog deliveryAgentData={deliveryAgent} />
                    <DeleteDialog deliveryAgentId={deliveryAgent._id} />
                </article>
            )
        }
    }
]