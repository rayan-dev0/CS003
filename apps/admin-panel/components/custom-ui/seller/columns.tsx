"use client";

import { Button } from '@/components/ui/button';
import { SellerTableColumns } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ScanEye } from "lucide-react";
import DeleteDialog from './delete-dialog';
import UpdateSellerDialog from './update-seller-dialog';
import Link from 'next/link';

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
        id: "quickActions",
        header: "Quick Actions",
        cell: ({ row }) => {
            const seller = row.original;

            return (
                <article className='flex items-center gap-1'>
                    <Link href={`/seller/${seller._id}`}>
                        <Button size={'icon'} variant={'ghost'}>
                            <ScanEye />
                        </Button>
                    </Link>
                    <UpdateSellerDialog sellerData={seller} />
                    <DeleteDialog sellerId={seller._id} />
                </article>
            )
        }
    }
]