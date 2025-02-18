"use client";

import { Button } from '@/components/ui/button';
import { DeliveryBoysTableColumns } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, FilePenLine, ScanEye } from "lucide-react";
import Link from 'next/link';
import DeleteDialog from './delete-dialog';
import UpdateDeliveryBoyDialog from './update-boy-dialog';

export const columns: ColumnDef<DeliveryBoysTableColumns>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Delivery Boy Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Delivery Boy Email
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
            const deliveryBoy = row.original;

            return (
                <article className='flex items-center gap-1'>
                    <Link href={`/delivery-boy/${deliveryBoy._id}`}>
                        <Button size={'icon'} variant={'ghost'}>
                            <ScanEye />
                        </Button>
                    </Link>
                    <UpdateDeliveryBoyDialog deliveryBoyData={deliveryBoy} />
                    <DeleteDialog deliveryBoyId={deliveryBoy._id} />
                </article>
            )
        }
    }
]